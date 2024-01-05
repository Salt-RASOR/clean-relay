import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase.storage.from("images");
