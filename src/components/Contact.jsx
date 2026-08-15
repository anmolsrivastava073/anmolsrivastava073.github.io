import { useState } from 'react'
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaPaperPlane,
  FaCopy,
  FaCheck,
} from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'
import { useVisitorCount } from '../hooks/useVisitorCount'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const { count, error } = useVisitorCount()

  const email = 'anmolsrivastava073@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)

      setTimeout(() => {
        setCopiedEmail(false)
      }, 2500)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setSubmitted(false)

    const form = e.target
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mkgvndga', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        form.reset()
        setSubmitted(true)
      } else {
        alert(
          `Something went wrong. Please email me directly at ${email}`
        )
      }
    } catch (error) {
      console.error('Form submission error:', error)

      alert(
        `Unable to send message. Please email me directly at ${email}`
      )
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    {
      icon: FaGithub,
      link: 'https://github.com/Anmol-Srivastava-073',
      name: 'GitHub',
    },
    {
      icon: FaLinkedin,
      link: 'https://linkedin.com/in/anmol-srivastava-46430727a',
      name: 'LinkedIn',
    },
    {
      icon: FaXTwitter,
      link: 'https://x.com/anmol_sriv073',
      name: 'Twitter',
    },
    {
      icon: FaInstagram,
      link: 'https://instagram.com/anmol_sriv.073',
      name: 'Instagram',
    },
    {
      icon: SiSubstack,
      link: 'https://substack.com/@anmolsriv073',
      name: 'Substack',
    },
  ]

  return (
    <section
      id="contact"
      className="py-28 px-6 border-t border-zinc-800 bg-[#050507]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>

              {/* Heading */}
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                Say hi
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mb-6">
                Let's Connect
              </h2>

              <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                Got a project idea, an opportunity, or just want to talk
                about tech? My inbox is always open. I read every message -
                seriously, I do.
              </p>

              {/* Email Card */}
              <div className="p-5 rounded-lg bg-[#121215] border border-zinc-800 mb-8 w-full">
                <div className="text-xs text-zinc-500 mb-1">
                  My email address
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-semibold text-zinc-200 truncate">
                    {email}
                  </span>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded bg-[#09090b] border border-zinc-800 hover:border-indigo-500 text-indigo-400 font-mono text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    {copiedEmail ? (
                      <FaCheck className="text-emerald-400" />
                    ) : (
                      <FaCopy />
                    )}

                    <span>
                      {copiedEmail ? 'COPIED' : 'COPY'}
                    </span>
                  </button>
                </div>
              </div>


              
              
              {/* Social Channels */}
              <div className="space-y-3">
                <div className="text-xs text-zinc-500 mb-3">
                  Find me online
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon

                    return (
                      <a
                        key={i}
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded bg-[#121215] border border-zinc-800 hover:border-indigo-500 text-zinc-400 hover:text-zinc-100 transition-colors"
                        title={s.name}
                        aria-label={s.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
              {/* Visitor Counter */}
              <div className="mt-8 p-5 rounded-lg bg-[#121215] border border-zinc-800 flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-zinc-400">
                    People who've visited this portfolio
                  </span>
                </div>

                <span className="font-mono font-bold text-zinc-100 tabular-nums text-lg">
                  {error
                    ? '—'
                    : count === null
                      ? '...'
                      : count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

              

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-lg bg-[#121215] border border-zinc-800 space-y-6"
            >

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 text-zinc-100 font-mono text-sm p-3.5 rounded-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Your Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 text-zinc-100 font-mono text-sm p-3.5 rounded-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400">
                  Your Message
                </label>

                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Type your message here..."
                  className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 text-zinc-100 font-mono text-sm p-3.5 rounded-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-zinc-100 text-zinc-950 font-bold font-mono text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                <FaPaperPlane className="text-xs" />

                <span>
                  {loading ? 'Sending...' : 'Send Message'}
                </span>
              </button>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-400 font-mono text-xs">
                  <div className="font-bold flex items-center gap-1.5">
                    <FaCheck />

                    <span>
                      ✓ Message received successfully!
                    </span>
                  </div>

                  <p className="mt-1 text-zinc-400">
                    Thank you for reaching out. I'll get back to you as
                    soon as possible.
                  </p>
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
