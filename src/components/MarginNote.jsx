// A little red-pen note scrawled in the margin, the way an engineer
// annotates a print. This is where the site's dry humor lives — kept out
// of the real copy so the actual content stays straight and readable.
function MarginNote({ children, className = '', rotate = -3 }) {
  return (
    <div
      className={`margin-note text-xl md:text-2xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  )
}

export default MarginNote
