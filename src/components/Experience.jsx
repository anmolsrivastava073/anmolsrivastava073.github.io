import { motion } from 'framer-motion'
import { experience, education } from '../data/portfolioData'

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="sheet sheet-interactive flex flex-col md:flex-row gap-8 items-start"
    >
      <div className="w-16 h-16 border border-border bg-deep flex items-center justify-center shrink-0 p-3">
        <img src={item.image} className="w-full h-full object-contain" alt={item.title} />
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
          <h3 className="text-2xl font-bold text-textMain">{item.title}</h3>
          <span className="font-mono text-accent text-xs mt-1 md:mt-0 border border-accent/30 px-2 py-1 shrink-0 self-start">
            {item.role || item.location}
          </span>
        </div>
        <p className="text-textMuted leading-relaxed mt-4">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-mono text-accent tracking-widest uppercase mb-4 text-xs">Background</h2>
          <h3 className="font-display font-bold text-4xl md:text-5xl text-textMain tracking-tight">Experience &amp; Education</h3>
        </div>

        <div className="space-y-16">
          <div>
            <h4 className="text-xl font-mono text-textMain mb-8 border-b border-border pb-4 flex items-center gap-3 tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-accent"></span> Work History
            </h4>
            <div className="space-y-6">
              {experience.map((item, index) => <ExperienceCard key={index} item={item} index={index} />)}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-mono text-textMain mb-8 border-b border-border pb-4 flex items-center gap-3 tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-gold"></span> Academics
            </h4>
            <div className="space-y-6">
              {education.map((item, index) => <ExperienceCard key={index} item={item} index={index} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
