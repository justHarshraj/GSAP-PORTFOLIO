import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger reveal hook — replaces the old useInView + framer-motion pattern.
 * Animates children of the container when it scrolls into view.
 */
export const useGsapReveal = (
  options?: {
    trigger?: string;
    start?: string;
    end?: string;
    markers?: boolean;
  }
) => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate all direct [data-gsap-reveal] children inside this container
      const revealElements = ref.current.querySelectorAll('[data-gsap-reveal]');

      revealElements.forEach((el) => {
        const direction = (el as HTMLElement).dataset.gsapReveal || 'up';
        const delay = parseFloat((el as HTMLElement).dataset.gsapDelay || '0');
        const staggerVal = (el as HTMLElement).dataset.gsapStagger;

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options?.start || 'top 85%',
            toggleActions: 'play none none none',
          },
        };

        switch (direction) {
          case 'up':
            fromVars.y = 50;
            break;
          case 'down':
            fromVars.y = -50;
            break;
          case 'left':
            fromVars.x = -60;
            break;
          case 'right':
            fromVars.x = 60;
            break;
          case 'scale':
            fromVars.scale = 0.8;
            break;
          case 'fade':
            break;
        }

        if (staggerVal) {
          // If the element is a container for staggered children
          const staggerChildren = el.querySelectorAll('[data-gsap-stagger-child]');
          if (staggerChildren.length) {
            gsap.from(staggerChildren, {
              ...fromVars,
              stagger: parseFloat(staggerVal),
              scrollTrigger: {
                trigger: el,
                start: options?.start || 'top 85%',
                toggleActions: 'play none none none',
              },
            });
            return;
          }
        }

        gsap.from(el, fromVars);
      });
    }, ref);

    return () => ctx.revert();
  }, [options?.start]);

  return ref;
};
