import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'
import { FaJava } from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiCplusplus, SiPython, SiReact, SiHtml5, SiCss,
  SiTailwindcss, SiFramer, SiNodedotjs, SiSpringboot, SiFlask, SiMysql, SiFirebase,
  SiGithub, SiIntellijidea, SiGooglecloud, SiVercel, SiRender,
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

const listContainer = {
  rest: {},
  hover: { transition: { staggerChildren: 0.05 } }
}

const listItem = {
  rest: { opacity: 0.8, x: 0, color: "#94A3B8" },
  hover: { opacity: 1, x: 6, color: "#F8FAFC" }
}

function Skills() {
  return (
    <section id="skills" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-textMuted tracking-widest text-xs uppercase">02</span>
            <div className="h-[1px] w-12 bg-border" />
            <span className="font-mono text-accent tracking-widest text-xs uppercase">Stack</span>
          </div>
          <h3 className="font-display font-bold text-4xl md:text-5xl text-textMain tracking-tight">Technical Arsenal</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="sheet"
            >
              <h4 className="font-mono text-xs text-primary font-bold mb-6 pb-4 border-b border-border tracking-widest uppercase">
                {skillGroup.category}
              </h4>
              
              <motion.ul variants={listContainer} className="space-y-4">
                {skillGroup.items.map((skill, i) => {
                  const SkillIcon = skillIcons[skill]
                  return (
                    <motion.li 
                      key={i} 
                      variants={listItem}
                      className="font-mono text-sm flex items-center gap-4 transition-colors"
                    >
                      <span className="flex-shrink-0 text-accent">
                        {SkillIcon ? <SkillIcon size={18} /> : <span className="inline-block w-2">-</span>}
                      </span>
                      <span>{skill}</span>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills