import { WordListType, generateText } from './word-lists';

export type TestMode = 'time';
export type TestDuration = 15 | 30 | 60 | 120;
export type TestWordCount = 10 | 25 | 50 | 100;

export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  time: number;
  consistency: number;
}

export interface TestResult extends TypingStats {
  date: Date;
  mode: TestMode;
  wordList: WordListType;
  duration?: TestDuration;
  wordCount?: TestWordCount;
}

export interface TypingState {
  mode: TestMode;
  wordList: WordListType;
  duration: TestDuration;
  wordCount: TestWordCount;
  text: string;
  userInput: string;
  currentIndex: number;
  isStarted: boolean;
  isFinished: boolean;
  startTime: number | null;
  endTime: number | null;
  errors: Set<number>;
  wpmHistory: number[];
  rawWpmHistory: number[];
}

export function createInitialState(): TypingState {
  return {
    mode: 'time',
    wordList: 'common',
    duration: 30,
    wordCount: 25,
    text: generateText('common', 200),
    userInput: '',
    currentIndex: 0,
    isStarted: false,
    isFinished: false,
    startTime: null,
    endTime: null,
    errors: new Set(),
    wpmHistory: [],
    rawWpmHistory: [],
  };
}

export function calculateStats(state: TypingState): TypingStats {
  const { userInput, text, startTime, endTime, errors } = state;
  
  const timeElapsed = startTime 
    ? ((endTime || Date.now()) - startTime) / 1000 / 60 
    : 0;
  
  const correctChars = userInput.length - errors.size;
  const incorrectChars = errors.size;
  const totalChars = userInput.length;
  
  const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
  const rawWpm = timeElapsed > 0 ? Math.round((totalChars / 5) / timeElapsed) : 0;
  
  const accuracy = totalChars > 0 
    ? Math.round((correctChars / totalChars) * 100) 
    : 100;
  
  const wpmHistory = state.wpmHistory;
  let consistency = 100;
  if (wpmHistory.length > 1) {
    const mean = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
    const variance = wpmHistory.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wpmHistory.length;
    const stdDev = Math.sqrt(variance);
    const cv = mean > 0 ? (stdDev / mean) * 100 : 0;
    consistency = Math.max(0, Math.round(100 - cv));
  }
  
  return {
    wpm,
    rawWpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalChars,
    time: timeElapsed * 60,
    consistency,
  };
}

const HISTORY_KEY = 'velocitytype-history';

export function saveResult(result: TestResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  history.unshift(result);
  
  const trimmed = history.slice(0, 100);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): TestResult[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((r: TestResult) => ({
      ...r,
      date: new Date(r.date),
    }));
  } catch {
    return [];
  }
}

export function getBestWpm(): number {
  const history = getHistory();
  if (history.length === 0) return 0;
  return Math.max(...history.map(r => r.wpm));
}

export function getAverageWpm(): number {
  const history = getHistory();
  if (history.length === 0) return 0;
  const sum = history.reduce((acc, r) => acc + r.wpm, 0);
  return Math.round(sum / history.length);
}

export function getAverageAccuracy(): number {
  const history = getHistory();
  if (history.length === 0) return 0;
  const sum = history.reduce((acc, r) => acc + r.accuracy, 0);
  return Math.round(sum / history.length);
}

export function getTestsCompleted(): number {
  return getHistory().length;
}
