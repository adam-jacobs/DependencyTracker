import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey = process.env.SUPABASE_KEY;
const database = createClient(supabaseUrl, supabaseKey);

export default database;
