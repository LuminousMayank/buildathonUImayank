import { motion } from 'framer-motion';

/*
 * FLOATING 3D & MARQUEE THEME
 * Inspired by: Modern WebGL sites, Framer floating interactions
 *
 * Layout: Fluid, scattered floating cards, continuous text marquee backgrounds.
 * Characteristics: 3D transforms, soft multi-layered shadows, smooth spring animations,
 * glass/mesh gradients behind the cards.
 */

// Infinite marquee animation using CSS keyframes would need to be injected or we can use framer-motion looping
const Marquee = ({ text, reverse = false, speed = 20 }) => (
  <div className="relative overflow-hidden w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
    <motion.div
      className="inline-block text-[15rem] font-black uppercase tracking-tighter"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
    >
      {text} &nbsp; {text} &nbsp; {text} &nbsp; {text} &nbsp;
    </motion.div>
  </div>
);

const floatingAnimation = (delay) => ({
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
    delay: delay,
  }
});

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
  border: '1px solid rgba(255,255,255,0.4)',
};

export default function FloatingMarqueeTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, skills } = data;

  return (
    <div style={{
      background: '#F8F9FA',
      color: '#111827',
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-[100px]" animate={floatingAnimation(0)} />
        <motion.div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-rose-200/40 to-orange-100/40 blur-[120px]" animate={floatingAnimation(2)} />
      </div>

      {/* Marquee Backgrounds */}
      <div className="fixed inset-0 flex flex-col justify-between pointer-events-none z-0 overflow-hidden">
        <Marquee text={p.name.replace(/ /g, '·')} speed={40} />
        <Marquee text="CREATIVE·ENGINEER" reverse speed={50} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <nav className="flex justify-center mb-24">
          <motion.div className="px-6 py-3 rounded-full flex gap-6 items-center" style={cardStyle}
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <span className="font-bold text-sm tracking-widest uppercase">{p.name}</span>
            <div className="w-px h-4 bg-gray-200" />
            {p.social_links && Object.entries(p.social_links).map(([key, url]) =>
              url && key !== 'email' ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-500 hover:text-indigo-600 uppercase">
                  {key}
                </a>
              ) : null
            )}
          </motion.div>
        </nav>

        {/* Hero */}
        <section className="text-center mb-40 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900">
              {p.name}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {p.headline}
            </p>
            {about && (
              <motion.div animate={floatingAnimation(1)} className="max-w-xl mx-auto p-6" style={cardStyle}>
                <p className="text-gray-500 leading-relaxed text-sm">{about}</p>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Projects */}
        {featured_projects?.length > 0 && (
          <section className="mb-40">
            <h2 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-16">Selected Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              {featured_projects.map((proj, i) => (
                <motion.a
                  key={i}
                  href={proj.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 group"
                  style={{ ...cardStyle, transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  animate={floatingAnimation(i * 0.5)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">{proj.title}</h3>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      ↗
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium mb-4">{proj.one_liner}</p>
                  {proj.impact && <p className="text-sm font-bold text-indigo-500 mb-6">{proj.impact}</p>}

                  {proj.tech_stack?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.tech_stack.map((t, j) => (
                        <span key={j} className="text-xs font-semibold bg-gray-100/80 px-3 py-1.5 rounded-full text-gray-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </section>
        )}

        {/* Details Wrapper */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Experience */}
          {experience?.length > 0 && (
            <section className="flex-1">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10 pl-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <motion.div key={i} className="p-8" style={cardStyle}
                    initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    animate={floatingAnimation(i * 0.3)}
                    whileHover={{ scale: 1.02 }}>
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-indigo-600 font-semibold mb-4">{exp.company}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{exp.impact_line}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <section className="flex-1 lg:max-w-md">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10 pl-6">Expertise</h2>
              <div className="space-y-6">
                {skills.map((cat, i) => (
                  <motion.div key={i} className="p-8" style={cardStyle}
                    initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    animate={floatingAnimation(1 + i * 0.4)}
                    whileHover={{ scale: 1.02 }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s, j) => (
                        <span key={j} className="text-sm font-medium bg-white/50 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-700 shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        <footer className="text-center pb-12 pt-24 mt-20">
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            © {new Date().getFullYear()} {p.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
