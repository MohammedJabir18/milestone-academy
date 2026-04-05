"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, TrendingUp, Users, BookOpen } from "lucide-react";

export default function TradingTeaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Entrance Anim
    if (sectionRef.current) {
      gsap.fromTo(".trading-header > *", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
      
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        }
      );
    }

    // Interactive 3D tilt tracking for mouse events using QuickTo
    const card = cardRef.current;
    if (card && !window.matchMedia("(pointer: coarse)").matches) {
      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        // Limit max rotation to 4 degrees so it's subtle for a wide card
        xTo(x * 6);
        yTo(-y * 6);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section ref={sectionRef} id="trading-academy" className="w-full py-24 md:py-32 bg-[var(--bg-secondary)] overflow-hidden relative z-10 border-t border-[var(--border-light)]/50">
      <div className="max-w-[var(--container-max)] mx-auto px-6 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="trading-header text-center mb-16 flex flex-col items-center max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
            <span className="font-mono text-[13px] text-[var(--green-700)] uppercase tracking-widest font-bold">
              ALSO AT MILESTONE
            </span>
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
          </div>
          
          <h2 className="gsap-heading font-serif text-[42px] md:text-[56px] text-[var(--text-primary)] leading-[1.05] mb-6 tracking-tight">
            Where It All <br/>
            Began — <span className="italic text-[var(--green-600)]">Trading</span>.
          </h2>
          
          <p className="font-sans text-[17px] md:text-[19px] text-[var(--text-secondary)] leading-relaxed">
            Milestone began as a trading academy and has trained 10,000+ traders across India. Our professional trading programs continue to run alongside our accounting courses — One academy, complete financial education.
          </p>
        </div>

        {/* Browser Mockup Interactive Card */}
        <div className="perspective-wrapper w-full max-w-[1000px] h-auto mx-auto" style={{ perspective: "1500px" }}>
          
          <div 
            ref={cardRef} 
            className="group relative flex flex-col lg:flex-row w-full bg-white rounded-[24px] border border-[var(--border-medium)] shadow-[var(--shadow-card)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(13,26,14,0.1)] overflow-hidden transform-gpu"
          >
            
            {/* Left Box: Embedded Web Browser Mockup */}
            <div className="w-full lg:w-[55%] h-[300px] lg:h-[420px] bg-[#0c110f] relative overflow-hidden flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border-medium)]">
              
              {/* Fake Browser Chrome Navbar */}
              <div className="h-10 w-full bg-[#161f1c] border-b border-white/10 flex items-center px-4 gap-2 shrink-0 relative z-20">
                 <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                 </div>
                 <div className="mx-auto w-[60%] lg:w-[45%] h-6 bg-white/5 border border-white/10 rounded-md flex items-center justify-center font-mono text-[10px] text-white/30 tracking-widest hidden sm:flex">
                    trading.milestone.academy
                 </div>
              </div>
              
              {/* Dummy Trading UI Visuals */}
              <div className="flex-1 w-full relative bg-[#090b0a] overflow-hidden group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] origin-center">
                 
                 {/* CSS Depth Grid */}
                 <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(to right, #22C55E 1px, transparent 1px), linear-gradient(to bottom, #22C55E 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#090b0a_80%)]" />
                 
                 {/* Center Brand */}
                 <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-[35%] flex flex-col items-center">
                    <TrendingUp size={48} className="text-[#22C55E] mb-4" />
                    <span className="font-serif text-[32px] md:text-[40px] text-white tracking-tight whitespace-nowrap">Master the Markets.</span>
                    <span className="font-sans text-[13px] text-white/40 tracking-[0.2em] uppercase mt-2">Zero to Hero Trading Pipeline</span>
                 </div>
                 
                 {/* Fake Candlesticks Abstractly Placed */}
                 <div className="absolute bottom-0 left-0 w-full h-[120px] flex items-end justify-between px-6 opacity-40 gap-1.5 pb-2">
                    {[100, 40, 60, 120, 80, 50, 70, 110, 130, 90, 60, 40, 80, 100, 140, 110].map((h, i) => (
                      <div key={i} className={`w-[6px] rounded-sm flex flex-col justify-end items-center relative transition-all duration-500 ${i % 3 === 0 ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`} style={{ height: `${Math.max(20, Math.random() * h)}%` }}>
                         {/* Candlestick Wick */}
                         <div className={`absolute top-0 -translate-y-full w-[1.5px] h-[12px] ${i % 3 === 0 ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`} />
                         <div className={`absolute bottom-0 translate-y-full w-[1.5px] h-[12px] ${i % 3 === 0 ? 'bg-[#EF4444]' : 'bg-[#22C55E]'}`} />
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Right Box: Content & Action */}
            <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-white relative">
              
              <div className="mb-8">
                <span className="bg-[var(--green-50)] text-[var(--green-700)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest font-bold rounded mb-4 inline-block border border-[var(--border-medium)]">
                  ONE ACADEMY • MULTIPLE PATHS
                </span>
                <h3 className="font-sans font-bold text-[26px] text-[var(--text-primary)] leading-tight mb-4">
                  Legacy in Trading — Excellence in Accounting.
                </h3>
                <p className="font-sans text-[16px] text-[var(--text-secondary)] leading-relaxed">
                  Join the 10,000+ traders who have mastered the markets with us since 2019. Whether it's corporate accounting or active trading, we build professionals.
                </p>
              </div>

              {/* Data Row */}
              <div className="flex flex-col gap-5 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--green-50)] flex items-center justify-center shrink-0">
                    <Users size={20} className="text-[var(--green-600)]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-extrabold text-[var(--text-primary)]">10,000+ Traders Trained</span>
                    <span className="font-sans text-[13px] text-[var(--text-secondary)] italic">India's most practical academy</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--green-50)] flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-[var(--green-600)]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-extrabold text-[var(--text-primary)]">8+ Detailed Curriculums</span>
                    <span className="font-sans text-[13px] text-[var(--text-secondary)]">Stock • Options • Technicals</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <a 
                href="https://milestone-trading-academy.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic group w-full py-[18px] rounded-xl flex items-center justify-center gap-2 font-sans font-bold text-[16px] transition-all duration-300 border-2 border-[var(--green-500)] text-[var(--green-600)] bg-transparent hover:bg-[var(--green-500)] hover:text-white"
              >
                Explore Trading Programs <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
