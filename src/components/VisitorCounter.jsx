import { useEffect } from "react";

function VisitorCounter() {
  useEffect(() => {
    const loadCounter = () => {
      if (window.goatcounter?.visit_count) {
        window.goatcounter.visit_count({
          append: "#visitor-count",
          path: "TOTAL",
          type: "html",
          no_branding: true,
          style: `
            div {
              background: transparent !important;
              border: none !important;
              color: inherit !important;
              padding: 0 !important;
              font-family: inherit !important;
            }

            #gcvc-views {
              color: #22c55e;
              font-size: 2rem;
              font-weight: 700;
            }

            #gcvc-for,
            #gcvc-by {
              display: none;
            }
          `,
        });
      }
    };

    const timer = setInterval(() => {
      if (window.goatcounter?.visit_count) {
        clearInterval(timer);
        loadCounter();
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 flex justify-center">
      <div className="rounded-xl border border-border bg-card/30 backdrop-blur-md px-8 py-5 hover:border-accent/60 transition-all">
        <div className="flex flex-col items-center font-mono">

   

          <div
            id="visitor-count"
            className="text-accent"
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
