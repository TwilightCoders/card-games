import { createClient } from "@supabase/supabase-js"

// Get the enviroment variables for supabase
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create and export the supabase client object
export const supabase = createClient(url, anonKey)
