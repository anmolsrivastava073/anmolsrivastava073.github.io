import { animateScroll as scroll } from 'react-scroll'
import { FaArrowUp } from 'react-icons/fa6'

function Footer() {
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: 'easeInOutQuart'
    })
  }

  return (
    <footer className="border-t border-zinc-800 bg-[#050507] py-10 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        
        {/* Left Copyright */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-zinc-200 font-bold">Anmol Srivastava</span>
          <span className="text-zinc-700">|</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="px-3.5 py-1.5 rounded bg-[#121215] border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
        >
          <span>Back to top</span>
          <FaArrowUp className="text-[10px] text-indigo-400" />
        </button>

      </div>
    </footer>
  )
}

export default Footer
