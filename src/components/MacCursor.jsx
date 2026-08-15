import { useEffect, useRef, useState } from 'react'

// Exact macOS arrow cursor SVG path
const MAC_CURSOR_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M 3 2 L 3 20 L 7.5 15.5 L 11 21 L 13.5 20 L 10 14 L 16 14 Z"
    fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
`

const CURSOR_DATA_URL = `data:image/svg+xml;base64,${btoa(MAC_CURSOR_SVG)}`

function MacCursor() {
  const cursorRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = cursorRef.current
    if (!el) return

    let raf

    const move = (e) => {
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        el.style.opacity = '1'
      })
    }

    const hide = () => { el.style.opacity = '0' }
    const show = () => { el.style.opacity = '1' }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    // Track interactive elements for pointer cursor swap
    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(node => {
        node.addEventListener('mouseenter', () => setHovering(true))
        node.addEventListener('mouseleave', () => setHovering(false))
      })
    }
    attachHover()
    const t = setTimeout(attachHover, 1000)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        opacity: 0,
        willChange: 'transform',
        width: hovering ? 20 : 22,
        height: hovering ? 20 : 22,
        transition: 'width 0.1s, height 0.1s',
      }}
    >
      <img
        src={CURSOR_DATA_URL}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.6))',
        }}
      />
    </div>
  )
}

export default MacCursor
