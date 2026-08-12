import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.about-title', {
        opacity: 0,
        x: -60,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Text paragraphs
      gsap.from('.about-text', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text-container',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Stats cards
      gsap.from('.about-stat', {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Image
      gsap.from('.about-image', {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers for stat cards
  const handleStatEnter = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1.05,
      boxShadow: '0 0 20px rgba(192, 192, 192, 0.3)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleStatLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1,
      boxShadow: '0 0 0px rgba(192, 192, 192, 0)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  // Hover for the image card
  const handleImageEnter = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1.03,
      boxShadow: '0 0 35px rgba(192, 192, 192, 0.3)',
      borderColor: 'rgba(192, 192, 192, 0.4)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleImageLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      borderColor: 'rgba(192, 192, 192, 0.2)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-24 md:pt-32 pb-16 relative"
      style={{
        background:
          'linear-gradient(180deg, rgba(7,7,9,0.3) 0%, rgba(20,20,25,0.4) 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2
              className="about-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ABOUT ME
            </h2>

            <div className="about-text-container">
              <p className="about-text text-gray-300 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                I'm a passionate web developer who thrives on creating visually
                bold, interactive, and technically robust digital experiences.I
                enjoy turning ideas into real-world applications using modern
                technologies My expertise lies in blending cutting-edge
                technology with elegant design principles.
              </p>

              <p className="about-text text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Beyond coding, I serve as a Google Student Ambassador, helping
                students learn, connect, and grow within the tech community. I'm
                constantly exploring new technologies, building innovative
                projects, and striving to create solutions that solve real-world
                problems.
              </p>
            </div>

            {/* Stats */}
            <div className="about-stats grid grid-cols-3 gap-3 md:gap-4">
              {[
                { value: '20+', label: 'PROJECTS' },
                { value: '4Y+', label: 'EXPERIENCE' },
                { value: '100%', label: 'DEDICATION' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="about-stat backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-lg md:rounded-xl px-3 py-3 md:px-6 md:py-4 text-center cursor-default"
                  onMouseEnter={(e) => handleStatEnter(e.currentTarget)}
                  onMouseLeave={(e) => handleStatLeave(e.currentTarget)}
                >
                  <div
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Image */}
          <div className="about-image flex justify-center mt-8 md:mt-0 w-full">
            <div
              className="relative w-full max-w-lg aspect-[16/9] rounded-xl md:rounded-2xl border border-[rgba(192,192,192,0.2)] overflow-hidden bg-[rgba(26,26,26,0.7)] backdrop-blur-md cursor-pointer"
              style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
              onMouseEnter={(e) => handleImageEnter(e.currentTarget)}
              onMouseLeave={(e) => handleImageLeave(e.currentTarget)}
            >
              <img
                src="/about-me-1.jpg"
                alt="Harsh Raj - Google Student Ambassador Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <div
                  className="text-gray-300 text-xs md:text-sm font-semibold tracking-wider"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  GOOGLE STUDENT AMBASSADOR EVENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
