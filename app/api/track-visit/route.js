import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { geocode, reverseGeocode } from '../../utils/geocoding';

export const runtime = 'edge';

export async function POST(request) {
  const cookieStore = cookies();
  const hasConsent = cookieStore.get('cookieConsent');

  if (!hasConsent?.value) {
    return new Response(JSON.stringify({ 
      success: false,
      message: 'User consent required'
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    // Get IP from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded 
      ? forwarded.split(', ')[0] 
      : request.headers.get("x-real-ip");
    
    if (!ip) {
      throw new Error('No IP address found');
    }

    // Try IP geolocation first
    const ipResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!ipResponse.ok) throw new Error('IP lookup failed');
    
    const ipData = await ipResponse.json();
    
    // Check if location exists
    const { data: existingLocation, error: selectError } = await supabase
      .from('visitor_locations')
      .select('*')
      .eq('country', ipData.country_name)
      .eq('city', ipData.city)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
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
          country: ipData.country_name,
          city: ipData.city,
          latitude: ipData.latitude,
          longitude: ipData.longitude,
          visit_count: 1
        }]);

      if (insertError) throw insertError;
    }

    return new Response(JSON.stringify({ 
      success: true,
      location: ipData
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

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