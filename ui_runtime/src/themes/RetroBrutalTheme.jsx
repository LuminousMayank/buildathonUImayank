import { motion } from 'framer-motion';

/*
 * RETRO BRUTAL THEME
 * Inspired by: Neo-brutalism, Gumroad, Figma's bold templates
 *
 * Layout: Grid-based, distinct sections with bold colors
 * Typography: Space Grotesk / Inter, very thick weights
 * Characteristics: Hard shadows, stark borders, bright solid colors
 */

const brutalContainer = {
  border: '3px solid #000',
  boxShadow: '6px 6px 0px 0px #000',
  borderRadius: '8px',
};

const brutalCardHover = {
  x: -2,
  y: -2,
  boxShadow: '8px 8px 0px 0px #000',
};

const colors = {
  bg: '#FFF9E6',
  yellow: '#FFDE59',
  pink: '#FF6EEED', // A bright pink-ish
  blue: '#5CE1E6',
  green: '#C1FF72',
  purple: '#CB6CE6',
};

// Re-map colors for variety
const getCardColor = (index) => {
  const c = [colors.yellow, '#FF914D', colors.blue, colors.green, colors.purple];
  return c[index % c.length];
};

export default function RetroBrutalTheme({ data }) {
  if (!data) return null;
  const { personal: p, about, featured_projects, experience, skills } = data;

  return (
    <div style={{
      background: colors.bg,
      color: '#000',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Nav / Header */}
        <nav className="flex justify-between items-center bg-white p-4" style={brutalContainer}>
          <span className="font-black text-xl tracking-tight uppercase">{p.name}</span>
          <div className="flex gap-4">
            {p.social_links && Object.entries(p.social_links).map(([key, url]) =>
              url && key !== 'email' ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-bold uppercase hover:underline">
                  {key}
                </a>
              ) : null
            )}
            {p.social_links?.email && (
              <a href={`mailto:${p.social_links.email}`} className="bg-black text-white px-4 py-1 font-bold text-sm rounded-sm">
                CONTACT
              </a>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white p-8 md:p-16 flex flex-col md:flex-row gap-8 items-center" style={{ ...brutalContainer, background: colors.blue }}>
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-white px-4 py-2 font-bold uppercase text-xs" style={{ border: '2px solid #000', boxShadow: '3px 3px 0 0 #000' }}>
              {p.headline}
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-none uppercase" style={{ WebkitTextStroke: '1px #000' }}>
              {p.name}
            </h1>
            {about && (
              <p className="text-lg font-medium max-w-xl bg-white p-4" style={{ border: '2px solid #000' }}>
                {about}
              </p>
            )}
          </div>
          {/* Decorative geometric block */}
          <motion.div
            className="w-48 h-48 rounded-full border-[3px] border-black bg-yellow-300 shrink-0 relative overflow-hidden"
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ yoyo: Infinity, duration: 2, repeat: Infinity, repeatType: "mirror" }}
            style={{ boxShadow: '6px 6px 0 0 #000' }}
          >
            <div className="absolute inset-0 flex items-center justify-center font-black text-6xl">
              *
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        {featured_projects?.length > 0 && (
          <section>
            <h2 className="text-4xl font-black mb-6 uppercase" style={{ WebkitTextStroke: '1px #000', color: 'transparent' }}>
              <span className="text-black">{'//'}</span> Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured_projects.map((proj, i) => (
                <motion.a
                  key={i}
                  href={proj.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 transition-transform relative overflow-hidden group"
                  style={{ ...brutalContainer, background: getCardColor(i) }}
                  whileHover={brutalCardHover}
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center font-black text-xl z-0 group-hover:scale-110 transition-transform">
                    ↗
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">{proj.title}</h3>
                    <p className="font-medium text-black bg-white/60 p-2 border border-black inline-block mb-3 text-sm">
                      {proj.one_liner}
                    </p>
                    {proj.impact && (
                      <p className="font-bold underline decoration-4 decoration-white mb-4">{proj.impact}</p>
                    )}
                    {proj.tech_stack?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {proj.tech_stack.map((t, j) => (
                          <span key={j} className="text-xs font-bold bg-white px-2 py-1 border-2 border-black uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience */}
          {experience?.length > 0 && (
            <section className="lg:col-span-2 space-y-6">
              <h2 className="text-4xl font-black uppercase"><span className="text-purple-500">{'//'}</span> Experience</h2>
              {experience.map((exp, i) => (
                <div key={i} className="bg-white p-6" style={brutalContainer}>
                  <div className="flex flex-wrap items-center justify-between mb-2 border-b-2 border-black pb-2">
                    <h3 className="text-xl font-black uppercase">{exp.role} <span className="text-gray-500">@ {exp.company}</span></h3>
                    <span className="font-bold bg-gray-200 border border-black px-2 py-1 text-xs">{exp.period}</span>
                  </div>
                  <p className="font-medium mt-3 text-sm md:text-base">{exp.impact_line}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-4xl font-black uppercase"><span className="text-green-500">{'//'}</span> Skills</h2>
              <div className="bg-[#FF914D] p-6 space-y-6" style={brutalContainer}>
                {skills.map((cat, i) => (
                  <div key={i}>
                    <p className="font-black uppercase border-b-2 border-black mb-2 pb-1">{cat.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((s, j) => (
                        <span key={j} className="text-xs font-bold bg-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-black text-white p-8 font-black text-center uppercase" style={brutalContainer}>
          © {new Date().getFullYear()} {p.name}. Built with Folio.
        </footer>
      </div>
    </div>
  );
}
