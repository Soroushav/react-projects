import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zbzfewntbmhnaeqapoxr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiemZld250Ym1obmFlcWFwb3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2NzI4ODQsImV4cCI6MjAzODI0ODg4NH0.vnuKgcyDJaDL--325JHnPQpgwwRUSZQ3UDTbL0cSrv0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
