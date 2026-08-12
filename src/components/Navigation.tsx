import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CERTIFICATIONS', href: '#certifications' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'CONSOLE', href: '#terminal' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeBarRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  // GSAP: Animate nav entrance
  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // GSAP: Scroll progress bar
  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const sectionId = link.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // GSAP: Animate active underline position
  useEffect(() => {
    const activeIndex = navLinks.findIndex(
      (link) => link.href.substring(1) === activeSection
    );
    const activeBtn = linkRefs.current[activeIndex];
    const bar = activeBarRef.current;

    if (activeBtn && bar) {
      const rect = activeBtn.getBoundingClientRect();
      const parentRect = activeBtn.parentElement?.getBoundingClientRect();
      if (parentRect) {
        gsap.to(bar, {
          x: rect.left - parentRect.left,
          width: rect.width,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        });
      }
    }
  }, [activeSection]);

  // GSAP: Mobile menu open/close
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileDrawerRef.current) return;

    if (isOpen) {
      gsap.set(mobileMenuRef.current, { display: 'flex' });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileDrawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
      // Stagger menu items
      const items = mobileDrawerRef.current.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(
        items,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.15 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        },
      });
    }
  }, [isOpen]);

  const scrollToSection = useCallback((href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  // Hover animation for nav links
  const handleLinkHover = (el: HTMLButtonElement, enter: boolean) => {
    gsap.to(el, {
      scale: enter ? 1.1 : 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 z-50"
        style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
      />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-2 sm:top-4 left-1/2 z-40 w-[95%] max-w-6xl"
        style={{ transform: 'translateX(-50%)', opacity: 0 }}
      >
        <div
          className="backdrop-blur-md bg-[rgba(26,26,26,0.7)] border border-[rgba(192,192,192,0.2)] rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}
        >
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text text-transparent cursor-pointer"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              onClick={() => scrollToSection('#hero')}
            >
              HARSH.RAJ
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-4 xl:space-x-8 relative">
              {/* Active section underline bar */}
              <div
                ref={activeBarRef}
                className="absolute -bottom-1 h-0.5 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600"
                style={{ boxShadow: '0 0 10px rgba(192, 192, 192, 0.5)', opacity: 0, width: 0 }}
              />
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  ref={(el) => { linkRefs.current[index] = el; }}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={(e) => handleLinkHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleLinkHover(e.currentTarget, false)}
                  className={`relative text-xs lg:text-sm font-semibold transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-gray-300'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-300 p-2 -mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 lg:hidden"
        style={{ display: 'none' }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        />
        <div
          ref={mobileDrawerRef}
          className="absolute right-0 top-0 h-full w-[75vw] max-w-[300px] bg-[#1a1a1a] border-l border-gray-700 p-6 sm:p-8 flex flex-col"
        >
          {/* Close button */}
          <div className="flex justify-end mb-4 mt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-1 flex-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`mobile-nav-link text-left text-base font-semibold transition-colors py-3 px-2 rounded-lg ${
                  activeSection === link.href.substring(1)
                    ? 'text-white bg-white/5'
                    : 'text-gray-400 hover:text-white active:bg-white/5'
                }`}
                style={{ fontFamily: 'Orbitron, sans-serif', opacity: 0 }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
