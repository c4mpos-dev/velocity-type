import { TypingTest } from '@/components/typing/typing-test';
import { getUser } from '@/lib/supabase/actions';

export default async function Home() {
  const user = await getUser();
  
  return (
    <TypingTest initialUser={user} />
  );
}
