'use client';

import { Heart, Keyboard, Zap } from 'lucide-react';
import { useLocaleContext } from '@/components/locale-provider';

export function Footer() {
  const { locale } = useLocaleContext();

  return (
    <footer className="py-8 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" />
            <span>Velocitytype</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-1.5">
            <span>{locale === 'pt' ? 'Feito com' : 'Made with'}</span>
            <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <span>{locale === 'pt' ? 'Atalhos de teclado disponiveis' : 'Keyboard shortcuts available'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono">Tab</kbd>
          {locale === 'pt' ? 'reiniciar' : 'restart'}
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono">Esc</kbd>
          {locale === 'pt' ? 'fechar modal' : 'close modal'}
        </span>
      </div>
    </footer>
  );
}
