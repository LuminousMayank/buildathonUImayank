import { motion } from 'framer-motion';

/*
 * SPLIT LAYOUT THEME
 * Inspired by: adhamdannaway.com
 *
 * Layout: Full-height split. Left = bold identity + bio (fixed).
 *         Right = scrolling portfolio content.
 * Typography: Space Grotesk for headings, Inter for body
 * Colors: Split — dark left pane, light right pane
 * Distinct from Minimal: Completely different spatial arrangement,
 *   different color paradigm (split contrast), different typography weight
 */

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function SplitTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, education, skills } = data;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* ─── LEFT PANE: Identity (Fixed) ─── */}
        <div
          className="lg:sticky lg:top-0 lg:h-screen lg:w-[45%] shrink-0 flex flex-col justify-center items-center text-center px-8 lg:px-16 py-16 lg:py-0 relative overflow-hidden"
          style={{ background: '#111111', color: '#FAFAFA' }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-sm">
            {/* Avatar placeholder */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: 'white',
                boxShadow: '0 0 40px rgba(99,102,241,0.25)',
              }}
            >
              {p.name?.split(' ').map(n => n[0]).join('')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {p.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-base font-medium"
              style={{ color: '#A1A1AA' }}
            >
              {p.headline}
            </motion.p>

            {about && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-5 text-sm leading-relaxed"
                style={{ color: '#71717A' }}
              >
                {about}
              </motion.p>
            )}

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex gap-3 justify-center flex-wrap"
            >
              {p.social_links?.email && (
                <a
                  href={`mailto:${p.social_links.email}`}
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
                  style={{ background: '#6366F1', color: 'white' }}
                >
                  Get in Touch
                </a>
              )}
              {p.social_links?.github && (
                <a
                  href={p.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all hover:bg-white/5"
                  style={{ borderColor: '#333', color: '#A1A1AA' }}
                >
                  GitHub ↗
                </a>
              )}
            </motion.div>

            {/* Social row */}
            {p.social_links && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex gap-4 justify-center"
              >
                {Object.entries(p.social_links).map(([key, url]) =>
                  url && key !== 'email' ? (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold uppercase tracking-wider hover:text-white transition-colors"
                      style={{ color: '#52525B' }}
                    >
                      {key}
                    </a>
                  ) : null
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* ─── RIGHT PANE: Scrolling Content ─── */}
        <div
          className="flex-1 px-8 lg:px-16 py-16 lg:py-20"
          style={{ background: '#FAFAFA', color: '#18181B' }}
        >
          {/* ─── FEATURED PROJECTS ─── */}
          {featured_projects?.length > 0 && (
            <motion.section
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-8"
                style={{ color: '#A1A1AA' }}
              >
                Featured Work
              </motion.h2>
              <div className="flex flex-col gap-6">
                {featured_projects.map((proj, i) => (
                  <motion.a
                    key={i}
                    href={proj.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fade}
                    custom={i + 1}
                    className="group block p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{
                      background: 'white',
                      borderColor: '#E4E4E7',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3
                            className="text-lg font-bold group-hover:text-indigo-600 transition-colors"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {proj.title}
                          </h3>
                          {proj.impact && (
                            <span
                              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                              style={{ background: '#EEF2FF', color: '#6366F1' }}
                            >
                              {proj.impact}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#71717A' }}>
                          {proj.one_liner}
                        </p>
                        {proj.tech_stack?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {proj.tech_stack.map((t, j) => (
                              <span
                                key={j}
                                className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                                style={{ background: '#F4F4F5', color: '#52525B' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-zinc-400 group-hover:text-indigo-500 transition-colors text-lg shrink-0 mt-1">
                        ↗
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── EXPERIENCE ─── */}
          {experience?.length > 0 && (
            <motion.section
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-8"
                style={{ color: '#A1A1AA' }}
              >
                Experience
              </motion.h2>
              <div className="flex flex-col gap-6">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={fade}
                    custom={i + 1}
                    className="flex gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center pt-1.5">
                      <div className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: i === 0 ? '#6366F1' : '#D4D4D8' }}
                      />
                      {i < experience.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: '#E4E4E7' }} />
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#A1A1AA' }}>
                        {exp.period}
                      </p>
                      <h3
                        className="text-base font-bold"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#18181B' }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: '#6366F1' }}>
                        {exp.company}
                      </p>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: '#71717A' }}>
                        {exp.impact_line}
                      </p>
                      {exp.tech?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.tech.map((t, j) => (
                            <span
                              key={j}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded"
                              style={{ background: '#F4F4F5', color: '#52525B' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── SKILLS ─── */}
          {skills?.length > 0 && (
            <motion.section
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-8"
                style={{ color: '#A1A1AA' }}
              >
                Skills & Tools
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((cat, i) => (
                  <motion.div
                    key={i}
                    variants={fade}
                    custom={i + 1}
                    className="p-5 rounded-xl border"
                    style={{ background: 'white', borderColor: '#E4E4E7' }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider mb-3"
                      style={{ color: '#6366F1' }}
                    >
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s, j) => (
                        <span
                          key={j}
                          className="text-sm font-medium"
                          style={{ color: '#3F3F46' }}
                        >
                          {s}{j < cat.items.length - 1 ? ',' : ''}
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
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.h2
                variants={fade}
                custom={0}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: '#A1A1AA' }}
              >
                Education
              </motion.h2>
              {education.map((edu, i) => (
                <motion.div key={i} variants={fade} custom={i + 1}>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#18181B' }}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-sm" style={{ color: '#71717A' }}>
                    {edu.institution} · {edu.year}
                  </p>
                </motion.div>
              ))}
            </motion.section>
          )}

          {/* ─── FOOTER ─── */}
          <footer className="pt-8 border-t" style={{ borderColor: '#E4E4E7' }}>
            <p className="text-xs" style={{ color: '#A1A1AA' }}>
              © {new Date().getFullYear()} {p.name} · Built with{' '}
              <span style={{ color: '#6366F1' }}>Folio</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
