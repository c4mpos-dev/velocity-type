'use client';

import { Heart, Keyboard } from 'lucide-react';
import { useLocaleContext } from '@/components/locale-provider';

export function Footer() {
  const { locale } = useLocaleContext();

  return (
    <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" />
            <span className="font-medium">Velocitytype</span>
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
