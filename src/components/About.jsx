import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  })

  // Subtle parallax for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 border-t border-border bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
        
        <div className="md:col-span-5 relative h-[600px] border border-border overflow-hidden bg-surface group">
          <motion.div 
            initial={{ height: "100%" }}
            whileInView={{ height: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-textMain z-20"
          />
          <motion.img
            style={{ y: imageY }}
            src="/photos/anmol.jpeg"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
            alt="Anmol Srivastava"
          />
          {/* Technical overlay metrics */}
          <div className="absolute bottom-4 left-4 z-30 font-mono text-xs text-textMain bg-base border border-border p-2">
            USER: ANMOL_SRIVASTAVA <br/>
            STATUS: OPEN TO WORK
          </div>
        </div>

        <div className="md:col-span-7">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-accent mb-4 tracking-widest text-sm"
          >
            01. // ABOUT_ME
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-textMain mb-8 tracking-tight"
          >
            Engineering at the intersection of logic and scale.
          </motion.h3>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 text-textMuted font-mono text-sm leading-relaxed"
          >
            <p>
                I'm a Computer Science student who enjoys building software and solving problems through code. I like turning ideas into practical applications while continuously learning new technologies and improving my development skills.
            </p>

            <p>
                Lately, I've been focused on building web applications and software that solve real-world problems. I care about writing clean, reliable code and creating products that are simple to use, perform well, and make a positive impact.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default About
