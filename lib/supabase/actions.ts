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

  if (data.user) {
    // Create profile entry
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        display_name: displayName,
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Get profile
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

  const { error } = await supabase.from('leaderboard').insert({
    user_id: user.id,
    wpm: stats.wpm,
    accuracy: stats.accuracy,
    raw_wpm: stats.rawWpm,
    consistency: stats.consistency,
    mode: stats.mode,
    mode_value: stats.modeValue,
    word_list: stats.wordList,
  })

  if (error) {
    console.error('Error saving score:', error)
    return { error: error.message }
  }

  revalidatePath('/leaderboard')
  return { success: true }
}
