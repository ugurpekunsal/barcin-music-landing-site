"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminLayout from "../../components/layout/AdminLayout";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function SubscribersAdmin() {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSessionAndFetch = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session) throw new Error('No active session');

        await fetchSubscribers();
      } catch (err) {
        console.error('Session or fetch error:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    checkSessionAndFetch();
  }, []);

  async function fetchSubscribers() {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('email_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubscribers(data || []);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleSubscription(id, currentStatus) {
    try {
      setError(null);
      const { error } = await supabase
        .from('email_subscribers')
        .update({ subscribed: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      await fetchSubscribers();
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError('Failed to update subscription status: ' + err.message);
    }
  }

  return (
    <AdminLayout>
      <ErrorBoundary>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Email Subscribers</h1>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            </div>
          ) : subscribers.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No subscribers yet
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscribed Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{subscriber.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(subscriber.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            subscriber.subscribed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.subscribed ? 'Subscribed' : 'Unsubscribed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => toggleSubscription(subscriber.id, subscriber.subscribed)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            {subscriber.subscribed ? 'Unsubscribe' : 'Resubscribe'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </AdminLayout>
  );
} 