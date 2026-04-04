'use client';

import { useState, useEffect } from 'react';
import { useTypingTest } from '@/hooks/use-typing-test';
import { useSound } from '@/hooks/use-sound';
import { useLocaleContext } from '@/components/locale-provider';
import { Header } from './header';
import { ModeSelector } from './mode-selector';
import { TypingArea } from './typing-area';
import { Results } from './results';
import { SettingsPanel } from './settings-panel';
import { Footer } from './footer';
import { motion } from 'framer-motion';
import { getUser, saveScore } from '@/lib/supabase/actions';
import { toast } from 'sonner';

interface TypingTestProps {
  initialUser?: any;
}

export function TypingTest({ initialUser }: TypingTestProps) {
  const [user, setUser] = useState<any>(initialUser);
  const [showSettings, setShowSettings] = useState(false);
  const [showLiveWpm, setShowLiveWpm] = useState(true);
  const [smoothCaret, setSmoothCaret] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  
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

  useEffect(() => {
    const init = async () => {
      const userData = await getUser();
      setUser(userData);
      
      if (typeof window !== 'undefined') {
        const liveWpm = localStorage.getItem('velocitytype-live-wpm') !== 'false';
        const caret = localStorage.getItem('velocitytype-smooth-caret') !== 'false';
        setShowLiveWpm(liveWpm);
        setSmoothCaret(caret);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (state.isFinished && stats && user && !isSaving && !hasSaved) {
      const handleSave = async () => {
        setIsSaving(true);
        setHasSaved(true);
        const result = await saveScore({
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          rawWpm: stats.rawWpm,
          consistency: stats.consistency,
          mode: state.mode,
          modeValue: state.mode === 'time' ? state.duration : state.wordCount,
          wordList: state.wordList,
        });
        
        if (result.success) {
          toast.success('Pontuação salva no ranking!');
        } else {
          toast.error('Erro ao salvar pontuação: ' + result.error);
          setHasSaved(false);
        }
        setIsSaving(false);
      };
      handleSave();
    }
  }, [state.isFinished, stats, user, state.mode, state.duration, state.wordCount, state.wordList, isSaving, hasSaved]);

  useEffect(() => {
    if (!state.isStarted && !state.isFinished) {
      setIsSaving(false);
      setHasSaved(false);
    }
  }, [state.isStarted, state.isFinished]);

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
          onShowSettings={() => setShowSettings(true)}
          user={user}
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



      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

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
