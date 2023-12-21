import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://ssjyqhsappulrrhjafbx.supabase.co";
export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzanlxaHNhcHB1bHJyaGphZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTU3NjcsImV4cCI6MjAxODQ3MTc2N30.e5fJfY4DrE4CeO0MgLjtB2LJghO3LWOWeyZBkCNnvYM";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;