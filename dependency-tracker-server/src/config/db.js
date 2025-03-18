import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = "https://qihzzbcxusqtlnppbfsp.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const database = createClient(supabaseUrl, supabaseKey);

export default database;
