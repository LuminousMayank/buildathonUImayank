import { useState } from 'react'
import SectionRenderer from './components/SectionRenderer'
import InspectorPanel from './components/InspectorPanel'
import { applyDesignDNA } from './utils/applyDesignDNA'

function App() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [seed, setSeed] = useState(42)

  const handleGenerate = async (currentSeed = seed) => {
    if (!prompt.trim()) return

    setLoading(true)
    try {
      // 1. Fetch Plan (which includes the UI architecture)
      const planResponse = await fetch("http://127.0.0.1:8000/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          seed: currentSeed
        }),
      })

      if (!planResponse.ok) {
        throw new Error(`Plan Server error: ${planResponse.status}`)
      }

      const planData = await planResponse.json()
      setPlan(planData)

      // 2. Fetch Prediction (for the raw inspector telemetry metrics)
      const predictResponse = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      })

      if (predictResponse.ok) {
        const predictData = await predictResponse.json()
        setPrediction(predictData)
      } else {
        console.warn("Failed to fetch pure prediction telemetry.")
      }

    } catch (error) {
      console.error("Failed to generate UI sequence:", error)
      setPlan({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center transition-all duration-700 overflow-x-hidden ${applyDesignDNA(plan?.designDNA)} lg:flex-row lg:items-start lg:justify-between`}>

      {/* Left Area: Main Generation Window */}
      <div className="w-full lg:flex-1 lg:max-w-[calc(100vw-350px)] px-4 flex flex-col items-center pt-20">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-gray-900 tracking-normal font-sans">
          <h1 className="text-3xl font-bold mb-6 text-center">AI UI Builder</h1>

          <div className="flex gap-4 mb-4">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="e.g., minimal portfolio website for a designer"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(seed)}
            />
            <button
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              onClick={() => handleGenerate(seed)}
              disabled={loading || !prompt.trim()}
            >
              {loading ? 'Generating...' : 'Generate UI'}
            </button>
            <button
              className="px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              onClick={() => {
                const nextSeed = seed + 1;
                setSeed(nextSeed);
                handleGenerate(nextSeed);
              }}
              disabled={loading || !plan}
              title="Shuffle Design"
            >
              Shuffle 🎲
            </button>
          </div>
          <div className="flex justify-between items-center px-1 text-xs text-gray-400 font-mono">
            <span>Buildathon UI Runtime</span>
            {plan && <span>Seed: {seed}</span>}
          </div>
        </div>

        {plan && !plan.error ? (
          <div className={`mt-12 w-full animate-fade-in-up pb-32 transition-all duration-500 ease-out ${plan.layout_mode === 'dashboard' ? 'max-w-[1400px]' : 'max-w-[1200px]'}`}>
            <div className="flex items-center justify-between mb-4 px-2 text-inherit font-sans border-b border-inherit border-opacity-20 pb-2">
              <h2 className="text-xl font-bold">Generated Interface</h2>
            </div>
            {plan.sections ? (
              <div key={seed} className={`w-full rounded-xl overflow-hidden shadow-2xl border border-current border-opacity-20 flex flex-col transition-all duration-500 ease-out animate-fade-in-up ${plan.layout_mode === 'dashboard' ? 'bg-slate-900 text-slate-100' : 'bg-gradient-to-br from-white/10 to-transparent'}`}>
                <SectionRenderer sections={plan.sections} layoutMode={plan.layout_mode} />
              </div>
            ) : (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg font-sans text-sm mt-4">
                <p>Failed to generate valid sections. API returned an error.</p>
                <pre className="text-xs mt-2 overflow-x-auto">{JSON.stringify(plan, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : null}

        {plan?.error && (
          <div className="mt-8 bg-red-50 text-red-600 p-4 rounded-lg font-sans w-full max-w-2xl">
            <p>Failed to connect to AI sequence.</p>
            <p className="text-xs mt-1 font-mono">{plan.error}</p>
          </div>
        )}
      </div>

      {/* Right Area: Fixed Inspector Panel */}
      {plan && (
        <div className="w-full lg:w-[320px] lg:h-screen lg:fixed lg:right-0 lg:top-0 transition-transform mt-12 lg:mt-0 font-sans tracking-normal">
          <InspectorPanel plan={plan} prediction={prediction} />
        </div>
      )}
    </div>
  )
}

export default App
