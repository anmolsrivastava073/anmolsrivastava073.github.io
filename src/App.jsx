import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import GithubContributions from './components/GithubContributions'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientCanvas from './components/AmbientCanvas'
import CommandPalette from './components/CommandPalette'
import MacCursor from './components/MacCursor'

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <MacCursor />
      <AmbientCanvas />

      {/* Quick Search / Command Dialog */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      <div className="min-h-screen flex flex-col relative z-10">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <GithubContributions />
          <Experience />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default App
