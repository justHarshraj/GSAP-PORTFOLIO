import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Layers,
  Cpu,
  Wind,
  Database,
  Grid,
  Box,
  GitBranch,
  Server,
  Zap,
  Terminal,
  Globe,
  Coffee,
  Flame,
  Github,
  Triangle,
  Cloud,
  FileTerminal,
  Send,
  Figma,
  Palette,
  Layout,
  RefreshCw,
  Braces
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  name: string;
  subtitle: string;
  category: 'FRONTEND' | 'BACKEND' | 'DATABASES & BaaS' | 'DEVOPS & CLOUD' | 'WORKFLOW & DESIGN';
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  { id: 'FE-01', name: 'HTML5', subtitle: 'STRUCTURE', category: 'FRONTEND', icon: Code, color: '#e34f26' },
  { id: 'FE-02', name: 'CSS3', subtitle: 'STYLING', category: 'FRONTEND', icon: Layers, color: '#1572b6' },
  { id: 'FE-03', name: 'JavaScript', subtitle: 'LOGIC', category: 'FRONTEND', icon: Cpu, color: '#f7df1e' },
  { id: 'FE-04', name: 'TypeScript', subtitle: 'STATIC TYPES', category: 'FRONTEND', icon: FileTerminal, color: '#3178c6' },
  { id: 'FE-05', name: 'React', subtitle: 'UI LIBRARY', category: 'FRONTEND', icon: AtomIcon, color: '#61dafb' },
  { id: 'FE-06', name: 'Next.js', subtitle: 'META-FRAMEWORK', category: 'FRONTEND', icon: NextIcon, color: '#ffffff' },
  { id: 'FE-07', name: 'Redux', subtitle: 'STATE MANAGEMENT', category: 'FRONTEND', icon: RefreshCw, color: '#764abc' },
  { id: 'FE-08', name: 'Tailwind', subtitle: 'UTILITY CSS', category: 'FRONTEND', icon: Wind, color: '#38bdf8' },
  { id: 'FE-09', name: 'Bootstrap', subtitle: 'UI TOOLKIT', category: 'FRONTEND', icon: Grid, color: '#7952b3' },

  // Backend
  { id: 'BE-01', name: 'Node.js', subtitle: 'RUNTIME', category: 'BACKEND', icon: Server, color: '#339933' },
  { id: 'BE-02', name: 'Express', subtitle: 'SERVER API', category: 'BACKEND', icon: Zap, color: '#a0a0a0' },
  { id: 'BE-03', name: 'Python', subtitle: 'GENERAL LOGIC', category: 'BACKEND', icon: Braces, color: '#3776ab' },
  { id: 'BE-04', name: 'Django', subtitle: 'PYTHON WEB', category: 'BACKEND', icon: Globe, color: '#092e20' },
  { id: 'BE-05', name: 'PHP', subtitle: 'SCRIPTING', category: 'BACKEND', icon: Database, color: '#777bb4' },
  { id: 'BE-06', name: 'Java', subtitle: 'OOP PLATFORM', category: 'BACKEND', icon: Coffee, color: '#007396' },
  { id: 'BE-07', name: 'C', subtitle: 'LOW-LEVEL', category: 'BACKEND', icon: Terminal, color: '#a8b9cc' },

  // Databases & BaaS
  { id: 'DB-01', name: 'MongoDB', subtitle: 'NOSQL DB', category: 'DATABASES & BaaS', icon: Database, color: '#47a248' },
  { id: 'DB-02', name: 'MySQL', subtitle: 'RELATIONAL DB', category: 'DATABASES & BaaS', icon: Database, color: '#4479a1' },
  { id: 'DB-03', name: 'Firebase', subtitle: 'GOOGLE BAAS', category: 'DATABASES & BaaS', icon: Flame, color: '#ffca28' },
  { id: 'DB-04', name: 'Supabase', subtitle: 'POSTGRES BAAS', category: 'DATABASES & BaaS', icon: Database, color: '#3ecf8e' },

  // DevOps & Cloud
  { id: 'DV-01', name: 'Git', subtitle: 'VCS', category: 'DEVOPS & CLOUD', icon: GitBranch, color: '#f05032' },
  { id: 'DV-02', name: 'GitHub', subtitle: 'COLLABORATION', category: 'DEVOPS & CLOUD', icon: Github, color: '#ffffff' },
  { id: 'DV-03', name: 'Docker', subtitle: 'CONTAINERS', category: 'DEVOPS & CLOUD', icon: Box, color: '#2496ed' },
  { id: 'DV-04', name: 'Vercel', subtitle: 'REACT DEPLOY', category: 'DEVOPS & CLOUD', icon: Triangle, color: '#ffffff' },
  { id: 'DV-05', name: 'Netlify', subtitle: 'STATIC DEPLOY', category: 'DEVOPS & CLOUD', icon: Cloud, color: '#00ad9f' },
  { id: 'DV-06', name: 'G. Cloud', subtitle: 'CLOUD PLATFORM', category: 'DEVOPS & CLOUD', icon: Cloud, color: '#4285f4' },

  // Workflow & Design / Tools
  { id: 'TL-01', name: 'VS Code', subtitle: 'IDE EDITOR', category: 'WORKFLOW & DESIGN', icon: FileTerminal, color: '#007acc' },
  { id: 'TL-02', name: 'Postman', subtitle: 'API CLIENT', category: 'WORKFLOW & DESIGN', icon: Send, color: '#ff6c37' },
  { id: 'TL-03', name: 'Figma', subtitle: 'VECTOR DESIGN', category: 'WORKFLOW & DESIGN', icon: Figma, color: '#f24e1e' },
  { id: 'TL-04', name: 'Canva', subtitle: 'QUICK ASSETS', category: 'WORKFLOW & DESIGN', icon: Palette, color: '#00c4cc' },
  { id: 'TL-05', name: 'UI / UX', subtitle: 'PRODUCT DESIGN', category: 'WORKFLOW & DESIGN', icon: Layout, color: '#a78bfa' },
];

