'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { generateText, WordListType, Locale } from '@/lib/word-lists';
import {
  TypingState,
  TestMode,
  TestDuration,
  TestWordCount,
  createInitialState,
  calculateStats,
  saveResult,
  TypingStats,
} from '@/lib/typing-store';

export function useTypingTest(locale: Locale = 'pt') {
  const [state, setState] = useState<TypingState>(createInitialState);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [stats, setStats] = useState<TypingStats | null>(null);
  
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickRef = useRef<number>(0);
  
  const onKeypressRef = useRef<((isError: boolean) => void) | null>(null);
  const onFinishRef = useRef<(() => void) | null>(null);
  const onTickRef = useRef<(() => void) | null>(null);

  const generateNewText = useCallback((wordList: WordListType, count: number = 200) => {
    return generateText(wordList, count, locale);
  }, [locale]);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current);
      wpmIntervalRef.current = null;
    }
    startTimeRef.current = null;
    lastTickRef.current = 0;
  }, []);

  const resetTest = useCallback(() => {
    cleanup();
    
    setState(prev => ({
      ...createInitialState(),
      mode: prev.mode,
      wordList: prev.wordList,
      duration: prev.duration,
      wordCount: prev.wordCount,
      text: generateNewText(prev.wordList, 200),
    }));
    setTimeLeft(state.duration);
    setStats(null);
  }, [cleanup, generateNewText, state.duration]);

  const setMode = useCallback((mode: TestMode) => {
    cleanup();
    setState(prev => ({
      ...createInitialState(),
      mode,
      wordList: prev.wordList,
      duration: prev.duration,
      wordCount: prev.wordCount,
      text: generateNewText(prev.wordList, 200),
    }));
    setStats(null);
  }, [cleanup, generateNewText]);

  const setWordList = useCallback((wordList: WordListType) => {
    cleanup();
    setState(prev => ({
      ...createInitialState(),
      mode: prev.mode,
      wordList,
      duration: prev.duration,
      wordCount: prev.wordCount,
      text: generateNewText(wordList, 200),
    }));
    setStats(null);
  }, [cleanup, generateNewText]);

  const setDuration = useCallback((duration: TestDuration) => {
    setState(prev => ({
      ...prev,
      duration,
    }));
    setTimeLeft(duration);
  }, []);

  const setWordCount = useCallback((wordCount: TestWordCount) => {
    cleanup();
    setState(prev => ({
      ...createInitialState(),
      mode: prev.mode,
      wordList: prev.wordList,
      duration: prev.duration,
      wordCount,
      text: generateNewText(prev.wordList, 200),
    }));
    setStats(null);
  }, [cleanup, generateNewText]);

  const finishTest = useCallback(() => {
    cleanup();
    
    setState(prev => {
      if (prev.isFinished) return prev;
      
      const endTime = Date.now();
      const newState = { ...prev, isFinished: true, endTime };
      const finalStats = calculateStats(newState);
      
      saveResult({
        ...finalStats,
        date: new Date(),
        mode: prev.mode,
        wordList: prev.wordList,
        duration: prev.duration,
      });
      
      setStats(finalStats);
      onFinishRef.current?.();
      
      return newState;
    });
  }, [cleanup]);

  const startTimer = useCallback((duration: number) => {
    startTimeRef.current = performance.now();
    lastTickRef.current = duration;
    
    const tick = (currentTime: number) => {
      if (!startTimeRef.current) return;
      
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const remainingSeconds = Math.ceil(remaining);
      
      setTimeLeft(remainingSeconds);
      
      if (remainingSeconds !== lastTickRef.current && remainingSeconds > 0 && remainingSeconds <= 5) {
        onTickRef.current?.();
        lastTickRef.current = remainingSeconds;
      }
      
      if (remaining <= 0) {
        finishTest();
        return;
      }
      
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [finishTest]);

  const handleInput = useCallback((char: string) => {
    setState(prev => {
      if (prev.isFinished) return prev;

      if (!prev.isStarted) {
        const startTime = Date.now();
        
        if (prev.mode === 'time') {
          setTimeLeft(prev.duration);
          startTimer(prev.duration);
        }
        
        wpmIntervalRef.current = setInterval(() => {
          setState(current => {
            if (current.isFinished || !current.isStarted) return current;
            const currentStats = calculateStats(current);
            return {
              ...current,
              wpmHistory: [...current.wpmHistory, currentStats.wpm],
              rawWpmHistory: [...current.rawWpmHistory, currentStats.rawWpm],
            };
          });
        }, 1000);
        
        const isError = char !== prev.text[0];
        onKeypressRef.current?.(isError);
        
        return {
          ...prev,
          isStarted: true,
          startTime,
          userInput: char,
          currentIndex: 1,
          errors: isError ? new Set([0]) : new Set(),
        };
      }

      const newIndex = prev.currentIndex;
      const expectedChar = prev.text[newIndex];
      const newErrors = new Set(prev.errors);
      const isError = char !== expectedChar;
      
      if (isError) {
        newErrors.add(newIndex);
      }
      
      onKeypressRef.current?.(isError);

      const newUserInput = prev.userInput + char;
      
      if (newIndex >= prev.text.length - 1) {
        setTimeout(() => finishTest(), 0);
      }

      return {
        ...prev,
        userInput: newUserInput,
        currentIndex: newIndex + 1,
        errors: newErrors,
      };
    });
  }, [finishTest, startTimer]);

  const handleBackspace = useCallback(() => {
    setState(prev => {
      if (prev.isFinished || prev.currentIndex === 0) return prev;

      const newIndex = Math.max(0, prev.currentIndex - 1);
      const newErrors = new Set(prev.errors);
      newErrors.delete(newIndex);
      
      return {
        ...prev,
        userInput: prev.userInput.slice(0, -1),
        currentIndex: newIndex,
        errors: newErrors,
      };
    });
  }, []);

  const setSoundCallbacks = useCallback((callbacks: {
    onKeypress?: (isError: boolean) => void;
    onFinish?: () => void;
    onTick?: () => void;
  }) => {
    onKeypressRef.current = callbacks.onKeypress || null;
    onFinishRef.current = callbacks.onFinish || null;
    onTickRef.current = callbacks.onTick || null;
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (!state.isStarted) {
      setState(prev => ({
        ...prev,
        text: generateNewText(prev.wordList, 200),
      }));
    }
  }, [locale, generateNewText, state.isStarted]);

  const liveStats = state.isStarted ? calculateStats(state) : null;

  return {
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
    finishTest,
    setSoundCallbacks,
  };
}
