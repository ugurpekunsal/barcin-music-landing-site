import { Redis } from '@upstash/redis';

const SPOTIFY_ARTIST_ID = '6cTIJAOGc7aOxEnSnSLKhb';
const CACHE_KEY = 'spotify_artist_stats';
const CACHE_DURATION = 60 * 60; // 1 hour in seconds

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function getSpotifyToken() {
  const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function getArtistStats() {
  try {
    // Check Redis cache first
    const cachedData = await redis.get(CACHE_KEY);
    
    if (cachedData) {
      console.log('Returning cached Spotify stats');
      return cachedData;
    }

    // If no cache or expired, fetch fresh data
    console.log('Fetching fresh Spotify stats');
    const token = await getSpotifyToken();
    
    const [artistResponse, marketsResponse] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }),
      fetch(`https://api.spotify.com/v1/markets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    ]);

    const artist = await artistResponse.json();
    const markets = await marketsResponse.json();

    const stats = {
      followers: artist.followers.total,
      monthlyListeners: artist.followers.total,
      markets: markets.markets
    };

    // Cache the fresh data with expiration
    await redis.set(CACHE_KEY, stats, { ex: CACHE_DURATION });

    return stats;
  } catch (error) {
    console.error('Error fetching Spotify stats:', error);
    
    // If error occurs, try to return cached data
    const cachedData = await redis.get(CACHE_KEY);
    
    if (cachedData) {
      console.log('Returning cache due to error');
      return cachedData;
    }
    
    throw error;
  }
} 