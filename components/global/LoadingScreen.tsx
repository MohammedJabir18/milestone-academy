"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function LoadingScreen() {
  const [shouldRender, setShouldRender] = useState(false);
  const [complete, setComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check storage on mount
  useEffect(() => {
    if (sessionStorage.getItem("milestone_loading_played")) {
      setComplete(true);
    } else {
      setShouldRender(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldRender || complete) return;

    // Use SplitType as a replacement for GSAP SplitText
    let split: SplitType | null = null;
    if (textRef.current) {
      split = new SplitType(textRef.current, { types: "chars" });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("milestone_loading_played", "true");
        setComplete(true);
      }
    });

    // 1. Setup SVG stroke animation (mimicking DrawSVG)
    if (logoRef.current) {
      const paths = logoRef.current.querySelectorAll("path");
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power2.inOut"
      }, 0);
    }

    // 2. Type logo text letter by letter
    if (split?.chars) {
      tl.from(split.chars, {
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      }, 0.5); // Start slightly after logo drawing starts
    }

    // 3. Progress bar & Counter
    tl.to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power1.inOut"
    }, 0);

    tl.to(counterRef.current, {
      textContent: 100,
      duration: 1.5,
      snap: { textContent: 1 },
      ease: "power1.inOut",
      onUpdate: function() {
        if (counterRef.current) {
          const val = Math.round(Number(this.targets()[0].textContent));
          counterRef.current.innerText = val < 10 ? `0${val}` : val.toString();
        }
      }
    }, 0);
    
    // 4. Fade out text and logo before the split
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, 2.0);

    // 5. Split exit animation (slide top/bottom panels away like stage curtains vertically)
    tl.to([topPanelRef.current, bottomPanelRef.current], {
      yPercent: (i) => i === 0 ? -100 : 100,
      duration: 0.8,
      ease: "power3.inOut"
    }, 2.4);

    return () => {
      tl.kill();
      if (split) split.revert();
    };
  }, [shouldRender, complete]);

  if (complete || !shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* Background Panels that split */}
      <div 
        ref={topPanelRef} 
        className="absolute top-0 left-0 w-full h-[50vh] bg-[var(--bg-dark)] origin-top pointer-events-auto" 
      />
      <div 
        ref={bottomPanelRef} 
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[var(--bg-dark)] origin-bottom pointer-events-auto" 
      />
      
      {/* Centered Content */}
      <div 
        ref={contentRef} 
        className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none gap-8"
      >
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Milestone "M" Logo */}
          <svg 
            ref={logoRef}
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            className="mb-8 overflow-visible"
          >
            {/* Minimalist animated "M" matching the text */}
            <path 
              d="M 20 80 L 20 20 L 50 60 L 80 20 L 80 80" 
              stroke="var(--green-500)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          <h1 
            ref={textRef} 
            className="text-[var(--text-inverse)] font-sans text-xl md:text-2xl tracking-[0.2em] font-medium"
          >
            MILESTONE ACADEMY
          </h1>
        </div>

        {/* Bottom Progress UI */}
        <div className="w-full max-w-sm px-8 pb-16 flex flex-col items-center absolute bottom-10">
          <div 
            ref={counterRef} 
            className="text-[var(--green-500)] font-mono text-4xl mb-3 font-semibold"
          >
            00
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div 
              ref={progressRef} 
              className="absolute top-0 left-0 h-full bg-[var(--green-500)] w-0" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
