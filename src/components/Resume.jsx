import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Resume() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [viewerTitle, setViewerTitle] = useState("")

  const certs = [
    '/photos/jscert.png', '/photos/genai.png', '/photos/sqlcert.png',
    '/photos/pythoncert.png', '/photos/javacert.png', '/photos/jvcert.png', '/photos/jvoops.png'
  ]

  const openModal = (imgSrc, title) => {
    setSelectedImage(imgSrc)
    setViewerTitle(title)
  }

  return (
    <section id="resume" className="py-32 px-6 border-t border-border text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-accent mb-2 text-xs tracking-widest uppercase">Records</h2>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-textMain tracking-tight uppercase mb-12">Resume &amp; Certificates</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <button 
            onClick={() => openModal('/photos/anmolfinalres.png', 'viewer://resume.pdf')}
            className="sheet bg-surface text-left group hover:bg-deep transition-colors flex flex-col justify-between h-48 cursor-pointer w-full"
          >
            <span className="font-mono text-textMuted text-xs mb-4 block">resume.pdf</span>
            <div>
              <h4 className="text-2xl font-bold text-textMain group-hover:text-accent transition-colors">View Resume</h4>
              <p className="font-mono text-sm text-textMuted mt-2">opens in a viewer</p>
            </div>
          </button>
          
          <a 
            href="/photos/AnmolResume.docx"
            target="_blank"
            rel="noreferrer"
            className="sheet bg-surface text-left group hover:bg-deep transition-colors flex flex-col justify-between h-48"
          >
            <span className="font-mono text-textMuted text-xs mb-4 block">resume.docx</span>
            <div>
              <h4 className="text-2xl font-bold text-textMain group-hover:text-accent transition-colors">Download Resume</h4>
              <p className="font-mono text-sm text-textMuted mt-2">.docx file</p>
            </div>
          </a>
        </div>

        {/* Certificates */}
        <div className="mt-16 text-left">
          <h4 className="font-mono text-textMuted border-b border-border pb-4 mb-6 text-xs tracking-widest uppercase">Certificates</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
             {certs.map((cert, index) => (
                <motion.button
                  key={index}
                  onClick={() => openModal(cert, `viewer://certificate_${index + 1}.png`)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border aspect-square relative group overflow-hidden bg-white cursor-pointer w-full"
                >
                  <img src={cert} className="w-full h-full object-contain p-2 transition-all duration-300" alt={`Cert ${index}`} />
                  <div className="absolute inset-0 bg-accent mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none"></div>
                </motion.button>
             ))}
          </div>
        </div>
      </div>

      {/* Strict Solid Modal (No glassmorphism) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-base/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface border border-border w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-border bg-base">
                <span className="font-mono text-xs text-textMuted">{viewerTitle}</span>
                <button onClick={() => setSelectedImage(null)} className="text-textMuted hover:text-accent font-mono text-sm uppercase">
                  [ close ]
                </button>
              </div>
              
              <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-deep flex justify-center items-start">
                <img 
                  src={selectedImage} 
                  className="max-w-full h-auto filter contrast-125" 
                  alt="Expanded View" 
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Resume
