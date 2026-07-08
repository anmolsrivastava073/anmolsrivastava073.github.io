import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="noise-bg"></div>
      <div className="min-h-screen flex flex-col relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
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
