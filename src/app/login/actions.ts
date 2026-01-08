'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers' // Importante para detectar el host

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()
  
  // Detectamos el origen (localhost o vercel) dinámicamente
  const host = headers().get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const origin = `${protocol}://${host}`

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // YA NO USAMOS localhost:3000 fijo
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error)
    return redirect('/login?error=auth-failed')
  }

  return redirect('/login?success=check-email')
}