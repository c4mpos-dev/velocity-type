'use client';

import { Keyboard, Github, Settings, BarChart3, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/components/locale-provider';

interface HeaderProps {
  onShowStats: () => void;
  onShowSettings: () => void;
}

export function Header({ onShowStats, onShowSettings }: HeaderProps) {
  const { locale, toggleLocale, t } = useLocaleContext();

  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
          <Keyboard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            velocity<span className="text-primary">type</span>
          </h1>
          <p className="text-xs text-muted-foreground">test your limits</p>
        </div>
      </div>
      
      <nav className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground gap-1.5 font-medium"
          onClick={toggleLocale}
        >
          <Languages className="w-4 h-4" />
          <span className="uppercase text-xs">{locale}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={onShowStats}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="sr-only">{t('stats')}</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={onShowSettings}
        >
          <Settings className="w-5 h-5" />
          <span className="sr-only">{t('settings')}</span>
        </Button>
      </nav>
    </header>
  );
}
