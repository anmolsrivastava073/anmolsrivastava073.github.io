function Footer() {
  return (
    <footer className="border-t border-border bg-base py-8 text-center font-mono text-xs text-textMuted">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <span>&copy; {new Date().getFullYear()} ANMOL_SRIVASTAVA</span>

        <span className="hidden md:inline">|</span>

        <span>ALL_RIGHTS_RESERVED</span>
      </div>
    </footer>
  );
}

export default Footer;
