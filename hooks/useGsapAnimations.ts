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

    // Timeout buffer allows Next.js DOM lifecycle to stabilize fully
    const t = setTimeout(() => {
      const headings = document.querySelectorAll<HTMLElement>(".gsap-heading");
      
      headings.forEach((heading) => {
        // Prevent double execution on hot-reloading or sub-route hooks
        if (heading.dataset.gsapSplitted) return;
        heading.dataset.gsapSplitted = "true";

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
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          }
        });
      });
      
      // Recalculate global document heights once lines are safely injected
      ScrollTrigger.refresh();
      
    }, 150);

    return () => {
      clearTimeout(t);
    };
  }, [pathname]);
}

// Global empty component to safely fire logic at the root Layout loop without making Document a Client Component
export function GsapInitializer() {
  useGsapAnimations();
  return null;
}
