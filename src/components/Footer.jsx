function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-xs font-mono tracking-widest uppercase text-textMuted relative z-10 bg-base md:pl-16">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 border border-accent rotate-45 inline-block" />
          &copy; {new Date().getFullYear()} Anmol Srivastava
        </span>
        <span className="hidden md:inline text-border">/</span>
        <span className="normal-case tracking-normal text-textMuted/70">Built with React, Framer Motion &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
export default Footer;
