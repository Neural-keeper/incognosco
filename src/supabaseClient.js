import { createClient } from '@supabase/supabase-js'

// ⚠️ REPLACE THESE WITH YOUR ACTUAL KEYS FROM THE DASHBOARD
const supabaseUrl = '=https://gzzfjyqhaeejvcxzuawt.supabase.co'
const supabaseAnonKey = 'sb_secret_mJy3_hZrtc32t6AJb-uIBw_GDAlAjgZ'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)