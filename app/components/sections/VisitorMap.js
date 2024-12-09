"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dynamic from 'next/dynamic';
import { useTranslations } from "../../hooks/useTranslations";

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export default function VisitorMap() {
  const { t } = useTranslations();
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Track visit with better error handling
    fetch('/api/track-visit', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    })
    .then(data => console.log('Visit tracked:', data))
    .catch(error => console.error('Error tracking visit:', error));

    // Fetch locations
    async function fetchLocations() {
      try {
        const { data, error } = await supabase
          .from('visitor_locations')
          .select('*')
          .order('visit_count', { ascending: false });

        if (error) throw error;
        setLocations(data || []);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLocations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

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
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <div className="text-center">
                    <strong>{location.city}, {location.country}</strong>
                    <br />
                    {t("visits")}: {location.visit_count}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
} 