'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

type SoundType = 'key' | 'error' | 'finish' | 'tick';

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const enabled = localStorage.getItem('velocitytype-sound') === 'true';
      setIsEnabled(enabled);
    }
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const enabled = localStorage.getItem('velocitytype-sound') === 'true';
      setIsEnabled(enabled);
    };
    
    window.addEventListener('storage', handleStorage);
    
    const interval = setInterval(handleStorage, 500);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!isEnabled) return;
    
    try {
      const ctx = getAudioContext();
      
      switch (type) {
        case 'key': {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
          const noiseData = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * 0.3;
          }
          
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = noiseBuffer;
          
          const noiseGain = ctx.createGain();
          noiseSource.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          
          noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
          
          noiseSource.start(ctx.currentTime);
          noiseSource.stop(ctx.currentTime + 0.02);
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(2000, ctx.currentTime);
          
          const baseFreq = 1200 + Math.random() * 400;
          oscillator.frequency.setValueAtTime(baseFreq, ctx.currentTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
          
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.015);
          break;
        }
        
        case 'error': {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          oscillator.frequency.setValueAtTime(150, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.08);
          break;
        }
        
        case 'tick': {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
          oscillator.type = 'sine';
          
          gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.03);
          break;
        }
        
        case 'finish': {
          const notes = [523.25, 659.25, 783.99, 1046.50];
          
          notes.forEach((freq, i) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
            oscillator.type = 'sine';
            
            const startTime = ctx.currentTime + i * 0.08;
            gainNode.gain.setValueAtTime(0.08, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.4);
          });
          break;
        }
      }
    } catch {
    }
  }, [getAudioContext, isEnabled]);

  const playKeySound = useCallback(() => playSound('key'), [playSound]);
  const playErrorSound = useCallback(() => playSound('error'), [playSound]);
  const playFinishSound = useCallback(() => playSound('finish'), [playSound]);
  const playTickSound = useCallback(() => playSound('tick'), [playSound]);

  return {
    isEnabled,
    playKeySound,
    playErrorSound,
    playFinishSound,
    playTickSound,
  };
}
