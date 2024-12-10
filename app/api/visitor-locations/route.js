import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getArtistStats } from '../../utils/spotify';
import { geocode } from '../../utils/geocoding';

export const runtime = 'edge';

async function getCountryCoordinates(countryName) {
  try {
    const result = await geocode(countryName);
    if (result) {
      return {
        latitude: result.lat,
        longitude: result.lng,
        country: result.components.country,
        city: result.components.city || 'Capital'
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding country:', error);
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get Spotify stats first
    const spotifyStats = await getArtistStats();
    
    // Get visitor locations from database
    const { data: visitorData, error } = await supabase
      .from('visitor_locations')
      .select('city, country, latitude, longitude, visit_count')
      .not('city', 'eq', 'Unknown')
      .not('country', 'eq', 'Unknown');

    if (error) throw error;

    // Aggregate visitor data
    const cityMap = new Map();
    
    // Add visitor locations
    visitorData.forEach(location => {
      const key = `${location.city},${location.country}`;
      if (cityMap.has(key)) {
        const existing = cityMap.get(key);
        existing.visit_count += location.visit_count;
      } else {
        cityMap.set(key, {
          city: location.city,
          country: location.country,
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          visit_count: parseInt(location.visit_count),
          type: 'visitor'
        });
      }
    });

    // Process Spotify markets
    if (spotifyStats.markets && spotifyStats.markets.length > 0) {
      // Process markets sequentially to avoid rate limits
      for (const market of spotifyStats.markets) {
        const marketLocation = await getCountryCoordinates(market);
        if (marketLocation) {
          const listenersPerMarket = Math.floor(spotifyStats.monthlyListeners / spotifyStats.markets.length);
          cityMap.set(market, {
            city: marketLocation.city,
            country: marketLocation.country,
            latitude: marketLocation.latitude,
            longitude: marketLocation.longitude,
            visit_count: listenersPerMarket,
            type: 'spotify'
          });
        }
      }
    }

    // Convert to array and sort by visit count
    const combinedLocations = Array.from(cityMap.values())
      .sort((a, b) => b.visit_count - a.visit_count);

    // Calculate stats
    const uniqueCountries = new Set([
      ...combinedLocations.map(loc => loc.country)
    ]);

    return new Response(JSON.stringify({
      locations: combinedLocations,
      stats: {
        totalListeners: spotifyStats.monthlyListeners,
        totalCountries: uniqueCountries.size,
        totalCities: combinedLocations.length,
        spotifyMarkets: spotifyStats.markets.length
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      },
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      data: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 