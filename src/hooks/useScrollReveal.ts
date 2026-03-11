import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  start?: string;
}

/**
 * Reveal a single element when it scrolls into view.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    scale = 1,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y, x, scale });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, y, x, scale, duration, delay, start]);
}

interface StaggerOptions extends RevealOptions {
  stagger?: number;
}

/**
 * Stagger-reveal child elements matching `childSelector`.
 */
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options: StaggerOptions = {}
) {
  const {
    y = 40,
    x = 0,
    scale = 1,
    duration = 0.7,
    delay = 0,
    stagger = 0.1,
    start = 'top 85%',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y, x, scale });
    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: { trigger: container, start, toggleActions: 'play none none none' },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef, childSelector, y, x, scale, duration, delay, stagger, start]);
}
