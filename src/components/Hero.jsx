import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  useEffect(() => {
    const fullText = TYPING_TITLES[titleIndex]
    const typingSpeed = isDeleting ? 30 : 60

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
        if (currentText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))
        if (currentText.length === 0) {
          setIsDeleting(false)
          setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, titleIndex])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050507] pt-28 pb-20 px-6"
    >
      {/* Background Presentation Photo Layer */}
      <motion.div
  style={{ y: bgY }}
  className="absolute inset-0 z-0 pointer-events-none"
>
  <img
    src="/photos/front.png"
    alt="Presentation Background"
    className="w-full h-full object-cover object-center opacity-65"
  />
  {/* Dark gradient for text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/10 via-[#050507]/25 to-[#050507]/75" />
  {/* Subtle side vignette */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/45 via-transparent to-[#050507]/45" />
</motion.div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          style={{ y: textY, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-zinc-800 text-xs mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerged-500 bg-emerald-500 animate-pulse" />
            <span className="text-zinc-200">Open to opportunities</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 flex items-center gap-1">
              <FaLocationDot className="text-indigo-400 text-[10px]" />
              Jaipur, India
            </span>
          </div>

          {/* Bold Name Headlines */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-100 leading-none mb-1">
            ANMOL
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-400 leading-none mb-6">
            SRIVASTAVA<span className="text-indigo-500">.</span>
          </h1>

          {/* Dynamic Typing Title */}
          <div className="h-8 mb-6 flex items-center justify-center font-mono text-base sm:text-lg text-indigo-400">
            <span className="font-semibold">{currentText}</span>
            <span className="w-2 h-5 bg-indigo-500 ml-1.5 animate-pulse" />
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
              href="#projects"
              className="px-7 py-3.5 bg-zinc-100 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-indigo-500 hover:text-white transition-colors flex items-center gap-2 rounded-sm shadow-md group"
            >
              <FaRocket className="text-xs" />
              <span>View Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>

            <a
              href="#contributions"
              className="px-7 py-3.5 bg-[#121215] border border-zinc-800 hover:border-zinc-600 text-zinc-200 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 rounded-sm"
            >
              <FaGithub className="text-indigo-400 text-sm" />
              <span>Contributions</span>
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 rounded-sm"
            >
              <FaEnvelope className="text-xs" />
              <span>Contact</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default Hero
