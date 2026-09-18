import { Sparkles, CheckCircle2, Layers, Palette, Code2 } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Aaroha<span className="text-teal-400">Care</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Environment Ready
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-sm mb-8 shadow-inner">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>React 19 + Tailwind CSS Configured Successfully</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Ready to build your <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400">
            Portfolio Website
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          The foundation is clean, modular, and lightweight. Share your UI/UX ideas, sections, and brand assets step-by-step, and we will bring AarohaCare to life.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid sm:grid-cols-3 gap-5 w-full text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">Reusable Components</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modular components created iteratively as needed for your pages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">Tailwind CSS</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Modern styling system tailored for seamless responsiveness.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white mb-1">Clean Architecture</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No backend overhead, straightforward structure easy for any developer.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        AarohaCare © {new Date().getFullYear()} — Built with React & Tailwind CSS
      </footer>
    </div>
  )
}