// Custom Atom Icon for React
function AtomIcon(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={props.className} style={props.style} fill="none" stroke="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// Custom NextIcon
function NextIcon(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 180 180" className={props.className} style={props.style} fill="none" stroke="currentColor">
      <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.05" strokeWidth="2"/>
      <path d="M149 150L83.1 66.8H73.3V112.5H82.2V79.2L140 152.8C143.1 152 146.1 151.1 149 150Z" fill="currentColor"/>
      <path d="M116.7 66.8H107.8V112.4H116.7V66.8Z" fill="currentColor"/>
    </svg>
  );
}

const categories = [
  { id: 'ALL', name: 'ALL' },
  { id: 'FRONTEND', name: 'FRONTEND' },
  { id: 'BACKEND', name: 'BACKEND' },
  { id: 'DATABASES & BaaS', name: 'DATABASES & BaaS' },
  { id: 'DEVOPS & CLOUD', name: 'DEVOPS & CLOUD' },
  { id: 'WORKFLOW & DESIGN', name: 'WORKFLOW & DESIGN' },
] as const;

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]['id']>('ALL');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'ALL' || skill.category === activeCategory
  );

  // ScrollTrigger entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.skills-filter-btn', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-filter-bar',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP: Animate skill cards when filter changes or initial scroll reveal
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.skill-card');
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out',
      }
    );
  }, [activeCategory]);

  // Card hover handlers using GSAP
  const handleCardEnter = useCallback((el: HTMLDivElement, skillId: string) => {
    setHoveredCard(skillId);
    gsap.to(el, {
      borderColor: 'rgba(6, 182, 212, 0.5)',
      backgroundColor: 'rgba(30, 30, 35, 0.75)',
      boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
    const icon = el.querySelector('.skill-icon') as HTMLElement;
    if (icon) {
      gsap.to(icon, { scale: 1.1, duration: 0.25, ease: 'power2.out' });
    }
  }, []);

  const handleCardLeave = useCallback((el: HTMLDivElement) => {
    setHoveredCard(null);
    gsap.to(el, {
      borderColor: 'rgba(192, 192, 192, 0.1)',
      backgroundColor: 'rgba(20, 20, 22, 0.6)',
      boxShadow: '0 0 0 rgba(6, 182, 212, 0)',
      duration: 0.3,
      ease: 'power2.out',
    });
    const icon = el.querySelector('.skill-icon') as HTMLElement;
    if (icon) {
      gsap.to(icon, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(7,7,9,0.3) 0%, rgba(20,20,25,0.4) 100%)',
      }}
    >
      {/* Background Dots Pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(192, 192, 192, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full max-w-7xl">
        <h2
          className="skills-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16 text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          TECHNICAL SKILLS
        </h2>

        {/* Filter Navigation */}
        <div className="skills-filter-bar flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-4 mb-10 md:mb-14 scrollbar-none" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`skills-filter-btn whitespace-nowrap shrink-0 px-3 py-2 rounded-lg border font-mono text-[10px] sm:text-xs md:text-sm tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-gray-500 hover:text-gray-300 border-transparent hover:bg-gray-800/20'
                }`}
              >
                {`[ ${cat.name} ]`}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            const isHovered = hoveredCard === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={(e) => handleCardEnter(e.currentTarget, skill.id)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
                className="skill-card relative backdrop-blur-md rounded-xl p-4 sm:p-6 flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] md:min-h-[180px] border border-[rgba(192,192,192,0.1)] bg-[rgba(20,20,22,0.6)] cursor-pointer transition-colors"
              >
                {/* Corner accent */}
                {isHovered && (
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-cyan-400 rounded-tl-lg" />
                )}

                {/* ID Code label */}
                <div className="absolute top-3 right-3 font-mono text-[9px] text-gray-600">
                  [{skill.id}]
                </div>

                {/* Icon */}
                <div className="flex-1 flex items-center justify-center mt-3 mb-4">
                  <Icon
                    className={`skill-icon w-10 h-10 transition-opacity duration-300 ${
                      isHovered ? '' : 'opacity-70'
                    }`}
                    style={{ color: isHovered ? skill.color : '#a3a3a3' }}
                  />
                </div>

                {/* Title & Description */}
                <div className="w-full text-center space-y-1.5">
                  <h3
                    className="text-xs md:text-sm font-bold text-gray-200"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {skill.name}
                  </h3>

                  <div className="flex items-center justify-center text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-500">
                    {isHovered && (
                      <div className="w-2.5 h-2.5 rounded-full border border-cyan-500/50 flex items-center justify-center mr-1.5 shrink-0">
                        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                    )}
                    <span>{skill.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
