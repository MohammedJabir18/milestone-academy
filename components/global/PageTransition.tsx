"use client";

import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import gsap from "gsap";
import { Logo } from "./Logo";

// --- Context & Provider ---

interface TransitionContextType {
  navigateTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return context;
};

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track if we are currently navigating between pages
  const isTransitioningRef = useRef(false);
  // Track if initial load is completed
  const initialized = useRef(false);

  // 1. Initial Page Load Animation
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Skip initial loading screen if entering through admin pages
    if (pathname?.startsWith("/admin")) {
      gsap.set(containerRef.current, { visibility: "hidden" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { pointerEvents: "none" });
        }
      });

      // Initial state
      gsap.set(".logo-wrap", { opacity: 0, scale: 0.95 });
      gsap.set(".letter", { opacity: 0, y: 10 });
      gsap.set(containerRef.current, { pointerEvents: "auto", visibility: "visible" });
      gsap.set(".panel-top", { yPercent: 0 });
      gsap.set(".panel-bottom", { yPercent: 0 });

      // Snappier 0.8-second load time
      tl.to(".progress-bar", { width: "100%", duration: 0.8, ease: "power1.inOut" }, 0)
        .to(".counter", { 
          textContent: 100, 
          duration: 0.8, 
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
        .to(".logo-wrap", { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, 0)
        .to(".letter", { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, ease: "power2.out" }, 0.1)
        // Wait until 0.9s before fading out elements
        .to(".content-elements", { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.9)
        // Slide panels away after content fades
        .to([".panel-top", ".panel-bottom"], { 
          yPercent: (i) => i === 0 ? -100 : 100, 
          duration: 0.45, 
          ease: "power3.inOut",
          onComplete: () => {
             // Hide it completely off screen so it takes no space
             gsap.set(containerRef.current, { visibility: "hidden" });
          }
        }, 1.0);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // 2. Sync Exit Animation with Pathname Change
  useEffect(() => {
    if (isTransitioningRef.current && containerRef.current) {
      // Small buffer to allow the new page to mount
      const timer = setTimeout(() => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(containerRef.current, { pointerEvents: "none", visibility: "hidden" });
              isTransitioningRef.current = false;
            }
          });

          tl.to(".content-elements", { opacity: 0, duration: 0.2, ease: "power2.inOut" })
            .to([".panel-top", ".panel-bottom"], { 
              yPercent: (i) => i === 0 ? -100 : 100, 
              duration: 0.4, 
              ease: "power3.inOut"
            }, "-=0.1");
        }, containerRef);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // 3. Navigation Link Click Animation
  const navigateTo = (href: string) => {
    // 1. Skip transition for hashes or same-page anchors
    if (href.startsWith("#") || (href.includes("#") && href.split("#")[0] === pathname)) {
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
      return;
    }

    // 2. INTERNAL ADMIN NAVIGATION: Instant (skip loading screen)
    // We only show transition when leaving/entering admin from marketing
    if (pathname?.startsWith("/admin") && href.startsWith("/admin")) {
      router.push(href);
      return;
    }

    if (!containerRef.current || isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    
    // Enable wrapper
    gsap.set(containerRef.current, { pointerEvents: "auto", visibility: "visible" });
    
    // Pre-requisites for sliding IN
    gsap.set(".panel-top", { yPercent: -100 });
    gsap.set(".panel-bottom", { yPercent: 100 });
    gsap.set(".content-elements", { opacity: 0 });
    gsap.set(".logo-wrap", { opacity: 0, scale: 0.9 });
    gsap.set(".progress-bar", { width: "0%" });
    gsap.set(".counter", { textContent: 0 });

    const tl = gsap.timeline();

    // Start route push immediately to begin loading in background
    router.push(href);

    // Faster Animate IN (0.4s total)
    tl.to([".panel-top", ".panel-bottom"], { yPercent: 0, duration: 0.3, ease: "power3.inOut" }, 0)
      .to(".content-elements", { opacity: 1, duration: 0.2 }, 0.1)
      .to(".logo-wrap", { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0.1)
      .to(".progress-bar", { width: "100%", duration: 0.4, ease: "power1.inOut" }, 0.1)
      .to(".counter", { 
          textContent: 100, 
          duration: 0.4, 
          snap: { textContent: 1 }, 
          ease: "power1.inOut",
          onUpdate: function() {
             const counter = document.querySelector('.counter');
             if (counter) {
                const val = parseInt(counter.textContent || "0", 10);
                if (val < 10) counter.textContent = `0${val}`;
             }
          }
      }, 0.1);
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {/* Universal Loading Screen Container */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center invisible"
      >
        {/* Split Panels */}
        <div className="panel-top absolute top-0 left-0 w-full h-[50.5vh] bg-[var(--bg-dark)] origin-top"></div>
        <div className="panel-bottom absolute bottom-0 left-0 w-full h-[50.5vh] bg-[var(--bg-dark)] origin-bottom"></div>

        {/* Content wrapper */}
        <div className="content-elements absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           {/* Logo */}
           <div className="logo-wrap opacity-0">
              <Logo variant="light" width={200} />
           </div>

           {/* Typography */}
           <div className="mt-6 flex space-x-[2px] font-mono text-[14px] text-[var(--text-inverse)] opacity-60 tracking-[0.4em]">
               {"MILESTONE FIN ACADEMY".split("").map((char, i) => (
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
      
      {children}
    </TransitionContext.Provider>
  );
}

import React from "react";

// --- Custom Transition Link Component ---

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, className, onClick, ...props }, ref) => {
    const { navigateTo } = usePageTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // Allow custom onClick handlers (like toggleMobileMenu) to still execute
      if (onClick) onClick(e);
      e.preventDefault();
      navigateTo(href);
    };

    return (
      <Link href={href} onClick={handleClick} className={className} ref={ref} {...props}>
        {children}
      </Link>
    );
  }
);
TransitionLink.displayName = "TransitionLink";
