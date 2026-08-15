import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { fetchGitHubContributions, calculateAnalytics } from '../utils/githubData'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function GithubContributions() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hoveredDay, setHoveredDay] = useState(null)
  const [selectedYear, setSelectedYear] = useState('2026')

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      setLoading(true)
      const result = await fetchGitHubContributions('anmolsrivastava073')
      if (isMounted) {
        setData(result)
        setLoading(false)
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  const activeViewData = useMemo(() => {
    if (!data) return null
    const yearFiltered = data.rawContributions.filter(c => c.date.startsWith(selectedYear))
    return calculateAnalytics(yearFiltered, data.totalByYear)
  }, [data, selectedYear])

  if (loading || !activeViewData) {
    return (
      <section id="contributions" className="py-24 px-6 border-t border-zinc-800 bg-base">
        <div className="max-w-6xl mx-auto text-center py-16">
          <div className="inline-block w-6 h-6 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs text-zinc-500 font-mono">Loading GitHub contributions...</p>
        </div>
      </section>
    )
  }

  const { weeks } = activeViewData

  // Clearly differentiated colors so 1-2 contributions stand out vividly
  const getCellColor = (count) => {
    if (count === 0 || !count) return 'bg-[#161b22] border border-zinc-800/40'
    if (count >= 1 && count <= 2) return 'bg-[#0e4429] border border-[#238636]/60'
    if (count >= 3 && count <= 9) return 'bg-[#006d32] border border-[#26a641]/70'
    if (count >= 10 && count <= 24) return 'bg-[#26a641] border border-[#39d353]'
    return 'bg-[#39d353] border border-[#7bfca8] shadow-[0_0_6px_rgba(57,211,83,0.4)]'
  }

  // Calculate month headers
  const monthHeaders = []
  let lastMonth = -1
  weeks.forEach((week, weekIndex) => {
    const firstValidDay = week.find(d => d !== null)
    if (firstValidDay) {
      const month = new Date(firstValidDay.date).getMonth()
      if (month !== lastMonth) {
        monthHeaders.push({ name: MONTH_NAMES[month], weekIndex })
        lastMonth = month
      }
    }
  })

  return (
    <section id="contributions" className="py-24 px-6 border-t border-zinc-800 bg-base">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
              GitHub Activity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Contributions so far
            </h2>
          </div>

          <a
            href="https://github.com/anmolsrivastava073"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <FaGithub className="text-sm" />
            <span>@anmolsrivastava073</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Calendar Container - Solid dark, Zero glass */}
        <div className="p-6 rounded-xl bg-[#121215] border border-zinc-800 shadow-lg">
          
          {/* Top Bar with Timeframe Switcher */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
            <div className="text-xs text-zinc-400 font-mono">
              Public commit history
            </div>

            <div className="flex items-center gap-1 bg-[#09090b] p-1 rounded-lg border border-zinc-800">
              {[
                { id: '2026', label: '2026' },
                { id: '2025', label: '2025' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedYear(tab.id)}
                  className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                    selectedYear === tab.id
                      ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[760px]">
              
              {/* Month Headers */}
              <div className="flex text-[11px] text-zinc-500 mb-2 pl-7 font-mono">
                {monthHeaders.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${(100 / weeks.length) * (idx < monthHeaders.length - 1 ? monthHeaders[idx + 1].weekIndex - m.weekIndex : weeks.length - m.weekIndex)}%`
                    }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>

              {/* Grid with 7 rows x 53 columns */}
              <div className="flex gap-1.5">
                
                {/* Day Labels */}
                <div className="flex flex-col justify-between text-[10px] text-zinc-600 pr-2 py-0.5 select-none font-mono">
                  {DAY_LABELS.map((day, idx) => (
                    <div key={idx} className="h-3 leading-3">{day}</div>
                  ))}
                </div>

                {/* Heatmap Columns */}
                <div className="flex-1 flex gap-1.5">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex-1 flex flex-col gap-1.5 min-w-[11px]">
                      {week.map((day, dayIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${dayIdx}`}
                              className="aspect-square w-full rounded-[2px] opacity-0"
                            />
                          )
                        }

                        const isHovered = hoveredDay && hoveredDay.date === day.date

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`aspect-square w-full rounded-[2px] transition-transform duration-100 cursor-pointer ${getCellColor(
                              day.count
                            )} ${isHovered ? 'ring-2 ring-white scale-125 z-20' : 'hover:scale-110'}`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* Footer with Tooltip and Legend */}
          <div className="mt-5 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
            
            {/* Live Hover Info */}
            <div className="h-5 flex items-center">
              {hoveredDay ? (
                <div className="text-zinc-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-emerald-400">
                    {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
                  </span>
                  <span>on</span>
                  <span className="text-zinc-300 font-medium">
                    {new Date(hoveredDay.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              ) : (
                <span className="text-zinc-500">Hover over any square to see contribution details</span>
              )}
            </div>

            {/* GitHub Legend */}
            <div className="flex items-center gap-1.5 text-zinc-500">
              <span>Less</span>
              <span className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-zinc-800" />
              <span className="w-3 h-3 rounded-[2px] bg-[#0e4429] border border-[#238636]/60" />
              <span className="w-3 h-3 rounded-[2px] bg-[#006d32] border border-[#26a641]/70" />
              <span className="w-3 h-3 rounded-[2px] bg-[#26a641] border border-[#39d353]" />
              <span className="w-3 h-3 rounded-[2px] bg-[#39d353] border border-[#7bfca8]" />
              <span>More</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default GithubContributions
