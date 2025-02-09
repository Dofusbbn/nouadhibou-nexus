
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdyfousmzyhqswfdcrpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeWZvdXNtenlocXN3ZmRjcnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MzIxMjEsImV4cCI6MjA1NDUwODEyMX0.oS3DT0z94g9HmAsiALbNziQ1Yh9a4Ch0IchQCOtoLcI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
