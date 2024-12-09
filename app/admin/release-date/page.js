"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminLayout from "../../components/layout/AdminLayout";

export default function ReleaseDateAdmin() {
  const [releaseDate, setReleaseDate] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchReleaseDate();
  }, []);

  async function fetchReleaseDate() {
    try {
      const response = await fetch("/api/release-date");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReleaseDate(data);
      if (data?.date) {
        setNewDate(new Date(data.date).toISOString().slice(0, 16));
      }
    } catch (err) {
      setError('Failed to fetch release date: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateReleaseDate(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    setIsSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`/api/release-date`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ date: new Date(newDate).toISOString() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      await fetchReleaseDate();
      setSuccessMessage('Release date updated successfully!');
    } catch (err) {
      setError('Failed to update release date: ' + err.message);
      console.error('Update error:', err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Manage Next Release Date</h1>
        
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Current Release Date:</h3>
              <p className="text-lg">
                {releaseDate?.date 
                  ? new Date(releaseDate.date).toLocaleString()
                  : 'No date set'}
              </p>
            </div>

            <form onSubmit={handleUpdateReleaseDate} className="space-y-4">
              <div>
                <label htmlFor="newDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Set New Release Date
                </label>
                <input
                  id="newDate"
                  type="datetime-local"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Updating...' : 'Update Release Date'}
              </button>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 