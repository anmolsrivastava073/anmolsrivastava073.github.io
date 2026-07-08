import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data/portfolioData'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  
  // Track scroll specifically for this card to create image parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="dev-card group flex flex-col h-full bg-[#0a0a0a] overflow-hidden relative"
    >
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-accent transition-colors duration-300 z-20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-accent transition-colors duration-300 z-20"></div>

      <div className="relative overflow-hidden h-64 mb-6 border border-border bg-base z-10">
        <div className="absolute inset-0 bg-base/40 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
        <motion.img 
          style={{ y: imageY }}
          src={project.image} 
          className="w-full h-[130%] object-cover transition-all duration-700 absolute top-[-15%]" 
          alt={project.title}
        />
      </div>

      <div className="flex-grow flex flex-col justify-between items-center text-center z-10">
        <div>
          <h4 className="font-bold text-2xl text-textMain mb-4">{project.title}</h4>
          <p className="text-textMuted text-sm leading-relaxed mb-6 font-mono">
            {project.desc}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          {project.stack && (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {project.stack.map((tech, i) => (
                <span key={i} className="text-xs font-mono text-textMuted border border-border px-2 py-1 bg-base">
                  {tech}
                </span>
              ))}
            </div>
          )}
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-block text-accent font-mono text-sm hover:text-accentHover transition-colors flex items-center gap-2 w-fit">
            <span>[ VISIT_DEPLOYMENT ]</span>
            <motion.span 
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="text-textMain"
            >
              &#x21B5;
            </motion.span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-32 px-6 border-t border-border bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <div>
            <h2 className="font-mono text-accent mb-2 tracking-widest text-sm">04. // WORK</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-textMain">Featured Projects</h3>
          </div>
          <a href="https://github.com/anmolsrivastava073/" target="_blank" rel="noreferrer" className="font-mono text-sm text-textMuted hover:text-textMain border-b border-border pb-1 transition-colors">
            VIEW_GITHUB_ARCHIVE &rarr;
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
