'use client';

import { useState, useEffect } from 'react';
import { useTypingTest } from '@/hooks/use-typing-test';
import { useSound } from '@/hooks/use-sound';
import { useLocaleContext } from '@/components/locale-provider';
import { Header } from './header';
import { ModeSelector } from './mode-selector';
import { TypingArea } from './typing-area';
import { Results } from './results';
import { StatsModal } from './stats-modal';
import { SettingsPanel } from './settings-panel';
import { Footer } from './footer';
import { motion } from 'framer-motion';

export function TypingTest() {
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLiveWpm, setShowLiveWpm] = useState(true);
  const [smoothCaret, setSmoothCaret] = useState(true);
  
  const { locale } = useLocaleContext();
  const { playKeySound, playErrorSound, playFinishSound, playTickSound } = useSound();
  
  const {
    state,
    timeLeft,
    stats,
    liveStats,
    resetTest,
    setMode,
    setWordList,
    setDuration,
    setWordCount,
    handleInput,
    handleBackspace,
    setSoundCallbacks,
  } = useTypingTest(locale);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const liveWpm = localStorage.getItem('velocitytype-live-wpm') !== 'false';
      const caret = localStorage.getItem('velocitytype-smooth-caret') !== 'false';
      setShowLiveWpm(liveWpm);
      setSmoothCaret(caret);
    }
  }, []);

  // Listen for settings changes
  useEffect(() => {
    const handleStorage = () => {
      const liveWpm = localStorage.getItem('velocitytype-live-wpm') !== 'false';
      const caret = localStorage.getItem('velocitytype-smooth-caret') !== 'false';
      setShowLiveWpm(liveWpm);
      setSmoothCaret(caret);
    };
    
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Set up sound callbacks
  useEffect(() => {
    setSoundCallbacks({
      onKeypress: (isError) => {
        if (isError) {
          playErrorSound();
        } else {
          playKeySound();
        }
      },
      onFinish: playFinishSound,
      onTick: playTickSound,
    });
  }, [setSoundCallbacks, playKeySound, playErrorSound, playFinishSound, playTickSound]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 container max-w-4xl mx-auto px-4">
        <Header 
          onShowStats={() => setShowStats(true)} 
          onShowSettings={() => setShowSettings(true)}
        />
        
        <main className="py-8">
          {!state.isFinished ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModeSelector
                mode={state.mode}
                wordList={state.wordList}
                duration={state.duration}
                wordCount={state.wordCount}
                onModeChange={setMode}
                onWordListChange={setWordList}
                onDurationChange={setDuration}
                onWordCountChange={setWordCount}
                disabled={state.isStarted}
              />
              
              <TypingArea
                state={state}
                timeLeft={timeLeft}
                liveStats={liveStats}
                showLiveWpm={showLiveWpm}
                smoothCaret={smoothCaret}
                onInput={handleInput}
                onBackspace={handleBackspace}
                onReset={resetTest}
              />
            </motion.div>
          ) : stats ? (
            <Results
              stats={stats}
              state={state}
              onRestart={resetTest}
            />
          ) : null}
        </main>
        
        <Footer />
      </div>

      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
    </div>
  );
}
