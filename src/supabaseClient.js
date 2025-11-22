import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE WITH YOUR ACTUAL KEYS FROM THE DASHBOARD
const supabaseUrl = 'https://gzzfjyqhaeejvcxzuawt.supabase.co'
const supabaseAnonKey = 'sb_publishable_vUuGjF8tF4feogU1ersm9g_q9jvlWG4'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)