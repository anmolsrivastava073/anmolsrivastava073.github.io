import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Certificates() {
  const [showAll, setShowAll] = useState(false)
  const certs = ['/photos/jscert.png', '/photos/genai.png', '/photos/sqlcert.png', '/photos/pythoncert.png', '/photos/javacert.png', '/photos/jvcert.png', '/photos/jvoops.png']
  const visibleCerts = showAll ? certs : certs.slice(0, 3)

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-mono text-accent tracking-widest uppercase mb-4 text-xs">Credentials</h2>
          <h3 className="font-display font-bold text-4xl md:text-5xl text-textMain tracking-tight">Certifications</h3>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleCerts.map((cert, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="sheet !p-2 overflow-hidden cursor-pointer"
              >
                <img src={cert} className="w-full h-56 object-cover" alt={`Certificate ${index}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {certs.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-stamp btn-stamp-ghost"
            >
              {showAll ? 'Show Less' : 'View All Certificates'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
