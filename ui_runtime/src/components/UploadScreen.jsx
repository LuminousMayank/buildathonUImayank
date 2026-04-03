import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadScreen({ onFileSelected, onTextSubmitted, onSkip }) {
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState('upload'); // 'upload' | 'paste'
  const [pasteText, setPasteText] = useState('');
  const fileRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      onFileSelected(file);
    } else if (ext === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => onTextSubmitted(e.target.result);
      reader.readAsText(file);
    } else {
      alert('Please upload a PDF or TXT file.');
    }
  }, [onFileSelected, onTextSubmitted]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, #050505 60%)',
      }}
    >
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Badge */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Resume → Portfolio Compiler
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-4">
          Your resume,
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            as a portfolio.
          </span>
        </h1>
        <p className="text-center text-gray-500 text-sm max-w-md mx-auto leading-relaxed mb-10">
          Upload your resume and we'll transform it into a curated portfolio website — not a resume dump, a real portfolio with projects, impact, and personality.
        </p>

        <AnimatePresence mode="wait">
          {mode === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Drop Zone */}
              <div
                className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-indigo-400 bg-indigo-500/5'
                    : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>

                <p className="text-sm font-semibold text-gray-300">Drop your resume here</p>
                <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-gray-500 font-semibold">PDF</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-gray-500 font-semibold">TXT</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <hr className="flex-1 border-white/[0.06]" />
                <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">or</span>
                <hr className="flex-1 border-white/[0.06]" />
              </div>

              {/* Alternative Actions */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setMode('paste')}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  📋 Paste resume text
                </button>
                <button
                  onClick={onSkip}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  Try with sample data →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paste"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <textarea
                className="w-full h-48 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500/40 transition-colors"
                placeholder="Paste your full resume text here..."
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setMode('upload')}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={() => pasteText.trim() && onTextSubmitted(pasteText.trim())}
                  disabled={!pasteText.trim()}
                  className="flex-1 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-500 text-white hover:bg-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Transform into Portfolio →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
