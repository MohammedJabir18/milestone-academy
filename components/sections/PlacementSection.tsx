"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Building2, FileText, Mic, Target, TrendingUp } from "lucide-react";

const achievementPills = [
  { icon: Building2, text: "100% Placement Assistance" },
  { icon: FileText, text: "Resume Building" },
  { icon: Mic, text: "Mock Interviews" },
  { icon: Target, text: "Direct HR Connections" },
  { icon: TrendingUp, text: "Salary Negotiation Coaching" }
];

const companyRows = {
  row1: ["Deloitte", "EY", "KPMG", "PWC", "Grant Thornton", "BDO"],
  row2: ["Infosys BPM", "Wipro", "TCS", "Accenture", "Capgemini", "Cognizant"],
  row3: ["Federal Bank", "SBI", "HDFC", "Axis Bank", "Yes Bank", "ICICI"]
};

export default function PlacementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !circleRef.current || !textRef.current) return;

    // Radius = 120, Circumference = 2 * PI * 120 = 753.98
    const circumference = 753.98;
    const targetPercentage = 96;
    const offset = circumference - (targetPercentage / 100) * circumference;

    // Set initial dash offset
    gsap.set(circleRef.current, { strokeDasharray: circumference, strokeDashoffset: circumference });

    // Progress Ring Animation
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 2.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Number Count Up
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetPercentage,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.floor(obj.val)}%`;
        }
      }
    });

  }, []);

  return (
    <section ref={sectionRef} id="placements" className="w-full py-24 md:py-[120px] bg-[var(--bg-primary)] overflow-hidden relative z-10">
      <div className="max-w-[var(--container-max)] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
            <span className="font-mono text-[13px] text-[var(--green-600)] uppercase tracking-widest font-bold">
              Placement Record
            </span>
          </div>
          
          <h2 className="gsap-heading font-serif text-[48px] md:text-[64px] text-[var(--text-primary)] leading-[1.05] mb-6 -tracking-[0.02em]">
            Your Dream Job,<br />
            <span className="italic text-[var(--green-600)]">Our Promise.</span>
          </h2>
          
          <p className="font-sans text-lg md:text-[20px] text-[var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
            Our placement team works tirelessly to connect Milestone-certified professionals with companies that know our graduates deliver from day one.
          </p>
          
          <div className="flex flex-wrap gap-4 max-w-lg">
            {achievementPills.map((pill, i) => {
               const Icon = pill.icon;
               return (
                <div 
                  key={i} 
                  className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--green-50)] border border-[var(--green-200)] text-[var(--green-700)] font-sans font-semibold text-[14px] transition-all duration-300 hover:bg-[var(--green-500)] hover:text-white hover:border-[var(--green-500)] hover:scale-105 hover:shadow-[var(--shadow-green)] cursor-default"
                >
                  <Icon size={16} className="transition-transform group-hover:scale-110" />
                  {pill.text}
                </div>
               );
            })}
          </div>
        </div>
        
        {/* Right Column: Marquees & Circle */}
        <div className="relative w-full h-[500px] flex items-center justify-center bg-white/50 backdrop-blur-xl rounded-[40px] border border-[var(--border-light)] shadow-[var(--shadow-card)] overflow-hidden">
          
          {/* Subtle grid background to match tech styling */}
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(34,197,94,0.4) 1px, transparent 0)", backgroundSize: "24px 24px" }} />

          {/* Marquee Tracks Layer (Background) */}
          <div className="absolute inset-0 flex flex-col justify-evenly opacity-30 py-10 pointer-events-none mix-blend-multiply">
            
            {/* Row 1 -> Leftward */}
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div key={`copy1-${copy}`} className="flex items-center gap-12 pr-12">
                  {companyRows.row1.map((company, i) => (
                    <div key={`r1-${i}`} className="font-serif italic font-black text-4xl whitespace-nowrap text-gray-500 opacity-60 transition-all hover:opacity-100 hover:text-[var(--green-600)] hover:scale-105 pointer-events-auto">
                      {company}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Row 2 <- Rightward */}
            <div className="flex w-max animate-marquee-reverse">
              {[0, 1].map((copy) => (
                <div key={`copy2-${copy}`} className="flex items-center gap-12 pr-12">
                  {companyRows.row2.map((company, i) => (
                    <div key={`r2-${i}`} className="font-sans font-black text-4xl tracking-tighter whitespace-nowrap text-gray-400 opacity-60 transition-all hover:opacity-100 hover:text-[var(--green-600)] hover:scale-105 pointer-events-auto">
                      {company.toUpperCase()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Row 3 -> Leftward */}
            <div className="flex w-max animate-marquee" style={{ animationDuration: "30s" }}>
              {[0, 1].map((copy) => (
                <div key={`copy3-${copy}`} className="flex items-center gap-12 pr-12">
                  {companyRows.row3.map((company, i) => (
                    <div key={`r3-${i}`} className="font-serif tracking-widest text-4xl whitespace-nowrap text-gray-500 opacity-60 transition-all hover:opacity-100 hover:text-[var(--green-600)] hover:scale-105 pointer-events-auto">
                      {company}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>

          {/* Center Glass Ring Container */}
          <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-2xl rounded-full shadow-[0_20px_60px_rgba(34,197,94,0.15)] border border-white/80 scale-90 md:scale-100">
            
            {/* SVG Ring Generator */}
            <svg width="280" height="280" viewBox="0 0 280 280" className="rotate-[-90deg] drop-shadow-sm">
               {/* Background Track */}
               <circle 
                 cx="140" cy="140" r="120" 
                 fill="none" 
                 strokeWidth="20" 
                 className="stroke-[var(--bg-secondary)]" 
                 strokeLinecap="round" 
               />
               
               {/* Animated Progress Ring */}
               <circle 
                 ref={circleRef}
                 cx="140" cy="140" r="120" 
                 fill="none" 
                 strokeWidth="20" 
                 className="stroke-[var(--green-500)]" 
                 strokeLinecap="round" 
               />
               
               {/* Fixed 96% Text Graphic embedded in SVG directly */}
               <text 
                 ref={textRef}
                 x="140" y="140" 
                 textAnchor="middle" 
                 dominantBaseline="middle" 
                 fill="var(--green-600)" 
                 className="font-mono font-bold text-[72px] rotate-[90deg] transform origin-[140px_140px]"
                 style={{ letterSpacing: "-0.05em" }}
               >
                 0%
               </text>
            </svg>

            {/* Sub-label absolutely attached */}
            <div className="absolute bottom-16 bg-white px-5 py-2 rounded-full border border-[var(--border-light)] shadow-sm font-sans font-bold text-[var(--text-secondary)] tracking-widest text-[12px] uppercase">
               Students Placed
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
