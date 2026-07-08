// src/components/Experience.jsx
import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { experience, education } from '../data/portfolioData'

function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 border-t border-border bg-base relative">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-20 text-center">
          <h2 className="font-mono text-accent mb-2">02. //EXPERIENCE && EDUCATION</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-textMain">Experience & Education</h3>
        </div>

        <div className="relative flex gap-12">
          {/* Animated SVG Timeline Line */}
          <div className="relative w-px hidden md:block">
            <div className="absolute top-0 bottom-0 left-0 w-px bg-border"></div>
            <motion.div 
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }} 
              className="absolute top-0 bottom-0 left-0 w-px bg-accent"
            />
          </div>

          <div className="flex-1 space-y-16">
            {/* Map through Experience */}
            <div>
              <h4 className="font-mono text-textMain border-b border-border pb-4 mb-8 text-center">SUBJECT: EXPERIENCE</h4>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <motion.div 
                    key={`exp-${index}`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="dev-card bg-surface relative overflow-hidden group"
                  >
                    {/* Background Banner */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 z-0"
                      style={{ backgroundImage: `url(${item.banner})` }}
                    />

                    {/* Connection dot */}
                    <div className="hidden md:block absolute -left-[51px] top-8 w-2 h-2 bg-base border border-accent z-10"></div>
                    
                    {/* Card Content (z-10 ensures it stays above the banner) */}
                    <div className="flex items-start gap-4 relative z-10">
                      <img src={item.image} className="w-10 h-10 object-contain rounded bg-base/50 p-1" alt={item.title} />
                      <div>
                        <h3 className="font-bold text-lg text-textMain">{item.title}</h3>
                        <p className="font-mono text-accent text-sm mt-1">{item.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map through Education */}
            <div>
              <h4 className="font-mono text-textMain border-b border-border pb-4 mb-8 text-center">SUBJECT: EDUCATION</h4>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div 
                    key={`edu-${index}`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="dev-card bg-surface relative overflow-hidden group"
                  >
                     {/* Background Banner */}
                     <div 
                      className="absolute inset-0 bg-cover bg-center opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 z-0"
                      style={{ backgroundImage: `url(${item.banner})` }}
                    />

                    {/* Card Content */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-start gap-4">
                        <img src={item.image} className="w-10 h-10 bg-white/90 object-contain rounded p-1" alt={item.title} />
                        <div>
                          <h3 className="font-bold text-lg text-textMain">{item.title}</h3>
                          <p className="font-mono text-textMuted text-sm mt-1">{item.location}</p>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-textMuted max-w-xs text-right hidden md:block">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
