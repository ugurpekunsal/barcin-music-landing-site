import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    // Get IP from request headers or use a default for development
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded 
      ? forwarded.split(', ')[0] 
      : request.headers.get("x-real-ip") || '8.8.8.8'; // Default IP for testing
    
    console.log('Processing IP:', ip);

    // Call IP geolocation service with error handling
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
      if (!geoResponse.ok) {
        throw new Error(`Geolocation API error: ${geoResponse.status}`);
      }
      const geoData = await geoResponse.json();

      if (geoData.status !== 'success') {
        throw new Error('Failed to get location data: ' + geoData.message);
      }

      console.log('Geolocation data:', geoData);

      // Check if location exists
      const { data: existingLocation, error: selectError } = await supabase
        .from('visitor_locations')
        .select('*')
        .eq('country', geoData.country)
        .eq('city', geoData.city)
        .single();

      if (selectError && selectError.code !== 'PGRST116') { // Ignore "no rows returned" error
        throw selectError;
      }

      if (existingLocation) {
        // Update existing location
        const { error: updateError } = await supabase
          .from('visitor_locations')
          .update({ 
            visit_count: existingLocation.visit_count + 1,
            last_visit: new Date().toISOString()
          })
          .eq('id', existingLocation.id);

        if (updateError) throw updateError;
      } else {
        // Insert new location
        const { error: insertError } = await supabase
          .from('visitor_locations')
          .insert([{
            country: geoData.country,
            city: geoData.city,
            latitude: geoData.lat,
            longitude: geoData.lon,
            visit_count: 1
          }]);

        if (insertError) throw insertError;
      }

      return new Response(JSON.stringify({ 
        success: true,
        location: geoData
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (geoError) {
      console.error('Geolocation error:', geoError);
      // Instead of inserting development data, let's try to get location from IP
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (!ipResponse.ok) throw new Error('IP lookup failed');
        
        const ipData = await ipResponse.json();
        const { error: insertError } = await supabase
          .from('visitor_locations')
          .insert([{
            country: ipData.country_name,
            city: ipData.city,
            latitude: ipData.latitude,
            longitude: ipData.longitude,
            visit_count: 1
          }]);

        if (insertError) throw insertError;

        return new Response(JSON.stringify({ 
          success: true,
          location: ipData
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (ipError) {
        console.error('IP lookup error:', ipError);
        // Only use development fallback if both geo and IP lookup fail
        const { error: insertError } = await supabase
          .from('visitor_locations')
          .insert([{
            country: 'Unknown',
            city: 'Unknown',
            latitude: 0,
            longitude: 0,
            visit_count: 1
          }]);

        if (insertError) throw insertError;
      }
    }

  } catch (error) {
    console.error('Error tracking visit:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 