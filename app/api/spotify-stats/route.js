import { getArtistStats } from '../../utils/spotify';

export async function GET() {
  try {
    const stats = await getArtistStats();
    
    return new Response(JSON.stringify({
      totalListeners: stats.followers,
      monthlyListeners: stats.monthlyListeners,
      availableMarkets: stats.listenerLocations || [],
      markets: stats.markets || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching Spotify stats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Spotify stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 