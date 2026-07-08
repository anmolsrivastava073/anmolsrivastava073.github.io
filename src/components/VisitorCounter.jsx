import { useEffect } from "react";

function VisitorCounter() {
  useEffect(() => {
    const renderCounter = () => {
      if (!window.goatcounter?.visit_count) return;

      window.goatcounter.visit_count({
        append: "#visitor-count",
        path: "TOTAL",
      });
    };

    if (window.goatcounter?.visit_count) {
      renderCounter();
    } else {
      const timer = setInterval(() => {
        if (window.goatcounter?.visit_count) {
          clearInterval(timer);
          renderCounter();
        }
      }, 200);

      return () => clearInterval(timer);
    }
  }, []);

  return (
    <section className="py-10 flex justify-center">
      <div className="rounded-xl border border-border bg-card/30 backdrop-blur-md px-8 py-5 transition-all duration-300 hover:border-accent/60">
        <div className="flex flex-col items-center font-mono">

          <div
            id="visitor-count"
            className="mt-2 text-3xl font-bold text-accent"
          />

          <span className="mt-2 text-xs tracking-[0.3em] text-textMuted uppercase">
            Portfolio Visits
          </span>

        </div>
      </div>
    </section>
  );
}

export default VisitorCounter;
