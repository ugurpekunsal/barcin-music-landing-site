"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const MapWithNoSSR = dynamic(
  () => import('../map/MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    )
  }
);

export default function VisitorMap() {
  const { t } = useTranslations();
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/api/visitor-locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        
        const data = await response.json();
        setLocations(data);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {t("errorLoadingMap")}
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("whereListenersFrom")}
        </h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-lg">
          {!isLoading && <MapWithNoSSR locations={locations} />}
        </div>
      </div>
    </section>
  );
} 