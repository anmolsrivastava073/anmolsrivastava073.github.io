import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USER = 'anmolsrivastava073'

function Signal() {
  const [status, setStatus] = useState('reading')
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchSignal() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`)
        if (!userRes.ok) throw new Error('bad response')
        const user = await userRes.json()

        if (cancelled) return
        setProfile(user)
        setStatus('ok')
      } catch (err) {
        if (!cancelled) setStatus('error')
      }
    }
    fetchSignal()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="signal" className="py-32 px-6 relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-textMuted tracking-widest text-xs uppercase">03</span>
              <div className="h-[1px] w-12 bg-border" />
              <span className="font-mono text-accent tracking-widest text-xs uppercase">Activity</span>
            </div>
            <h3 className="font-display font-bold text-4xl md:text-5xl text-textMain tracking-tight">Code Contributions</h3>
          </div>

          <span className="border border-border rounded-md px-4 py-2 text-xs font-mono tracking-widest text-textMain uppercase flex items-center gap-3 bg-surface">
            <motion.span
              animate={status === 'ok' ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`w-2 h-2 rounded-full ${
                status === 'ok' ? 'bg-accent' :
                status === 'error' ? 'bg-red-500' :
                'bg-textMuted'
              }`}
            />
            {status === 'reading' && 'Connecting...'}
            {status === 'ok' && 'System Online'}
            {status === 'error' && 'Connection Failed'}
          </span>
        </div>

        <div className="sheet p-8 md:p-16 flex flex-col items-center">
          
          {status === 'ok' && (
            <div className="w-full overflow-x-auto relative z-10 flex justify-center">
              <div className="min-w-[700px] w-full max-w-5xl">
                {/* Yellow Hex Color F4D03F integrated here */}
                <img
                  src={`https://ghchart.rshah.org/F4D03F/${GITHUB_USER}`}
                  alt={`${GITHUB_USER}'s Annual GitHub Contributions`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-16 relative z-10">
              <p className="font-mono text-primary font-bold text-sm tracking-widest uppercase mb-2">Signal Lost</p>
              <p className="text-textMuted text-sm">Could not fetch GitHub data. You might have hit the rate limit.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default Signal