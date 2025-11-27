import { createClient } from "@supabase/supabase-js";

// ⚠️ Use somente variáveis que começam com NEXT_PUBLIC_
// para que fiquem aces​síveis no navegador.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🔎 Log apenas para ambiente local (nunca em produção)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Variáveis NEXT_PUBLIC_SUPABASE_URL/ANON_KEY ausentes.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
