import { 
  Database, 
  Layout, 
  LineChart, 
  BrainCircuit, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  FileCode,
  Layers,
  Search,
  Code2
} from 'lucide-react';

export type Role = 'backend' | 'data';

export const HERO_CONTENT = {
  name: "Sourav Prasad",
  title: "Backend Developer | Data Analytics Enthusiast",
  subtitle: "Building scalable APIs, data pipelines, and ML-driven solutions",
  links: {
    github: "https://github.com/souravprasad",
    linkedin: "https://linkedin.com/in/sourav-prasad",
    resume: "https://drive.google.com/file/d/1Vdqdana1sSFUyDymcNykSaNmrBgxPGsu/view?usp=sharing"
  }
};

export const ABOUT_CONTENT = {
  bio: "CS student at KIIT (2026 graduation) with a deep passion for building robust backend systems and extracting insights from complex data. I specialize in Spring Boot, REST APIs, and have a growing expertise in Data Analytics and Machine Learning. With over 400+ DSA problems solved, I thrive on tackling challenging computational problems.",
};

export const SKILLS = [
  {
    category: "Languages",
    items: ["Java", "Python", "C++", "JavaScript"],
    icon: <Code2 className="w-5 h-5" />,
    relevance: ["backend", "data"]
  },
  {
    category: "Backend",
    items: ["Spring Boot", "REST APIs", "JWT", "JPA"],
    icon: <Terminal className="w-5 h-5" />,
    relevance: ["backend"]
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL"],
    icon: <Database className="w-5 h-5" />,
    relevance: ["backend"]
  },
  {
    category: "Data Analytics",
    items: ["Pandas", "NumPy", "Excel", "Alteryx"],
    icon: <LineChart className="w-5 h-5" />,
    relevance: ["data"]
  },
  {
    category: "Machine Learning",
    items: ["TensorFlow", "OpenCV", "YOLO"],
    icon: <BrainCircuit className="w-5 h-5" />,
    relevance: ["data"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman"],
    icon: <Layers className="w-5 h-5" />,
    relevance: ["backend", "data"]
  }
];

export const EXPERIENCE = [
  {
    title: "Java Developer Intern",
    company: "InternPe",
    period: "2024",
    description: "Focused on OOP, modular coding, and collection frameworks to build maintainable Java applications.",
    type: "backend"
  },
  {
    title: "Data Analytics Intern",
    company: "AICTE EduSkills",
    period: "2024",
    description: "Developed data pipelines, conducted Exploratory Data Analysis (EDA), and automated workflows.",
    type: "data"
  }
];

export const PROJECTS = [
  {
    title: "PrepX – Quiz App Backend",
    description: "A robust backend for a quiz platform featuring role-based authentication, CSV uploads for questions, and OTP-based login systems.",
    tech: ["Spring Boot", "JWT", "MySQL"],
    github: "https://github.com/sourav2601/Prepx-Backened",
    demo: "https://prepxruhu.netlify.app/",
    type: "backend",
    priority: { backend: 1, data: 2 }
  },
  {
    title: "Foot Ulcer Detection",
    description: "Computer vision model utilizing YOLOv8 and YOLOv11 for medical image segmentation and detection with high accuracy (mAP: 0.917).",
    tech: ["YOLOv8", "YOLOv11", "Python", "Computer Vision"],
    github: "https://github.com/sourav2601/Instance-Segmentation-of-Foot-Ulcer",
    type: "data",
    priority: { backend: 2, data: 1 }
  }
];

export const CERTIFICATIONS = [
  {
    title: "Computer Vision: YOLO Custom Object Detection with Colab GPU",
    issuer: "Coursera",
    link: "https://coursera.org/share/03f92c8016f29a3843c2ad14045dfb3b",
    icon: <BrainCircuit className="w-4 h-4" />
  },
  {
    title: "Machine Learning for All",
    issuer: "Coursera",
    link: "https://coursera.org/share/5137680a8f4435471e9cbce0b0a70172",
    icon: <LineChart className="w-4 h-4" />
  },
  {
    title: "Generative AI: Prompt Engineering Basics",
    issuer: "Coursera",
    link: "https://coursera.org/share/482ae53739c97e02e9c4545662e63421",
    icon: <Code2 className="w-4 h-4" />
  }
];

export const STATS = [
  { label: "Problems Solved", value: "400+", site: "LeetCode & GFG" },
  { label: "CGPA", value: "8.35" },
  { label: "Systems Developed", value: "Real-world" },
  { label: "Solutions Built", value: "Data-driven" }
];

export const CONTACT = {
  email: "souravprasad2004@gmail.com",
  phone: "9507225755",
  address: "Ramgarh, Jharkhand",
  socials: [
    { name: "GitHub", url: "https://github.com/souravprasad", icon: <Github className="w-5 h-5" /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/sourav-prasad", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Email", url: "mailto:souravprasad2004@gmail.com", icon: <Mail className="w-5 h-5" /> }
  ]
};
