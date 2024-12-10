import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  
  try {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .order('release_date', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      data: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
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

    const formData = await request.formData();
    const title = formData.get('title');
    const spotifyLink = formData.get('spotify_link');
    const coverFile = formData.get('cover');
    const isLatest = formData.get('is_latest') === 'true';

    if (!title || !spotifyLink || !coverFile) {
      throw new Error('Missing required fields');
    }

    // If this album will be latest, unset any existing latest album
    if (isLatest) {
      await supabase
        .from('albums')
        .update({ is_latest: false })
        .eq('is_latest', true);
    }

    // Upload cover to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('album-covers')
      .upload(`${Date.now()}-${coverFile.name}`, coverFile);

    if (uploadError) throw uploadError;

    // Get public URL for the uploaded file
    const { data: { publicUrl } } = supabase
      .storage
      .from('album-covers')
      .getPublicUrl(uploadData.path);

    // Insert album data
    const { data, error } = await supabase
      .from('albums')
      .insert([
        { 
          title,
          spotify_link: spotifyLink,
          cover_url: publicUrl,
          is_latest: isLatest
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating album:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 