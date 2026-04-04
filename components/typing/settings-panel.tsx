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

  const updateSetting = (key: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    localStorage.setItem(`velocitytype-${key}`, String(value));
  };
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50"
          >
            <div className="h-full bg-card border-l border-border shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{t('settingsTitle')}</h2>
                    <p className="text-sm text-muted-foreground">
                      Personalize sua experiência
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-auto p-6 space-y-6">

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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      PPM
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


              </div>

              <div className="p-6 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Configurações salvas localmente
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
