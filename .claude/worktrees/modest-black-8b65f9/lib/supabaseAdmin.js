// Supabase server-side client. NEVER import this from 'use client' components.
// Uses the service_role key so we can write from the API route even with RLS enabled.
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

// Fail fast at build/runtime if env vars are missing.
export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env var');
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
