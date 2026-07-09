import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Fade out and translate down as user scrolls away
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section id="hero" ref={ref} className="min-h-screen w-full flex items-center relative overflow-hidden bg-base">
      
      {/* Cinematic Background Image Layer */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      >
        {/* Opacity applied directly to the image */}
        <img 
          src="/photos/front.png" 
          alt="Presentation Background" 
          className="w-full h-full object-cover object-center opacity-30 md:opacity-40"
        />
        {/* Softened gradients to frame the image without hiding it */}
        <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-base/40 to-base"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-transparent to-base/90"></div>
      </motion.div>

      {/* Inner wrapper to keep text aligned with the rest of the portfolio */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-20 relative z-10">
        <motion.div 
          style={{ y: textY, opacity }}
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full pl-0 md:pl-12 border-l-4 border-accent"
        >
          <motion.div variants={item} className="font-mono text-accent mb-6 flex items-center gap-2 text-sm bg-base/50 w-fit pr-4 py-1 rounded-r-md backdrop-blur-sm border border-l-0 border-border/50">
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-3 h-3 bg-accent inline-block"
            />
            System Status: Online
          </motion.div>
          
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-2 text-textMain leading-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            ANMOL
          </motion.h1>
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-textMuted leading-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            SRIVASTAVA.
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-textMain max-w-2xl leading-relaxed mb-10 font-mono text-sm border-l border-border pl-4 bg-base/50 backdrop-blur-md py-3 pr-4 rounded-r-lg shadow-xl">
            <span data-nosnippet>
              &gt; Full Stack Web Developer & CS Undergrad.<br/>
              &gt; Specializing in Java Development and Data Structures.<br/>
              &gt; Architecting tools which benefit people.
            </span>
          </motion.p>

          <motion.div variants={item} className="flex gap-4 flex-wrap">
            <a href="#projects" className="bg-textMain text-base font-bold px-8 py-4 hover:bg-accent hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center gap-2 group shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              View Projects
              <span className="font-mono font-normal group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>
            <a href="https://github.com/Anmol-Srivastava-073/portfolio" target="_blank" rel="noreferrer" className="border border-border bg-base/60 backdrop-blur-md text-textMain font-bold px-8 py-4 hover:border-textMain hover:bg-base/80 transition-colors uppercase tracking-widest text-sm shadow-lg">
              View Source Code
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
