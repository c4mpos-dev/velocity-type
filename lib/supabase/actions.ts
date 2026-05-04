'use server'

import { createClient } from './server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('displayName') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}


export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...user, profile }
}

export async function saveScore(stats: {
  wpm: number
  accuracy: number
  rawWpm: number
  consistency: number
  mode: string
  modeValue: number
  wordList: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User must be logged in to save scores' }
  }

  const { data: existingBest, error: fetchError } = await supabase
    .from('leaderboard')
    .select('wpm')
    .eq('user_id', user.id)
    .eq('word_list', stats.wordList)
    .order('wpm', { ascending: false })
    .maybeSingle()

  if (fetchError) {
    console.error('Error fetching existing best:', fetchError)
    return { error: fetchError.message }
  }

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.id,
    display_name: user.user_metadata.display_name || user.email?.split('@')[0],
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })

  if (profileError) {
    console.error('Error ensuring profile exists:', profileError)
  }

  if (!existingBest || stats.wpm > existingBest.wpm) {
    const { error } = await supabase.from('leaderboard').upsert({
      user_id: user.id,
      word_list: stats.wordList,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      raw_wpm: stats.rawWpm,
      consistency: stats.consistency,
      mode: stats.mode,
      mode_value: stats.modeValue,
    }, { 
      onConflict: 'user_id,word_list' 
    })

    if (error) {
      console.error('Error saving score:', error)
      return { error: error.message }
    }
    
    revalidatePath('/leaderboard')
    return { success: true, isNewRecord: true }
  }

  return { success: true, isNewRecord: false }
}
