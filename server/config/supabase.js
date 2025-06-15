import { createClient } from '@supabase/supabase-js';

// Access environment variables with VITE_ prefix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage, // or sessionStorage if you prefer
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
export default supabase;