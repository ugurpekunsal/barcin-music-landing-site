"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminLayout from "../../components/layout/AdminLayout";
import Image from "next/image";

export default function AlbumsAdmin() {
  const [albums, setAlbums] = useState([]);
  const [title, setTitle] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    try {
      const response = await fetch('/api/albums');
      if (!response.ok) throw new Error('Failed to fetch albums');
      const data = await response.json();
      setAlbums(data);
    } catch (err) {
      setError('Failed to fetch albums: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('spotify_link', spotifyLink);
      formData.append('cover', coverFile);

      const response = await fetch('/api/albums', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to create album');

      await fetchAlbums();
      setSuccess('Album created successfully!');
      setTitle("");
      setSpotifyLink("");
      setCoverFile(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(albumId) {
    if (!confirm('Are you sure you want to delete this album?')) return;

    try {
      const response = await fetch(`/api/albums/${albumId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete album');
      }

      await fetchAlbums();
      setSuccess('Album deleted successfully!');
    } catch (err) {
      setError('Failed to delete album: ' + err.message);
    }
  }

  async function handleSetLatest(albumId) {
    try {
      const response = await fetch(`/api/albums/${albumId}/latest`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update latest album');
      }

      await fetchAlbums();
      setSuccess('Latest album updated successfully!');
    } catch (err) {
      setError('Failed to update latest album: ' + err.message);
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Albums</h1>
        
        {/* Add New Album Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Album</h2>
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Album Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Spotify Link
              </label>
              <input
                type="url"
                value={spotifyLink}
                onChange={(e) => setSpotifyLink(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files[0])}
                className="mt-1 block w-full"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            {success && (
              <div className="text-green-600 text-sm">{success}</div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {isSaving ? "Creating..." : "Create Album"}
            </button>
          </form>
        </div>

        {/* Albums List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Albums</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <div key={album.id} className="border rounded-lg p-4">
                  <div className="relative">
                    <Image
                      src={album.cover_url}
                      alt={album.title}
                      width={200}
                      height={200}
                      className="rounded-lg mb-2"
                    />
                    {album.is_latest && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        Latest Release
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold">{album.title}</h3>
                  <a 
                    href={album.spotify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                    View on Spotify
                  </a>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleSetLatest(album.id)}
                      className={`text-sm px-2 py-1 rounded ${
                        album.is_latest 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {album.is_latest ? 'Latest Release' : 'Set as Latest'}
                    </button>
                    <button
                      onClick={() => handleDelete(album.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 