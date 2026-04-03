import { motion } from 'framer-motion';

/*
 * MINIMAL DEVELOPER THEME
 * Inspired by: brittanychiang.com, leerob.io, jackwatkins.co
 *
 * Layout: Left-fixed sidebar (name, headline, nav, social)
 *         Right scrolling content (about, projects, experience, skills)
 * Typography: Inter (mono for accents)
 * Colors: Slate dark background, muted teal accents
 * Spacing: Generous, readable, breathable
 */

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ACCENT = '#5EEAD4'; // teal-300
const ACCENT_DIM = 'rgba(94, 234, 212, 0.1)';

export default function MinimalTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, education, skills } = data;

  return (
    <div
      style={{
        background: '#0F172A',
        color: '#94A3B8',
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: '100vh',
        fontSize: '14px',
        lineHeight: 1.7,
      }}
    >
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto min-h-screen">
        {/* ─── LEFT SIDEBAR (Fixed on desktop) ─── */}
        <header className="lg:sticky lg:top-0 lg:h-screen lg:w-[420px] lg:shrink-0 px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-24 flex flex-col justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: '#E2E8F0', lineHeight: 1.1 }}
            >
              {p.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-lg font-medium"
              style={{ color: '#CBD5E1' }}
            >
              {p.headline}
            </motion.p>
            {about && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-sm leading-relaxed max-w-xs"
                style={{ color: '#64748B' }}
              >
                {about}
              </motion.p>
            )}

            {/* Nav */}
            <nav className="mt-12 hidden lg:flex flex-col gap-3">
              {['Projects', 'Experience', 'Skills'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                  style={{ color: '#475569' }}
                >
                  <span
                    className="h-px bg-current transition-all group-hover:w-16"
                    style={{ width: '32px' }}
                  />
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Social */}
          {p.social_links && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 mt-8 lg:mt-0"
            >
              {Object.entries(p.social_links).map(([key, url]) =>
                url && key !== 'email' ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors capitalize"
                    style={{ color: '#64748B' }}
                  >
                    {key}
                  </a>
                ) : null
              )}
            </motion.div>
          )}
        </header>

        {/* ─── RIGHT SCROLLING CONTENT ─── */}
        <main className="flex-1 px-6 lg:px-12 pt-8 lg:pt-24 pb-24">
          {/* ─── PROJECTS (PRIMARY FOCUS) ─── */}
          {featured_projects?.length > 0 && (
            <motion.section
              id="projects"
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-widest mb-8 lg:hidden"
                style={{ color: ACCENT }}
              >
                Projects
              </motion.h2>
              <div className="flex flex-col gap-4">
                {featured_projects.map((proj, i) => (
                  <motion.a
                    key={i}
                    href={proj.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fade}
                    custom={i + 1}
                    className="group relative p-5 rounded-lg transition-all hover:bg-[#1E293B]/60 -mx-5"
                    style={{ cursor: proj.link ? 'pointer' : 'default' }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ boxShadow: `inset 0 1px 0 ${ACCENT_DIM}` }}
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Impact badge */}
                      {proj.impact && (
                        <div className="sm:w-28 shrink-0 pt-1">
                          <span className="text-[11px] font-semibold" style={{ color: ACCENT }}>
                            {proj.impact}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-base font-semibold group-hover:text-white transition-colors flex items-center gap-2"
                          style={{ color: '#E2E8F0' }}
                        >
                          {proj.title}
                          {proj.link && (
                            <svg className="w-3.5 h-3.5 text-current opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                          {proj.one_liner}
                        </p>
                        {proj.tech_stack?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {proj.tech_stack.map((t, j) => (
                              <span
                                key={j}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                                style={{ color: ACCENT, background: ACCENT_DIM }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── EXPERIENCE ─── */}
          {experience?.length > 0 && (
            <motion.section
              id="experience"
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-widest mb-8 lg:hidden"
                style={{ color: ACCENT }}
              >
                Experience
              </motion.h2>
              <div className="flex flex-col gap-2">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fade}
                    custom={i + 1}
                    className="group p-5 rounded-lg hover:bg-[#1E293B]/60 -mx-5 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
                      <p className="text-xs font-semibold uppercase tracking-wider shrink-0 sm:w-28 pt-1"
                        style={{ color: '#475569' }}
                      >
                        {exp.period}
                      </p>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold group-hover:text-white transition-colors"
                          style={{ color: '#E2E8F0' }}
                        >
                          {exp.role}
                          <span className="font-medium" style={{ color: ACCENT }}> · {exp.company}</span>
                        </h3>
                        <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                          {exp.impact_line}
                        </p>
                        {exp.tech?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {exp.tech.map((t, j) => (
                              <span
                                key={j}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                                style={{ color: ACCENT, background: ACCENT_DIM }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── SKILLS ─── */}
          {skills?.length > 0 && (
            <motion.section
              id="skills"
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-widest mb-8 lg:hidden"
                style={{ color: ACCENT }}
              >
                Skills
              </motion.h2>
              <div className="flex flex-col gap-6">
                {skills.map((cat, i) => (
                  <motion.div key={i} variants={fade} custom={i + 1}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: '#475569' }}
                    >
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((s, j) => (
                        <span
                          key={j}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ color: ACCENT, background: ACCENT_DIM }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── EDUCATION ─── */}
          {education?.length > 0 && (
            <motion.section
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {education.map((edu, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="flex gap-6 p-5 -mx-5">
                  <p className="text-xs font-semibold uppercase tracking-wider shrink-0 sm:w-28 pt-1" style={{ color: '#475569' }}>
                    {edu.year}
                  </p>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>{edu.degree}</h3>
                    <p className="text-sm" style={{ color: '#64748B' }}>{edu.institution}</p>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          )}

          {/* ─── FOOTER ─── */}
          <footer className="pt-8 border-t" style={{ borderColor: '#1E293B' }}>
            <p className="text-xs" style={{ color: '#334155' }}>
              Built with <span style={{ color: ACCENT }}>Folio</span> · Inspired by{' '}
              <a href="https://brittanychiang.com" target="_blank" rel="noopener noreferrer"
                className="hover:underline" style={{ color: '#475569' }}>
                brittanychiang.com
              </a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
