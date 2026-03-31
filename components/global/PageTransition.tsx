"use client";

import { createContext, useContext, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import gsap from "gsap";

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
  const panelRef = useRef<HTMLDivElement>(null);

  const navigateTo = (href: string) => {
    // Prevent transitioning if navigating to the exact same pathname
    if (pathname === href) return;
    
    if (!panelRef.current) return;
    
    const panel = panelRef.current;
    
    // Ensure GSAP knows we start fully off-screen right
    gsap.set(panel, { xPercent: 100 });
    
    // Slide in from right -> xPercent: 0
    gsap.to(panel, {
      xPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        // Overlay is covering screen, execute route push
        router.push(href);
        
        // Ensure the NextJS router executes the DOM change, then reverse timeline
        setTimeout(() => {
          gsap.to(panel, {
            xPercent: 100, // Slides back out to right revealing new layout
            duration: 0.5,
            ease: "power3.inOut"
          });
        }, 300); // 300ms buffer guarantees layout repaint under the mask
      }
    });
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {/* High-Index Overlay Panel */}
      <div 
        ref={panelRef} 
        className="fixed inset-0 w-full h-full z-[9999] bg-[var(--green-500)] pointer-events-none transform translate-x-full shadow-[-20px_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center"
      >
        {/* Optional Branding Mark Inside Panel */}
        <div className="w-16 h-16 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22L12 2L20 22H16L12 12L8 22H4Z" fill="white" />
          </svg>
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
