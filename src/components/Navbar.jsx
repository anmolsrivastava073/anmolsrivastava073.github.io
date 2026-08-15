import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'signal', label: 'Activity' },
  { id: 'projects', label: 'Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed w-full top-0 z-50 md:pl-16"
    >
      <div className="border-b border-border bg-base/85 backdrop-blur-sm px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
          <Link
            to="hero"
            smooth={true}
            offset={-80}
            className="font-mono font-semibold text-sm tracking-widest text-textMain cursor-pointer hover:text-accent transition-colors flex items-center gap-2 shrink-0"
          >
            <span className="w-2 h-2 border border-accent rotate-45 inline-block" />
            A. SRIVASTAVA
          </Link>

          <div className="hidden lg:flex gap-6 xl:gap-8 font-mono text-xs tracking-widest uppercase overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                offset={-80}
                spy={true}
                activeClass="text-accent"
                className="text-textMuted cursor-pointer hover:text-textMain transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
