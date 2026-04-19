'use client';

import { Hash, Code, AtSign, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestMode, TestDuration, TestWordCount } from '@/lib/typing-store';
import { WordListType } from '@/lib/word-lists';
import { useLocaleContext } from '@/components/locale-provider';

interface ModeSelectorProps {
  mode: TestMode;
  wordList: WordListType;
  duration: TestDuration;
  wordCount: TestWordCount;
  onModeChange: (mode: TestMode) => void;
  onWordListChange: (wordList: WordListType) => void;
  onDurationChange: (duration: TestDuration) => void;
  onWordCountChange: (wordCount: TestWordCount) => void;
  disabled?: boolean;
}

export function ModeSelector({
  mode,
  wordList,
  duration,
  wordCount,
  onModeChange,
  onWordListChange,
  onDurationChange,
  onWordCountChange,
  disabled = false,
}: ModeSelectorProps) {
  const { t } = useLocaleContext();

  const wordLists: { value: WordListType; label: string; icon: React.ReactNode }[] = [
    { value: 'common', label: t('common'), icon: <AtSign className="w-3.5 h-3.5" /> },
    { value: 'medium', label: t('medium'), icon: <Hash className="w-3.5 h-3.5" /> },
    { value: 'programming', label: t('code'), icon: <Code className="w-3.5 h-3.5" /> },
    { value: 'punctuation', label: t('punctuation'), icon: <Percent className="w-3.5 h-3.5" /> },
  ];

  const durations: TestDuration[] = [15, 30, 60, 120];

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-1">
          {wordLists.map((wl) => (
            <button
              key={wl.value}
              onClick={() => !disabled && onWordListChange(wl.value)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer',
                wordList === wl.value
                  ? 'bg-accent/20 text-accent border border-accent/30 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                {wl.icon}
              </span>
              <span>{wl.label}</span>
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border/50" />

        <div className="flex items-center gap-1">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => !disabled && onDurationChange(d)}
              disabled={disabled}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer',
                duration === d
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {d}{t('seconds')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

