import { motion } from 'framer-motion';

/*
 * FRAMER / BENTO THEME
 * Inspired by: framer.com, linear.app
 *
 * Layout: Warm off-white background, bento-grid cards,
 *         spring hover animations, sticky nav
 * Typography: Inter, rounded and modern
 * Structure: Bento grid skills, card-based experience, project showcase
 */

const spring = { type: 'spring', stiffness: 300, damping: 25 };

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, ...spring },
  }),
};

const PURPLE = '#5B5BD6';
const PURPLE_BG = '#EEEDFF';

export default function FramerTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, education, skills } = data;

  return (
    <div style={{ background: '#F5F5F0', color: '#1A1A1A', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      {/* Nav */}
      <motion.nav
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(245,245,240,0.8)', backdropFilter: 'blur(20px)' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <span className="font-bold text-sm tracking-tight">{p.name}</span>
        <div className="flex gap-4">
          {p.social_links && Object.entries(p.social_links).map(([key, url]) =>
            url && key !== 'email' ? (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium text-gray-500 hover:text-black transition-colors capitalize">
                {key}
              </a>
            ) : null
          )}
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        className="px-6 md:px-12 pt-16 pb-20 max-w-5xl mx-auto"
        initial="hidden" animate="visible"
      >
        <motion.div variants={fade} custom={0}
          className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{ background: PURPLE_BG, color: PURPLE }}
        >
          {p.headline}
        </motion.div>
        <motion.h1 variants={fade} custom={1}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}
        >
          {p.name}
        </motion.h1>
        {about && (
          <motion.p variants={fade} custom={2} className="mt-6 text-gray-500 text-lg leading-relaxed max-w-xl">
            {about}
          </motion.p>
        )}
      </motion.section>

      {/* Projects */}
      {featured_projects?.length > 0 && (
        <motion.section className="px-6 md:px-12 py-16 max-w-5xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.h2 variants={fade} custom={0} className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-8">Projects</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured_projects.map((proj, i) => (
              <motion.a key={i} href={proj.link || '#'} target="_blank" rel="noopener noreferrer"
                variants={fade} custom={i + 1}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all block group"
                whileHover={{ scale: 1.02, transition: spring }}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold group-hover:text-[#5B5BD6] transition-colors">{proj.title}</h3>
                  <span className="text-gray-400 group-hover:text-[#5B5BD6] transition-colors text-sm shrink-0">↗</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{proj.one_liner}</p>
                {proj.impact && (
                  <p className="text-xs font-bold mt-3" style={{ color: PURPLE }}>{proj.impact}</p>
                )}
                {proj.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tech_stack.map((t, j) => (
                      <span key={j} className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ color: PURPLE, background: PURPLE_BG }}>{t}</span>
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
        <motion.section className="px-6 md:px-12 py-16 max-w-5xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.h2 variants={fade} custom={0} className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-8">Experience</motion.h2>
          <div className="flex flex-col gap-4">
            {experience.map((exp, i) => (
              <motion.div key={i} variants={fade} custom={i + 1}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                whileHover={{ scale: 1.01, transition: spring }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold">{exp.role}</h3>
                    <p className="text-sm text-gray-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-full shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{exp.impact_line}</p>
                {exp.tech?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map((t, j) => (
                      <span key={j} className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <motion.section className="px-6 md:px-12 py-16 max-w-5xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.h2 variants={fade} custom={0} className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-8">Skills</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skills.map((cat, i) => (
              <motion.div key={i} variants={fade} custom={i + 1}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
                whileHover={{ scale: 1.02, transition: spring }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: PURPLE }}>{cat.category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((s, j) => (
                    <span key={j} className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 max-w-5xl mx-auto border-t border-gray-200 flex items-center justify-between">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} {p.name}</p>
        <p className="text-xs text-gray-400">Built with Folio</p>
      </footer>
    </div>
  );
}
