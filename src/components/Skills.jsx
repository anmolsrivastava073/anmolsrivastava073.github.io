import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/portfolioData'
import { FaJava } from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiCplusplus, SiPython, SiReact, SiHtml5, SiCss,
  SiTailwindcss, SiFramer, SiNodedotjs, SiSpringboot, SiFlask, SiMysql, SiFirebase,
  SiGithub, SiIntellijidea, SiGooglecloud, SiVercel, SiRender
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { VscVscode } from 'react-icons/vsc'
import { Database, Bot } from 'lucide-react'

const skillIcons = {
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'C++': SiCplusplus,
  Python: SiPython,
  SQL: Database,
  React: SiReact,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Spring Boot': SiSpringboot,
  Flask: SiFlask,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  'REST APIs': TbApi,
  'Git/GitHub': SiGithub,
  Render: SiRender,
  'VS Code': VscVscode,
  'IntelliJ IDEA': SiIntellijidea,
  'Google Cloud': SiGooglecloud,
  Vercel: SiVercel,
  'LLM APIs': Bot,
}

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...skills.map(s => s.category)]

  const visibleGroups = selectedCategory === 'All'
    ? skills
    : skills.filter(g => g.category === selectedCategory)

  return (
    <section id="skills" className="py-28 px-6 border-t border-zinc-800 bg-[#050507]">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Skills
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
              Things I work with
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-lg">
              Languages, frameworks, and tools. Some better than others — I'm honest about it.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs border rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-semibold'
                    : 'border-zinc-800 text-zinc-400 hover:text-zinc-200 bg-[#121215]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {visibleGroups.map((group) => (
              <div key={group.category}>
                <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-3 font-medium">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => {
                    const Icon = skillIcons[skill]
                    return (
                      <motion.div
                        key={skill}
                        whileHover={{ scale: 1.06, y: -2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121215] border border-zinc-800 hover:border-indigo-500/50 hover:bg-[#0e0e12] text-xs text-zinc-300 hover:text-white transition-colors shadow-sm"
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                        <span>{skill}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

export default Skills
