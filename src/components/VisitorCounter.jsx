import { useEffect, useState } from "react";

function VisitorCounter() {
  const [views, setViews] = useState("...");

  useEffect(() => {
    async function trackAndFetchViews() {
      // Prevent counting local development traffic
      if (window.location.hostname === "localhost") {
        setViews("DEV");
        return;
      }

      try {
        // Pointing directly to your Supabase Edge Function
        const apiUrl = "https://vtdbvwaxocxombtqllvm.supabase.co/functions/v1/views";

        // 1. Record the current page hit (POST)
        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: window.location.pathname }),
        });

        // 2. Fetch the updated total views for the portfolio (GET)
        const response = await fetch(apiUrl);
        const data = await response.json();

        setViews(data.count);
      } catch (error) {
        console.error("Visitor counter error:", error);
        setViews("---");
      }
    }

    trackAndFetchViews();
  }, []);

  return (
    <section className="py-12 flex justify-center">
      <div className="border border-border bg-base px-10 py-6 font-mono text-center">
        <div className="text-4xl font-bold text-accent">
          {views}
        </div>

        <div className="mt-2 text-xs tracking-[0.35em] text-textMuted">
          PORTFOLIO_VISITS
        </div>
      </div>
    </section>
  );
}

export default VisitorCounter;
