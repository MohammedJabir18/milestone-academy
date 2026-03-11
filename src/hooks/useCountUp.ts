import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated number counter that triggers on scroll.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  target: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    start?: string;
  } = {}
) {
  const { duration = 2, prefix = '', suffix = '', decimals = 0, start = 'top 85%' } = options;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const el = ref.current;
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
          onEnter: () => {
            hasAnimated.current = true;
          },
        },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [ref, target, duration, prefix, suffix, decimals, start]);
}
