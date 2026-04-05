"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, Trophy, CheckCircle, Play } from "lucide-react";
import Hero3D from "./Hero3D";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current) return;
    initialized.current = true;

    const ctx = gsap.context(() => {
      // ENTRANCE ANIMATIONS
      gsap.from(".hero-label", { y: 30, opacity: 0, duration: 0.7, delay: 0.2 });
      gsap.from(".hero-line-1", { y: "100%", opacity: 0, duration: 0.9, delay: 0.45 });
      gsap.from(".hero-line-2", { y: "100%", opacity: 0, duration: 0.9, delay: 0.58 });
      gsap.from(".hero-line-3", { y: "100%", opacity: 0, duration: 0.9, delay: 0.71 });
      gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 0.8, delay: 0.9 });
      gsap.from(".hero-cta-1", { y: 30, opacity: 0, duration: 0.7, delay: 1.05 });
      gsap.from(".hero-cta-2", { y: 30, opacity: 0, duration: 0.7, delay: 1.15 });
      gsap.from(".social-proof", { y: 20, opacity: 0, duration: 0.6, delay: 1.3 });
      gsap.from(".hero-3d", { x: 80, opacity: 0, duration: 1.2, delay: 0.6, ease: "power4.out" });

      // SCROLL PARALLAX
      gsap.to(".hero-content", {
        yPercent: -20,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // FLOATING PARTICLES
      gsap.utils.toArray(".particle").forEach((particle: any) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // FLOATING OVERLAY BADGES
      gsap.to(".float-badge-1", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0 });
      gsap.to(".float-badge-2", { y: -15, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
      gsap.to(".float-badge-3", { y: -10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="hero relative min-h-screen w-full overflow-hidden bg-primary" 
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      {/* SVG filter grain & Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay" style={{ opacity: 0.03 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      <div 
        className="pointer-events-none absolute top-0 right-0 z-0 h-full w-1/2" 
        style={{ backgroundImage: "var(--gradient-glow)" }}
      ></div>

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute h-[3px] w-[3px] rounded-full"
            style={{
              backgroundColor: "var(--green-500)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      <div className="hero-content relative z-10 mx-auto grid min-h-screen max-w-[var(--container)] grid-cols-1 px-6 lg:grid-cols-[55fr_45fr]">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center pb-16 pt-24 lg:pr-8">
          
          {/* Label Row */}
          <div className="hero-label mb-5 flex items-center gap-3">
            <div className="h-[1px] w-[32px] bg-[var(--green-500)]"></div>
            <span 
              className="uppercase tracking-[0.2em] text-[var(--green-600)]" 
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
            >
              India's Premier Accounting Academy
            </span>
          </div>

          {/* Headline */}
          <h1 className="gsap-heading mb-6" style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 1.05 }}>
            <div className="overflow-hidden">
              <div className="hero-line-1 text-[clamp(52px,8vw,96px)] text-[var(--text-primary)]">
                Master the
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line-2 text-[clamp(52px,8vw,96px)] text-[var(--text-primary)]">
                Language of
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="hero-line-3 italic text-[clamp(52px,8vw,96px)] text-[var(--green-500)]">
                Business.
              </div>
            </div>
          </h1>

          {/* Subheadline */}
          <p 
            className="hero-sub mb-10 max-w-[500px] leading-relaxed text-[var(--text-secondary)]" 
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px" }}
          >
            From Tally to Taxation, GST to Financial Reporting — Milestone Academy transforms ambitious professionals into certified financial experts trusted by 1,200+ companies.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-wrap gap-4">
            <button 
              className="hero-cta-1 magnetic group relative overflow-hidden rounded-full px-9 py-4 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.04] bg-[image:var(--gradient-green)] text-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-green)]"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity duration-300 group-active:animate-ping group-active:opacity-30"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Courses <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
            
            <button 
              className="hero-cta-2 magnetic group flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[var(--border-medium)] bg-transparent text-[var(--text-primary)] px-9 py-4 transition-all duration-300 hover:border-[var(--green-400)] hover:bg-[var(--green-50)] hover:text-[var(--green-600)]"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              Watch Demo 
              <span className="relative flex h-5 w-5 items-center justify-center ml-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--border-medium)] group-hover:bg-[var(--green-400)] opacity-40"></span>
                <Play className="relative z-10 h-[14px] w-[14px] fill-[var(--text-primary)] group-hover:fill-[var(--green-600)] transition-colors duration-300" />
              </span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="social-proof flex flex-wrap items-center gap-6">
            <div className="flex -space-x-3">
              {['#FEF3C7', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#F3E8FF'].map((bg, i) => (
                <div key={i} className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-white text-xs font-bold" style={{ backgroundColor: bg, color: "var(--text-primary)" }}>
                  {['S', 'M', 'A', 'J', 'R'][i]}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>4,800+ Students Enrolled</span>
                <span className="h-6 w-px bg-[var(--border-medium)]"></span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] tracking-widest text-[#D4AF37]">★★★★★</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", color: "var(--text-secondary)" }}>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-3d relative flex min-h-[500px] w-full items-center justify-center">
          <div className="absolute inset-0 z-0 h-full w-full">
            <Hero3D />
          </div>
          
          {/* Badge overlays */}
          <div className="float-badge-1 absolute top-[15%] right-[5%] z-20 flex items-center gap-3 rounded-xl border border-[var(--border-light)] bg-white/90 backdrop-blur-[12px] px-5 py-3 shadow-[var(--shadow-card)]">
            <BarChart3 size={20} className="text-[var(--green-500)]" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "15px", color: "var(--text-primary)" }}>GST Certification</span>
          </div>

          <div className="float-badge-2 absolute bottom-[20%] left-[5%] z-20 flex items-center gap-3 rounded-xl border border-[var(--border-light)] bg-white/90 backdrop-blur-[12px] px-5 py-3 shadow-[var(--shadow-card)]">
            <Trophy size={20} style={{ color: "var(--accent-gold)" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "15px", color: "var(--text-primary)" }}>Tally Expert Program</span>
          </div>

          <div className="float-badge-3 absolute left-[5%] top-[40%] z-20 flex items-center gap-2 rounded-xl border border-[var(--border-light)] bg-white/90 backdrop-blur-[12px] px-4 py-2 shadow-sm">
            <CheckCircle size={16} className="text-[var(--green-500)]" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "13px", color: "var(--text-primary)" }}>Industry Recognized</span>
          </div>

        </div>
      </div>
    </section>
  );
}
