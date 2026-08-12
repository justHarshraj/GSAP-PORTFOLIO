import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, ShieldCheck, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: 'Ybi Foundation',
    subtitle: 'AI & Machine Learning Internship',
    description: 'Successfully completed a 1-month AI/ML internship. Developed projects and tasks demonstrating hands-on skills in Artificial Intelligence and Machine Learning.',
    icon: ShieldCheck,
    tags: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Internship'],
    gradient: 'from-gray-700 to-gray-900',
    verifyLink: '/ybi-cert.png',
    isImageModal: true,
  },
  {
    title: 'Google Cloud',
    subtitle: 'Google Cloud Skills Boost',
    description: 'Earned various Google Cloud skill badges, certificates, and credentials validating skills in AI, Machine Learning, and Cloud Technologies.',
    icon: ShieldCheck,
    tags: ['Google Cloud', 'Generative AI', 'Cloud Computing', 'Data Cloud'],
    gradient: 'from-gray-600 to-gray-800',
    verifyLink: 'https://www.skills.google/profile/badges',
  },
  {
    title: 'Hacktoberfest Contributor',
    subtitle: 'Holopin Badges',
    description: 'Earned digital badges celebrating contributions to the open-source community during Hacktoberfest.',
    icon: Award,
    tags: ['Open Source', 'Git', 'GitHub', 'Hacktoberfest'],
    gradient: 'from-gray-700 to-gray-900',
    verifyLink: 'https://holopin.io/@justharshraj',
    badgeImage: 'https://holopin.io/api/user/board?user=justharshraj',
  },
  {
    title: 'Indus University',
    subtitle: 'Futuristic Technologies & Applications',
    description: 'Certificate of Appreciation for completing the program on "Introduction and Evolution of Futuristic Technologies with Applications" organized by the Computer Engineering Department.',
    icon: Award,
    tags: ['Futuristic Tech', 'Emerging Tech', 'Indus University'],
    gradient: 'from-gray-600 to-gray-800',
    verifyLink: '/cert-1.jpg',
    isImageModal: true,
  },
  {
    title: 'Indus University',
    subtitle: 'Full Stack Mobile App Development',
    description: 'Certificate of Completion for "Full Stack Mobile App Development using Flutter" organized by the Department of Computer Science & Engineering.',
    icon: Award,
    tags: ['Flutter', 'Mobile Dev', 'Dart', 'Full Stack'],
    gradient: 'from-gray-700 to-gray-900',
    verifyLink: '/cert-2.jpg',
    isImageModal: true,
  },
  {
    title: 'Microsoft',
    subtitle: 'GitHub Copilot Certification',
    description: 'Successfully completed the GitHub Copilot certification program from Microsoft, demonstrating proficiency in AI-powered developer workflows.',
    icon: ShieldCheck,
    tags: ['GitHub Copilot', 'AI Coding', 'Microsoft', 'Productivity'],
    gradient: 'from-gray-800 to-gray-950',
    verifyLink: '/cert-3.jpg',
    isImageModal: true,
  },
];

export const CertificationsSection = () => {
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

  // ScrollTrigger entrance
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.certs-title', {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.certs-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.cert-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.certs-grid',
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
      gsap.fromTo(modalContentRef.current, { scale: 0.9, y: 20 }, { scale: 1, y: 0, duration: 0.35, ease: 'power3.out' });
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

  const handleCardEnter = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1.02, duration: 0.25, ease: 'power2.out' });
  };
  const handleCardLeave = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  const handleBtnEnter = (el: HTMLElement) => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 0 20px rgba(192, 192, 192, 0.4)', duration: 0.2 });
  };
  const handleBtnLeave = (el: HTMLElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(192, 192, 192, 0)', duration: 0.2 });
  };

  return (
    <section id="certifications" ref={sectionRef} className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          className="certs-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 md:mb-16 text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          CERTIFICATIONS
        </h2>

        <div className="certs-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="cert-card relative h-[340px] sm:h-[380px] md:h-[400px] lg:h-[420px]"
                style={{ perspective: '1000px' }}
                onMouseEnter={(e) => handleCardEnter(e.currentTarget)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
              >
                <div className="card-inner relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front */}
                  <div
                    className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl p-4 md:p-6 backface-hidden cursor-pointer"
                    style={{ backfaceVisibility: 'hidden', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
                    onClick={() => toggleFlip(index)}
                  >
                    <div className={`mb-3 md:mb-4 h-24 sm:h-32 bg-gradient-to-br ${cert.gradient} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-6 gap-1 p-4">
                          {[...Array(24)].map((_, i) => (
                            <div key={i} className="w-full aspect-square bg-gray-400 rounded" />
                          ))}
                        </div>
                      </div>
                      {cert.badgeImage ? (
                        <img src={cert.badgeImage} alt={cert.title} className="h-full object-contain p-2 z-10" referrerPolicy="no-referrer" />
                      ) : (
                        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 z-10" />
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold mb-1 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {cert.title}
                    </h3>
                    <div className="text-gray-500 text-xs font-semibold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {cert.subtitle}
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2">{cert.description}</p>

                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {cert.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] sm:text-xs backdrop-blur-md bg-[rgba(26,26,26,0.5)] border border-[rgba(192,192,192,0.2)] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 backdrop-blur-md bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg md:rounded-xl p-4 md:p-6 backface-hidden cursor-pointer"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: '0 0 40px rgba(192, 192, 192, 0.3)' }}
                    onClick={() => toggleFlip(index)}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {cert.title}
                    </h3>
                    <div className="text-gray-500 text-sm font-semibold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {cert.subtitle}
                    </div>

                    <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">{cert.description}</p>

                    <div className="space-y-2 md:space-y-3">
                      {cert.isImageModal ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(cert.verifyLink); }}
                          onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                          className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 md:px-4 md:py-3 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          VIEW CERTIFICATE
                        </button>
                      ) : (
                        <a
                          href={cert.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                          className="w-full backdrop-blur-md bg-[rgba(192,192,192,0.1)] border border-[rgba(192,192,192,0.3)] rounded-lg px-3 py-2 md:px-4 md:py-3 text-gray-300 font-semibold flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          VERIFY CREDENTIAL
                        </a>
                      )}
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
              <img src={selectedImage} alt="Certificate Preview" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
