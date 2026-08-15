import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

// A surveyor's crosshair instead of a soft glowing blob — it reads the
// page the way a total station reads a site: coordinates, not vibes.
function CursorTrail() {
  const [isHovering, setIsHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const cursorX = useSpring(0, { stiffness: 600, damping: 40 })
  const cursorY = useSpring(0, { stiffness: 600, damping: 40 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (fine) document.documentElement.classList.add('has-fine-pointer')
    if (!fine) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const el = e.target.closest('a, button, input, textarea, [role="button"]')
      setIsHovering(Boolean(el))
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  const size = isHovering ? 34 : 22

  return (
    <motion.svg
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      initial={false}
      animate={{ width: size, height: size, opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <circle
        cx="12" cy="12" r="9"
        fill="none"
        stroke={isHovering ? '#C9825E' : '#A9B6A3'}
        strokeWidth="1"
        opacity={isHovering ? 0.9 : 0.55}
      />
      <line x1="12" y1="0" x2="12" y2="6" stroke={isHovering ? '#C9825E' : '#A9B6A3'} strokeWidth="1" />
      <line x1="12" y1="18" x2="12" y2="24" stroke={isHovering ? '#C9825E' : '#A9B6A3'} strokeWidth="1" />
      <line x1="0" y1="12" x2="6" y2="12" stroke={isHovering ? '#C9825E' : '#A9B6A3'} strokeWidth="1" />
      <line x1="18" y1="12" x2="24" y2="12" stroke={isHovering ? '#C9825E' : '#A9B6A3'} strokeWidth="1" />
      <circle cx="12" cy="12" r="1.2" fill={isHovering ? '#C9825E' : '#F3EFE3'} />
    </motion.svg>
  )
}

export default CursorTrail
