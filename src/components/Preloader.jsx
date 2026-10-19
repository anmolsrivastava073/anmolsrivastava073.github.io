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

const WORD_INTERVAL = 70 // ms per word (lower = faster)
const TOTAL_DURATION = 3000 // how long the shuffle runs before the site is revealed
const BLUR_AMOUNT = '8px' // lower = site more visible behind
const OVERLAY_COLOR = 'rgba(5, 5, 7, 0.3)' // lower = site more visible behind
const TEXT_OPACITY = 0.6 // lower = more transparent text

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

  // Shuffle through the greetings in a loop for TOTAL_DURATION, then reveal the site
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % GREETINGS.length)
    }, WORD_INTERVAL)

    const done = setTimeout(onDone, TOTAL_DURATION)

    return () => {
      clearInterval(interval)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1, backdropFilter: `blur(${BLUR_AMOUNT})` }}
      animate={{ opacity: 1, backdropFilter: `blur(${BLUR_AMOUNT})` }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{
        background: OVERLAY_COLOR,
        WebkitBackdropFilter: `blur(${BLUR_AMOUNT})`,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
    >
      <motion.div
        exit={{ scale: 1.08, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
        style={{ opacity: TEXT_OPACITY }}
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
