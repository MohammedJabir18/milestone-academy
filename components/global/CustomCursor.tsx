"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if device supports hover (bypasses touch devices)
    if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
      return;
    }
    
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial position off-screen so it doesn't flash at 0,0
    gsap.set(dot, { x: -100, y: -100 });
    gsap.set(ring, { x: -100, y: -100 });

    // GSAP quickTo is the most performant way to move cursor elements, lerping position instantly 
    const xDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    
    // 0.08 lag factor translates to ~0.3s quickTo delay making it buttery smooth
    const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

    let currentHoverState = "default";

    const onMouseMove = (e: MouseEvent) => {
      // Small 10px dot
      xDot(e.clientX - 5);
      yDot(e.clientY - 5);
      
      // 36px ring
      xRing(e.clientX - 18);
      yRing(e.clientY - 18);
      
      // Handle magnetic button attraction calculation smoothly
      const target = e.target as HTMLElement;
      if (target) {
         // Fallback onto closest .magnetic class wrapper
         const magElement = target.closest('.magnetic') as HTMLElement;
         if (magElement) {
            const rect = magElement.getBoundingClientRect();
            // Calculate distance away from exact center of the element to pull cursor slightly
            const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
            gsap.to(magElement, { x, y, duration: 0.4, ease: "power2.out" });
         }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Determine what the cursor is hovering
      const isClickable = !!target.closest('a, button, [role="button"], .clickable, .magnetic');
      const isDrag = !!target.closest('.drag-element');
      const isText = !!target.closest('h1, h2, h3, h4, h5, h6, p, span, li');
      
      let newState = "default";
      if (isDrag) newState = "drag";
      else if (isClickable) newState = "button";
      else if (isText) newState = "text";
      
      if (currentHoverState !== newState) {
        currentHoverState = newState;
        
        // Morph the cursor according to the hovered zone
        switch (newState) {
          case 'drag':
            gsap.to(ring, { 
              width: 64, height: 64, 
              marginLeft: -14, marginTop: -14, // Scale from 36 -> 64 requires a manual transform offset
              backgroundColor: 'rgba(34, 197, 94, 0.95)', 
              borderColor: 'transparent',
              borderRadius: '50%',
              duration: 0.3, ease: "power2.out"
            });
            gsap.to(dot, { scale: 0, duration: 0.2 });
            if (textLabelRef.current) gsap.to(textLabelRef.current, { opacity: 1, textContent: "DRAG", duration: 0.2 });
            break;
            
          case 'button':
            gsap.to(ring, { 
              width: 60, height: 60, 
              marginLeft: -12, marginTop: -12, // Scale 36 -> 60
              backgroundColor: 'transparent', 
              borderColor: 'rgba(34, 197, 94, 0.2)',
              borderRadius: '50%',
              duration: 0.3, ease: "power2.out" 
            });
            gsap.to(dot, { scale: 0, duration: 0.2 });
            if (textLabelRef.current) gsap.to(textLabelRef.current, { opacity: 0, duration: 0.1 });
            break;
            
          case 'text':
            gsap.to(ring, { 
              width: 2, height: 28, 
              marginLeft: 17, marginTop: 4, // Flatten to caret width
              backgroundColor: 'var(--green-500)', 
              borderColor: 'transparent',
              borderRadius: '0%',
              duration: 0.2, ease: "power2.out"
            });
            gsap.to(dot, { scale: 0, duration: 0.2 });
            if (textLabelRef.current) gsap.to(textLabelRef.current, { opacity: 0, duration: 0.1 });
            break;
            
          default:
            gsap.to(ring, { 
              width: 36, height: 36, 
              marginLeft: 0, marginTop: 0,
              backgroundColor: 'transparent', 
              borderColor: 'rgba(34, 197, 94, 0.3)', 
              borderRadius: '50%',
              duration: 0.3, ease: "power2.out" 
            });
            gsap.to(dot, { scale: 1, duration: 0.2 });
            if (textLabelRef.current) gsap.to(textLabelRef.current, { opacity: 0, duration: 0.1 });
            break;
        }
      }
    };
    
    // Magnetic revert on un-hover
    const handleMouseOut = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       if (!target) return;
       const magElement = target.closest('.magnetic') as HTMLElement;
       if (magElement) {
          gsap.to(magElement, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
       }
    };
    
    // Mount events globally without attaching individually to DOM elements
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* 36px custom dynamic outer ring */}
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full border-[1.5px] border-[rgba(34,197,94,0.3)] pointer-events-none z-[99999] flex items-center justify-center transform-gpu will-change-transform max-md:hidden mix-blend-difference"
      >
        <span 
          ref={textLabelRef} 
          className="text-white text-[10px] uppercase font-mono tracking-widest opacity-0 select-none pb-0.5"
        >
        </span>
      </div>
      {/* 10px centered inner cursor dot */}
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-[var(--green-500)] mix-blend-difference rounded-full pointer-events-none z-[99999] transform-gpu will-change-transform max-md:hidden"
      />
    </>
  );
}
