import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const runtime = 'edge';

export async function DELETE(request, { params }) {
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

    // Get the album to find its cover URL
    const { data: album } = await supabase
      .from('albums')
      .select('cover_url')
      .eq('id', params.id)
      .single();

    if (album?.cover_url) {
      // Extract filename from the URL
      const filename = album.cover_url.split('/').pop();
      
      // Delete the cover image from storage
      const { error: storageError } = await supabase
        .storage
        .from('album-covers')
        .remove([filename]);

      if (storageError) throw storageError;
    }

    // Delete the album record
    const { error } = await supabase
      .from('albums')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting album:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 