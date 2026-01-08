import { loginWithEmail } from './actions'
import { Activity, Mail, ChevronRight, CheckCircle2, Shield } from 'lucide-react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const success = searchParams.success === 'check-email'

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 font-sans">
      {/* Elementos de fondo tácticos */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="w-full max-w-[400px] relative">
        {/* Header de Identidad */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Activity size={24} className="text-black" />
          </div>
          <h1 className="text-white font-bold tracking-[0.3em] text-xl uppercase">GhostInv</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Secure_Auth_Node_v1</span>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md">
          <div className="mb-8">
            <h2 className="text-sm font-bold text-neutral-200 uppercase tracking-widest flex items-center gap-2">
              <Shield size={14} className="text-indigo-500" />
              Verificación de Acceso
            </h2>
            <p className="text-neutral-500 mt-2 text-xs leading-relaxed">
              Ingrese sus credenciales para autorizar el despliegue del terminal de inteligencia.
            </p>
          </div>

          {success ? (
            <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-xl flex flex-col items-center text-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">Enlace Despachado</p>
                <p className="text-neutral-500 text-[11px] mt-2 font-mono">
                  Se ha enviado una llave de acceso temporal a su bandeja de entrada.
                </p>
              </div>
            </div>
          ) : (
            <form action={loginWithEmail} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest ml-1">Identity_Email</label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="root@ghostinv.network"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-12 py-3 text-white text-xs font-mono focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group w-full bg-neutral-100 hover:bg-white text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest"
              >
                <span>Solicitar Acceso</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-neutral-800/50">
            <div className="flex justify-between items-center text-[9px] font-mono text-neutral-700 uppercase tracking-widest">
              <span>Auth_Protocol: OTP</span>
              <span>Layer: AES-256</span>
            </div>
          </div>
        </div>
        
        {/* Footer legal/técnico muy pequeño */}
        <p className="text-center mt-8 text-[9px] text-neutral-700 font-mono uppercase tracking-[0.4em]">
          Restricted access. Unauthorized attempts will be logged.
        </p>
      </div>
    </div>
  )
}