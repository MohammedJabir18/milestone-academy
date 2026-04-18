"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { usePathname } from "next/navigation";

export function useGsapAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Timeout buffer allows Next.js DOM lifecycle to stabilize fully
      const t = setTimeout(() => {
        const headings = document.querySelectorAll<HTMLElement>(".gsap-heading");
        let newlySplitted = false;
        
        headings.forEach((heading) => {
          // Prevent double execution
          if (heading.dataset.gsapSplitted) return;
          heading.dataset.gsapSplitted = "true";
          newlySplitted = true;

          const split = new SplitType(heading, { types: "lines" });
          
          if (!split.lines) return;

          // Wrap each generated line into a strict masking container
          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            wrapper.style.display = "inline-flex";
            wrapper.style.verticalAlign = "top";
            
            if (line.parentNode) {
              line.parentNode.insertBefore(wrapper, line);
              wrapper.appendChild(line);
            }
          });

          // Global animation matrix timeline
          gsap.from(split.lines, {
            y: "110%",
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          });
        });
        
        // ONLY refresh if we actually added new triggers, to save performance
        if (newlySplitted) {
          ScrollTrigger.refresh();
        }
        
      }, 100);

      return () => {
        clearTimeout(t);
      };
    });

    return () => {
      ctx.revert();
    };
  }, [pathname]);
}

// Global empty component to safely fire logic at the root Layout loop without making Document a Client Component
export function GsapInitializer() {
  useGsapAnimations();
  return null;
}
