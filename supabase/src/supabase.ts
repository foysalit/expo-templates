import { SUPABASE_URL, SUPABASE_KEY } from "@env";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabaseUrl = SUPABASE_URL || "";
const supabaseKey = SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false,
});
