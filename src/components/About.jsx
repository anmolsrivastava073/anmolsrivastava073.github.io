import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Slower, more deliberate parallax scroll for the image
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <section id="about" className="py-32 px-6 relative z-10 border-t border-border bg-base overflow-hidden" ref={ref}>
      
      {/* Structural Architectural Lines matching the Hero */}
      <div className="absolute inset-0 z-0 flex justify-between px-8 md:px-24 pointer-events-none opacity-20">
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border" />
        <div className="w-[1px] h-full bg-border hidden md:block" />
      </div>

      {/* Massive Editorial Watermark */}
      <div className="absolute top-40 -left-10 font-display font-bold text-[8rem] md:text-[14rem] text-surface select-none z-0 tracking-tighter whitespace-nowrap opacity-60">
        IDENTITY.
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative px-4 md:px-0"
        >
          {/* Sharp Editorial Frames (No rounded corners) */}
          <div className="absolute top-8 -left-4 w-full h-full bg-primary/10 border border-primary z-0" />
          <div className="absolute -top-4 left-8 w-full h-full border border-accent z-0" />
          
          <div className="relative h-[650px] z-10 overflow-hidden shadow-premium bg-surface border border-border">
            <motion.img
              style={{ y: imgY }}
              src="/photos/anmol.jpeg"
              className="w-full h-[125%] object-cover object-center"
              alt="Anmol Srivastava"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-base/80 backdrop-blur-sm p-4 md:p-0"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-textMuted tracking-widest text-xs uppercase">01</span>
            <div className="h-[1px] w-12 bg-border" />
            <span className="font-mono text-primary font-bold tracking-widest text-xs uppercase">About Me</span>
          </div>
          
          <h3 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-textMain mb-10 tracking-tight leading-[1.05] uppercase">
            Bridging <br/> <span className="text-accent">Logic & Design.</span>
          </h3>

          <div className="space-y-6 text-textMuted text-lg leading-relaxed font-medium">
            <p>
              I am a Computer Science student at Manipal University Jaipur, driven by the structural architecture of the web. I thrive on translating complex technical requirements into seamless, high-performance digital experiences.
            </p>
            <p>
              My expertise spans full-stack development, API integrations, and robust backend engineering. Whether I am building intelligent clinical history tools like Veritas—leveraging the Claude API for structured symptom gathering—or developing campus platforms like MUJ Navigator, my focus remains strictly on scalable impact.
            </p>
            <p>
              When I am not writing code or rotating API keys, I am actively building alongside the Tech team in the Google Developers Group Community on campus, or optimizing deployment pipelines across Render and Supabase.
            </p>
          </div>

          {/* Premium Data Accents */}
          <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
            <div className="flex flex-col">
              <span className="font-mono text-accent text-3xl font-bold">FS</span>
              <span className="font-mono text-textMuted text-[10px] tracking-widest uppercase mt-2">Full-Stack Dev</span>
            </div>
            <div className="w-[1px] h-10 bg-border" />
            <div className="flex flex-col">
              <span className="font-mono text-primary text-3xl font-bold">AI</span>
              <span className="font-mono text-textMuted text-[10px] tracking-widest uppercase mt-2">LLM Integration</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About