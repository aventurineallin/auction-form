import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey)
}
