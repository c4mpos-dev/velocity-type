-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leaderboard table for storing best scores
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wpm INTEGER NOT NULL,
  accuracy NUMERIC(5,2) NOT NULL,
  raw_wpm INTEGER NOT NULL,
  consistency NUMERIC(5,2) NOT NULL,
  mode TEXT NOT NULL,
  mode_value INTEGER NOT NULL,
  word_list TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_wpm ON public.leaderboard(wpm DESC);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Leaderboard policies
DROP POLICY IF EXISTS "leaderboard_select_all" ON public.leaderboard;
CREATE POLICY "leaderboard_select_all" ON public.leaderboard FOR SELECT USING (true);

DROP POLICY IF EXISTS "leaderboard_insert_own" ON public.leaderboard;
CREATE POLICY "leaderboard_insert_own" ON public.leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);
