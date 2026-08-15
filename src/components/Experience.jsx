import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCalendar, FaLocationDot } from 'react-icons/fa6'
import { experience, education } from '../data/portfolioData'

function Experience() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  return (
    <section id="experience" ref={containerRef} className="py-28 px-6 border-t border-zinc-800 bg-[#050507] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
            Where I've been
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Experience & Education
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Places I've worked, contributed to, and studied at.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Scroll Progress Line */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-px bg-zinc-800">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="absolute inset-0 w-px bg-indigo-500 shadow-[0_0_10px_#6366f1]"
            />
          </div>

          <div className="space-y-12">

            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-6 md:pl-20">
                <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <FaBriefcase className="w-4 h-4" />
                </div>
                <h3 className="text-sm uppercase tracking-wider text-zinc-200 font-bold">
                  Work & Open Source
                </h3>
              </div>

              <div className="space-y-6 md:pl-20">
                {experience.map((item, idx) => (
                  <motion.div
                    key={`exp-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-[#121215] relative overflow-hidden group border border-zinc-800 hover:border-indigo-500/50 rounded-lg transition-colors"
                  >
                    <div className="hidden md:block absolute -left-[53px] top-8 w-3.5 h-3.5 rounded-full bg-[#050507] border-2 border-indigo-500 z-20 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          className="w-14 h-14 object-contain rounded-md bg-[#09090b] p-1.5 border border-zinc-800"
                          alt={item.title}
                        />
                        <div>
                          <h4 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-emerald-400 mt-0.5 font-medium">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400 bg-[#09090b] px-3 py-1.5 rounded border border-zinc-800 self-start md:self-auto">
                        <FaCalendar className="text-indigo-400 text-[11px]" />
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="pt-6">
              <div className="flex items-center gap-3 mb-6 md:pl-20">
                <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <FaGraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-sm uppercase tracking-wider text-zinc-200 font-bold">
                  Education
                </h3>
              </div>

              <div className="space-y-6 md:pl-20">
                {education.map((item, idx) => (
                  <motion.div
                    key={`edu-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 bg-[#121215] relative overflow-hidden group border border-zinc-800 hover:border-cyan-500/50 rounded-lg transition-colors"
                  >
                    <div className="hidden md:block absolute -left-[53px] top-8 w-3.5 h-3.5 rounded-full bg-[#050507] border-2 border-cyan-500 z-20 group-hover:scale-125 transition-transform" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          className="w-14 h-14 object-contain rounded-md bg-white p-1 border border-zinc-800"
                          alt={item.title}
                        />
                        <div>
                          <h4 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                            <FaLocationDot className="text-indigo-400 text-[11px]" />
                            <span>{item.location}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-zinc-400 bg-[#09090b] px-3 py-1.5 rounded border border-zinc-800 max-w-sm text-left md:text-right self-start md:self-auto">
                        {item.desc}
                      </div>
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
