import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download,
  Terminal,
  Database,
  LineChart,
  BrainCircuit,
  Layers,
  Menu,
  X,
  ArrowRight,
  Phone,
  Code2
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  SKILLS, 
  EXPERIENCE, 
  PROJECTS, 
  STATS, 
  CONTACT,
  CERTIFICATIONS,
  Role 
} from './constants';

// --- Components ---

const Navbar: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-display font-bold tracking-tighter">
          SP<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                activeSection === item.toLowerCase() ? "text-accent" : "text-gray-400"
              )}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 w-full bg-secondary border-b border-white/5 p-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{children}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl">{subtitle}</p>}
    <div className="w-20 h-1 bg-accent mt-4 rounded-full" />
  </div>
);

interface SkillCardProps {
  skill: typeof SKILLS[0];
  activeRole: Role;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, activeRole }) => {
  const isRelevant = skill.relevance.includes(activeRole);
  
  return (
    <motion.div
      layout
      className={cn(
        "p-6 rounded-xl border transition-all duration-300",
        isRelevant 
          ? "bg-secondary border-accent/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]" 
          : "bg-secondary/50 border-white/5 opacity-60"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2 rounded-lg", isRelevant ? "bg-accent/10 text-accent" : "bg-white/5 text-gray-400")}>
          {skill.icon}
        </div>
        <h3 className="font-bold">{skill.category}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <span 
            key={item} 
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              isRelevant ? "bg-accent/10 text-accent border border-accent/20" : "bg-white/5 text-gray-400 border border-white/5"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo?: string;
    type: string;
    priority: { backend: number; data: number };
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="group relative bg-secondary border border-white/5 rounded-xl overflow-hidden hover:border-accent/40 transition-colors"
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono text-accent uppercase tracking-wider">{project.type}</span>
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] font-mono text-gray-400">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main Application ---

const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

export default function App() {
  const [role, setRole] = useState<Role>('backend');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedProjects = useMemo(() => {
    return [...PROJECTS].sort((a, b) => {
      // Priority is a mapping of role to priority number
      // We want to sort ascending (1 is top)
      return (a.priority[role] || 99) - (b.priority[role] || 99);
    });
  }, [role]);

  return (
    <div className="min-h-screen text-gray-200">
      <Navbar activeSection={activeSection} />

      {/* Role Toggle Switch */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="bg-secondary/90 backdrop-blur-md border border-white/10 p-1 rounded-full flex gap-1 shadow-2xl">
          {(['backend', 'data'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                role === r 
                  ? "bg-accent text-white shadow-lg" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {r === 'backend' ? 'Backend' : 'Data'}
            </button>
          ))}
        </div>
      </div>

      <main>
        {/* --- Hero Section --- */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">
           {/* Background decorative elements */}
           <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-highlight/5 rounded-full blur-[120px]" />

          <div className="max-w-4xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight">
                Hi, I'm <span className="text-accent underline decoration-accent/30 underline-offset-8 decoration-4"><TypingText text={HERO_CONTENT.name} /></span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white mb-4">
                {HERO_CONTENT.title}
              </p>
              <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {HERO_CONTENT.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#projects" 
                  className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold flex items-center gap-2 glow-hover transition-all"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href={HERO_CONTENT.links.resume} 
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                  Resume <Download className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-12 flex justify-center gap-6">
                {CONTACT.socials.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    className="p-3 bg-secondary border border-white/5 rounded-full hover:border-accent/50 hover:text-accent transition-all hover:scale-110 active:scale-95"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-24 px-6 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeading subtitle="Crafting the digital backbone and deriving logic from chaos.">
                  About Me
                </SectionHeading>
                <div className="space-y-4 text-gray-400 lg:text-lg">
                  <p>{ABOUT_CONTENT.bio}</p>
                  <p className="border-l-4 border-accent pl-4 italic bg-accent/5 py-4 rounded-r-lg">
                    "Driven by data, secured by logic, scaled by engineering."
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {STATS.map((stat) => (
                  <div key={stat.label} className="p-6 bg-secondary border border-white/5 rounded-2xl text-center group hover:border-accent/30 transition-colors shadow-sm">
                    <div className="text-3xl font-display font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</div>
                    {stat.site && <div className="text-[10px] text-accent/60 mt-1">{stat.site}</div>}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeading subtitle="Technical toolkit categorized by domains of expertise. Toggle modes to see prioritized skills.">
              Technical Arsenal
            </SectionHeading>
            <div className="grid md:grid-cols-3 gap-6">
              {SKILLS.map((skill) => (
                <SkillCard key={skill.category} skill={skill} activeRole={role} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="py-24 px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <SectionHeading>Professional Journey</SectionHeading>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10 ml-2">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xl font-bold bg-white/5 px-4 py-1 rounded-lg">{exp.title}</h3>
                    <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-accent font-medium mb-3 ml-4">{exp.company}</div>
                  <p className="text-gray-400 leading-relaxed max-w-2xl ml-4">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeading 
              subtitle={`Currently showing ${role === 'backend' ? 'Backend' : 'Data'} projects focused as priority.`}
            >
              Featured Projects
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- Achievements & Certifications --- */}
        <section className="py-24 px-6 bg-secondary/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <SectionHeading>Technical Achievements</SectionHeading>
                <div className="space-y-4">
                  <div className="p-6 bg-secondary border border-white/5 rounded-2xl flex items-start gap-4">
                    <div className="bg-accent/10 p-2 rounded-lg text-accent">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">400+ Problems Solved</h4>
                      <p className="text-sm text-gray-500">Active solver on LeetCode and GeeksforGeeks, maintaining a strong grasp on DSA fundamentals.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-secondary border border-white/5 rounded-2xl flex items-start gap-4">
                    <div className="bg-accent/10 p-2 rounded-lg text-accent">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">8.35 CGPA</h4>
                      <p className="text-sm text-gray-500">Strong academic performance throughout Bachelor of Technology at KIIT University.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <SectionHeading>Certifications</SectionHeading>
                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert) => (
                    <a 
                      key={cert.title} 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-6 bg-secondary border border-white/5 rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-accent group-hover:scale-110 transition-transform">
                          {cert.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm leading-tight group-hover:text-accent transition-colors">{cert.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{cert.issuer}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-24 px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading>Get In Touch</SectionHeading>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto">
              I'm active on LinkedIn and GitHub. Feel free to reach out for collaborations or just a tech chat!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <a href={`mailto:${CONTACT.email}`} className="p-8 bg-secondary border border-white/5 rounded-2xl hover:border-accent/40 transition-all group shadow-sm">
                <Mail className="w-8 h-8 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <div className="font-bold mb-1">Email Me</div>
                <div className="text-xs text-gray-500 break-all">{CONTACT.email}</div>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="p-8 bg-secondary border border-white/5 rounded-2xl hover:border-accent/40 transition-all group shadow-sm">
                <Phone className="w-8 h-8 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <div className="font-bold mb-1">Call Me</div>
                <div className="text-xs text-gray-500">{CONTACT.phone}</div>
              </a>
              <div className="p-8 bg-secondary border border-white/5 rounded-2xl hover:border-accent/40 transition-all group shadow-sm">
                <Database className="w-8 h-8 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
                <div className="font-bold mb-1">Location</div>
                <div className="text-xs text-gray-500">{CONTACT.address}</div>
              </div>
            </div>
            
            <form className="max-w-xl mx-auto text-left bg-secondary p-8 rounded-3xl border border-white/5 shadow-xl" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                  <input type="text" className="w-full bg-background border border-white/5 p-4 rounded-xl focus:outline-none focus:border-accent transition-colors" placeholder="Sourav Prasad" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                  <input type="email" className="w-full bg-background border border-white/5 p-4 rounded-xl focus:outline-none focus:border-accent transition-colors" placeholder="sourav@example.com" />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                <textarea rows={4} className="w-full bg-background border border-white/5 p-4 rounded-xl focus:outline-none focus:border-accent transition-colors" placeholder="Let's build something awesome..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all glow-hover mt-8 text-lg">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Sourav Prasad. KIIT '26 | Software Engineer</p>
          <div className="mt-4 flex justify-center gap-4">
             {CONTACT.socials.map((social) => (
                <a key={social.name} href={social.url} className="hover:text-accent transition-colors">{social.name}</a>
             ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
