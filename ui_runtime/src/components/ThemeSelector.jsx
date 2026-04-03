import { motion } from 'framer-motion';

const THEMES = [
  {
    id: 'minimal',
    name: 'Minimal Developer',
    description: 'Left-fixed sidebar, dark slate, teal accents',
    ref: 'brittanychiang.com',
    preview: {
      bg: '#0F172A',
      blocks: ['#5EEAD4', '#1E293B', '#334155'],
    },
  },
  {
    id: 'split',
    name: 'Split Layout',
    description: 'Dark/light split pane, project cards',
    ref: 'adhamdannaway.com',
    preview: {
      bg: 'linear-gradient(90deg, #111 50%, #FAFAFA 50%)',
      blocks: ['#6366F1', '#E4E4E7', '#18181B'],
    },
  },
  {
    id: 'framer',
    name: 'Framer Bento',
    description: 'Bento grids, spring animations',
    ref: 'framer.com',
    preview: {
      bg: '#F5F5F0',
      blocks: ['#5B5BD6', '#F0EEFF', '#1A1A1A'],
    },
  },
  {
    id: 'retro_brutal',
    name: 'Retro Brutal',
    description: 'Neo-brutalism, bold colors, stark borders',
    ref: 'Gumroad',
    preview: {
      bg: '#FFF9E6',
      blocks: ['#FFDE59', '#5CE1E6', '#000000'],
    },
  },
  {
    id: 'floating_3d',
    name: 'Floating 3D Marquee',
    description: 'Floating glass cards and background marquees',
    ref: 'Awwwards / WebGL',
    preview: {
      bg: '#F8F9FA',
      blocks: ['#E0E7FF', '#FCE7F3', '#6366F1'],
    },
  },
  {
    id: 'glassmorphic',
    name: 'Glassmorphic',
    description: 'Frosted glass, gradient depths',
    ref: 'awwwards.com',
    preview: {
      bg: 'linear-gradient(135deg, #0F0C29, #302B63, #24243E)',
      blocks: ['rgba(255,255,255,0.1)', 'rgba(167,139,250,0.2)', 'rgba(236,72,153,0.15)'],
    },
  },
  {
    id: 'cyber',
    name: 'Cyber / Futuristic',
    description: 'Neon accents, grid overlay',
    ref: 'cyberpunk',
    preview: {
      bg: '#0A0A0F',
      blocks: ['#00FF88', '#00FFFF', '#FF00FF'],
    },
  },
  {
    id: 'developer',
    name: 'Terminal / VS Code',
    description: 'Code editor aesthetic',
    ref: 'VS Code',
    preview: {
      bg: '#1E1E1E',
      blocks: ['#569CD6', '#4EC9B0', '#CE9178'],
    },
  },
];

export default function ThemeSelector({ activeTheme, onSelectTheme }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1 mb-1">Themes</h3>
      <div className="flex flex-col gap-2">
        {THEMES.map((theme, i) => (
          <motion.button
            key={theme.id}
            className={`theme-card group rounded-xl p-3 text-left transition-all ${
              activeTheme === theme.id
                ? 'bg-indigo-500/15 border-2 border-indigo-500/50'
                : 'bg-white/[0.03] border-2 border-transparent hover:bg-white/[0.06] hover:border-white/10'
            }`}
            onClick={() => onSelectTheme(theme.id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {/* Mini Preview */}
            <div
              className="w-full h-14 rounded-lg mb-2 overflow-hidden relative"
              style={{ background: theme.preview.bg }}
            >
              <div className="absolute inset-0 p-2 flex flex-col gap-1">
                <div className="h-1.5 rounded-full w-12" style={{ background: theme.preview.blocks[0], opacity: 0.8 }} />
                <div className="h-1 rounded-full w-20" style={{ background: theme.preview.blocks[1], opacity: 0.5 }} />
                <div className="flex-1 flex gap-1 mt-1">
                  <div className="flex-1 rounded" style={{ background: theme.preview.blocks[2], opacity: 0.15 }} />
                  <div className="flex-1 rounded" style={{ background: theme.preview.blocks[0], opacity: 0.1 }} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-bold ${activeTheme === theme.id ? 'text-indigo-300' : 'text-gray-300'}`}>
                  {theme.name}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">{theme.description}</p>
              </div>
              {activeTheme === theme.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
                >
                  <span className="text-[10px] text-white">✓</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
