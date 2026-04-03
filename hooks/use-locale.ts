'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale, translations, TranslationKey } from '@/lib/i18n';

const LOCALE_KEY = 'velocitytype-locale';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_KEY, newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === 'pt' ? 'en' : 'pt';
    setLocale(newLocale);
  }, [locale, setLocale]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key;
  }, [locale]);

  return {
    locale,
    setLocale,
    toggleLocale,
    t,
    mounted
  };
}
