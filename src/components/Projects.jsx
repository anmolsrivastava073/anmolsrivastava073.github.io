import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import { projects } from '../data/portfolioData'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-0 rounded-lg bg-[#121215] relative overflow-hidden group border border-zinc-800 hover:border-indigo-500/60 transition-colors flex flex-col justify-between"
    >
      {/* Image Preview with Parallax */}
      <div className="relative overflow-hidden h-64 border-b border-zinc-800 bg-[#09090b]">
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-[#121215] border border-zinc-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Project</span>
        </div>

        <motion.img 
          style={{ y: imageY }}
          src={project.image} 
          className="w-full h-[120%] object-cover object-top filter group-hover:scale-105 transition-transform duration-500 absolute top-[-10%]" 
          alt={project.title}
        />
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
        <div>
          <h4 className="font-bold text-2xl text-zinc-100 group-hover:text-indigo-400 transition-colors mb-3">
            {project.title}
          </h4>

          <p className="text-zinc-400 text-sm font-mono leading-relaxed mb-6">
            {project.desc}
          </p>
        </div>
        
        <div>
          {/* Tech Stack Pills */}
          {project.stack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs font-mono text-zinc-400 border border-zinc-800 px-2.5 py-1 bg-[#09090b] rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-colors rounded-sm group/btn"
            >
              <span>Visit Website</span>
              <FaArrowUpRightFromSquare className="text-[10px]" />
            </a>

            <a 
              href="https://github.com/anmolsrivastava073" 
              target="_blank" 
              rel="noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              <FaGithub className="text-sm" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  
  const filterOptions = ['All', 'React & Web', 'AI Systems', 'Utilities']

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true
    if (filter === 'React & Web') return p.stack.includes('React') || p.stack.includes('Tailwind CSS')
    if (filter === 'AI Systems') return p.stack.includes('AI')
    if (filter === 'Utilities') return p.stack.includes('Maps') || p.stack.includes('Sustainability')
    return true
  })

  return (
    <section id="projects" className="py-28 px-6 border-t border-zinc-800 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Projects
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
              Stuff I've built
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              A few things I'm genuinely proud of. Some still evolving, some shipped.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-3.5 py-1.5 font-mono text-xs border rounded-sm transition-colors ${
                  filter === opt
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold'
                    : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-[#121215]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Archive Banner */}
        <div className="mt-14 p-6 rounded-lg bg-[#121215] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-zinc-200">Want to see more?</h4>
            <p className="text-xs text-zinc-400 mt-1">All my repos are on GitHub — open source and free to explore.</p>
          </div>

          <a
            href="https://github.com/anmolsrivastava073"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#09090b] border border-zinc-800 hover:border-indigo-500 text-zinc-200 hover:text-indigo-400 text-xs font-bold transition-colors rounded-sm whitespace-nowrap"
          >
            View all on GitHub &rarr;
          </a>
        </div>

      </div>
    </section>
  )
}

export default Projects
