import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaGithub, FaRocket, FaEnvelope, FaLocationDot } from 'react-icons/fa6'

const TYPING_TITLES = [
  'Full Stack Web Developer',
  'Java & Spring Boot Specialist',
  'React & Modern Frontend Engineer',
  'CS Undergrad @ Manipal University Jaipur'
]

function Hero() {
  const heroRef = useRef(null)
  const [titleIndex, setTitleIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  // Scroll animations
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  // Elegant interval-based cycling
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length)
    }, 3500)

    return () => clearInterval(intervalId)
  }, [])

  // ----------------------------------------------------
  // ANIMATION VARIANTS FOR SLOW STAGGERED FADE-IN ON LOAD
  // ----------------------------------------------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Delay between each element fading in
        delayChildren: 0.3,    // Initial wait before starting
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, // Slow 1.2 second fade for each item
        ease: [0.16, 1, 0.3, 1] // Super smooth custom easing
      } 
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050507] pt-28 pb-20 px-6"
    >
      {/* LAYER 1: The Image */}
      <motion.div
        style={{
          y: bgY,
          WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.1) 100%)',
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.1) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }} // Very slow background fade-in
        className="absolute inset-0 w-full h-full z-0"
      >
        <img
          src="/photos/front.png"
          alt="Presentation Background"
          className="w-full h-full object-cover object-center blur-[3px] brightness-[1.3] contrast-125" 
        />
      </motion.div>

      {/* LAYER 2: The Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/60 via-transparent to-[#050507]/60 z-[1]" />

      {/* LAYER 3: The Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Outer motion.div handles the scroll away animations */}
        <motion.div
          style={{ y: textY, opacity }}
          className="w-full flex flex-col items-center"
        >
          {/* Inner motion.div handles the slow fade-in on load */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center"
          >
            
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215]/80 border border-zinc-700 text-xs mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-200">Open to opportunities</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 flex items-center gap-1">
                <FaLocationDot className="text-indigo-400 text-[10px]" />
                Jaipur, India
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-100 leading-none mb-1">
              ANMOL
            </motion.h1>
            
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-400 leading-none mb-6">
              SRIVASTAVA<span className="text-indigo-500">.</span>
            </motion.h1>

            {/* Premium Vertical Slide & Fade Animation */}
            <motion.div variants={itemVariants} className="h-8 mb-6 flex items-center justify-center font-mono text-base sm:text-lg text-yellow-50 overflow-hidden relative w-full">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ 
                    duration: 0.5, 
                    type: 'spring', 
                    stiffness: 250, 
                    damping: 25 
                  }}
                  className="font-semibold absolute text-center w-full"
                >
                  {TYPING_TITLES[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center justify-start mt-2">
              <a href="#projects"
                className="px-7 py-3.5 bg-zinc-100 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-colors flex items-center gap-2 rounded-sm shadow-md group"
              >
                <FaRocket className="text-xs" />
                <span>View Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
              </a>

              <a href="#contributions"
                className="px-7 py-3.5 bg-[#121215] border border-zinc-800 hover:border-zinc-600 text-zinc-200 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 rounded-sm"
              >
                <FaGithub className="text-indigo-400 text-sm" />
                <span>Contributions</span>
              </a>

              <a href="#contact"
                className="px-6 py-3.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 rounded-sm"
              >
                <FaEnvelope className="text-xs" />
                <span>Contact</span>
              </a>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
