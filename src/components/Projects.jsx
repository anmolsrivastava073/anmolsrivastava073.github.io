import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import { projects } from '../data/portfolioData'
import { Magnetic, customEase } from '../utils/animations'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
}

function ProjectRow({ project, index }) {
  const rowRef = useRef(null)
  
  const { scrollYProgress } = useScroll({ 
    target: rowRef, 
    offset: ['start 90%', 'end 10%'] 
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, restDelta: 0.001 })

  // Parallax calculations
  const yImage = useTransform(smoothProgress, [0, 1], ["-8%", "8%"])
  const yText = useTransform(smoothProgress, [0, 1], ["12%", "-12%"])

  const isEven = index % 2 === 0

  return (
    <motion.div 
      ref={rowRef}
      className={`group relative py-16 md:py-24 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0`}
    >
      {/* 1. Narrower Image Container */}
      <motion.div
        initial={{ clipPath: 'inset(10% 10% 10% 10% round 24px)', filter: 'blur(10px)', opacity: 0, scale: 0.95 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', filter: 'blur(0px)', opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: customEase }}
        className="w-full md:w-[55%] relative aspect-[4/3] overflow-hidden bg-[#121215] shadow-2xl z-10"
      >
        <motion.img
          style={{ y: yImage, scale: 1.15 }}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-[120%] object-cover object-top will-change-transform group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>

      {/* 2. Overlapping Text Container */}
      <motion.div
        style={{ y: yText }}
        className={`w-full md:w-[55%] flex flex-col justify-center relative z-20 ${isEven ? 'md:-ml-12 md:pl-0' : 'md:-mr-12 md:pr-0'}`}
      >
        <motion.div 
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="p-8 md:p-10 rounded-2xl bg-[#0d0d10]/95 backdrop-blur-2xl border border-white/5 shadow-2xl group-hover:border-indigo-500/30 transition-colors duration-700"
        >
          
          <motion.div variants={itemVariants} className="flex gap-2 flex-wrap mb-5">
            {project.stack?.map((tech, i) => (
              <span 
                key={i}
                className="text-[10px] uppercase font-mono tracking-widest text-zinc-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-colors duration-500"
              >
                {tech}
              </span>
            ))}
          </motion.div>
          
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-zinc-100 mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">
            {project.title}
          </motion.h3>
          
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-indigo-500 to-transparent scale-y-75 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
            <p className="text-zinc-400 text-sm leading-relaxed pl-5 group-hover:text-zinc-300 transition-colors duration-500">
              {project.desc}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Magnetic intensity={0.15}>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-xs font-bold text-black uppercase tracking-widest group/btn relative overflow-hidden px-6 py-3.5 bg-zinc-100 hover:bg-indigo-500 hover:text-white rounded-full transition-colors duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                <span className="relative z-10">Live Site</span>
                <FaArrowUpRightFromSquare className="relative z-10 text-[10px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500"/>
              </a>
            </Magnetic>

            <Magnetic intensity={0.15}>
              <a 
                href="https://github.com/anmolsrivastava073" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-500 px-5 py-3.5 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5"
              >
                <FaGithub className="text-lg"/>
                <span className="text-xs uppercase tracking-widest font-mono">Source</span>
              </a>
            </Magnetic>
          </motion.div>

        </motion.div>
      </motion.div>

    </motion.div>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-32 px-6 border-t border-zinc-800 bg-[#050507] overflow-hidden">
      {/* Changed max-w-7xl to max-w-5xl here for a tighter, narrower layout */}
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-24 md:flex items-end justify-between pb-8 relative">
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-widest text-indigo-500 font-mono mb-4">
              // FEATURED ARCHITECTURE
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-zinc-100">
              Selected <br/> Works<span className="text-indigo-500">.</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-sm max-w-xs mt-6 md:mt-0 text-left md:text-right relative z-10">
            A curation of systems, interfaces, and algorithms built for scale and impact.
          </p>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow index={index} key={project.title} project={project}/>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
