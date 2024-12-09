"use client";

import { TranslationsProvider } from '../../hooks/useTranslations';
import CookieConsent from '../CookieConsent';

export default function ClientProviders({ children }) {
  return (
    <TranslationsProvider>
      {children}
      <CookieConsent />
    </TranslationsProvider>
  );
} 