import { motion } from 'framer-motion';

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
};

export default function GlassmorphicTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, skills } = data;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
      color: '#fff', fontFamily: "'Outfit', 'Inter', sans-serif", minHeight: '100vh',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full bg-violet-500/20 blur-[100px] animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-pink-500/15 blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <motion.section className="px-6 md:px-12 pt-24 pb-20 max-w-4xl mx-auto text-center" initial="hidden" animate="visible">
          <motion.div variants={fade} custom={0} className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', color: '#A78BFA' }}>
            {p.headline}
          </motion.div>
          <motion.h1 variants={fade} custom={1} style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1,
            background: 'linear-gradient(135deg, #fff, #A78BFA, #EC4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {p.name}
          </motion.h1>
          {about && <motion.p variants={fade} custom={2} className="mt-6 text-gray-300/80 text-lg leading-relaxed max-w-lg mx-auto font-light">{about}</motion.p>}
        </motion.section>

        {/* Projects */}
        {featured_projects?.length > 0 && (
          <motion.section className="px-6 md:px-12 py-16 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fade} custom={0} className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60 mb-8 text-center">Projects</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured_projects.map((proj, i) => (
                <motion.a key={i} href={proj.link || '#'} target="_blank" rel="noopener noreferrer"
                  variants={fade} custom={i + 1}
                  className="p-6 rounded-2xl block group hover:scale-[1.02] transition-transform" style={glassCard}>
                  <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">{proj.title}</h3>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{proj.one_liner}</p>
                  {proj.impact && <p className="text-xs font-bold mt-2 text-violet-300">{proj.impact}</p>}
                  {proj.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tech_stack.map((t, j) => (
                        <span key={j} className="text-[10px] font-semibold text-violet-300 px-2 py-0.5 rounded-md" style={{ background: 'rgba(167,139,250,0.1)' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <motion.section className="px-6 md:px-12 py-16 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fade} custom={0} className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60 mb-8 text-center">Experience</motion.h2>
            <div className="flex flex-col gap-4">
              {experience.map((exp, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="p-6 rounded-2xl" style={glassCard}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.role}</h3>
                      <p className="text-sm text-violet-300/70 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium text-white/40 px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>{exp.period}</span>
                  </div>
                  <p className="text-sm text-white/60 mt-1">{exp.impact_line}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <motion.section className="px-6 md:px-12 py-16 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fade} custom={0} className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60 mb-8 text-center">Skills</motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skills.map((cat, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="p-5 rounded-2xl hover:scale-[1.02] transition-transform" style={glassCard}>
                  <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">{cat.category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((s, j) => (
                      <span key={j} className="text-xs font-medium text-white/70 px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <footer className="px-6 py-10 max-w-4xl mx-auto text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-white/30">© {new Date().getFullYear()} {p.name} · Built with Folio</p>
        </footer>
      </div>
    </div>
  );
}
