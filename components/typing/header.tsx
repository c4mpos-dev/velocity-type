'use client';

import { Settings, Trophy, LogIn } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLocaleContext } from '@/components/locale-provider';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onShowSettings?: () => void;
  user: any;
}

export function Header({ onShowSettings, user }: HeaderProps) {
  const { locale, toggleLocale, t } = useLocaleContext();

  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="flex items-center justify-center w-10 h-10">
          <Image src="/favicon.png" alt="VelocityType" width={40} height={40} className="rounded-xl" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
            velocity<span className="text-primary">type</span>
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">test your limits</p>
        </div>
      </Link>
      
      <nav className="flex items-center gap-1 sm:gap-2">
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground hidden sm:flex"
          asChild
        >
          <Link href="/leaderboard">
            <Trophy className="w-4 h-4" />
            <span className="sr-only">Leaderboard</span>
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={onShowSettings}
          disabled={!onShowSettings}
        >
          <Settings className={cn("w-5 h-5", !onShowSettings && "opacity-20")} />
          <span className="sr-only">{t('settings')}</span>
        </Button>

        <div className="w-px h-4 bg-border/50 mx-1 hidden sm:block" />

        {user ? (
          <UserNav user={user} />
        ) : (
          <Button variant="outline" size="sm" className="h-8 gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10" asChild>
            <Link href="/login">
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
