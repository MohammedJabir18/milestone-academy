"use client";

import React, { useEffect, useRef, Suspense, Component, ErrorInfo, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, Trophy, CheckCircle, Play } from "lucide-react";
import HeroFallback from "./HeroFallback";
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Spline Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    const ctx = gsap.context(() => {
      // BADGE PILL
      gsap.fromTo(".hero-badge", 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 0.3 }
      );

      // HEADLINE revealed from bottom using clip area
      gsap.fromTo(".hero-line-1", 
        { y: "110%" }, 
        { y: 0, duration: 0.9, delay: 0.45, ease: "power4.out" }
      );
      gsap.fromTo(".hero-line-2", 
        { y: "110%" }, 
        { y: 0, duration: 0.9, delay: 0.57, ease: "power4.out" }
      );
      gsap.fromTo(".hero-line-3", 
        { y: "110%" }, 
        { y: 0, duration: 0.9, delay: 0.69, ease: "power4.out" }
      );

      // SUBTEXT
      gsap.fromTo(".hero-sub", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9 }
      );

      // CTA ROW
      gsap.fromTo(".hero-cta-group",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.0 }
      );

      // SOCIAL PROOF
      gsap.fromTo(".social-proof",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1 }
      );




      // SCROLL PARALLAX
      gsap.to(".hero-content", {
        yPercent: -15,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="hero-section relative h-[100dvh] min-h-[700px] overflow-hidden w-full" 
      style={{ background: "var(--gradient-hero)" }}
    >
      
      {/* SPLINE AREA */}
      <div className="spline-container absolute inset-0 z-0 overflow-hidden">
        {/* We push the bottom boundary down by 80px to safely hide the watermark off-screen */}
        <div className="absolute top-0 right-0 left-0 bottom-[-80px]">
          <Spline scene="https://prod.spline.design/IPatTLqZcSk-SkwY/scene.splinecode" />
        </div>
      </div>

      {/* LEFT FADE GRADIENT */}
      <div 
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{ background: "linear-gradient(90deg, var(--bg-primary) 38%, rgba(247,249,244,0.85) 55%, transparent 72%)" }}
      />

      {/* HERO CONTENT */}
      <div className="hero-content relative z-10 mx-auto max-w-[1280px] px-6 h-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center pointer-events-none">
        <div className="flex flex-col justify-center mt-16 lg:mt-8">

          
          {/* HEADLINE */}
          <h1 
            className="mb-6" 
            style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontSize: "clamp(52px, 6.5vw, 84px)", 
              lineHeight: 0.95 
            }}

          >
            <div className="overflow-hidden">
              <div className="hero-line-1 text-[var(--text-primary)]">Master the</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line-2 text-[var(--text-primary)]">Language of</div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line-3 text-[var(--green-500)] italic">Business.</div>
            </div>
          </h1>

          {/* SUBTEXT */}
          <p 
            className="hero-sub mt-6 max-w-[440px] text-[var(--text-secondary)]"
            style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontSize: "18px", 
              lineHeight: 1.65 
            }}
          >
            From Tally to Taxation, GST to Financial Analytics — 
            Milestone Academy turns ambition into expertise, 
            one certified professional at a time.
          </p>

          {/* CTA ROW */}
          <div className="hero-cta-group mt-8 flex flex-wrap gap-4 pointer-events-auto">
            <button 
              className="cta-primary magnetic group relative overflow-hidden rounded-full px-9 py-[18px] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] text-white"
              style={{ 
                background: "var(--gradient-green)",
                fontFamily: "'Syne', sans-serif", 
                fontWeight: 600, 
                fontSize: "15px",
                boxShadow: "var(--shadow-card)"
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-green)"; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
            >
              <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity duration-300 group-active:opacity-30"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Programs →
              </span>
            </button>
            <style>{`
              .cta-primary { position: relative; }
              .cta-primary:active::after {
                content: ""; position: absolute;
                top: 50%; left: 50%;
                width: 300px; height: 300px;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
              }
              @keyframes ripple {
                100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
              }
            `}</style>
            
            <button 
              className="cta-secondary magnetic group flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[var(--border-medium)] bg-transparent px-9 py-[18px] transition-all duration-300 hover:border-[var(--green-400)] hover:bg-[var(--green-50)] hover:text-[var(--green-600)]"
              style={{ 
                fontFamily: "'Syne', sans-serif", 
                fontWeight: 600, 
                fontSize: "15px" 
              }}
            >
              Watch Demo
              <span className="relative flex h-5 w-5 items-center justify-center ml-1">
                <span className="absolute inline-flex h-full w-full animate-[pulse_2s_infinite] rounded-full bg-[var(--border-medium)] group-hover:bg-[var(--green-400)] opacity-60 pointer-events-none scale-100"></span>
                <Play className="relative z-10 h-[14px] w-[14px] fill-current" />
              </span>
            </button>
            <style>{`
              @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(2.5); opacity: 0; }
              }
            `}</style>
          </div>

          {/* SOCIAL PROOF */}
          <div className="social-proof mt-6 flex flex-wrap items-center gap-6">
            <div className="flex -space-x-[10px]">
              {['#FEF3C7', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#F3E8FF'].map((bg, i) => (
                <div 
                  key={i} 
                  className="relative z-20 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-white text-xs font-bold shadow-sm" 
                  style={{ backgroundColor: bg, color: "var(--text-primary)", zIndex: 10 - i }}
                >
                  <span className="text-white drop-shadow-sm">{['S', 'M', 'A', 'J', 'R'][i]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>
                4,800+ Students Enrolled
              </span>
              <span className="h-5 w-[1px] bg-[var(--border-medium)]"></span>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] tracking-widest text-[#D4AF37]">★★★★★</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", color: "var(--text-primary)" }}>4.9/5</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT AREA SPACER FOR 3D ROBOT */}
        <div className="hidden lg:block w-full relative z-0"></div>
      </div>






    </section>
  );
}
