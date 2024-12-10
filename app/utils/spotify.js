const SPOTIFY_ARTIST_ID = '6cTIJAOGc7aOxEnSnSLKhb';

// Cache coordinates to avoid repeated API calls
const coordinatesCache = new Map();

async function getLocationCoordinates(location) {
  try {
    // Check cache first
    const cacheKey = location.toLowerCase();
    if (coordinatesCache.has(cacheKey)) {
      return coordinatesCache.get(cacheKey);
    }

    // Make API request to OpenCage
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}&limit=1`
    );

    if (!response.ok) throw new Error('Geocoding API request failed');

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const locationData = {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        name: result.formatted,
        components: result.components, // Includes detailed location data
        confidence: result.confidence
      };

      // Cache the result
      coordinatesCache.set(cacheKey, locationData);
      return locationData;
    }

    throw new Error('No results found for location');
  } catch (error) {
    console.error(`Error getting coordinates for ${location}:`, error);
    return null;
  }
}

async function getCountryCoordinates(countryCodes) {
  try {
    // Process locations in parallel, but with rate limiting
    const promises = countryCodes.map(async (code, index) => {
      // Add a small delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, index * 100));
      
      const locationData = await getLocationCoordinates(code);
      if (locationData) {
        return {
          ...locationData,
          code
        };
      }
      return null;
    });

    const results = await Promise.all(promises);
    return results.filter(result => result !== null);
  } catch (error) {
    console.error('Error in getCountryCoordinates:', error);
    return [];
  }
}

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
  const token = await getSpotifyToken();
  
  const [artistResponse, topTracksResponse, marketsResponse] = await Promise.all([
    fetch(`https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }),
    fetch(`https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}/top-tracks?market=TR`, {
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
  const topTracks = await topTracksResponse.json();
  const markets = await marketsResponse.json();

  return {
    followers: artist.followers.total,
    monthlyListeners: artist.followers.total,
    markets: markets.markets,
    topTracks: topTracks.tracks.slice(0, 3).map(track => ({
      name: track.name,
      plays: track.popularity,
      image: track.album.images[0].url
    })),
    listenerLocations: topTracks.tracks[0]?.available_markets || []
  };
}

async function getCityCoordinates(cities) {
  const results = [];
  
  // Process cities in batches to respect rate limits
  const batchSize = 10;
  for (let i = 0; i < cities.length; i += batchSize) {
    const batch = cities.slice(i, i + batchSize);
    const batchPromises = batch.map(async city => {
      const locationData = await getLocationCoordinates(city);
      if (locationData) {
        return {
          ...locationData,
          city
        };
      }
      return null;
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.filter(result => result !== null));
    
    // Add delay between batches
    if (i + batchSize < cities.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
} 