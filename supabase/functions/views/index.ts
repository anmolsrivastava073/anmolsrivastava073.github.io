import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Configure CORS to accept requests from your local server and your GitHub Pages domain
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 1. Handle CORS preflight requests from the browser
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Initialize the Supabase client using built-in Edge environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. GET Request: Fetch total views to display on the portfolio
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

    // 4. POST Request: Log a new view when someone visits
    if (req.method === "POST") {
      const { path } = await req.json();
      
      if (!path) {
        return new Response(JSON.stringify({ error: "Path is required" }), { 
          status: 400, 
          headers: corsHeaders 
        });
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

    // Reject any other request types (PUT, DELETE, etc.)
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
    
  } catch (err) {
    // Catch and return any server errors
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
