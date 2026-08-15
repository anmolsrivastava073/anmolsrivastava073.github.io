import { useState } from 'react'
import { motion } from 'framer-motion'

function Certificates() {
  const [showAll, setShowAll] = useState(false)

  const certs = [
    '/photos/jscert.png',
    '/photos/genai.png',
    '/photos/sqlcert.png',
    '/photos/pythoncert.png',
    '/photos/javacert.png',
    '/photos/jvcert.png',
    '/photos/jvoops.png',
  ]

  const visibleCerts = showAll ? certs : certs.slice(0, 3)

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-textMain mb-4">Certifications</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCerts.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card overflow-hidden group p-3 flex items-center justify-center cursor-pointer"
          >
            <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-white">
              <img
                src={cert}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                alt={`Certificate ${index + 1}`}
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {certs.length > 3 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-outline"
          >
            {showAll ? 'Show Less' : 'View All Certificates'}
          </button>
        </div>
      )}
    </section>
  )
}

export default Certificates
