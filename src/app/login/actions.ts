'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Esta URL debe coincidir con la de tu proyecto en Supabase
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  if (error) {
    console.error(error)
    return redirect('/login?error=auth-failed')
  }

  return redirect('/login?success=check-email')
}