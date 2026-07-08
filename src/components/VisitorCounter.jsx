import { useEffect, useState } from "react";

function VisitorCounter() {
  const [views, setViews] = useState("...");

  useEffect(() => {
    async function fetchViews() {
      try {
        const response = await fetch(
          "https://anmolsrivastava073.goatcounter.com/counter/TOTAL.json"
        );

        const data = await response.json();

        setViews(data.count);
      } catch (error) {
        console.error("Visitor counter error:", error);
      }
    }

    fetchViews();
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
