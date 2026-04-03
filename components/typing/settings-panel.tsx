'use client';

import { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Moon, Sun, Palette, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocaleContext } from '@/components/locale-provider';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { t, locale, setLocale } = useLocaleContext();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [smoothCaret, setSmoothCaret] = useState(true);
  const [showLiveWpm, setShowLiveWpm] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sound = localStorage.getItem('velocitytype-sound') === 'true';
      const caret = localStorage.getItem('velocitytype-smooth-caret') !== 'false';
      const liveWpm = localStorage.getItem('velocitytype-live-wpm') !== 'false';
      
      setSoundEnabled(sound);
      setSmoothCaret(caret);
      setShowLiveWpm(liveWpm);
    }
  }, [isOpen]);

  // Save settings
  const updateSetting = (key: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    localStorage.setItem(`velocitytype-${key}`, String(value));
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50"
          >
            <div className="h-full bg-card border-l border-border shadow-2xl flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{t('settingsTitle')}</h2>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'pt' ? 'Personalize sua experiencia' : 'Customize your experience'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* Language Section */}
                <div className="pb-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Languages className="w-5 h-5 text-muted-foreground" />
                    <div className="font-medium text-foreground">{t('language')}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setLocale('pt')}
                      className={`p-4 rounded-lg text-center transition-all ${
                        locale === 'pt' 
                          ? 'bg-background border-2 border-primary' 
                          : 'bg-secondary/50 border border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🇧🇷</span>
                      <span className={`text-sm font-medium ${locale === 'pt' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Portugues
                      </span>
                    </button>
                    <button 
                      onClick={() => setLocale('en')}
                      className={`p-4 rounded-lg text-center transition-all ${
                        locale === 'en' 
                          ? 'bg-background border-2 border-primary' 
                          : 'bg-secondary/50 border border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">🇺🇸</span>
                      <span className={`text-sm font-medium ${locale === 'en' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        English
                      </span>
                    </button>
                  </div>
                </div>

                {/* Sound */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-medium text-foreground">{t('soundEnabled')}</div>
                      <div className="text-sm text-muted-foreground">{t('soundEnabledDesc')}</div>
                    </div>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={(v) => updateSetting('sound', v, setSoundEnabled)}
                  />
                </div>

                {/* Smooth Caret */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-0.5 h-4 bg-primary rounded-full" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{t('smoothCaret')}</div>
                      <div className="text-sm text-muted-foreground">{t('smoothCaretDesc')}</div>
                    </div>
                  </div>
                  <Switch
                    checked={smoothCaret}
                    onCheckedChange={(v) => updateSetting('smooth-caret', v, setSmoothCaret)}
                  />
                </div>

                {/* Live WPM */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center text-muted-foreground font-mono text-xs font-bold">
                      {locale === 'pt' ? 'PPM' : 'WPM'}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{t('showLiveWpm')}</div>
                      <div className="text-sm text-muted-foreground">{t('showLiveWpmDesc')}</div>
                    </div>
                  </div>
                  <Switch
                    checked={showLiveWpm}
                    onCheckedChange={(v) => updateSetting('live-wpm', v, setShowLiveWpm)}
                  />
                </div>

                {/* Theme Section */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Moon className="w-5 h-5 text-muted-foreground" />
                    <div className="font-medium text-foreground">
                      {locale === 'pt' ? 'Aparencia' : 'Appearance'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-4 rounded-lg bg-background border-2 border-primary text-center">
                      <Moon className="w-5 h-5 mx-auto mb-2 text-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {locale === 'pt' ? 'Escuro' : 'Dark'}
                      </span>
                    </button>
                    <button className="p-4 rounded-lg bg-secondary/50 border border-border text-center opacity-50 cursor-not-allowed">
                      <Sun className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {locale === 'pt' ? 'Claro' : 'Light'}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {locale === 'pt' ? 'Modo claro em breve' : 'Light mode coming soon'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  {locale === 'pt' ? 'Configuracoes salvas localmente' : 'Settings are saved locally'}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
