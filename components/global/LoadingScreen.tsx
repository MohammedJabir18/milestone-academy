"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "./Logo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
        }
      });

      // Initial state
      gsap.set(".logo-wrap", { opacity: 0, scale: 0.95 });
      gsap.set(".letter", { opacity: 0, y: 10 });

      tl.to(".progress-bar", { width: "100%", duration: 2, ease: "power1.inOut" }, 0)
        .to(".counter", { 
          textContent: 100, 
          duration: 2, 
          snap: { textContent: 1 }, 
          ease: "power1.inOut",
          onUpdate: function() {
             const counter = document.querySelector('.counter');
             if (counter) {
                const val = parseInt(counter.textContent || "0", 10);
                if (val < 10) counter.textContent = `0${val}`;
             }
          }
        }, 0)
        .to(".logo-wrap", { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0)
        .to(".letter", { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 0.2)
        .to(".content-elements", { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 1.8)
        .to([".panel-top", ".panel-bottom"], { 
          yPercent: (i) => i === 0 ? -100 : 100, 
          duration: 0.7, 
          ease: "power3.inOut"
        }, 1.9);

    }, containerRef); // Scoped to container

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center">
      {/* Split Panels */}
      <div className="panel-top absolute top-0 left-0 w-full h-[50.5vh] bg-[var(--bg-dark)] origin-top"></div>
      <div className="panel-bottom absolute bottom-0 left-0 w-full h-[50.5vh] bg-[var(--bg-dark)] origin-bottom"></div>

      {/* Content wrapper */}
      <div className="content-elements absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
         {/* Logo */}
         <div className="logo-wrap opacity-0">
            <Logo variant="dark" width={200} />
         </div>

         {/* Typography */}
         <div className="mt-6 flex space-x-[2px] font-mono text-[14px] text-[var(--text-inverse)] opacity-60 tracking-[0.4em]">
             {"MILESTONE ACADEMY".split("").map((char, i) => (
                 <span key={i} className="letter inline-block">
                    {char === " " ? "\u00A0" : char}
                 </span>
             ))}
         </div>
         
         {/* Counter */}
         <div className="absolute bottom-6 right-6 font-mono text-[12px] text-[var(--text-inverse)] opacity-80">
             <span className="counter">00</span>%
         </div>
      </div>

      {/* Progress bar container */}
      <div className="content-elements absolute bottom-0 left-0 w-full h-[4px] bg-white/5">
         <div className="progress-bar w-0 h-full bg-[var(--green-500)]"></div>
      </div>
    </div>
  );
}
