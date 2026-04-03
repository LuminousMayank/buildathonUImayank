import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import UploadScreen from './components/UploadScreen'
import ProcessingScreen from './components/ProcessingScreen'
import ThemeSelector from './components/ThemeSelector'
import { samplePortfolio } from './data/sampleData'

// Themes
import MinimalTheme from './themes/MinimalTheme'
import SplitTheme from './themes/SplitTheme'
import FramerTheme from './themes/FramerTheme'
import GlassmorphicTheme from './themes/GlassmorphicTheme'
import CyberTheme from './themes/CyberTheme'
import DeveloperTheme from './themes/DeveloperTheme'
import RetroBrutalTheme from './themes/RetroBrutalTheme'
import FloatingMarqueeTheme from './themes/FloatingMarqueeTheme'

const THEME_MAP = {
  minimal: MinimalTheme,
  split: SplitTheme,
  framer: FramerTheme,
  retro_brutal: RetroBrutalTheme,
  floating_3d: FloatingMarqueeTheme,
  glassmorphic: GlassmorphicTheme,
  cyber: CyberTheme,
  developer: DeveloperTheme,
}

const API_BASE = 'http://127.0.0.1:8000'

// App States: 'upload' | 'processing' | 'preview'
function App() {
  const [appState, setAppState] = useState('upload')
  const [portfolioData, setPortfolioData] = useState(null)
  const [activeTheme, setActiveTheme] = useState('minimal')
  const [error, setError] = useState('')

  // Send PDF file as FormData to /upload endpoint
  const handleFileSelected = useCallback(async (file) => {
    setAppState('processing')
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()

      if (result.status === 'success' && result.data) {
        setPortfolioData(result.data)
        setAppState('preview')
      } else {
        throw new Error(result.message || 'Failed to parse resume')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message)
      setPortfolioData(samplePortfolio)
      setAppState('preview')
    }
  }, [])

  // Send raw text to /parse-resume endpoint
  const handleTextSubmitted = useCallback(async (resumeText) => {
    setAppState('processing')
    setError('')

    try {
      const response = await fetch(`${API_BASE}/parse-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()

      if (result.status === 'success' && result.data) {
        setPortfolioData(result.data)
        setAppState('preview')
      } else {
        throw new Error(result.message || 'Failed to parse resume')
      }
    } catch (err) {
      console.error('Parse error:', err)
      setError(err.message)
      setPortfolioData(samplePortfolio)
      setAppState('preview')
    }
  }, [])

  // Skip upload and use sample data
  const handleSkip = useCallback(() => {
    setPortfolioData(samplePortfolio)
    setAppState('preview')
  }, [])

  // Reset to upload screen
  const handleReset = useCallback(() => {
    setAppState('upload')
    setPortfolioData(null)
    setError('')
  }, [])

  const ThemeComponent = THEME_MAP[activeTheme] || MinimalTheme

  return (
    <div className="min-h-screen w-full bg-[#050505]">
      <AnimatePresence mode="wait">
        {/* ─── STATE 1: Upload ─── */}
        {appState === 'upload' && (
          <motion.div
            key="upload"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <UploadScreen
              onFileSelected={handleFileSelected}
              onTextSubmitted={handleTextSubmitted}
              onSkip={handleSkip}
            />
          </motion.div>
        )}

        {/* ─── STATE 2: Processing ─── */}
        {appState === 'processing' && (
          <motion.div
            key="processing"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProcessingScreen />
          </motion.div>
        )}

        {/* ─── STATE 3: Preview ─── */}
        {appState === 'preview' && portfolioData && (
          <motion.div
            key="preview"
            className="min-h-screen w-full flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sidebar */}
            <div className="w-64 shrink-0 bg-[#0A0A0A] border-r border-white/5 p-4 flex flex-col gap-4 overflow-y-auto h-screen sticky top-0">
              {/* Logo/Back */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm"
                >
                  ←
                </button>
                <div>
                  <p className="text-xs font-bold text-white tracking-tight">Folio</p>
                  <p className="text-[10px] text-gray-500">Portfolio Compiler</p>
                </div>
              </div>

              {/* Error banner */}
              {error && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-[10px] text-amber-400 font-semibold mb-1">⚠ Backend unreachable</p>
                  <p className="text-[10px] text-amber-400/60">Showing sample data.</p>
                </div>
              )}

              {/* Theme Selector */}
              <ThemeSelector
                activeTheme={activeTheme}
                onSelectTheme={setActiveTheme}
              />

              {/* Data info */}
              <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-600 mb-2">Portfolio Data</p>
                <div className="flex flex-col gap-1 text-[10px] text-gray-500">
                  <span>👤 {portfolioData.personal?.name || 'Unknown'}</span>
                  <span>📦 {portfolioData.featured_projects?.length || 0} projects</span>
                  <span>💼 {portfolioData.experience?.length || 0} experiences</span>
                  <span>🛠 {portfolioData.skills?.reduce((acc, s) => acc + (s.items?.length || 0), 0) || 0} skills</span>
                </div>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 min-h-screen">
              {/* Top toolbar */}
              <div className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold text-white">Live Preview</h2>
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-wider">
                    {activeTheme}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-semibold"
                >
                  ↑ New Resume
                </button>
              </div>

              {/* Mac-style preview frame */}
              <div className="p-6">
                <div className="preview-shell rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <div className="h-10 w-full bg-white/[0.03] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aad2f]" />
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-gray-500 bg-black/20 px-3 py-0.5 rounded border border-white/5">
                        {portfolioData.personal?.name?.toLowerCase().replace(/ /g, '') || 'portfolio'}.dev
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <ThemeComponent data={portfolioData} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
