import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mkgvndga", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (response.ok) {
        form.reset()
        setSubmitted(true)
      }
    } catch (error) {
      alert("Error sending message.")
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="py-32 px-6 relative z-10 border-t border-border bg-base">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        <div className="flex flex-col justify-center">
          
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-textMuted tracking-widest text-xs uppercase">05</span>
            <div className="h-[1px] w-12 bg-border" />
            <span className="font-mono text-primary font-bold tracking-widest text-xs uppercase">Contact</span>
          </div>

          <h3 className="font-display font-bold text-4xl md:text-6xl text-textMain tracking-tight mb-8 leading-[1.1] uppercase">
            Let's build something <br/> <span className="text-accent">together.</span>
          </h3>
          <p className="text-textMuted text-lg leading-relaxed mb-12 font-medium">
            I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to connect, I'd love to hear from you.
          </p>

          <div className="flex gap-4 flex-wrap mb-16">
            {[
              { icon: <FaGithub />, link: "https://github.com/Anmol-Srivastava-073" },
              { icon: <FaLinkedin />, link: "https://linkedin.com/in/anmol-srivastava-46430727a" },
              { icon: <FaXTwitter />, link: "https://x.com/anmol_sriv073" },
              { icon: <FaInstagram />, link: "https://instagram.com/anmol_sriv.073" },
              { icon: <SiSubstack />, link: "https://substack.com/@anmolsriv073" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="bg-surface border border-border text-textMuted hover:text-accent hover:border-accent text-xl p-4 rounded-md transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Visitor Counter Added Here */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-textMuted text-[10px] tracking-widest uppercase">
              Portfolio Traffic
            </span>
            <img 
              src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fanmolsrivastava073.github.io&label=VISITORS&labelColor=%23151C2C&countColor=%237C3AED&style=flat" 
              alt="Visitor Count" 
              className="h-7 rounded-sm self-start shadow-sm"
            />
          </div>

        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="sheet flex flex-col gap-8 shadow-premium"
        >
          <div className="flex flex-col group">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-textMuted mb-3 group-focus-within:text-accent transition-colors">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="field-input text-sm"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col group">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-textMuted mb-3 group-focus-within:text-accent transition-colors">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="field-input text-sm"
              placeholder="name@example.com"
            />
          </div>

          <div className="flex flex-col group">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-textMuted mb-3 group-focus-within:text-accent transition-colors">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="field-input resize-none text-sm"
              placeholder="How can I help you?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-stamp w-full justify-center disabled:opacity-50 mt-2"
          >
            {loading ? "Transmitting..." : "Send Message"}
          </button>

          {submitted && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center font-mono text-[10px] font-bold tracking-widest uppercase text-accent py-4 border border-accent/30 bg-accent/5 rounded-md mt-2">
              Message delivered — I'll be in touch soon.
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact