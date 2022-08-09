import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rkpsepkibztbweplxsli.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcHNlcGtpYnp0YndlcGx4c2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc0NzE4MDAsImV4cCI6MTk3MzA0NzgwMH0.-TsomBTEZlmHZ6cS3qqbF7f1G8OLsNSgMkquuPrt1PA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)