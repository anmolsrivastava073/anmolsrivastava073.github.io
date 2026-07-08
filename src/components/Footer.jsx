import { useEffect, useState } from "react";

function Footer() {
  const [views, setViews] = useState("...");

  useEffect(() => {
    async function updateCounter() {
      try {
        const res = await fetch(
          "https://api.countapi.xyz/hit/anmol-srivastava-portfolio/visits"
        );
        const data = await res.json();
        setViews(data.value.toLocaleString());
      } catch (err) {
        console.error(err);
      }
    }

    updateCounter();
  }, []);

  return (
    <footer className="border-t border-border bg-base py-8 text-center font-mono text-xs text-textMuted">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <span>&copy; {new Date().getFullYear()} ANMOL_SRIVASTAVA</span>

        <span className="hidden md:inline">|</span>

        <span>ALL_RIGHTS_RESERVED</span>

        <span className="hidden md:inline">|</span>

        <span className="text-accent animate-pulse">
          STATUS: DEPLOYED
        </span>

        <span className="hidden md:inline">|</span>

        <span className="text-accent">
          👁 {views} VISITORS
        </span>
      </div>
    </footer>
  );
}

export default Footer;
