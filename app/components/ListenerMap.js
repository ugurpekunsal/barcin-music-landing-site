"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from '../hooks/useTranslations';

// Dynamically import the map component with ssr disabled
const Map = dynamic(
  () => import('./Map'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    )
  }
);

export default function ListenerMap({ locations }) {
  const { t } = useTranslations();

  return (
    <div className="mt-12">
      <h4 className="text-xl font-semibold text-center mb-6">
        {t("whereListenersFrom")}
      </h4>
      <Map locations={locations} />
    </div>
  );
} 