import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getArtistStats } from '../../utils/spotify';
import { getCountryLocation } from '../../utils/countryCoordinates';

export const runtime = 'edge';

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

    // Add Spotify market locations
    if (spotifyStats.markets?.length > 0) {
      const listenersPerMarket = Math.floor(spotifyStats.monthlyListeners / spotifyStats.markets.length);
      
      spotifyStats.markets.forEach(market => {
        const marketLocation = getCountryLocation(market);
        if (marketLocation) {
          cityMap.set(market, {
            city: marketLocation.city,
            country: marketLocation.country,
            latitude: marketLocation.latitude,
            longitude: marketLocation.longitude,
            visit_count: listenersPerMarket,
            type: 'spotify'
          });
        }
      });
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