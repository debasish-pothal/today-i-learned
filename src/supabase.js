import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "SUPABASE_URL";
const supabaseKey = "SUPABASE_PUBLIC_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
