"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
    </div>
  )
});

const MapComponent = ({ locations }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  const globeData = useMemo(() => 
    locations.map(location => ({
      lat: location.latitude,
      lng: location.longitude,
      size: Math.max(Math.log(location.visit_count + 1) * 0.8, 0.5),
      color: location.type === 'spotify' ? '#1DB954' : '#7c3aed',
      label: `${location.city}, ${location.country} (${location.visit_count.toLocaleString()} ${location.type === 'spotify' ? 'listeners' : 'visits'})`
    })), 
    [locations]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="h-full w-full">
      <Globe
        globeImageUrl="/images/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        pointsData={globeData}
        pointAltitude={0.1}
        pointRadius="size"
        pointColor="color"
        pointLabel="label"
        atmosphereColor="#7c3aed"
        atmosphereAltitude={0.25}
        pointsMerge={false}
        animateIn={true}
        pointResolution={3}
        globeScale={1.2}
        pointLat="lat"
        pointLng="lng"
        height={400}
        width={600}
      />
    </div>
  );
};

export default MapComponent;