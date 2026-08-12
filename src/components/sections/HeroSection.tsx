import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // GSAP: Hero entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        photoRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          h1Ref.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          h2Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );

      // Chevron bounce loop
      if (chevronRef.current) {
        gsap.to(chevronRef.current, {
          y: 10,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button hover handlers
  const handleBtnEnter = (el: HTMLButtonElement) => {
    gsap.to(el, {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(192, 192, 192, 0.4)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleBtnLeave = (el: HTMLButtonElement) => {
    gsap.to(el, {
      scale: 1,
      boxShadow: '0 0 0px rgba(192, 192, 192, 0)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen min-h-[100dvh] flex flex-col overflow-hidden pt-24 md:pt-32 lg:pt-40"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10 relative pb-8 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div>
            {/* Profile Photo */}
            <div
              ref={photoRef}
              className="mb-6 md:mb-8 flex justify-center"
              style={{ opacity: 0 }}
            >
              <div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-gray-500 via-gray-300 to-gray-600"
                style={{ boxShadow: '0 0 30px rgba(192, 192, 192, 0.3)' }}
              >
                <img
                  src="/about-me-2.png"
                  alt="Harsh Raj"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Name */}
            <h1
              ref={h1Ref}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent leading-none"
              style={{ fontFamily: 'Orbitron, sans-serif', opacity: 0 }}
            >
              HARSH
            </h1>

            <h2
              ref={h2Ref}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-400 mb-6 md:mb-8 leading-tight tracking-wider"
              style={{ fontFamily: 'Orbitron, sans-serif', opacity: 0 }}
            >
              RAJ
            </h2>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-sm sm:text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-14 leading-relaxed px-2 sm:px-4"
              style={{ opacity: 0 }}
            >
              Crafting digital experiences where innovation meets elegance
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 font-semibold transition-colors text-sm sm:text-base"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                VIEW WORK
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                onMouseEnter={(e) => handleBtnEnter(e.currentTarget)}
                onMouseLeave={(e) => handleBtnLeave(e.currentTarget)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 font-semibold transition-colors text-sm sm:text-base"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Chevron */}
      <div className="flex justify-center w-full pb-8 md:pb-12 z-10 relative">
        <button
          ref={chevronRef}
          onClick={scrollToNext}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
};
