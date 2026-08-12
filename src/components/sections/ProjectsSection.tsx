import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, BarChart3, ExternalLink, CheckSquare, Cpu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'GitCV',
    description: 'Implements a resume template engine with GitHub OAuth authentication and clean layouts to generate professional developer CVs directly from your GitHub profile.',
    icon: Code,
    tags: ['React', 'TypeScript', 'GitHub API', 'TailwindCSS'],
    gradient: 'from-gray-700 to-gray-900',
    liveLink: 'https://gitcv-rouge.vercel.app',
    githubLink: 'https://github.com/justHarshraj/gitcv',
  },
  {
    title: 'Project Hyperlink',
    description: 'A Chrome extension that provides unlimited shortcuts and a clean developer workspace for managing your frequently visited links.',
    icon: Globe,
    tags: ['Chrome Extension', 'JavaScript', 'HTML5', 'CSS3'],
    gradient: 'from-gray-600 to-gray-800',
    liveLink: '/hyperlink-preview.png',
    githubLink: 'https://github.com/justHarshraj/project-hyperlink',
    isImageModal: true,
  },
  {
    title: 'TaskMaster Pro',
    description: 'A premium, high-performance, framework-free task management application built using clean, semantic HTML5, modern vanilla CSS, and standard native JavaScript DOM APIs.',
    icon: CheckSquare,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'DOM API'],
    gradient: 'from-gray-700 to-gray-900',
    liveLink: 'https://justharshraj.github.io/TASKMASTER-PRO/',
    githubLink: 'https://github.com/justHarshraj/TASKMASTER-PRO',
  },
  {
    title: 'Project Umbrella',
    description: 'The Green AI Router & Prompt Minifier. Intercepts AI queries, minifies them, and dynamically routes them to the server grid running on the cleanest renewable energy.',
    icon: Cpu,
    tags: ['Green AI', 'Chrome Extension', 'Node.js', 'API Routing'],
    gradient: 'from-gray-600 to-gray-800',
    liveLink: 'https://github.com/justHarshraj/project-umbrella',
    githubLink: 'https://github.com/justHarshraj/project-umbrella',
  },
  {
    title: 'TCS Traffic Congestion System',
    description: 'An AI-powered computer vision traffic congestion detection and analysis system built using YOLOv8, Yolov8n.pt, location intelligence services, and email alerts.',
    icon: BarChart3,
    tags: ['YOLOv8', 'Python', 'Computer Vision', 'Email Alerts'],
    gradient: 'from-gray-700 to-gray-900',
    liveLink: '/traffic-preview.jpg',
    githubLink: 'https://github.com/justHarshraj/TCS_Traffic_Congestion_System',
    isImageModal: true,
  },
  {
    title: 'Core Inventory System',
    description: 'A robust and scalable Inventory and Warehouse Management System designed for efficiency. Streamlines stock tracking, warehouse operations, and product management.',
    icon: BarChart3,
    tags: ['Python', 'React', 'Stock Tracking', 'Warehouse Management'],
    gradient: 'from-gray-600 to-gray-800',
    liveLink: 'https://github.com/justHarshraj/core-inventory-hackathon',
    githubLink: 'https://github.com/justHarshraj/core-inventory-hackathon',
  },
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const toggleFlip = (index: number) => {
    const cardInner = cardRefs.current[index]?.querySelector('.card-inner') as HTMLDivElement;
    if (!cardInner) return;

    const isCurrentlyFlipped = flippedCards.includes(index);

    if (isCurrentlyFlipped) {
      gsap.to(cardInner, { rotateY: 0, duration: 0.6, ease: 'power2.inOut' });
      setFlippedCards(prev => prev.filter(i => i !== index));
    } else {
      gsap.to(cardInner, { rotateY: 180, duration: 0.6, ease: 'power2.inOut' });
      setFlippedCards(prev => [...prev, index]);
    }
  };

  // ScrollTrigger entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.from('.projects-title', {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger
      gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal animation
  useEffect(() => {
    if (selectedImage && modalRef.current && modalContentRef.current) {
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalContentRef.current,
        { scale: 0.9, y: 20 },
        { scale: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, [selectedImage]);

  const closeModal = () => {
    if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, { scale: 0.9, y: 20, duration: 0.25, ease: 'power2.in' });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.05,
        onComplete: () => {
          setSelectedImage(null);
          if (modalRef.current) gsap.set(modalRef.current, { display: 'none' });
        },
      });
    } else {
      setSelectedImage(null);
    }
  };

  // Card hover
  const handleCardEnter = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
  };
  const handleCardLeave = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  // Button hover
  const handleBtnEnter = (el: HTMLElement) => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 0 20px rgba(192, 192, 192, 0.4)', duration: 0.2 });
  };
  const handleBtnLeave = (el: HTMLElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(192, 192, 192, 0)', duration: 0.2 });
  };

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          className="projects-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16 text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          PROJECTS
        </h2>

        <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="project-card relative h-[340px] sm:h-[380px] md:h-[400px] lg:h-[420px]"
                style={{ perspective: '1000px' }}
                onMouseEnter={(e) => handleCardEnter(e.currentTarget)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              >
                <div
                  className="card-inner relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl p-4 md:p-6 backface-hidden cursor-pointer"
                    style={{ backfaceVisibility: 'hidden', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
                    onClick={() => toggleFlip(index)}
                  >
                    <div className={`mb-3 md:mb-4 h-24 sm:h-32 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-6 gap-1 p-4">
                          {[...Array(24)].map((_, i) => (
                            <div key={i} className="w-full aspect-square bg-gray-400 rounded" />
                          ))}
                        </div>
                      </div>
                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 z-10" />
                    </div>

                    <h3
                      className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-xs backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg md:rounded-xl p-4 md:p-6 backface-hidden cursor-pointer"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 0 40px rgba(192, 192, 192, 0.3)',
                    }}
                    onClick={() => toggleFlip(index)}
                  >
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">{project.description}</p>

                    <div className="space-y-2 md:space-y-3">
                      {project.isImageModal ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(project.liveLink); }}
                          onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                          className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 md:px-4 md:py-3 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          VIEW PROJECT
                        </button>
                      ) : (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                          className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 md:px-4 md:py-3 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          VIEW PROJECT
                        </a>
                      )}

                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                        onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                        className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 md:px-4 md:py-3 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                      >
                        <Code className="w-4 h-4" />
                        VIEW CODE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal */}
      {createPortal(
        <div
          ref={modalRef}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-sm"
          style={{ display: 'none' }}
        >
          <div
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1a1a1a] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-2xl overflow-hidden p-1 sm:p-2"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-[rgba(192,192,192,0.2)] text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Project Preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
