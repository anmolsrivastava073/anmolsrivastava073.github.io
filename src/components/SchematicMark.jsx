// A small generative "surveyor's mark" — no photos, no stock imagery.
// Each entry gets a unique diagram derived deterministically from its own
// title, so the same entry always renders the same pattern, but every
// entry looks different from its neighbors. Reads like a hand-plotted
// site sketch pinned to the corner of a technical drawing.

function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

// Simple deterministic PRNG (mulberry32) seeded from the hash.
function makeRng(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function SchematicMark({ seed = 'default', className = '' }) {
  const rng = makeRng(hashSeed(seed))

  const nodeCount = 4 + Math.floor(rng() * 3) // 4–6
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: 20 + rng() * 160,
    y: 15 + rng() * 90,
  }))

  const path = nodes.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(' ')

  // A couple of concentric arcs, like topographic contour lines, centered
  // on a random node.
  const center = nodes[Math.floor(rng() * nodes.length)]
  const arcs = [18, 30, 42].map((r) => r + rng() * 6)

  // A fabricated but plausible-looking grid reference, purely decorative.
  const gridRef = `${(hashSeed(seed) % 900 + 100)}${String.fromCharCode(65 + (hashSeed(seed + 'x') % 6))}`

  return (
    <div className={`relative overflow-hidden bg-surface/60 backdrop-blur-sm rounded-xl border border-purpleNeon/20 ${className}`}>
      {/* Cyber grid backdrop */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(58,134,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(58,134,255,0.15) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full">
        {arcs.map((r, i) => (
          <circle
            key={i}
            cx={center.x}
            cy={center.y}
            r={r}
            fill="none"
            stroke="#3a86ff" 
            strokeWidth="1.5"
            strokeDasharray="4 6"
            style={{ filter: 'drop-shadow(0 0 6px rgba(58,134,255,0.6))' }}
          />
        ))}
        <path d={path} fill="none" stroke="#ffbe0b" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" style={{ filter: 'drop-shadow(0 0 8px rgba(255,190,11,0.8))' }} />
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 4 : 2} fill={i === 0 ? '#ffbe0b' : '#e0e0ff'} style={{ filter: i === 0 ? 'drop-shadow(0 0 5px #ffbe0b)' : 'none' }} />
        ))}
      </svg>
      <span className="absolute bottom-1.5 right-2 font-mono text-[9px] tracking-widest text-secondary/80">
        SYS.REF.{gridRef}
      </span>
    </div>
  )
}
export default SchematicMark
