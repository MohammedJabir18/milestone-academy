"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star, Play, CheckCircle2, Trophy, BarChart3 } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Ripple effect state
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !headlineRef.current) return;

    // 1. Split Text
    const split = new SplitType(headlineRef.current, { types: "lines" });
    
    // We need to wrap each line in an overflow hidden wrapper for that clean reveal
    split.lines?.forEach(line => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // 2. Entrance Animations
    // Let's delay roughly enough to let the loader pass on the session's first hit.
    // If we've seen the loader before, we trigger nearly instantly.
    let baseDelay = 0.1;
    if (typeof window !== "undefined" && !sessionStorage.getItem("hero_entered")) {
       baseDelay = 2.4; 
       sessionStorage.setItem("hero_entered", "true");
    }

    const tl = gsap.timeline({ delay: baseDelay });

    tl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0)
      .fromTo((split.lines || []), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" }, 0.2)
      .fromTo(".hero-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.6)
      .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 0.8)
      .fromTo(".social-proof", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.1)
      .fromTo(".hero-3d", { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, 0.4);

    // 3. Floating Particles (20 dots)
    const particleEls = particlesRef.current?.querySelectorAll(".particle") || [];
    particleEls.forEach(p => {
      gsap.to(p, {
        x: `random(-100, 100)`,
        y: `random(-100, 100)`,
        opacity: `random(0.3, 0.8)`,
        duration: `random(10, 20)`,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    });

    // 4. Floating Badge Cards (up-down motion)
    gsap.to(".badge-1", { y: -15, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(".badge-2", { y: 15, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });
    gsap.to(".badge-3", { y: -10, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.8 });

    // 5. ScrollTrigger Parallax
    gsap.to(headlineRef.current, { 
      yPercent: -25, 
      ease: "none", 
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 }
    });
    
    gsap.to(rightColRef.current, { 
      yPercent: 15, 
      ease: "none", 
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 }
    });

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);

  // Ripple effect handler
  const handleRippleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <section ref={containerRef} className="hero min-h-[100vh] w-full flex items-center pt-[72px] pb-12 overflow-hidden bg-[var(--bg-primary)] relative z-0">
      
      {/* Background Gradient & Gradient Glow */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-[1]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)] blur-2xl -z-[1] pointer-events-none" />
      
      {/* Subtle HTML/CSS pattern overlay */}
      <div className="absolute inset-0 -z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgo8cmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPScjZmZmJy8+CjxwYXRoIGQ9J00wIDBMOCA4Wk04IDBMMCA4Wicgc3Ryb2tlPScjMDAwJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+')", backgroundSize: '16px 16px' }} />

      {/* Floating Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle absolute w-[3px] h-[3px] rounded-full bg-[var(--green-500)]"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0.5
            }}
          />
        ))}
      </div>

      <div className="max-w-[var(--container-max)] mx-auto w-full px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full mt-10 md:mt-0">
        
        {/* Left Column (55%) */}
        <div ref={leftColRef} className="w-full lg:w-[55%] flex flex-col pt-10 lg:pt-0">
          
          <div className="hero-label flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
            <span className="font-mono text-[12px] text-[var(--green-600)] uppercase tracking-widest font-semibold flex-1">
              India's Premier Accounting Academy
            </span>
          </div>
          
          <h1 ref={headlineRef} className="hero-headline font-serif text-[48px] md:text-[80px] lg:text-[96px] leading-[1.05] text-[var(--text-primary)] -tracking-[0.02em]">
            Master the<br />Language of<br />
            <span className="italic text-[var(--green-500)] text-[56px] md:text-[90px] lg:text-[104px] pr-2">Business</span>
          </h1>
          
          <p className="hero-sub font-sans text-lg lg:text-[20px] text-[var(--text-secondary)] max-w-[480px] mt-6 leading-relaxed">
            From Tally to Taxation, GST to Financial Reporting — 
            Milestone Academy transforms ambitious professionals 
            into certified financial experts trusted by 1,200+ companies.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10 w-full">
            <a 
              href="#courses"
              onClick={handleRippleClick as any}
              className="hero-cta magnetic clickable relative overflow-hidden bg-[var(--gradient-green)] text-white font-sans font-semibold text-[16px] px-[36px] py-[18px] rounded-full transition-all duration-300 shadow-[var(--shadow-green)] group"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:scale-[1.04] group-hover:-translate-y-[2px] transition-transform duration-300 origin-center">
                Explore Courses &rarr;
              </span>
              
              {/* Ripple elements */}
              {ripples.map(ripple => (
                <span 
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none z-0"
                  style={{
                    left: ripple.x, top: ripple.y,
                    width: '100px', height: '100px',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </a>
            
            <a 
              href="#demo"
              className="hero-cta magnetic clickable group flex items-center gap-3 bg-transparent border-[1.5px] border-[var(--border-medium)] text-[var(--text-primary)] font-sans font-semibold text-[16px] px-[36px] py-[18px] rounded-full transition-all duration-300 hover:border-[var(--green-500)] hover:text-[var(--green-600)] hover:bg-[var(--green-50)]"
            >
              Watch Demo
              <span className="relative flex items-center justify-center">
                <Play size={16} className="fill-[currentColor] group-hover:scale-110 transition-transform" />
                <span className="absolute inset-0 rounded-full bg-[var(--green-500)]/20 animate-ping opacity-0 group-hover:opacity-100" />
              </span>
            </a>
          </div>
          
          {/* Social Proof Row */}
          <div className="social-proof flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-14">
            <div className="flex items-center">
              {/* Simulated avatar stack */}
              {[1, 2, 3, 4, 5].map((i, idx) => (
                <div 
                  key={i} 
                  className="w-[40px] h-[40px] rounded-full border-2 border-white bg-green-100 flex items-center justify-center overflow-hidden"
                  style={{ marginLeft: idx === 0 ? 0 : '-8px', zIndex: 10 - idx }}
                >
                  <Image width={40} height={40} priority={true} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                </div>
              ))}
              <span className="font-sans font-semibold text-[14px] text-[var(--text-primary)] ml-4">
                4,800+ Students Enrolled
              </span>
            </div>
            
            <div className="hidden sm:block w-[1px] h-[24px] bg-[var(--border-light)]" />
            
            <div className="flex flex-col gap-1">
              <div className="flex text-[var(--accent-gold)]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" stroke="currentColor" />)}
              </div>
              <span className="font-sans text-[14px] text-[var(--text-secondary)]">
                4.9/5 Rating
              </span>
            </div>
          </div>
          
        </div>
        
        {/* Right Column (45%) */}
        <div ref={rightColRef} className="hero-3d relative hidden md:block w-full lg:w-[45%] md:h-[500px] lg:h-[700px] pointer-events-none mt-12 lg:mt-0">
          
          {/* Spline Base Wrapper */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center scale-100 md:scale-110 lg:scale-125 pointer-events-auto">
             <Suspense fallback={<div className="w-64 h-64 rounded-full bg-[var(--green-500)]/10 animate-pulse blur-3xl" />}>
               <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
             </Suspense>
          </div>

          {/* Floating CSS Badges */}
          <div className="badge-1 absolute top-[5%] md:top-[10%] -right-2 md:right-[5%] lg:right-[10%] bg-white/80 backdrop-blur-[12px] shadow-[var(--shadow-card)] border border-[var(--border-light)] rounded-[16px] p-4 flex items-center gap-3 pointer-events-auto hover:border-[var(--green-500)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[var(--green-50)] flex items-center justify-center text-[var(--green-600)]">
              <BarChart3 size={20} />
            </div>
            <span className="font-sans font-semibold text-[13px] text-[var(--text-primary)] whitespace-nowrap">
              GST Certification
            </span>
          </div>
          
          <div className="badge-2 absolute bottom-[5%] md:bottom-[15%] -left-2 md:left-[5%] lg:-left-[10%] bg-white/80 backdrop-blur-[12px] shadow-[var(--shadow-card)] border border-[var(--border-light)] rounded-[16px] p-4 flex items-center gap-3 pointer-events-auto hover:border-[var(--green-500)] transition-colors">
            <div className="w-10 h-10 rounded-full bg-[var(--green-50)] flex items-center justify-center text-[var(--accent-gold)]">
              <Trophy size={20} />
            </div>
            <span className="font-sans font-semibold text-[13px] text-[var(--text-primary)] whitespace-nowrap">
              Tally Expert Program
            </span>
          </div>
          
          <div className="badge-3 absolute top-[35%] md:top-[40%] -left-4 md:-left-[2%] lg:-left-[5%] bg-white/80 backdrop-blur-[12px] shadow-[var(--shadow-card)] border border-[var(--border-light)] rounded-[12px] py-2.5 px-4 flex items-center gap-2 pointer-events-auto hover:border-[var(--green-500)] transition-colors scale-90">
            <CheckCircle2 size={16} className="text-[var(--green-600)]" />
            <span className="font-sans font-semibold text-[12px] text-[var(--text-primary)] whitespace-nowrap hidden md:block">
              Industry Recognized
            </span>
            <span className="font-sans font-semibold text-[12px] text-[var(--text-primary)] whitespace-nowrap md:hidden">
              Recognized
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
