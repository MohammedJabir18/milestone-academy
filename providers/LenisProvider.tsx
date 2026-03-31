"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable smooth-scrolling physics on mobile touch interfaces to allow iOS/Android hardware-momentum precedence
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
    } as any);

    lenis.on("scroll", ScrollTrigger.update);
    
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    
    return () => { 
      lenis.destroy(); 
      gsap.ticker.remove(update); 
    };
  }, []);
  
  return <>{children}</>;
}
