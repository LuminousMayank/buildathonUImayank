import { motion } from 'framer-motion';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function CyberTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, skills } = data;

  return (
    <div style={{
      background: '#0A0A0F', color: '#E0E0E0',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
    }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute left-0 right-0 h-px pointer-events-none z-50 opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #00FF88, transparent)', animation: 'scan 4s linear infinite' }} />

      <div className="relative z-10">
        <nav className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,255,136,0.1)' }}>
          <span style={{ color: '#00FF88', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600 }}>
            &gt;_ {p.name.toLowerCase().replace(/ /g, '_')}
          </span>
        </nav>

        {/* Hero */}
        <motion.section className="px-6 md:px-12 pt-24 pb-20 max-w-4xl mx-auto" initial="hidden" animate="visible">
          <motion.div variants={fade} custom={0} className="mb-3">
            <span className="text-xs font-mono" style={{ color: '#00FF8860' }}>// identity.config</span>
          </motion.div>
          <motion.h1 variants={fade} custom={1} style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.05,
            color: '#00FF88', textShadow: '0 0 10px rgba(0,255,136,0.25)',
          }}>
            {p.name}
          </motion.h1>
          <motion.p variants={fade} custom={2} className="text-lg mt-3 font-medium" style={{ color: '#00FFFF' }}>{p.headline}</motion.p>
          {about && <motion.p variants={fade} custom={3} className="mt-6 leading-relaxed max-w-xl text-sm" style={{ color: '#888' }}>{about}</motion.p>}
        </motion.section>

        {/* Projects */}
        {featured_projects?.length > 0 && (
          <motion.section className="px-6 md:px-12 py-16 max-w-4xl mx-auto border-t" style={{ borderColor: 'rgba(0,255,136,0.08)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0} className="text-xs font-mono mb-8" style={{ color: '#00FF8860' }}>{'>'} projects.showcase()</motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured_projects.map((proj, i) => (
                <motion.a key={i} href={proj.link || '#'} target="_blank" rel="noopener noreferrer"
                  variants={fade} custom={i + 1}
                  className="p-5 rounded-lg border block group transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(0,255,136,0.02)', borderColor: 'rgba(0,255,136,0.1)' }}>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00FF88] transition-colors">{proj.title}</h3>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: '#666' }}>{proj.one_liner}</p>
                  {proj.impact && <p className="text-xs font-mono mt-2" style={{ color: '#00FF88' }}>{proj.impact}</p>}
                  {proj.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tech_stack.map((t, j) => (
                        <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{ color: '#FF00FF', borderColor: 'rgba(255,0,255,0.2)', background: 'rgba(255,0,255,0.05)' }}>{t}</span>
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
          <motion.section className="px-6 md:px-12 py-16 max-w-4xl mx-auto border-t" style={{ borderColor: 'rgba(0,255,136,0.08)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0} className="text-xs font-mono mb-8" style={{ color: '#00FF8860' }}>{'>'} career.timeline.render()</motion.div>
            <div className="flex flex-col gap-0">
              {experience.map((exp, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="p-5 border-l-2 relative ml-3 pl-6"
                  style={{ borderColor: i === 0 ? '#00FF88' : 'rgba(0,255,136,0.15)' }}>
                  <div className="absolute left-[-5px] top-6 w-2 h-2 rounded-full"
                    style={{ background: i === 0 ? '#00FF88' : '#333', boxShadow: i === 0 ? '0 0 8px #00FF88' : 'none' }} />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: '#fff' }}>{exp.role}</h3>
                      <p className="text-xs font-mono" style={{ color: '#00FFFF80' }}>{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono shrink-0" style={{ color: '#555' }}>{exp.period}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#777' }}>{exp.impact_line}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <motion.section className="px-6 md:px-12 py-16 max-w-4xl mx-auto border-t" style={{ borderColor: 'rgba(0,255,136,0.08)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0} className="text-xs font-mono mb-6" style={{ color: '#00FF8860' }}>{'>'} system.skills.list()</motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((cat, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="p-4 rounded-lg border"
                  style={{ background: 'rgba(0,255,136,0.02)', borderColor: 'rgba(0,255,136,0.1)' }}>
                  <p className="text-xs font-mono font-bold mb-3" style={{ color: '#00FFFF' }}>{cat.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((s, j) => (
                      <span key={j} className="text-xs font-mono px-2.5 py-1 rounded border"
                        style={{ color: '#00FF88', borderColor: 'rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.05)' }}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <footer className="px-6 py-10 max-w-4xl mx-auto text-center border-t" style={{ borderColor: 'rgba(0,255,136,0.08)' }}>
          <p className="text-xs font-mono" style={{ color: '#333' }}>
            <span style={{ color: '#00FF8860' }}>{'>'}</span> echo "© {new Date().getFullYear()} {p.name} · Built with Folio"
          </p>
        </footer>
      </div>
    </div>
  );
}
