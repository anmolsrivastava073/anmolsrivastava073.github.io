import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    
    // FIX: Using the Service Role Key to bypass Row Level Security (RLS)
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === "GET") {
      const { count, error } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      return new Response(JSON.stringify({ count: count || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (req.method === "POST") {
      const { path } = await req.json();
      
      if (!path) {
        return new Response(JSON.stringify({ error: "Path is required" }), { status: 400, headers: corsHeaders });
      }

      const { error } = await supabase
        .from("page_views")
        .insert([{ page_path: path }]);
        
      if (error) throw error;
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
});
