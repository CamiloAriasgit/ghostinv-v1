import Link from 'next/link';
import {
  Zap,
  Target,
  ShieldAlert,
  ArrowRight,
  Activity,
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-400 font-sans selection:bg-indigo-500/30">

      {/* Top Utility Bar */}
      <div className="w-full border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-indigo-500 fill-current" />
            <span className="text-white font-bold tracking-tighter text-sm">GHOSTINV</span>
          </div>
          <span className="hidden md:block text-[10px] text-neutral-600 font-mono tracking-widest uppercase border-l border-neutral-800 pl-4">
            Network_Status: <span className="text-violet-500">Optimal</span>
          </span>
        </div>
        <Link href="/login" className="text-[10px] font-bold text-neutral-400 hover:text-white transition-colors tracking-widest uppercase">
          Acceder al Terminal
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-32">
        <div className="space-y-12">

          {/* Headline Section */}
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Localice activos digitales con <br />
              <span className="text-neutral-500 italic font-normal">tráfico residual y autoridad SEO.</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-500 max-w-xl leading-relaxed">
              GhostInv es una infraestructura de inteligencia que identifica dominios e-commerce recién expirados. No buscamos nombres; buscamos infraestructuras con backlinks activos y flujo de usuarios listos para ser monetizados.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/login"
                className="bg-neutral-100 hover:bg-white text-black font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>DESPLEGAR TERMINAL</span>
                <ChevronRight size={16} />
              </Link>

              <button className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 font-bold py-3 px-6 rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                <span>DOCUMENTACIÓN_V1</span>
              </button>
            </div>
          </div>

          {/* Data Visualization / Proof Point */}
          <div className="w-full border border-neutral-900 bg-neutral-900/20 rounded-2xl p-1 font-mono">
            <div className="border border-neutral-800 bg-neutral-950 rounded-xl p-4 md:p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6 text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
                <div className="flex gap-4">
                  <span>ID_ASSET</span>
                  <span>NICHE_TYPE</span>
                  <span className="hidden md:block">EST_TRAFFIC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  LIVE_SCAN
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'pet-shop.co', niche: 'E-COM', traffic: '1.2k', value: '$850' },
                  { id: 'tech-vault.io', niche: 'SaaS', traffic: '3.4k', value: '$2,100' },
                  { id: 'yoga-store.net', niche: 'HEALTH', traffic: '850', value: '$420' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-neutral-900 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex gap-4 text-xs">
                      <span className="text-neutral-500 w-24 blur-[4px]">{row.id}</span>
                      <span className="text-indigo-500/70">{row.niche}</span>
                      <span className="hidden md:block text-neutral-600">{row.traffic}</span>
                    </div>
                    <span className="text-white font-bold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Logic Grid - Much more aggressive & direct */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-neutral-900">
            <div className="space-y-4">
              <div className="text-indigo-500 p-2 bg-indigo-500/5 w-fit rounded-lg border border-indigo-500/10">
                <Target size={20} />
              </div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">01. Identificación</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Escaneo masivo de registros WHOIS y DNS. Localizamos tiendas con autoridad real que los dueños han olvidado renovar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-indigo-500 p-2 bg-indigo-500/5 w-fit rounded-lg border border-indigo-500/10">
                <Database size={20} />
              </div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">02. Extracción</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Validamos métricas SEO (DR, DA) y tráfico histórico. Acceda a la lista de dominios antes de que lleguen a subastas públicas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-indigo-500 p-2 bg-indigo-500/5 w-fit rounded-lg border border-indigo-500/10">
                <ShieldAlert size={20} />
              </div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">03. Ejecución</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Redirija el tráfico a sus ofertas, reconstruya el sitio para SEO de nicho o revenda el activo con un margen del 500%.
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-6 pb-12">
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-neutral-700 font-mono uppercase tracking-[0.3em]">
          <span>GhostInv Intelligence Systems © 2026</span>
          <div className="flex gap-6">
            <span className="text-neutral-500 italic">Auth_Encrypted: RSA_4096</span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}