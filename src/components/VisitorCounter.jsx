import { useEffect } from "react";

function VisitorCounter() {
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.goatcounter?.visit_count) {
        clearInterval(timer);

        const container = document.getElementById("visitor-count");

        if (!container || container.dataset.loaded) return;

        container.dataset.loaded = "true";

        window.goatcounter.visit_count({
          append: "#visitor-count",
          path: "TOTAL",
          type: "html",
          no_branding: true,
        });
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 flex justify-center">
      <div className="group rounded-xl border border-border bg-card/30 backdrop-blur-md px-8 py-5 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]">
        <div className="flex items-center justify-center gap-3 font-mono">
          <span className="text-2xl">👁</span>

          <div className="flex flex-col items-center">
            <span
              id="visitor-count"
              className="text-3xl font-bold text-accent"
            ></span>

            <span className="mt-1 text-xs tracking-[0.3em] text-textMuted uppercase">
              Portfolio Visits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitorCounter;
