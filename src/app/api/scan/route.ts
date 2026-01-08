// src/app/api/scan/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  
  // Verificamos si la petición viene del sistema automático o de un humano
  const authHeader = request.headers.get('authorization');
  const isAutoUpdate = authHeader === `Bearer ${process.env.CRON_SECRET}`;

  try {
    console.log('--- 🤖 SISTEMA GHOST_SCAN: ACTUALIZACIÓN AUTOMÁTICA ---');

    // 1. FUENTE DE DATOS CRUDA (Aquí conectaríamos el feed de dominios expirados reales)
    // Por ahora, simulamos el barrido de 20 candidatos para elegir los mejores 5
    const rawMarketFeed = [
      'quantum-ai.tech', 'pay-nexus.finance', 'bio-stack.com', 
      'solar-grid.io', 'cyber-ops.dev', 'data-refinery.ai'
    ];

    // 2. FILTRADO Y PUNTUACIÓN (El "Cerebro" que trabaja mientras duermes)
    const analyzedAssets = [];

    for (const domain of rawMarketFeed) {
      // Simulamos la consulta a APIs de autoridad (Ahrefs/DataForSEO/OPR)
      // En producción, aquí haríamos las llamadas fetch que ya tenemos
      const dr = Math.floor(Math.random() * (55 - 25) + 25); 
      const traffic = Math.floor(dr * 1250);

      analyzedAssets.push({
        domain_name: domain,
        niche: domain.includes('ai') ? 'AI' : 'FINTECH',
        dr_score: dr,
        backlinks_count: dr * 140,
        estimated_traffic: traffic,
        price_estimate: dr * 45,
        top_keywords: ['ranking', 'residual', 'traffic'],
        last_snapshot_url: `https://image.microlink.io/?url=https://${domain}&screenshot=true`,
        detected_at: new Date().toISOString(),
      });
    }

    // 3. RANKING DINÁMICO: Solo guardamos el Top 5 con más tráfico
    const top5 = analyzedAssets
      .sort((a, b) => b.estimated_traffic - a.estimated_traffic)
      .slice(0, 5);

    // 4. PERSISTENCIA: Reemplazamos la lista anterior por la nueva "mina de oro"
    await supabase.from('opportunities').delete().neq('domain_name', '');
    const { data, error } = await supabase.from('opportunities').insert(top5).select();

    if (error) throw error;

    return NextResponse.json({ 
      status: 'success', 
      message: 'Ranking actualizado a las 00:00',
      count: data.length 
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}