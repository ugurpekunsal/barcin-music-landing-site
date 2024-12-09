import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data, error } = await supabase
      .from('release_dates')
      .select('*')
      .order('date', { ascending: true })
      .limit(1);

    if (error) throw error;

    return new Response(JSON.stringify(data?.[0] || null), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching release date:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return new Response(JSON.stringify({ 
        error: 'Authentication required' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    
    // Delete existing records
    const { error: deleteError } = await supabase
      .from('release_dates')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
      
    if (deleteError) throw deleteError;

    // Insert new record
    const { data, error: insertError } = await supabase
      .from('release_dates')
      .insert([{ date: body.date }])
      .select()
      .single();

    if (insertError) throw insertError;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating release date:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to update release date' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 