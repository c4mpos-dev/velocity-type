'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useLocaleContext } from '@/components/locale-provider';

interface KeyboardHeatmapProps {
  errors: Set<number>;
  text: string;
  userInput: string;
}

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

export function KeyboardHeatmap({ errors, text, userInput }: KeyboardHeatmapProps) {
  const { locale } = useLocaleContext();
  
  // Calculate error frequency per key
  const keyStats = useMemo(() => {
    const stats: Record<string, { errors: number; correct: number }> = {};
    
    // Initialize all keys
    KEYBOARD_ROWS.flat().forEach(key => {
      stats[key] = { errors: 0, correct: 0 };
    });
    
    // Count errors and correct characters
    for (let i = 0; i < userInput.length; i++) {
      const typedChar = userInput[i]?.toLowerCase();
      const expectedChar = text[i]?.toLowerCase();
      
      if (typedChar && stats[typedChar] !== undefined) {
        if (errors.has(i)) {
          stats[typedChar].errors++;
        } else {
          stats[typedChar].correct++;
        }
      }
    }
    
    return stats;
  }, [errors, text, userInput]);

  const getKeyColor = (key: string) => {
    const stat = keyStats[key];
    if (!stat) return '';
    
    const total = stat.errors + stat.correct;
    if (total === 0) return '';
    
    const errorRate = stat.errors / total;
    
    if (errorRate > 0.5) return 'bg-incorrect/40 text-incorrect';
    if (errorRate > 0.2) return 'bg-current/30 text-current';
    if (stat.correct > 0) return 'bg-correct/20 text-correct';
    
    return '';
  };

  if (userInput.length < 10) return null;

  return (
    <div className="mt-8 p-4 rounded-xl bg-card/30 border border-border/30">
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4 text-center">
        Precisão por tecla
      </div>
      <div className="flex flex-col items-center gap-1">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-1"
            style={{ paddingLeft: `${rowIndex * 12}px` }}
          >
            {row.map(key => (
              <div
                key={key}
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono uppercase",
                  "bg-secondary/50 text-muted-foreground transition-all duration-300",
                  getKeyColor(key)
                )}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
