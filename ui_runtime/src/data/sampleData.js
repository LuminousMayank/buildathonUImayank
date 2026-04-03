export const samplePortfolio = {
  personal: {
    name: "Brittany Chiang",
    headline: "I build accessible, pixel-perfect experiences for the web.",
    location: "San Francisco, CA",
    social_links: {
      github: "https://github.com/bchiang7",
      linkedin: "https://linkedin.com/in/bchiang7",
      twitter: "https://twitter.com/bchiang7",
      website: "https://brittanychiang.com",
      email: "brittany@example.com",
    },
  },
  about:
    "I'm a frontend engineer with an expertise in building accessible, pixel-perfect user interfaces. I care deeply about the intersection of design and engineering, where great UX meets clean, scalable code. Currently building design systems at Klaviyo.",
  featured_projects: [
    {
      title: "Spotify Profile",
      one_liner: "Web app for visualizing personalized Spotify data and generating smart playlists.",
      impact: "Featured in 50+ dev blogs",
      tech_stack: ["React", "Express", "Spotify API", "Heroku"],
      link: "https://spotify-profile.herokuapp.com/",
    },
    {
      title: "Halcyon Theme",
      one_liner: "Minimal dark blue theme for VS Code, Sublime Text, and iTerm.",
      impact: "100k+ installs",
      tech_stack: ["VS Code API", "JSON", "Publishing"],
      link: "https://halcyon-theme.netlify.app/",
    },
    {
      title: "Build a Spotify Connected App",
      one_liner: "Video course teaching full-stack development with the Spotify Web API.",
      impact: "Thousands of students enrolled",
      tech_stack: ["React", "Node.js", "Express", "Styled Components"],
      link: "https://www.newline.co/courses/build-a-spotify-connected-app",
    },
    {
      title: "brittanychiang.com v4",
      one_liner: "Personal portfolio site that became an open-source template for developers.",
      impact: "6k+ GitHub stars, 3k+ forks",
      tech_stack: ["Gatsby", "Styled Components", "Netlify"],
      link: "https://v4.brittanychiang.com/",
    },
  ],
  experience: [
    {
      role: "Senior Frontend Engineer, Accessibility",
      company: "Klaviyo",
      period: "2024 — Present",
      impact_line:
        "Maintain and evolve the design system, advocating accessibility best practices across all frontend products.",
      tech: ["TypeScript", "React", "Storybook"],
    },
    {
      role: "Lead Engineer",
      company: "Upstatement",
      period: "2018 — 2024",
      impact_line:
        "Shipped high-quality websites and design systems for Harvard, Pratt Institute, and The 19th News.",
      tech: ["React", "Next.js", "TypeScript", "WordPress"],
    },
    {
      role: "UI Engineer Co-op",
      company: "Apple",
      period: "Jul — Dec 2017",
      impact_line:
        "Developed the embeddable web player for Apple Music, featured by 9to5Mac and The Verge.",
      tech: ["Ember", "JavaScript", "MusicKit.js"],
    },
  ],
  education: [
    {
      institution: "Northeastern University",
      degree: "B.S. Computer Science",
      year: "2019",
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "HTML", "CSS"],
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Gatsby", "React Native"],
    },
    {
      category: "Tools",
      items: ["Figma", "Storybook", "Git", "Contentful"],
    },
  ],
};
