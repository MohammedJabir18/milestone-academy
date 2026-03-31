"use client";

import { useState, useEffect, useRef } from "react";
import { TransitionLink as Link } from "@/components/global/PageTransition";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Placements", path: "/#placements" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Refs for mobile menu animations
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);
  
  // Hamburger lines refs for GSAP X morphing
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);

  // Scroll listener for sticky glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger instantly
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Mobile Menu toggle animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      
      // Animate hamburger to X
      gsap.to(line1Ref.current, { attr: { y1: 6, y2: 18 }, rotation: 45, transformOrigin: "50% 50%", duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.2 });
      gsap.to(line3Ref.current, { attr: { y1: 18, y2: 6 }, rotation: -45, transformOrigin: "50% 50%", duration: 0.3 });

      // Animate menu in via clipPath circle expansion
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.6,
        ease: "power3.inOut"
      });
      
      // Stagger links in
      gsap.fromTo(linksRef.current, 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";

      // Animate X back to hamburger 
      gsap.to(line1Ref.current, { attr: { y1: 6, y2: 6 }, rotation: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(line3Ref.current, { attr: { y1: 18, y2: 18 }, rotation: 0, duration: 0.3 });

      // Reverse clipPath
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.5,
        ease: "power3.inOut"
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-[72px] z-[1000] transition-all duration-400 ease-in-out ${
          isScrolled 
            ? "bg-[rgba(247,249,244,0.92)] backdrop-blur-[16px] backdrop-saturate-[180%] border-b border-[var(--border-light)] shadow-[var(--shadow-card)]" 
            : "bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="max-w-[var(--container-max)] mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 magnetic clickable z-20 relative">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" className="text-[var(--green-500)] shrink-0">
              <path 
                d="M 20 80 L 20 20 L 50 60 L 80 20 L 80 80" 
                stroke="currentColor" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <span className="font-sans font-semibold text-lg tracking-tight text-[var(--text-primary)] md:block hidden sm:block">
              Milestone Academy
            </span>
          </Link>

          {/* Center: Nav links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="relative font-sans text-[14px] font-medium transition-all duration-300 hover:text-[var(--green-600)] hover:-translate-y-[1px] group clickable"
                  style={{ color: isActive ? 'var(--green-600)' : 'rgba(13, 26, 14, 0.8)' }}
                >
                  {link.name}
                  {/* Active dot indicator */}
                  <span className={`absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--green-500)] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100"
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Right: CTA + Phone (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+919876543210" className="font-mono text-[13px] text-[var(--text-secondary)] hover:text-[var(--green-600)] transition-colors clickable">
              📞 +91 98765 43210
            </a>
            <Link 
              href="/courses" 
              className="magnetic clickable bg-[var(--green-500)] text-white font-sans font-semibold text-[14px] px-[24px] py-[10px] rounded-full hover:bg-[var(--green-600)] transition-colors shadow-[var(--shadow-green)] hover:-translate-y-[1px]"
            >
              Enroll Now &rarr;
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 clickable z-[1001] relative focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isMobileMenuOpen ? 'text-white' : 'text-[var(--text-primary)]'} transition-colors duration-300`}>
              <line ref={line1Ref} x1="3" y1="6" x2="21" y2="6" />
              <line ref={line2Ref} x1="3" y1="12" x2="21" y2="12" />
              <line ref={line3Ref} x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 bg-[var(--bg-dark)] z-[1000] md:hidden select-none touch-none"
        style={{ clipPath: "circle(0% at 90% 10%)" }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-6 pointer-events-auto">
          {navLinks.map((link, i) => {
             const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
             return (
              <Link 
                key={link.name} 
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                ref={(el) => { linksRef.current[i] = el; }}
                className={`font-serif text-4xl clickable ${
                  isActive ? "text-[var(--green-500)]" : "text-[var(--text-inverse)]"
                }`}
              >
                {link.name}
              </Link>
             );
          })}
          
          <div className="mt-8 flex flex-col items-center gap-6" ref={(el) => { linksRef.current[navLinks.length] = el; }}>
            <a href="tel:+919876543210" className="font-mono text-[14px] text-[var(--accent-mint)] clickable">
              📞 +91 98765 43210
            </a>
            <Link 
              href="/courses" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-[var(--green-500)] text-white font-sans font-semibold text-[16px] px-8 py-3 rounded-full clickable"
            >
              Enroll Now &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
