import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Command, Menu, X } from 'lucide-react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 py-3.5 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b border-white/[0.06] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={
          scrolled
            ? { background: 'rgba(28, 28, 30, 0.75)' }
            : {}
        }
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link
            to="hero"
            smooth={true}
            duration={300}
            offset={-80}
            className="cursor-pointer font-bold text-base tracking-tight text-zinc-100 hover:text-white transition-colors"
          >
            Anmol Srivastava
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={300}
                offset={-80}
                spy={true}
                activeClass="!text-white font-medium"
                className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Action Button + Mobile Trigger */}
          <div className="flex items-center gap-3">

            {/* Search / Command Button */}
            <button
              onClick={onOpenPalette}
              className="px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs flex items-center gap-2 transition-colors"
              title="Search / Command menu"
            >
              <Command className="w-3.5 h-3.5" />

              <span className="hidden sm:inline">
                Search
              </span>

              <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-30 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">

              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={300}
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-zinc-400 hover:text-white transition-colors py-2 border-b border-zinc-800/50 flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>

                  <span className="text-zinc-600 text-xs">
                    &rarr;
                  </span>
                </Link>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
