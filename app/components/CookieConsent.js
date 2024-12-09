"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

export default function CookieConsent() {
  const { t } = useTranslations();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            {t("cookieConsentText")}
            <a 
              href="/privacy-policy" 
              className="underline hover:text-purple-300 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("privacyPolicy")}
            </a>.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {t("accept")}
          </button>
          <a 
            href="/privacy-policy"
            className="text-gray-300 hover:text-white px-6 py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("learnMore")}
          </a>
        </div>
      </div>
    </div>
  );
} 