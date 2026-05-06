import React, { useState, useEffect, useMemo } from 'react';
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

// Simple className helper (since you removed cn)
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

const Navbar: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0F172A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold">
          SP<span style={{ color: "#3B82F6" }}>.</span>
        </a>

        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={cn(
                "text-sm",
                activeSection === item ? "text-blue-400" : "text-gray-400"
              )}
            >
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden p-4 bg-[#111827]">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="block py-2">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          if (
            scrollPosition >= el.offsetTop &&
            scrollPosition < el.offsetTop + el.offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedProjects = useMemo(() => [...PROJECTS], []);

  return (
    <div>
      <Navbar activeSection={activeSection} />

      <section id="home" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px" }}>
          Hi, I'm <span style={{ color: "#3B82F6" }}>{HERO_CONTENT.name}</span>
        </h1>
        <p>{HERO_CONTENT.title}</p>
        <p>{HERO_CONTENT.subtitle}</p>
      </section>

      <section id="about" style={{ padding: "60px 20px" }}>
        <h2>About</h2>
        <p>{ABOUT_CONTENT.bio}</p>
      </section>

      <section id="skills" style={{ padding: "60px 20px" }}>
        <h2>Skills</h2>
        {SKILLS.map((skill) => (
          <div key={skill.category}>
            <h3>{skill.category}</h3>
            <p>{skill.items.join(", ")}</p>
          </div>
        ))}
      </section>

      <section id="projects" style={{ padding: "60px 20px" }}>
        <h2>Projects</h2>
        {sortedProjects.map((p) => (
          <div key={p.title} style={{ marginBottom: "20px" }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.github}>GitHub</a>
          </div>
        ))}
      </section>

      <section id="contact" style={{ padding: "60px 20px" }}>
        <h2>Contact</h2>
        <p>{CONTACT.email}</p>
      </section>

      <footer style={{ textAlign: "center", padding: "20px" }}>
        © {new Date().getFullYear()} Sourav Prasad
      </footer>
    </div>
  );
}