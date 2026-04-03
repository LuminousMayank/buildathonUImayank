import { motion } from 'framer-motion';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const syn = {
  keyword: '#569CD6', string: '#CE9178', type: '#4EC9B0',
  comment: '#6A9955', fn: '#DCDCAA', var: '#9CDCFE',
  num: '#B5CEA8', text: '#D4D4D4', bg: '#1E1E1E',
  bgCard: '#252526', border: '#333333', lineNum: '#858585',
};

const mono = "'JetBrains Mono', 'Fira Code', monospace";

export default function DeveloperTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, skills } = data;

  return (
    <div style={{ background: syn.bg, color: syn.text, fontFamily: mono, minHeight: '100vh', fontSize: '13px', lineHeight: 1.7 }}>
      <div className="sticky top-0 z-50 flex items-center gap-2 px-4 py-2" style={{ background: '#181818', borderBottom: `1px solid ${syn.border}` }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <span className="text-xs ml-3" style={{ color: syn.lineNum }}>{p.name.toLowerCase().replace(/ /g, '_')}.portfolio — ~/dev</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Hero */}
        <motion.section className="pt-12 pb-8" initial="hidden" animate="visible">
          <motion.div variants={fade} custom={0}><span style={{ color: syn.comment }}>{'/**'}</span></motion.div>
          <motion.div variants={fade} custom={0.5}><span style={{ color: syn.comment }}>{' * @author '}</span><span style={{ color: syn.string }}>{p.name}</span></motion.div>
          <motion.div variants={fade} custom={1}><span style={{ color: syn.comment }}>{' * @tagline '}</span><span style={{ color: syn.string }}>{p.headline}</span></motion.div>
          {p.social_links?.email && <motion.div variants={fade} custom={1.5}><span style={{ color: syn.comment }}>{' * @contact '}</span><span style={{ color: syn.var }}>{p.social_links.email}</span></motion.div>}
          <motion.div variants={fade} custom={2}><span style={{ color: syn.comment }}>{' */'}</span></motion.div>
          {about && (
            <motion.div variants={fade} custom={3} className="mt-6 p-4 rounded-lg" style={{ background: syn.bgCard, border: `1px solid ${syn.border}` }}>
              <span style={{ color: syn.comment }}>// about.md</span>
              <p className="mt-2" style={{ color: '#aaa' }}>{about}</p>
            </motion.div>
          )}
        </motion.section>

        {/* Projects */}
        {featured_projects?.length > 0 && (
          <motion.section className="py-8 border-t" style={{ borderColor: syn.border }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0}><span style={{ color: syn.comment }}>{'// ls -la ~/projects/'}</span></motion.div>
            <div className="flex flex-col gap-3 mt-4">
              {featured_projects.map((proj, i) => (
                <motion.a key={i} href={proj.link || '#'} target="_blank" rel="noopener noreferrer"
                  variants={fade} custom={i + 1}
                  className="p-4 rounded-lg block group transition-all" style={{ background: syn.bgCard, border: `1px solid ${syn.border}` }}>
                  <div className="flex gap-2 items-center">
                    <span style={{ color: syn.lineNum }}>📁</span>
                    <span className="font-bold group-hover:underline" style={{ color: syn.fn }}>{proj.title}</span>
                    {proj.link && <span className="text-[11px]" style={{ color: syn.keyword }}>↗</span>}
                  </div>
                  <p className="mt-1.5 text-[12px]" style={{ color: '#888' }}>{proj.one_liner}</p>
                  {proj.impact && <p className="text-[11px] mt-1 font-bold" style={{ color: syn.num }}>{proj.impact}</p>}
                  {proj.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tech_stack.map((t, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded"
                          style={{ color: syn.type, background: 'rgba(78,201,176,0.1)', border: '1px solid rgba(78,201,176,0.2)' }}>{t}</span>
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
          <motion.section className="py-8 border-t" style={{ borderColor: syn.border }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0}><span style={{ color: syn.comment }}>{'// git log --oneline'}</span></motion.div>
            <div className="flex flex-col gap-4 mt-4">
              {experience.map((exp, i) => (
                <motion.div key={i} variants={fade} custom={i + 1} className="p-4 rounded-lg" style={{ background: syn.bgCard, border: `1px solid ${syn.border}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: syn.fn }}>{exp.role}</span>
                    <span style={{ color: syn.lineNum }}>@</span>
                    <span style={{ color: syn.type }}>{exp.company}</span>
                  </div>
                  <span className="text-[11px]" style={{ color: syn.lineNum }}>{exp.period}</span>
                  <p className="mt-2 flex gap-2"><span style={{ color: syn.num }}>+</span><span style={{ color: '#aaa' }}>{exp.impact_line}</span></p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <motion.section className="py-8 border-t" style={{ borderColor: syn.border }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0}>
              <span style={{ color: syn.keyword }}>const </span><span style={{ color: syn.var }}>skills</span><span> = {'{'}</span>
            </motion.div>
            <div className="pl-4 mt-2 flex flex-col gap-3">
              {skills.map((cat, i) => (
                <motion.div key={i} variants={fade} custom={i + 1}>
                  <span style={{ color: syn.type }}>{cat.category.toLowerCase()}</span><span>: [</span>
                  {cat.items.map((s, j) => (
                    <span key={j}><span style={{ color: syn.string }}>"{s}"</span>{j < cat.items.length - 1 && <span>, </span>}</span>
                  ))}
                  <span>],</span>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fade} custom={skills.length + 1}><span>{'}'}</span></motion.div>
          </motion.section>
        )}

        <footer className="py-10 border-t text-center" style={{ borderColor: syn.border }}>
          <p className="text-[11px]" style={{ color: syn.lineNum }}>
            <span style={{ color: syn.comment }}>{'// '}</span>© {new Date().getFullYear()} {p.name} · exit 0
          </p>
        </footer>
      </div>
    </div>
  );
}
