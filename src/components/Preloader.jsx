import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GREETINGS = [
  'Hello',
  'Namaste',
  'Hola',
  'Bonjour',
  'こんにちは',
  'Ciao',
  'Hallo',
  '안녕하세요',
  'Olá',
  'مرحبا',
  'Привет',
  '你好',
  'Merhaba',
  'Γειά σου',
  'Sawubona',
  'வணக்கம்',
  'Shalom',
  'Hej',
  'Jambo',
  'नमस्ते',
]

const WORD_INTERVAL = 150 // ms per word, ~3s total
const EXIT_DELAY = 300 // pause on the last word before revealing the site

function Preloader({ onDone }) {
  const [index, setIndex] = useState(0)

  // Lock scrolling while the preloader is visible
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Quick shuffle through the greetings, then hand control back to App
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => {
        if (i >= GREETINGS.length - 1) {
          clearInterval(interval)
          return i
        }
        return i + 1
      })
    }, WORD_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (index === GREETINGS.length - 1) {
      const t = setTimeout(onDone, EXIT_DELAY)
      return () => clearTimeout(t)
    }
  }, [index, onDone])

  return (
    <motion.div
      initial={{ opacity: 1, backdropFilter: 'blur(28px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ background: 'rgba(5, 5, 7, 0.6)' }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
    >
      <motion.div
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-indigo-500 shrink-0" />
        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-100 text-center select-none">
          {GREETINGS[index]}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default Preloader
