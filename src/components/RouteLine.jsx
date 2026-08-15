import { motion, useScroll, useSpring } from 'framer-motion'

// The site's throughline: Anmol builds things that route people through
// messy systems (campus paths, waste collection, patient triage). So the
// page itself is surveyed like a route — a traverse line down the margin
// with a marker at each section.
export const stations = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Stack' },
  { id: 'signal', label: 'Activity' },
  { id: 'projects', label: 'Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function RouteLine() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 })

  return (
    <>
      {/* Mobile: thin top progress bar instead of a side traverse */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/40 z-[60] md:hidden">
        <motion.div
          style={{ scaleX: progress, transformOrigin: '0% 50%' }}
          className="h-full bg-accent"
        />
      </div>

      {/* Desktop: the traverse line running down the left margin */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 z-[60] flex-col items-center pointer-events-none">
        <div className="relative h-full w-px bg-border/50 mt-24 mb-24">
          <motion.div
            style={{ scaleY: progress, transformOrigin: '0% 0%' }}
            className="absolute top-0 left-0 w-px h-full bg-accent"
          />
          {stations.map((s, i) => (
            <div
              key={s.id}
              className="absolute left-0 -translate-x-1/2 flex items-center gap-2 pointer-events-auto group"
              style={{ top: `${(i / (stations.length - 1)) * 100}%` }}
            >
              <a href={`#${s.id}`} className="station-dot block hover:scale-125 transition-transform" aria-label={`Jump to ${s.label}`} />
              <span className="absolute left-6 whitespace-nowrap font-mono text-[10px] tracking-widest text-textMuted opacity-0 group-hover:opacity-100 transition-opacity bg-base/90 border border-border px-2 py-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RouteLine
