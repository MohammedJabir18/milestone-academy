import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  start?: string;
  scale?: number;
}

/**
 * Fade-in + translateY reveal on scroll.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    scale = 1,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x, scale: scale < 1 ? scale : 1 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref, y, x, duration, delay, start, scale]);
}

/**
 * Stagger children reveal on scroll.
 */
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options: {
    stagger?: number;
    y?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  const { stagger = 0.12, y = 40, duration = 0.7, start = 'top 85%' } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(childSelector);
    if (!children.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [containerRef, childSelector, stagger, y, duration, start]);
}

/**
 * Parallax on scroll.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.3
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, speed]);
}
