'use client';

import { Heart, Keyboard } from 'lucide-react';
import { useLocaleContext } from '@/components/locale-provider';

export function Footer() {
  const { locale } = useLocaleContext();

  return (
    <footer className="py-8 mt-auto">
      <div className="flex justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" />
            <span>Velocitytype</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
          </div>
        </div>
      </div>
    </footer>
  );
}
