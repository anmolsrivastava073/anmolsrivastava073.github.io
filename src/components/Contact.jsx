import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

function Contact() {
  const [focusedInput, setFocusedInput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setSubmitted(false)

    const form = e.target
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mkgvndga", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        form.reset()
        setSubmitted(true)
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      alert("Unable to send your message. Please try again later.")
    }

    setLoading(false)
  }

  return (
    <section
      id="contact"
      className="py-32 px-6 border-t border-border bg-base"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Left Section */}
        <div>
          <h2 className="font-mono text-accent mb-2">
            06. // COMMUNICATION
          </h2>

          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-textMain mb-6">
            Let's Build Connection?
          </h3>

          <p className="font-mono text-sm text-textMuted leading-relaxed mb-10 max-w-md">
            The network is open. Whether it's a project collaboration,
            open-source discussion, or system inquiry, transmitting a
            message below will ping me directly.
          </p>

          <div className="flex gap-6">
            {[
              {
                icon: <FaGithub />,
                link: "https://github.com/Anmol-Srivastava-073",
              },
              {
                icon: <FaLinkedin />,
                link: "https://linkedin.com/in/anmol-srivastava-46430727a",
              },
              {
                icon: <FaXTwitter />,
                link: "https://x.com/anmol_sriv073",
              },
              {
                icon: <FaInstagram />,
                link: "https://instagram.com/anmol_sriv.073",
              },
              {
                icon: <SiSubstack />,
                link: "https://substack.com/@anmolsriv073",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="text-textMuted hover:text-textMain text-xl border border-border p-3 hover:border-textMain transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border p-8 flex flex-col gap-6 relative"
        >
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent"></div>

          {/* Name */}
          <div className="flex flex-col">
            <label
              className={`font-mono text-xs mb-2 transition-colors ${
                focusedInput === "name"
                  ? "text-accent"
                  : "text-textMuted"
              }`}
            >
              &gt; YOUR NAME
            </label>

            <input
              type="text"
              name="name"
              required
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
              className="bg-base border border-border text-textMain font-mono text-sm p-4 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              className={`font-mono text-xs mb-2 transition-colors ${
                focusedInput === "email"
                  ? "text-accent"
                  : "text-textMuted"
              }`}
            >
              &gt; YOUR EMAIL
            </label>

            <input
              type="email"
              name="email"
              required
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              className="bg-base border border-border text-textMain font-mono text-sm p-4 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label
              className={`font-mono text-xs mb-2 transition-colors ${
                focusedInput === "message"
                  ? "text-accent"
                  : "text-textMuted"
              }`}
            >
              &gt; YOUR MESSAGE
            </label>

            <textarea
              name="message"
              rows="4"
              required
              onFocus={() => setFocusedInput("message")}
              onBlur={() => setFocusedInput(null)}
              className="bg-base border border-border text-textMain font-mono text-sm p-4 focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-textMain text-base font-bold font-mono py-4 hover:bg-accent hover:text-white transition-colors uppercase tracking-widest mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "[ SENDING... ]" : "[ POST_REQUEST ]"}
          </button>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-green-500 bg-green-500/10 text-green-400 p-4 font-mono text-sm"
            >
              <p className="font-semibold">
                ✓ Message received successfully!
              </p>
              <p className="mt-2 text-textMuted">
                Thank you for reaching out. Your message has been delivered,
                and I'll get back to you as soon as possible.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default Contact
