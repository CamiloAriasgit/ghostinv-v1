'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Loader2 } from 'lucide-react'

export default function ScanButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleScan = async () => {
    setLoading(true)
    try {
      await fetch('/api/scan')
      router.refresh()
    } catch (error) {
      console.error("Fallo en la conexión de red")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleScan}
      disabled={loading}
      className={`
        relative overflow-hidden group
        flex items-center gap-2 px-4 py-2
        bg-neutral-900/80 backdrop-blur-sm
        border border-neutral-800 rounded-xl
        transition-all duration-300
        ${loading 
          ? 'cursor-wait border-indigo-500/30' 
          : 'hover:border-neutral-700 hover:bg-neutral-800 active:scale-95'
        }
      `}
    >
      {/* Indicador de estado sutil (punto led) */}
      <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] transition-colors duration-500 ${
        loading ? 'bg-indigo-500 shadow-indigo-500 animate-pulse' : 'bg-emerald-500 shadow-emerald-500/40'
      }`} />

      <span className={`
        text-[10px] font-mono tracking-widest uppercase font-bold transition-colors
        ${loading ? 'text-indigo-400' : 'text-neutral-400 group-hover:text-neutral-200'}
      `}>
        {loading ? 'Sincronizando...' : 'Escanear'}
      </span>

      {loading ? (
        <Loader2 size={12} className="animate-spin text-indigo-500" />
      ) : (
        <Zap size={12} className="text-neutral-600 group-hover:text-indigo-400 transition-colors" />
      )}

      {/* Efecto de barrido sutil solo en hover - No parece videojuego, parece escáner óptico */}
      {!loading && (
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent" />
      )}
    </button>
  )
}