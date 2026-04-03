'use client';

import { useEffect, useState } from 'react';
import { X, Trophy, Target, Gauge, Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getHistory,
  getBestWpm,
  getAverageWpm,
  getAverageAccuracy,
  getTestsCompleted,
  TestResult,
} from '@/lib/typing-store';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocaleContext } from '@/components/locale-provider';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const { t, locale } = useLocaleContext();
  const [history, setHistory] = useState<TestResult[]>([]);
  const [bestWpm, setBestWpm] = useState(0);
  const [avgWpm, setAvgWpm] = useState(0);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [testsCompleted, setTestsCompleted] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
      setBestWpm(getBestWpm());
      setAvgWpm(getAverageWpm());
      setAvgAccuracy(getAverageAccuracy());
      setTestsCompleted(getTestsCompleted());
    }
  }, [isOpen]);

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

  const statCards = [
    { label: t('bestWpm'), value: bestWpm, icon: Trophy, color: 'text-chart-4' },
    { label: t('avgWpm'), value: avgWpm, icon: TrendingUp, color: 'text-primary' },
    { label: t('avgAccuracy'), value: `${avgAccuracy}%`, icon: Target, color: 'text-chart-2' },
    { label: t('testsCompleted'), value: testsCompleted, icon: BarChart3, color: 'text-foreground' },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-auto z-50 p-6"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{t('yourStats')}</h2>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'pt' ? 'Sua jornada de digitacao' : 'Your typing journey'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                {testsCompleted === 0 ? (
                  <div className="text-center py-12">
                    <Gauge className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">{t('noTests')}</h3>
                    <p className="text-muted-foreground">
                      {t('startTyping')}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {statCards.map((stat) => (
                        <div
                          key={stat.label}
                          className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-center"
                        >
                          <stat.icon className={cn("w-5 h-5 mx-auto mb-2", stat.color)} />
                          <div className={cn("text-2xl font-mono font-bold", stat.color)}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Tests */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                        {t('recentTests')}
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-auto">
                        {history.slice(0, 20).map((result, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-mono font-bold text-primary">
                                {result.wpm}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-foreground">{result.accuracy}% {t('accuracy')}</span>
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-muted-foreground capitalize">{result.mode}</span>
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(result.date)}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {result.wordList}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
