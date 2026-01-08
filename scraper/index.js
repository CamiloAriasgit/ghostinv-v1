// scraper/index.js
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const dotenv = require('dotenv');

// Cargar el archivo
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Intentar leer con varios nombres posibles (por si acaso)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("DEBUG: URL detectada:", supabaseUrl ? "SÍ" : "NO");
console.log("DEBUG: Key detectada:", supabaseServiceKey ? "SÍ" : "NO");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ ERROR: No se pudieron mapear las variables.");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedIntelligence() {
  console.log('--- INICIANDO INTERCEPCIÓN DE ACTIVOS ---');

  const mockupOpportunities = [
    {
      domain_name: 'vintage-leather.co',
      niche: 'FASHION',
      dr_score: 42,
      backlinks_count: 1250,
      top_referring_domain: 'vogue.com',
      estimated_traffic: 12000,
      historical_revenue: 4500,
      price_estimate: 850,
      last_snapshot_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070',
      top_keywords: ['chaquetas cuero hombre', 'vintage bags', 'luxury leather'],
      spam_score: 1,
      status: 'available'
    },
    {
      domain_name: 'pure-hydro.net',
      niche: 'HEALTH',
      dr_score: 35,
      backlinks_count: 890,
      top_referring_domain: 'healthline.com',
      estimated_traffic: 5400,
      historical_revenue: 2100,
      price_estimate: 420,
      last_snapshot_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040',
      top_keywords: ['alkaline water benefits', 'best hydration systems'],
      spam_score: 3,
      status: 'available'
    }
  ];

  for (const op of mockupOpportunities) {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([op])
      .select();

    if (error) {
      console.error(`❌ Error inyectando ${op.domain_name}:`, error.message);
    } else {
      console.log(`✅ Activo Interceptado: ${op.domain_name} | ID: ${data[0].id}`);
    }
  }

  console.log('--- ESCANEO FINALIZADO ---');
}

seedIntelligence();