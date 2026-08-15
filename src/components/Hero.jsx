import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section id="hero" ref={ref} className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-base">
      
      {/* Structural Architectural Lines for a Premium Matte finish */}
      <div className="absolute inset-0 z-0 flex justify-between px-8 md:px-24 pointer-events-none opacity-30">
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border hidden md:block" />
      </div>

      {/* Massive Editorial Watermark (Adds depth without gloss) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[12rem] md:text-[20rem] lg:text-[28rem] text-surface select-none z-0 tracking-tighter whitespace-nowrap">
        CREATE.
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 pt-20 relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ y, opacity }} className="w-full flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="text-textMuted font-mono flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-md border border-border bg-base/80 backdrop-blur-md">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Building MUJ Navigator & Veritas
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter mb-8 text-textMain leading-[1.05] uppercase"
          >
            Engineering the <br/>
            <span className="text-primary">Digital Future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-textMuted max-w-2xl text-lg md:text-xl leading-relaxed mb-12 font-medium"
          >
            I am Anmol Srivastava. I engineer high-performance web applications and integrate intelligent systems using tools like the Claude API, bridging the gap between raw data and premium user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-5 flex-wrap justify-center"
          >
            <a href="#projects" className="btn-stamp">
              Explore Work
            </a>
            <a href="https://github.com/Anmol-Srivastava-073" target="_blank" rel="noreferrer" className="btn-stamp btn-stamp-ghost">
              GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero