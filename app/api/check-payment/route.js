import { createClient } from '@supabase/supabase-js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data } = await supabase.from('pagamentos').select('status').eq('email', email).single();

  if (!data) return new Response(JSON.stringify({ status: 'not_found' }), { status: 404 });

  return new Response(JSON.stringify(data), { status: 200 });
}
