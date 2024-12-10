"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import Map from './Map';

export default function SpotifyStats({ showMap = false }) {
  const { t } = useTranslations();
  const [locations, setLocations] = useState([]);
  const [stats, setStats] = useState({
    totalListeners: 0,
    totalCountries: 0,
    totalCities: 0,
    spotifyMarkets: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!showMap) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/visitor-locations');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        
        if (data.error) throw new Error(data.error);
        
        // Set locations and stats from the response
        setLocations(data.locations || []);
        setStats({
          totalListeners: data.stats?.totalListeners || 0,
          totalCountries: data.stats?.totalCountries || 0,
          totalCities: data.stats?.totalCities || 0,
          spotifyMarkets: data.stats?.spotifyMarkets || 0
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [showMap]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        {t("errorLoadingMap")}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mt-16 pt-16 border-t border-purple-200">
      <h2 className="section-heading">{t("whereListenersFrom")}</h2>
      {showMap && (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">
                  {stats.totalListeners.toLocaleString()}
                </h3>
                <p className="text-gray-600">{t("monthlyListeners")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">
                  {stats.totalCountries.toLocaleString()}
                </h3>
                <p className="text-gray-600">{t("countriesReached")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-2">
                  {stats.spotifyMarkets.toLocaleString()}
                </h3>
                <p className="text-gray-600">{t("spotifyMarkets")}</p>
              </div>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg bg-white">
              <Map locations={locations} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            <span className="inline-block px-2 py-1 mr-4">
              <span className="inline-block w-3 h-3 rounded-full bg-[#1DB954] mr-2"></span>
              {t("spotifyListeners")}
            </span>
            <span className="inline-block px-2 py-1">
              <span className="inline-block w-3 h-3 rounded-full bg-[#7c3aed] mr-2"></span>
              {t("websiteVisitors")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 