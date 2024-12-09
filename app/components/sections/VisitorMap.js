"use client";

import { useState, useEffect, useMemo } from 'react';
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
  const [customIcon, setCustomIcon] = useState(null);
  const supabase = createClientComponentClient();

  // Initialize Leaflet icon on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        const icon = L.divIcon({
          html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7C3AED" width="24" height="24">
            <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"/>
          </svg>`,
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24],
        });
        setCustomIcon(icon);
      });
    }
  }, []);

  useEffect(() => {
    // Track visit
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
          {typeof window !== 'undefined' && (
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
                  icon={customIcon}
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
          )}
        </div>
      </div>
    </section>
  );
} 