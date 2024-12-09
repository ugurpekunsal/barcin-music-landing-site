import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ 
        error: 'Valid email is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabase
      .from('email_subscribers')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // unique violation
        return new Response(JSON.stringify({ 
          error: 'This email is already subscribed' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw error;
    }

    return new Response(JSON.stringify({ 
      message: 'Successfully subscribed!' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to subscribe' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 