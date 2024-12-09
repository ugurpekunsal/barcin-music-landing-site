"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslations } from '../../hooks/useTranslations';
import { useEffect } from 'react';

const MapComponent = ({ locations }) => {
  const { t } = useTranslations();
  
  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      // Clean up any existing map instances
      if (typeof window !== 'undefined') {
        const containers = document.querySelectorAll('.leaflet-container');
        containers.forEach(container => {
          if (container._leaflet_id) {
            container._leaflet = null;
            container._leaflet_id = null;
          }
        });
      }
    };
  }, []);

  if (typeof window === 'undefined') return null;

  const customIcon = new L.Icon({
    iconUrl: '/images/leaflet/marker-icon.png',
    shadowUrl: '/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      key={`map-${locations.length}`}
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      minZoom={2}
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker
          key={`${location.latitude}-${location.longitude}-${index}`}
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
  );
};

export default MapComponent; 