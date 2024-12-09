import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data, error } = await supabase
      .from('visitor_locations')
      .select('*')
      .order('visit_count', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching visitor locations:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      data: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 