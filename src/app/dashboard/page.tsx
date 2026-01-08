import { createClient } from '@/utils/supabase/server';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  Lock, 
  User,
  ArrowUpRight,
  ShieldCheck,
  LayoutGrid,
  Activity
} from 'lucide-react'; 
import ScanButton from '@/components/ScanButton';
import Link from 'next/link'; // Importante para la navegación

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user?.id)
    .single();

  const { data: opportunities } = await supabase
    .from('opportunities')
    .select('*')
    .order('detected_at', { ascending: false });

  const isPremium = profile?.is_pro === true;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-400 font-sans selection:bg-indigo-500/30">
      
      {/* Sub-header de Estado del Sistema */}
      <div className="w-full border-b border-neutral-900 bg-neutral-950 px-3 py-2 flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-neutral-600 uppercase">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            System_Live
          </span>
          <span className="hidden sm:inline italic">Encrypted_Session: TLS_1.3</span>
        </div>
        <div className="flex gap-4">
          <span>{new Date().toLocaleDateString()}</span>
          <span>Medellin_Node_01</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-neutral-900 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <Activity size={14} className="text-black" />
                </div>
                <span className="text-white font-bold tracking-tighter text-lg uppercase">GhostInv</span>
              </div>
              
              <div className="hidden md:flex gap-1">
                <div className="px-3 py-1 border-b-2 border-indigo-500 text-neutral-100 text-xs font-medium cursor-default">Terminal</div>
                <div className="px-3 py-1 text-neutral-600 text-xs font-medium hover:text-neutral-400 cursor-not-allowed">Archives</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ScanButton />
              <div className="h-7 w-px bg-neutral-800 mx-2" />
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-[10px] font-mono text-neutral-500">{user?.email}</span>
                <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-colors cursor-pointer">
                  <User size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-3 py-8">
        
        {/* Header de Sección */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Panel de Inteligencia</h1>
            <p className="text-sm text-neutral-500 mt-1">Análisis de activos e-commerce con tráfico residual detectado en las últimas 24h.</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">
                <TrendingUp size={14} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider leading-none mb-1">Index_Value</p>
                <p className="text-sm font-mono text-white leading-none">$42.8k</p>
              </div>
            </div>
            
            <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">
                <Search size={14} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider leading-none mb-1">Scanning</p>
                <p className="text-sm font-mono text-white leading-none">1,284 <span className="text-[8px] text-neutral-600">REQ/S</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Card */}
        {!isPremium && (
          <div className="mb-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-transparent pointer-events-none" />
            <div className="border border-indigo-500/20 bg-neutral-900/40 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-5">
                <div className="hidden sm:flex h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center text-indigo-500">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-indigo-100 font-semibold italic">Terminal en modo restringido</h3>
                  <p className="text-xs text-neutral-500 mt-1">Actualice a PRO para descifrar el `Asset_ID` y acceder a los informes SIGINT completos.</p>
                </div>
              </div>
              <button className="w-full md:w-auto bg-white text-black text-xs font-bold px-8 py-3 rounded-xl hover:bg-neutral-200 transition-all uppercase tracking-widest shadow-xl shadow-indigo-500/10">
                Elevar Privilegios
              </button>
            </div>
          </div>
        )}

        {/* Main Feed Container */}
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
            <div className="flex items-center gap-2">
              <LayoutGrid size={14} className="text-neutral-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">Activos_Detectados</span>
            </div>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </div>
          </div>
          
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] border-b border-neutral-900 bg-neutral-900/20">
                  <th className="px-6 py-4 font-semibold italic text-indigo-500/50">#ID_ASSET</th>
                  <th className="px-6 py-4 font-semibold">NICHE_TAG</th>
                  <th className="px-6 py-4 font-semibold text-right">POTENTIAL_VAL</th>
                  <th className="px-6 py-4 font-semibold text-center w-24">INTEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {opportunities?.map((op) => (
                  <tr key={op.id} className="group hover:bg-white/[0.02] transition-colors relative">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/${op.id}`} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-600 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                          <Globe size={16} />
                        </div>
                        <span className={`font-mono text-xs tracking-tight transition-all duration-700 ${!isPremium ? 'blur-[5px] opacity-20 select-none' : 'text-neutral-100'}`}>
                          {op.domain_name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono">
                      <Link href={`/dashboard/${op.id}`} className="block">
                        <span className="px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-500">
                          {op.niche}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/${op.id}`} className="block">
                        <span className="text-white font-bold font-mono text-xs">
                          ${op.price_estimate?.toLocaleString()}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/dashboard/${op.id}`} className="flex justify-center items-center text-neutral-500 hover:text-white transition-all">
                        {isPremium ? <ArrowUpRight size={16} /> : <Lock size={12} className="text-neutral-700" />}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden divide-y divide-neutral-900">
            {opportunities?.map((op) => (
              <Link key={op.id} href={`/dashboard/${op.id}`} className="block p-6 active:bg-neutral-900 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-indigo-400">
                        <Globe size={16} />
                      </div>
                      <p className={`font-mono text-sm tracking-tight ${!isPremium ? 'blur-sm opacity-30' : 'text-neutral-100'}`}>
                        {op.domain_name}
                      </p>
                    </div>
                    <span className="inline-block text-[9px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-600 uppercase tracking-widest">
                      {op.niche}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-white font-bold font-mono text-sm">${op.price_estimate?.toLocaleString()}</p>
                    {isPremium ? (
                      <ArrowUpRight size={14} className="text-indigo-500" />
                    ) : (
                      <Lock size={12} className="text-neutral-700" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}