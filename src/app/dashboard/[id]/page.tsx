// src/app/dashboard/[id]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  History, 
  Lock,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Next.js 15 requiere que params sea una Promesa
export default async function OpportunityDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Extraer el ID de forma asíncrona (Requerido en Next 15)
  const { id } = await params;
  const supabase = await createClient();
  
  // 2. Obtener usuario y oportunidad en paralelo para mejor rendimiento
  const [userRes, opRes] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single()
  ]);

  const user = userRes.data.user;
  const op = opRes.data;

  // Si no hay oportunidad en la DB con ese ID, lanzamos 404
  if (!op) notFound();

  // 3. Obtener perfil para verificar estado PRO
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user?.id)
    .single();

  const isPro = profile?.is_pro || false;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-400 font-sans selection:bg-indigo-500/30">
      
      {/* Header Táctico */}
      <div className="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-mono hover:text-white transition-colors">
            <ArrowLeft size={14} /> [VOLVER_AL_TERMINAL]
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.2em] hidden md:block">
              Asset_Status: <span className="text-emerald-500 font-bold">Líquido</span>
            </span>
            <div className="h-4 w-px bg-neutral-800 hidden md:block" />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-4 py-2 rounded-lg tracking-widest uppercase transition-all shadow-lg shadow-indigo-900/20">
              Adquirir Activo
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-3 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Identidad y Valor */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Título y Badge de Riesgo */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                <ShieldCheck size={12} /> Verificación Limpia (Spam Score: {op.spam_score || 0}%)
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase transition-all ${!isPro ? 'blur-md select-none opacity-50' : ''}`}>
                {isPro ? op.domain_name : 'RESTRINGIDO.COM'}
              </h1>
              <p className="text-neutral-500 max-w-xl text-sm leading-relaxed">
                Este activo fue detectado mediante el algoritmo Ghost_Scan. Presenta una arquitectura de enlaces de autoridad que no ha sido eliminada de los índices de búsqueda activos.
              </p>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Autoridad (DR)', value: op.dr_score, icon: <Zap size={14} />, desc: 'Poder de ranking' },
                { label: 'Backlinks', value: op.backlinks_count, icon: <Globe size={14} />, desc: 'Enlaces activos' },
                { label: 'Tráfico Est.', value: `${op.estimated_traffic}/mo`, icon: <BarChart3 size={14} />, desc: 'Visitas residuales' },
                { label: 'Valor Estimado', value: `$${op.price_estimate}`, icon: <History size={14} />, desc: 'Precio de reventa' },
              ].map((stat, i) => (
                <div key={i} className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-2xl group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    {stat.icon}
                    <span className="text-[9px] font-bold uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className="text-xl font-mono font-bold text-white">{stat.value || '0'}</p>
                  <p className="text-[9px] text-neutral-600 mt-1 uppercase italic">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Wayback Preview */}
            <div className="border border-neutral-800 bg-neutral-900/20 rounded-2xl overflow-hidden">
               <div className="p-4 border-b border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">Última Captura Visual</span>
                  <ExternalLink size={14} className="text-neutral-600" />
               </div>
               <div className="aspect-video bg-neutral-950 flex items-center justify-center relative group">
                  {!isPro ? (
                    <div className="absolute inset-0 z-10 bg-neutral-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                      <Lock size={32} className="text-indigo-500 mb-4" />
                      <p className="text-white font-bold text-sm uppercase tracking-widest">Visualización Cifrada</p>
                      <p className="text-neutral-500 text-[10px] mt-2 max-w-[200px]">Actualice a PRO para ver la estructura de la tienda anterior.</p>
                    </div>
                  ) : (
                    <img 
                      src={op.last_snapshot_url || 'https://via.placeholder.com/1200x600?text=No+Preview+Available'} 
                      alt="Preview" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                    />
                  )}
               </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">
            <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6 space-y-6">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={14} className="text-indigo-500" />
                Veredicto de Inversión
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Oportunidad_Detectada</p>
                  <p className="text-xs text-neutral-300 leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                    "El dominio tiene enlaces activos de <span className="text-indigo-400 font-bold">{op.top_referring_domain || 'Sitios de Autoridad'}</span>. Comprar este activo es equivalente a una campaña de SEO de 6 meses."
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Estrategia_Sugerida</p>
                  <ul className="text-[11px] space-y-2 text-neutral-400">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-indigo-500 shrink-0" />
                      <span>Redirigir tráfico 301 a una oferta de {op.niche}.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={14} className="text-indigo-500 shrink-0" />
                      <span>Reconstruir PBN de alto nivel.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {!isPro && (
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/40">
                  Desbloquear Full SIGINT
                </button>
              )}
            </div>

            {/* Keywords */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-neutral-100 font-bold text-xs uppercase tracking-widest">Keywords_Ranking</h3>
              <div className="flex flex-wrap gap-2">
                {isPro && op.top_keywords ? (
                  op.top_keywords.map((kw: string, i: number) => (
                    <span key={i} className="text-[10px] font-mono bg-neutral-950 border border-neutral-800 px-2 py-1 rounded text-neutral-500 lowercase italic">
                      #{kw}
                    </span>
                  ))
                ) : (
                  [1, 2, 3].map((i) => (
                    <span key={i} className="text-[10px] font-mono bg-neutral-950 border border-neutral-800 px-2 py-1 rounded text-neutral-800 blur-[2px] select-none">
                      ********
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}