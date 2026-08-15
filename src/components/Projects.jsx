import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { projects } from '../data/portfolioData'

function ProjectCard({ project, index }) {
  // 3D Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="sheet sheet-interactive block h-full overflow-hidden group relative !p-0"
      >
        <div style={{ transform: "translateZ(30px)" }} className="relative h-64 overflow-hidden bg-deep border-b border-border">
          <div className="absolute inset-0 bg-base/25 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
          <img
            src={project.image}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            alt={project.title}
          />
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="p-8">
          <h4 className="font-display font-bold text-2xl text-textMain mb-4 group-hover:text-accent transition-colors">{project.title}</h4>
          <p className="text-textMuted text-sm leading-relaxed mb-8">
            {project.desc}
          </p>

          {project.stack && (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span key={i} className="text-[11px] font-mono tracking-widest uppercase text-textMuted border border-border px-2.5 py-1">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.a>
    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="font-mono text-accent tracking-widest uppercase mb-4 text-xs">Portfolio</h2>
            <h3 className="font-display font-bold text-4xl md:text-5xl text-textMain tracking-tight">Selected Works</h3>
          </div>
          <a href="https://github.com/anmolsrivastava073/" target="_blank" rel="noreferrer" className="btn-stamp btn-stamp-ghost">
            View GitHub Archive &rarr;
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
