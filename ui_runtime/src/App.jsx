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

  // 1. Global Editable Content State
  const [content, setContent] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generatingContent, setGeneratingContent] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

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

      // 2. Initialize content state based on parsed sections
      const initialContent = {}
      if (planData.sections) {
        planData.sections.forEach(sec => {
          if (sec.type === 'hero' || sec.type === 'fullscreenHero') {
            initialContent[sec.type] = {
              heading: "Your AI Website",
              subheading: "Generated intelligently from intent",
              cta: "Get Started"
            }
          } else if (sec.type === 'kpiTiles' || sec.type === 'kpiCards') {
            initialContent[sec.type] = [
              { label: "Revenue", value: "$42K" },
              { label: "Growth", value: "+18%" },
              { label: "Users", value: "12K" }
            ]
          } else if (sec.type === 'splitReveal' || sec.type === 'split') {
            initialContent[sec.type] = {
              title: "Creative storytelling section",
              description: "This section adapts to your prompt intent."
            }
          } else if (sec.type === 'bentoGrid' || sec.type === 'bento') {
            initialContent[sec.type] = {
              title: "Our Core Features",
              description: "Discover the suite of tools that scales automatically."
            }
          } else if (sec.type === 'marqueeBand' || sec.type === 'marquee') {
            initialContent[sec.type] = {
              items: ["INNOVATION", "•", "SPEED", "•", "DESIGN", "•"]
            }
          } else if (sec.type === 'horizontalGallery' || sec.type === 'gallery') {
            initialContent[sec.type] = {
              title: "Latest Initiatives",
              description: "Swipe through our most experimental architectures."
            }
          } else {
            initialContent[sec.type] = {}
          }
        })
      }
      setContent(initialContent)

      // 3. Generate Local Copy Detached Background Fetch
      setGeneratingContent(true)
      fetch("http://127.0.0.1:8000/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          layout_mode: planData.layout_mode,
          sections: planData.sections.map(s => s.type)
        }),
      })
        .then(res => res.json())
        .then(llmContent => {
          if (llmContent && Object.keys(llmContent).length > 0 && !llmContent.error) {
            setContent(prev => {
              const merged = { ...prev };
              Object.keys(llmContent).forEach(key => {
                if (merged[key]) {
                  merged[key] = (typeof merged[key] === 'object' && !Array.isArray(merged[key]))
                    ? { ...merged[key], ...llmContent[key] }
                    : llmContent[key];
                } else {
                  merged[key] = llmContent[key];
                }
              });
              return merged;
            });
          }
        })
        .catch(err => console.warn("LLM copy generation pipeline interrupted/failed. Using layout fallbacks.", err))
        .finally(() => setGeneratingContent(false));

      // 4. Fetch Prediction (for the raw inspector telemetry metrics)
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

  const handleExport = () => {
    if (!plan) return;
    const exportData = {
      layout_mode: plan.layout_mode,
      sections: plan.sections,
      content: content,
      designDNA: plan.designDNA
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReactPage = () => {
    if (!plan || !plan.sections) return "";

    const componentMap = {
      hero: "Hero",
      fullscreenHero: "FullscreenHero",
      kpiTiles: "KpiTiles",
      kpiCards: "KpiCards",
      splitReveal: "SplitReveal",
      split: "SplitReveal",
      bentoGrid: "BentoGrid",
      bento: "BentoGrid",
      marqueeBand: "MarqueeBand",
      marquee: "MarqueeBand",
      horizontalGallery: "HorizontalGallery",
      gallery: "HorizontalGallery",
      chartPanel: "ChartPanel",
      teamList: "TeamList",
      table: "Table",
      footer: "Footer"
    };

    const uniqueTypes = new Set(
      plan.sections.map(s => componentMap[s.type] || "FallbackSection")
    );

    const imports = Array.from(uniqueTypes)
      .map(comp => `import ${comp} from "./${comp}";`)
      .join("\\n");

    const sectionNodes = plan.sections
      .map(sec => {
        const CompName = componentMap[sec.type] || "FallbackSection";
        const secContent = content && content[sec.type] ? content[sec.type] : {};
        const contentPropString = Object.keys(secContent).length > 0
          ? ` content={{ ${sec.type}: ${JSON.stringify(secContent)} }}`
          : "";
        return `      <${CompName} variant="${sec.variant}" layoutMode="${plan.layout_mode}"${contentPropString} />`;
      })
      .join("\\n");

    return `import React from "react";\\n${imports}\\n\\nexport default function GeneratedPage() {\\n  return (\\n    <main className="w-full flex flex-col">\\n${sectionNodes}\\n    </main>\\n  );\\n}`;
  };

  const handleCopyCode = async () => {
    const code = generateReactPage();
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCode = () => {
    const code = generateReactPage();
    if (!code) return;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedPage.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRegenerateCopy = () => {
    if (!plan) return;
    setIsRegenerating(true);
    fetch("http://127.0.0.1:8000/generate-copy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        layout_mode: plan.layout_mode,
        sections: plan.sections.map(s => s.type)
      }),
    })
      .then(res => res.json())
      .then(llmContent => {
        if (llmContent && Object.keys(llmContent).length > 0 && !llmContent.error) {
          setContent(prev => {
            const merged = { ...prev };
            Object.keys(llmContent).forEach(key => {
              if (merged[key]) {
                merged[key] = (typeof merged[key] === 'object' && !Array.isArray(merged[key]))
                  ? { ...merged[key], ...llmContent[key] }
                  : llmContent[key];
              } else {
                merged[key] = llmContent[key];
              }
            });
            return merged;
          });
        }
      })
      .catch(err => console.warn("Regeneration failed", err))
      .finally(() => setIsRegenerating(false));
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-x-hidden font-sans selection:bg-indigo-500/30">

      {/* 1️⃣ Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden block">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] right-[0%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Main Content Area */}
        <div className="w-full flex-1 flex flex-col items-center pt-24 pb-32 px-4 sm:px-8 transition-all duration-700">

          {/* 2️⃣ Hero Section (Only visible without plan) */}
          {!plan && (
            <div className="w-full max-w-4xl flex flex-col items-center text-center animate-fade-in-up mb-12 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase">Hybrid ML + LLM Architecture</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05] drop-shadow-sm">
                Intent → Interface.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">
                  Instantly.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl leading-relaxed mb-10">
                Stop designing generic blocks. Our dual-engine system enforces programmatic structure via ML topology, then dynamically injects generative microcopy context.
              </p>
            </div>
          )}

          {/* 3️⃣ ChatGPT-Style Input Block */}
          <div className={`w-full max-w-3xl animate-fade-in-up transition-all duration-700 ${plan ? 'mb-12' : 'mb-24'}`}>
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl relative overflow-hidden group">
              <div className="flex flex-col gap-4">

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                  <div className="flex-1 bg-[#1a1a1c]/60 border border-white/5 rounded-2xl p-4 transition-all focus-within:bg-[#1a1a1c] focus-within:border-indigo-500/50 shadow-inner">
                    <textarea
                      className="w-full bg-transparent text-gray-100 placeholder-gray-500 outline-none resize-none min-h-[60px] font-medium leading-relaxed"
                      placeholder="Message AI Builder..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleGenerate(seed);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-3 mt-1">
                  {prompt.trim() && !loading && (
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hidden sm:block">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-sans mx-1">Enter</kbd> to generate</span>
                  )}
                  {plan && (
                    <button
                      className="px-4 py-2.5 bg-white/5 text-gray-300 font-semibold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-all transform active:scale-95 border border-white/10"
                      onClick={() => {
                        const nextSeed = seed + 1;
                        setSeed(nextSeed);
                        handleGenerate(nextSeed);
                      }}
                      disabled={loading}
                    >
                      Shuffle Variant 🎲
                    </button>
                  )}
                  <button
                    className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                    onClick={() => handleGenerate(seed)}
                    disabled={loading || !prompt.trim()}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Synthesizing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                        Generate UI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Examples */}
            {!plan && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {["Creative dark mode portfolio", "Modern SaaS analytics dashboard", "Minimalist fintech landing page"].map(ex => (
                  <button
                    key={ex}
                    onClick={() => setPrompt(ex)}
                    className="text-xs font-semibold text-gray-500 bg-transparent hover:text-white px-3 py-1 rounded-full border border-gray-800 hover:border-gray-500 transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5️⃣ Static Marketing Blocks (Hidden when plan exists) */}
          {!plan && !loading && (
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up mb-24" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <h3 className="text-white font-bold mb-2 tracking-wide">Deterministic ML Topology</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Unlike standard chat LLMs, our backend structural engine isolates UI tree graphs to guarantee valid layouts every time.</p>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-4 border border-teal-500/30">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <h3 className="text-white font-bold mb-2 tracking-wide">Semantic AI Copywriting</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Instantly bridges the layout to a secondary LLM logic layer mapping 100% bespoke marketing-ready JSON strings exactly to components.</p>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <h3 className="text-white font-bold mb-2 tracking-wide">Native JSX Transpiler</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Downloads clean local React trees completely ready for deployment without aggressive inline styles, retaining modularity entirely.</p>
              </div>
            </div>
          )}

          {/* 4️⃣ Generated UI Wrapper */}
          {plan && !plan.error ? (
            <div className={`w-full animate-fade-in-up pb-32 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-0 opacity-100 ${plan.layout_mode === 'dashboard' ? 'max-w-[1400px]' : 'max-w-[1200px]'}`}>

              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold flex items-center gap-3 text-gray-200">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                  Live Preview Container
                  {generatingContent && (
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold flex items-center gap-2 animate-pulse bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 ml-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      Generating Semantic Copy
                    </span>
                  )}
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    className="text-xs px-4 py-2 rounded-full font-bold transition-all bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2 relative overflow-hidden group"
                    onClick={handleRegenerateCopy}
                    disabled={isRegenerating}
                  >
                    {isRegenerating ? (
                      <span className="flex items-center gap-2 text-indigo-300">
                        <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Pinging
                      </span>
                    ) : (
                      <span className="text-gray-300 group-hover:text-white transition-colors">✨ Regenerate</span>
                    )}
                  </button>
                  <button
                    className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${copied ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white'}`}
                    onClick={handleCopyCode}
                  >
                    {copied ? 'Copied ✅' : 'JSX'}
                  </button>
                  <button
                    className="text-xs px-4 py-2 rounded-full font-bold transition-all bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white"
                    onClick={handleDownloadCode}
                  >
                    .jsx
                  </button>
                  <button
                    className={`text-xs px-4 py-2 rounded-full font-bold transition-all ml-2 shadow-lg ${editMode ? 'bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-500' : 'bg-white text-black hover:bg-gray-200 border-transparent'}`}
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Lock Content' : 'Edit Inline ✏️'}
                  </button>
                </div>
              </div>

              {/* Mac Window Chrome */}
              <div className="w-full flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-3xl relative">

                {/* Traffic Lights Top Bar */}
                <div className="h-10 w-full bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-sm relative z-20">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d89e24]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aad2f]"></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-mono text-gray-500 font-bold bg-black/20 px-2 py-0.5 rounded border border-white/5">localhost:3000</span>
                  </div>
                </div>

                <div key={seed} className={`w-full relative flex flex-col min-h-[500px] transition-all duration-500 ease-out ${applyDesignDNA(plan?.designDNA, plan?.layout_mode)} 
                  ${plan.layout_mode === 'dashboard' ? 'bg-[#0f1115] text-slate-100' :
                    plan.layout_mode === 'creative' ? 'bg-[#050505] text-slate-100' :
                      'bg-white text-slate-900'
                  }`}>

                  {/* Creative Layer Adjustments inside Frame */}
                  {plan.layout_mode === 'creative' && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/10 via-transparent to-transparent blur-[100px] rounded-full"></div>
                    </div>
                  )}

                  <div className="relative z-10 w-full flex flex-col">
                    <SectionRenderer
                      sections={plan.sections}
                      layoutMode={plan.layout_mode}
                      content={content}
                      setContent={setContent}
                      editMode={editMode}
                    />
                  </div>
                </div>
              </div>

            </div>
          ) : null}

          {plan?.error && (
            <div className="mt-8 bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl font-sans w-full max-w-2xl text-center backdrop-blur-sm">
              <p className="font-bold mb-1">Engine Connection Dropped</p>
              <p className="text-xs font-mono">{plan.error}</p>
            </div>
          )}
        </div>

        {/* 6️⃣ Right Area: Fixed Inspector Panel */}
        {plan && <InspectorPanel plan={plan} prediction={prediction} />}
      </div>
    </div>
  )
}

export default App
