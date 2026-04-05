"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

export default function TradingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animation for left and right columns
      gsap.fromTo(
        leftColRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // SVG Path Animation (simulating DrawSVG)
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        
        // Hide it initially
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // Draw it over time
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pills = [
    "🚀 Stock Market",
    "📊 Technical Analysis",
    "💰 Options Trading",
    "📈 Fundamental Analysis",
    "💼 Portfolio Management",
    "₿ Cryptocurrency",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--bg-dark)] py-[100px] overflow-hidden"
    >
      <div className="max-w-[var(--container)] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN */}
          <div ref={leftColRef} className="flex flex-col opacity-0">
            <span className="font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-[0.15em] font-bold mb-6">
              ALSO AT MILESTONE
            </span>
            
            <h2 className="font-serif text-[52px] text-[var(--text-inverse)] leading-[1.1] mb-6">
              Where It All<br />
              Began — Trading.
            </h2>
            
            <p className="font-sans text-[18px] text-[var(--text-inverse)]/70 leading-relaxed max-w-lg">
              Milestone began as a trading academy and has trained 10,000+ traders across India. Our trading programs — stock market, technical analysis, options, and investment strategies — continue to run alongside our accounting courses. One academy. Complete financial education.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
              {pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] text-[var(--text-inverse)]/80 rounded-full px-4 py-2 font-sans text-[13px] transition-all duration-300 hover:bg-[var(--green-500)]/20 hover:border-[var(--green-500)]/30 hover:text-[var(--green-300)] cursor-default"
                >
                  {pill}
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Link
                href="/trading"
                className="group inline-flex items-center gap-2 border-[1.5px] border-[var(--green-400)] text-[var(--green-300)] bg-transparent px-8 py-4 rounded-full font-sans font-semibold text-[15px] transition-all duration-300 hover:bg-[var(--green-500)] hover:text-white hover:border-[var(--green-500)]"
              >
                Explore Trading Programs
                <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div ref={rightColRef} className="flex flex-col opacity-0">
            <div className="flex flex-col gap-4">
              
              {/* Card 1 */}
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[24px] px-8 py-6 flex items-center gap-6 shadow-[var(--shadow-card)]">
                <span className="font-mono text-[40px] font-bold text-[var(--green-400)] tracking-tight leading-none">
                  10,000+
                </span>
                <span className="font-sans text-[15px] text-[var(--text-inverse)]/70 font-medium">
                  Traders Trained
                </span>
              </div>

              {/* Card 2 */}
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[24px] px-8 py-6 flex items-center gap-6 shadow-[var(--shadow-card)]">
                <span className="font-mono text-[40px] font-bold text-[var(--green-400)] tracking-tight leading-none">
                  8+
                </span>
                <span className="font-sans text-[15px] text-[var(--text-inverse)]/70 font-medium">
                  Trading Programs Available
                </span>
              </div>

              {/* Card 3 */}
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[24px] px-8 py-6 flex items-center gap-6 shadow-[var(--shadow-card)]">
                <span className="font-mono text-[40px] font-bold text-[var(--green-400)] tracking-tight leading-none">
                  Since 2019
                </span>
                <span className="font-sans text-[15px] text-[var(--text-inverse)]/70 font-medium">
                  Milestone's Legacy
                </span>
              </div>

            </div>

            {/* SVG Chart Line Underneath */}
            <div className="w-full h-[140px] mt-8 relative rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] overflow-hidden flex items-end">
              {/* Subtle Grid Lines Background */}
              <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{ 
                  backgroundImage: "linear-gradient(to right, #22C55E 1px, transparent 1px), linear-gradient(to bottom, #22C55E 1px, transparent 1px)", 
                  backgroundSize: "40px 40px" 
                }} 
              />
              
              <svg 
                className="w-full h-full absolute inset-0 drop-shadow-[0_0_12px_rgba(45,158,68,0.4)]" 
                viewBox="0 0 500 120" 
                preserveAspectRatio="none"
              >
                <path
                  ref={pathRef}
                  d="M0,110 C50,110 80,90 120,70 C160,50 180,60 220,40 C280,10 320,80 380,50 C430,25 470,10 500,5"
                  stroke="var(--green-500)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Gradual fade overlay so chart looks cool at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)]/[0.8] to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
