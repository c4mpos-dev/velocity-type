'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Locale, translations, TranslationKey } from '@/lib/i18n';

const LOCALE_KEY = 'velocitytype-locale';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale] = useState<Locale>('pt');

  const setLocale = useCallback(() => {
  }, []);

  const toggleLocale = useCallback(() => {
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    return translations.pt[key] || key;
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}


export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}
