import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { label: 'Extracting personal details', icon: '👤' },
  { label: 'Parsing work experience', icon: '💼' },
  { label: 'Identifying skills & tools', icon: '🛠' },
  { label: 'Cataloging projects', icon: '📦' },
  { label: 'Structuring education', icon: '🎓' },
  { label: 'Building portfolio schema', icon: '✨' },
];

export default function ProcessingScreen() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4"
      style={{ background: '#050505' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-indigo-900/15 blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing orb */}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 mb-10 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 30px rgba(99,102,241,0.3)',
              '0 0 60px rgba(99,102,241,0.5)',
              '0 0 30px rgba(99,102,241,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2">Compiling your portfolio</h2>
        <p className="text-gray-500 text-sm font-medium mb-10">Transforming resume data into structured components...</p>

        {/* Steps */}
        <div className="flex flex-col gap-3 w-80">
          <AnimatePresence>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  i < activeStep ? 'bg-green-500/10 border border-green-500/20' :
                  i === activeStep ? 'bg-indigo-500/10 border border-indigo-500/30' :
                  'bg-white/[0.02] border border-white/5'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-lg">{step.icon}</span>
                <span className={`text-sm font-medium flex-1 ${
                  i < activeStep ? 'text-green-400' :
                  i === activeStep ? 'text-indigo-300' :
                  'text-gray-600'
                }`}>
                  {step.label}
                </span>
                {i < activeStep && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400 text-sm"
                  >
                    ✓
                  </motion.span>
                )}
                {i === activeStep && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
