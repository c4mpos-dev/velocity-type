'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { TypingState, TypingStats } from '@/lib/typing-store';
import { RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocaleContext } from '@/components/locale-provider';

interface TypingAreaProps {
  state: TypingState;
  timeLeft: number;
  liveStats: TypingStats | null;
  showLiveWpm: boolean;
  smoothCaret: boolean;
  onInput: (char: string) => void;
  onBackspace: () => void;
  onReset: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  isError: boolean;
}

export function TypingArea({
  state,
  timeLeft,
  liveStats,
  showLiveWpm,
  smoothCaret,
  onInput,
  onBackspace,
  onReset,
}: TypingAreaProps) {
  const { t, locale } = useLocaleContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [shake, setShake] = useState(false);
  const [lastError, setLastError] = useState<number | null>(null);
  const rippleIdRef = useRef(0);

  // Focus handler
  const handleFocus = useCallback(() => {
    containerRef.current?.focus();
  }, []);

  // Auto-focus on mount and after reset
  useEffect(() => {
    handleFocus();
  }, [handleFocus, state.text]);

  // Add ripple effect
  const addRipple = useCallback((isError: boolean) => {
    if (!caretRef.current) return;
    
    const rect = caretRef.current.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    const ripple: Ripple = {
      id: rippleIdRef.current++,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
      isError,
    };
    
    setRipples(prev => [...prev, ripple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);
  }, []);

  // Shake on error
  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 200);
  }, []);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isFinished) return;
      
      // Ignore modifier keys
      if (e.ctrlKey || e.metaKey || e.altKey) {
        if (e.key === 'Tab') {
          e.preventDefault();
          onReset();
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        onReset();
        return;
      }

      // Only handle printable characters
      if (e.key.length === 1) {
        e.preventDefault();
        
        // Check if this will be an error
        const expectedChar = state.text[state.currentIndex];
        const isError = e.key !== expectedChar;
        
        if (isError) {
          triggerShake();
          setLastError(state.currentIndex);
        }
        
        addRipple(isError);
        onInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isFinished, state.text, state.currentIndex, onInput, onBackspace, onReset, addRipple, triggerShake]);

  // Scroll caret into view
  useEffect(() => {
    if (caretRef.current && textContainerRef.current) {
      const caretRect = caretRef.current.getBoundingClientRect();
      const containerRect = textContainerRef.current.getBoundingClientRect();
      
      // Check if caret is outside visible area
      if (caretRect.top < containerRect.top || caretRect.bottom > containerRect.bottom) {
        caretRef.current.scrollIntoView({ 
          behavior: smoothCaret ? 'smooth' : 'auto', 
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [state.currentIndex, smoothCaret]);

  // Split text into characters for rendering
  const renderText = () => {
    const chars = state.text.split('');
    
    return chars.map((char, index) => {
      const isTyped = index < state.currentIndex;
      const isCurrent = index === state.currentIndex;
      const isError = state.errors.has(index);
      const userChar = state.userInput[index];
      const isRecentError = lastError === index;
      
      let charClassName = 'relative inline-block transition-all ';
      
      if (smoothCaret) {
        charClassName += 'duration-100 ';
      } else {
        charClassName += 'duration-0 ';
      }
      
      if (isTyped) {
        if (isError) {
          charClassName += 'text-incorrect';
        } else {
          charClassName += 'text-correct';
        }
      } else if (isCurrent) {
        charClassName += 'text-foreground';
      } else {
        charClassName += 'text-pending';
      }

      return (
        <span 
          key={index} 
          className={cn(
            charClassName,
            isRecentError && 'animate-pulse'
          )}
        >
          {isCurrent && (
            <motion.span 
              ref={caretRef}
              layoutId={smoothCaret ? 'caret' : undefined}
              className="absolute left-0 top-0 w-[3px] h-full bg-primary rounded-full"
              initial={smoothCaret ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={smoothCaret ? { 
                type: 'spring', 
                stiffness: 500, 
                damping: 30 
              } : { duration: 0 }}
              style={{
                boxShadow: '0 0 8px var(--primary), 0 0 16px var(--primary)',
              }}
            />
          )}
          {char === ' ' ? '\u00A0' : char}
          {isError && userChar && (
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-incorrect rounded-full origin-left" 
            />
          )}
        </span>
      );
    });
  };

  // Timer warning state
  const isTimerWarning = state.mode === 'time' && timeLeft <= 10 && timeLeft > 0;
  const isTimerCritical = state.mode === 'time' && timeLeft <= 5 && timeLeft > 0;

  return (
    <div className="relative">
      {/* Live Stats Bar */}
      <div className="flex items-center justify-center gap-8 mb-6">
        {state.mode === 'time' && (
          <motion.div 
            className="text-center"
            animate={isTimerCritical ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: isTimerCritical ? Infinity : 0 }}
          >
            <motion.div 
              className={cn(
                "text-5xl font-mono font-bold transition-colors tabular-nums",
                isTimerCritical ? "text-destructive" : 
                isTimerWarning ? "text-current" : "text-primary"
              )}
              key={timeLeft}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {timeLeft}
            </motion.div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              segundos
            </div>
          </motion.div>
        )}
        
        {state.isStarted && liveStats && showLiveWpm && (
          <>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div 
                className="text-3xl font-mono font-bold text-foreground tabular-nums"
                key={liveStats.wpm}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {liveStats.wpm}
              </motion.div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {t('wpm')}
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={cn(
                "text-3xl font-mono font-bold tabular-nums",
                liveStats.accuracy >= 95 ? "text-correct" : 
                liveStats.accuracy >= 80 ? "text-current" : "text-incorrect"
              )}>
                {liveStats.accuracy}%
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {t('accuracy')}
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Typing Area */}
      <motion.div 
        ref={containerRef}
        tabIndex={0}
        onClick={handleFocus}
        animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative p-8 rounded-2xl bg-card/50 border border-border/50 cursor-text overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
          "transition-all duration-300",
          !state.isStarted && "hover:border-primary/30",
          isTimerCritical && "border-destructive/50 ring-2 ring-destructive/20"
        )}
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={cn(
                "absolute w-8 h-8 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2",
                ripple.isError ? "bg-destructive/30" : "bg-primary/20"
              )}
              style={{ left: ripple.x, top: ripple.y }}
            />
          ))}
        </AnimatePresence>

        {/* Click to focus overlay */}
        <AnimatePresence>
          {!state.isStarted && !state.isFinished && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl z-10 pointer-events-none"
            >
              <motion.p 
                className="text-muted-foreground text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('clickToStart')}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Display */}
        <div 
          ref={textContainerRef}
          className="font-mono text-xl md:text-2xl leading-[2] max-h-[200px] overflow-hidden relative"
        >
          <div className="break-all">
            {renderText()}
          </div>
          
          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
        </div>


      </motion.div>

      {/* Reset Hint */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar teste</span>
          <kbd className="px-2 py-0.5 rounded bg-secondary text-xs font-mono">Tab</kbd>
        </button>
      </motion.div>
    </div>
  );
}
