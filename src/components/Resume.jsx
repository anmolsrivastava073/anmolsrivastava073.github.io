import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaDownload, FaEye, FaAward, FaXmark } from 'react-icons/fa6'

const certDetails = [
  { img: '/photos/jscert.png', title: 'JavaScript Specialist', issuer: 'Verified Coursework' },
  { img: '/photos/genai.png', title: 'Generative AI & LLMs', issuer: 'AI Program' },
  { img: '/photos/sqlcert.png', title: 'SQL & Relational Databases', issuer: 'Database Systems' },
  { img: '/photos/pythoncert.png', title: 'Python Programming', issuer: 'Core Python' },
  { img: '/photos/javacert.png', title: 'Core Java Programming', issuer: 'Java Enterprise' },
  { img: '/photos/jvcert.png', title: 'Advanced Java Development', issuer: 'Software Engineering' },
  { img: '/photos/jvoops.png', title: 'Object-Oriented Programming in Java', issuer: 'System Design & OOP' },
]

function Resume() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewerTitle, setViewerTitle] = useState('')

  const openModal = (imgSrc, title) => {
    setSelectedImage(imgSrc)
    setViewerTitle(title)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="resume" className="py-28 px-6 border-t border-zinc-800 bg-[#050507]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
            Resume
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Resume & Certifications
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            View it, download it, or just admire the formatting.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          
          <button 
            onClick={() => openModal('/photos/anmolfinalres.png', 'Anmol Srivastava - Resume')}
            className="p-8 rounded-lg bg-[#121215] border border-zinc-800 hover:border-indigo-500/60 transition-colors text-left flex flex-col justify-between h-48 cursor-pointer w-full group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-zinc-500 text-xs">&gt; view resume.pdf</span>
              <div className="p-2.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                <FaEye className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                <span>View Full Resume</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">PDF</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-2">Click to preview &rarr;</p>
            </div>
          </button>
          
          <a 
            href="/photos/AnmolResume.docx"
            target="_blank"
            rel="noreferrer"
            className="p-8 rounded-lg bg-[#121215] border border-zinc-800 hover:border-emerald-500/60 transition-colors text-left flex flex-col justify-between h-48 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-zinc-500 text-xs">&gt; download resume.docx</span>
              <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <FaDownload className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                <span>Download Resume</span>
                <span className="text-xs font-mono text-zinc-500 bg-[#09090b] border border-zinc-800 px-2 py-0.5 rounded">DOCX</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-2">Saves as a .docx file &rarr;</p>
            </div>
          </a>

        </div>

        {/* Certifications Showcase */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
            <h3 className="text-sm uppercase tracking-wider text-zinc-200 font-bold flex items-center gap-2">
              <FaAward className="text-indigo-400" />
              <span>Verified Certifications</span>
            </h3>
            <span className="font-mono text-xs text-zinc-500">{certDetails.length} Credentials</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {certDetails.map((cert, index) => (
              <div
                key={index}
                onClick={() => openModal(cert.img, cert.title)}
                className="p-3 rounded-lg bg-[#121215] border border-zinc-800 hover:border-indigo-500/60 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] rounded overflow-hidden bg-white p-2 flex items-center justify-center mb-3">
                  <img
                    src={cert.img}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                    alt={cert.title}
                  />
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2 py-1 rounded bg-zinc-950 text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/40">
                      VIEW
                    </span>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-zinc-200 group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {cert.title}
                  </h5>
                  <div className="text-[10px] font-mono text-zinc-500 mt-1">
                    {cert.issuer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal - Solid dark, Zero glass */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="bg-[#121215] border border-zinc-700 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex justify-between items-center px-5 py-3.5 border-b border-zinc-800 bg-[#09090b]">
                <span className="font-mono text-xs text-zinc-300 font-medium truncate max-w-md">
                  {viewerTitle}
                </span>

                <button
                  onClick={closeModal}
                  className="px-2.5 py-1 rounded bg-[#121215] border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FaXmark />
                  <span>CLOSE</span>
                </button>
              </div>
              
              {/* Image Preview */}
              <div className="flex-1 min-h-0 p-6 overflow-y-auto bg-[#050507] flex justify-center items-center">
                <img 
                  src={selectedImage} 
                  className="max-w-full max-h-[70vh] object-contain rounded shadow-lg" 
                  alt="Expanded Document" 
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-zinc-800 bg-[#09090b] flex items-center justify-end">
                <a
                  href={selectedImage}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-indigo-400 hover:underline flex items-center gap-1.5"
                >
                  <FaDownload className="text-[10px]" />
                  <span>Open Full Resolution</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Resume
