"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only render/animate on non-touch (fine pointer) devices
    const mql = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mql.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const ctx = gsap.context(() => {
      const mouse = { x: 0, y: 0 };
      const ring = { x: 0, y: 0 };
      let hasMoved = false;

      // Base centering offsets
      gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

      // Fast DOM setters
      const xSetDot = gsap.quickSetter(dotRef.current, "x", "px");
      const ySetDot = gsap.quickSetter(dotRef.current, "y", "px");
      const xSetRing = gsap.quickSetter(ringRef.current, "x", "px");
      const ySetRing = gsap.quickSetter(ringRef.current, "y", "px");

      let activeMagnetic: Element | null = null;
      let currentHoverState = "default";

      const onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        if (!hasMoved) {
           hasMoved = true;
           ring.x = mouse.x;
           ring.y = mouse.y;
           gsap.to(dotRef.current, { opacity: 1, duration: 0.3 });
           handleHoverState(e);
        }

        xSetDot(mouse.x);
        ySetDot(mouse.y);

        // Magnetic elements logic
        const target = e.target as Element;
        if (!target || typeof target.closest !== "function") return;
        
        const magnetic = target.closest(".magnetic");
        
        if (magnetic) {
           if (activeMagnetic !== magnetic) {
              if (activeMagnetic) {
                 gsap.to(activeMagnetic, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
              }
              activeMagnetic = magnetic;
           }
           const rect = magnetic.getBoundingClientRect();
           const centerX = rect.left + rect.width / 2;
           const centerY = rect.top + rect.height / 2;
           
           gsap.to(magnetic, {
              x: (mouse.x - centerX) * 0.35,
              y: (mouse.y - centerY) * 0.35,
              duration: 0.1,
              ease: "power2.out",
              overwrite: "auto"
           });
        } else if (activeMagnetic) {
           gsap.to(activeMagnetic, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
           activeMagnetic = null;
        }
      };

      const handleHoverState = (e: MouseEvent | Event) => {
         const target = e.target as Element;
         if (!target || typeof target.closest !== "function") return;
         
         const isClickable = target.closest("a, button, .magnetic");
         const isText = target.closest("p, h1, h2, h3, h4, h5, h6, span, label");
         
         if (isClickable) {
            if (currentHoverState !== "clickable") {
               currentHoverState = "clickable";
               gsap.to(ringRef.current, { 
                  width: 60, height: 60, borderRadius: "50%", 
                  opacity: 1, borderWidth: "1.5px", backgroundColor: "transparent", 
                  duration: 0.3, overwrite: "auto" 
               });
               gsap.to(dotRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
            }
         } else if (isText) {
            if (currentHoverState !== "text") {
               currentHoverState = "text";
               gsap.to(ringRef.current, { 
                  width: 40, height: 4, borderRadius: "2px", 
                  opacity: 0.5, borderWidth: "0px", backgroundColor: "var(--green-500)", 
                  duration: 0.3, overwrite: "auto" 
               });
               gsap.to(dotRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
            }
         } else {
            if (currentHoverState !== "default") {
               currentHoverState = "default";
               gsap.to(ringRef.current, { 
                  width: 36, height: 36, borderRadius: "50%", 
                  opacity: 0.3, borderWidth: "1.5px", backgroundColor: "transparent", 
                  duration: 0.3, overwrite: "auto" 
               });
               gsap.to(dotRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
            }
         }
      };

      // Failsafe hide cursor when leaving viewport
      const onMouseOut = (e: MouseEvent) => {
         if (!e.relatedTarget) {
            hasMoved = false;
            gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
         }
      };

      // Ticker for smooth ring follow (lerp logic)
      const ticker = () => {
         if (!hasMoved) return;
         const dt = gsap.ticker.deltaRatio();
         ring.x += (mouse.x - ring.x) * 0.2 * dt;
         ring.y += (mouse.y - ring.y) * 0.2 * dt;
         xSetRing(ring.x);
         ySetRing(ring.y);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseover", handleHoverState);
      window.addEventListener("mouseout", onMouseOut);
      gsap.ticker.add(ticker);

      return () => {
         window.removeEventListener("mousemove", onMouseMove);
         window.removeEventListener("mouseover", handleHoverState);
         window.removeEventListener("mouseout", onMouseOut);
         gsap.ticker.remove(ticker);
         if (activeMagnetic) {
             gsap.set(activeMagnetic, { x: 0, y: 0 }); // reset layout
         }
      };
    });

    return () => ctx.revert();
  }, [isFinePointer, pathname]);

  if (!isFinePointer) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-[var(--green-500)] rounded-full pointer-events-none mix-blend-difference z-[9998] opacity-0"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-[36px] h-[36px] border-[1.5px] border-[var(--green-500)] rounded-full pointer-events-none z-[9998] opacity-0 box-border"
      />
    </>
  );
}
