import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaServer, FaBrain } from 'react-icons/fa6'

function About() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotateX(-y * 0.04)
    setRotateY(x * 0.04)
  }

  const handleCardMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <section id="about" className="py-28 px-6 border-t border-zinc-800 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left">
          <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
            About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            I write code. Sometimes it works.
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Interactive Tilt Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-full max-w-sm group"
            >
              {/* macOS Window Card */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80" style={{ background: '#1c1c1e' }}>

                {/* macOS Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800" style={{ background: '#232325' }}>
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all cursor-default" title="Close" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all cursor-default" title="Minimise" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all cursor-default" title="Full Screen" />
                  <span className="flex-1 text-center text-[11px] text-zinc-500 select-none -ml-14 font-medium">anmol.jpg</span>
                </div>

                {/* Profile Photo */}
                <div className="relative overflow-hidden bg-[#09090b]">
                  <img
                    src="/photos/anmol.jpeg"
                    alt="Anmol Srivastava"
                    className="w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  
                </div>

              </div>

            </motion.div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed">
              <p>
                Hey, I'm Anmol - A second-year CS student at <span className="text-zinc-100 font-semibold">Manipal University Jaipur</span>. I got into programming because I liked the idea of building things from nothing, and I haven't stopped since.
              </p>
              <p>
                I mostly work with Java on the backend and React on the frontend. When I'm not building apps, I'm probably reading about AI, contributing to open source, or debugging something that "should've worked" three hours ago.
              </p>
              <p>
                Outside of coding, I follow tech news a bit too closely, and enjoy a good conversation about where software is headed.
              </p>
            </div>

            {/* Simple Tag Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Java', 'React', 'Spring Boot', 'MySQL', 'Open Source', 'AI tools'].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-400 bg-zinc-900/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default About
