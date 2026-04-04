'use client';

import { TypingStats, TypingState } from '@/lib/typing-store';
import { cn } from '@/lib/utils';
import { RotateCcw, Share2, Trophy, Target, Gauge, Clock, Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { KeyboardHeatmap } from './keyboard-heatmap';
import { Confetti } from './confetti';
import { useLocaleContext } from '@/components/locale-provider';

interface ResultsProps {
  stats: TypingStats;
  state: TypingState;
  onRestart: () => void;
}

export function Results({ stats, state, onRestart }: ResultsProps) {
  const { t, locale } = useLocaleContext();

  const getWpmRating = (wpm: number) => {
    if (wpm >= 100) return { label: 'Lendário', color: 'text-chart-4', icon: Trophy };
    if (wpm >= 80) return { label: 'Especialista', color: 'text-primary', icon: Sparkles };
    if (wpm >= 60) return { label: 'Avançado', color: 'text-chart-2', icon: Target };
    if (wpm >= 40) return { label: 'Intermediário', color: 'text-foreground', icon: Gauge };
    return { label: 'Iniciante', color: 'text-muted-foreground', icon: Clock };
  };

  const rating = getWpmRating(stats.wpm);
  const RatingIcon = rating.icon;

  const handleShare = async () => {
    const text = `Acabei de digitar ${stats.wpm} PPM com ${stats.accuracy}% de precisão no Velocitytype!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const statItems = [
    {
      label: t('wpm').toUpperCase(),
      value: stats.wpm,
      icon: Gauge,
      color: 'text-primary',
      description: t('wpmFull'),
    },
    {
      label: t('accuracy'),
      value: `${stats.accuracy}%`,
      icon: Target,
      color: stats.accuracy >= 95 ? 'text-correct' : stats.accuracy >= 80 ? 'text-current' : 'text-incorrect',
      description: t('correct'),
    },
    {
      label: t('rawWpm'),
      value: stats.rawWpm,
      icon: Clock,
      color: 'text-muted-foreground',
      description: 'incluindo erros',
    },
    {
      label: t('consistency'),
      value: `${stats.consistency}%`,
      icon: Sparkles,
      color: stats.consistency >= 80 ? 'text-correct' : 'text-current',
      description: 'estabilidade',
    },
  ];

  const showConfetti = stats.wpm >= 60 || stats.accuracy >= 95;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <Confetti isActive={showConfetti} particleCount={showConfetti ? 60 : 0} />

      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-4"
        >
          <RatingIcon className={cn("w-5 h-5", rating.color)} />
          <span className={cn("font-medium", rating.color)}>{rating.label}</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 12 }}
          className="flex items-baseline justify-center gap-2"
        >
          <motion.span 
            className="text-8xl md:text-9xl font-mono font-bold text-primary"
            style={{
              textShadow: '0 0 40px var(--primary), 0 0 80px var(--primary)',
            }}
            animate={{ 
              textShadow: [
                '0 0 40px var(--primary), 0 0 80px var(--primary)',
                '0 0 60px var(--primary), 0 0 120px var(--primary)',
                '0 0 40px var(--primary), 0 0 80px var(--primary)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stats.wpm}
          </motion.span>
          <span className="text-2xl text-muted-foreground font-medium">{t('wpm')}</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border/50 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <item.icon className={cn("w-4 h-4", item.color)} />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
            </div>
            <div className={cn("text-2xl font-mono font-bold", item.color)}>
              {item.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-8 mb-8 text-sm"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-correct" />
          <span className="text-muted-foreground">{t('correct')}:</span>
          <span className="font-mono font-medium text-correct">{stats.correctChars}</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-incorrect" />
          <span className="text-muted-foreground">Erros:</span>
          <span className="font-mono font-medium text-incorrect">{stats.incorrectChars}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{t('time')}:</span>
          <span className="font-mono font-medium">{Math.round(stats.time)}s</span>
        </div>
      </motion.div>

      {state.wpmHistory.length > 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 p-4 rounded-xl bg-card border border-border/50"
        >
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4 text-center">
            {t('wpmOverTime')}
          </div>
          <div className="h-24 flex items-end gap-1">
            {state.wpmHistory.map((wpm, index) => {
              const maxWpm = Math.max(...state.wpmHistory);
              const height = maxWpm > 0 ? (wpm / maxWpm) * 100 : 0;
              
              return (
                <div
                  key={index}
                  className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t"
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${wpm} ${t('wpm').toUpperCase()}`}
                />
              );
            })}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        <KeyboardHeatmap
          errors={state.errors}
          text={state.text}
          userInput={state.userInput}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-4"
      >
        <Button
          onClick={onRestart}
          size="lg"
          className="gap-2 px-8"
        >
          <RotateCcw className="w-4 h-4" />
          {t('tryAgain')}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          {t('share')}
        </Button>
      </motion.div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        Pressione <kbd className="px-2 py-0.5 rounded bg-secondary font-mono text-xs">Tab</kbd> para reiniciar
      </div>
    </motion.div>
  );
}
