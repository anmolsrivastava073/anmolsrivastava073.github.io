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
