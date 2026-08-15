import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, User, FolderGit2, Briefcase, Award, 
  Mail, ExternalLink, X, Cpu, FileText, ArrowRight
} from 'lucide-react'
import { scroller } from 'react-scroll'

function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const actions = [
    {
      category: 'Navigation',
      items: [
        { id: 'about', label: 'About Me', icon: User, action: () => scrollTo('about') },
        { id: 'contributions', label: 'GitHub Contributions', icon: FolderGit2, action: () => scrollTo('contributions') },
        { id: 'experience', label: 'Experience & Education', icon: Briefcase, action: () => scrollTo('experience') },
        { id: 'skills', label: 'Skills & Technologies', icon: Cpu, action: () => scrollTo('skills') },
        { id: 'projects', label: 'Featured Projects', icon: FolderGit2, action: () => scrollTo('projects') },
        { id: 'resume', label: 'Resume & Certifications', icon: Award, action: () => scrollTo('resume') },
        { id: 'contact', label: 'Contact', icon: Mail, action: () => scrollTo('contact') },
      ]
    },
    {
      category: 'Links & Actions',
      items: [
        { 
          id: 'cv-download', 
          label: 'Download Resume (DOCX)', 
          icon: FileText, 
          action: () => window.open('/photos/AnmolResume.docx', '_blank') 
        },
        { 
          id: 'copy-email', 
          label: 'Copy Email Address', 
          icon: Mail, 
          action: () => {
            navigator.clipboard.writeText('anmolsriv073@gmail.com')
            alert('Email copied: anmolsriv073@gmail.com')
          } 
        },
        { 
          id: 'github-profile', 
          label: 'GitHub Profile', 
          icon: ExternalLink, 
          action: () => window.open('https://github.com/anmolsrivastava073', '_blank') 
        },
        { 
          id: 'linkedin-profile', 
          label: 'LinkedIn Profile', 
          icon: ExternalLink, 
          action: () => window.open('https://linkedin.com/in/anmol-srivastava-46430727a', '_blank') 
        },
      ]
    }
  ]

  const scrollTo = (target) => {
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: -70
    })
    onClose()
  }

  const filteredActions = actions.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      group.category.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0)

  const allFilteredItems = filteredActions.flatMap(g => g.items)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % (allFilteredItems.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + allFilteredItems.length) % (allFilteredItems.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (allFilteredItems[selectedIndex]) {
          allFilteredItems[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, allFilteredItems, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-[#121215] border border-zinc-800 shadow-2xl rounded-xl overflow-hidden relative z-10"
          >
            <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-[#16161a]">
              <Search className="w-4 h-4 text-zinc-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Search or jump to section..."
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
              <button 
                onClick={onClose}
                className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs font-mono">
                  No results found for "{query}"
                </div>
              ) : (
                filteredActions.map((group, groupIdx) => (
                  <div key={groupIdx} className="mb-2">
                    <div className="px-3 py-1 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                      {group.category}
                    </div>
                    <div className="space-y-0.5 mt-0.5">
                      {group.items.map((item) => {
                        const globalIndex = allFilteredItems.indexOf(item)
                        const isSelected = globalIndex === selectedIndex
                        const Icon = item.icon

                        return (
                          <div
                            key={item.id}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            onClick={() => item.action()}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-zinc-800 text-white font-medium'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
                              <span>{item.label}</span>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 opacity-0 ${isSelected ? 'opacity-100 translate-x-0' : '-translate-x-1'} transition-all`} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-zinc-800/80 bg-[#0d0d10] flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">↵</kbd> select</span>
                <span><kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
