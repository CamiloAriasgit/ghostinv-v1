'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()
  
  // SOLUCIÓN: Añadimos el 'await' para obtener los headers
  const headerList = await headers()
  const host = headerList.get('host')
  
  // Detectamos el protocolo y el origen dinámicamente
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  const origin = `${protocol}://${host}`

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Ahora la URL será https://tu-app.vercel.app/auth/callback en producción
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Error de Auth:', error.message)
    return redirect('/login?error=auth-failed')
  }

  return redirect('/login?success=check-email')
}