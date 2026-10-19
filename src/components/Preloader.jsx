import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const FIRST_WORD = 'Hello'
const LAST_WORD = 'Namaste'

const OTHER_GREETINGS = [
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
  'Salaam',
  'Ahoj',
  'Szia',
  'Witaj',
  'Selamat',
  'Xin chào',
  'สวัสดี',
  'Kamusta',
  'Hei',
  'Dia duit',
  'Bula',
  'Aloha',
  'Kia ora',
  'Salut',
  'Zdravo',
  'Sveiki',
  'Tere',
  'Labas',
  'Habari',
  'Sannu',
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'নমস্কার',
  'నమస్కారం',
  'ನಮಸ್ಕಾರ',
  'നമസ്കാരം',
  'હેલો',
  'မင်္ဂလာပါ',
  'Håfa Adai',
  'Mbote',
  'Ola',
]

const SHUFFLE_COUNT = 24 // how many random languages flash between the first and last word
const FIRST_HOLD = 500 // ms "Hello" stays on screen before the shuffle starts
const WORD_INTERVAL = 100 // ms per shuffled word (lower = faster)
const LAST_HOLD = 600 // ms the final word stays before the site is revealed
// Total time = 500 + 24 * 100 + 600 = about 3.5s

const BLUR_AMOUNT = '10px' // lower = site more visible behind
const OVERLAY_COLOR = 'rgba(5, 5, 7, 0.4)' // lower = site more visible behind

function buildSequence() {
  const pool = [...OTHER_GREETINGS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return [FIRST_WORD, ...pool.slice(0, SHUFFLE_COUNT), LAST_WORD]
}

function Preloader({ onDone }) {
  const [sequence] = useState(buildSequence)
  const [index, setIndex] = useState(0)

  // Keep the latest onDone without restarting the timers when App re-renders
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  // Lock scrolling while the preloader is visible
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Hello (hold) -> quick shuffle -> Namaste (hold) -> reveal
  useEffect(() => {
    let i = 0
    let timer

    const step = () => {
      if (i >= sequence.length - 1) {
        timer = setTimeout(() => onDoneRef.current(), LAST_HOLD)
        return
      }
      const wait = i === 0 ? FIRST_HOLD : WORD_INTERVAL
      timer = setTimeout(() => {
        i += 1
        setIndex(i)
        step()
      }, wait)
    }

    step()
    return () => clearTimeout(timer)
  }, [sequence])

  return (
    <motion.div
      initial={{ opacity: 1, backdropFilter: `blur(${BLUR_AMOUNT})` }}
      animate={{ opacity: 1, backdropFilter: `blur(${BLUR_AMOUNT})` }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        background: OVERLAY_COLOR,
        WebkitBackdropFilter: `blur(${BLUR_AMOUNT})`,
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <motion.div
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-center"
        style={{ height: '1.5em', fontSize: 'clamp(2.5rem, 11vw, 7.5rem)' }}
      >
        <span
          className="font-black tracking-tighter text-zinc-100/60 text-center select-none whitespace-nowrap"
          style={{ lineHeight: 1 }}
        >
          {sequence[index]}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default Preloader
