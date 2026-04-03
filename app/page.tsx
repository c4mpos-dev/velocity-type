import { TypingTest } from '@/components/typing/typing-test';
import { LocaleProvider } from '@/components/locale-provider';

export default function Home() {
  return (
    <LocaleProvider>
      <TypingTest />
    </LocaleProvider>
  );
}
