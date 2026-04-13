"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Briefcase, Building2, CheckCircle, GraduationCap, Laptop, Users } from "lucide-react";

const usps = [
  {
    title: "100% Practical Training",
    description: "No pure theory. Learn by working on real client case studies and actual company ledgers.",
    icon: Laptop
  },
  {
    title: "Expert CA Faculty",
    description: "Learn directly from practicing Chartered Accountants with decades of corporate finance experience.",
    icon: Users
  },
  {
    title: "Latest Industry Software",
    description: "Master Tally Prime, SAP FICO, QuickBooks, and the official MCA/GST portal interfaces.",
    icon: CheckCircle
  },
  {
    title: "Guaranteed Placements",
    description: "We have direct tie-ups with 1,200+ companies hiring directly from our talent pool.",
    icon: Briefcase
  },
  {
    title: "Recognized Certifications",
    description: "Walk away with credentials that hold immediate weight with top corporate HR departments.",
    icon: GraduationCap
  },
  {
    title: "Corporate Infrastructure",
    description: "Train in an environment that exactly mirrors modern corporate finance departments.",
    icon: Building2
  }
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    // Left content entrance
    gsap.fromTo(leftContentRef.current?.children || [], 
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 80%"
        }
      }
    );

    // Right USP cards entrance (alternating)
    const cards = gsap.utils.toArray(".usp-card") as HTMLElement[];
    cards.forEach((card, i) => {
      // Logic for 0-indexed items: 0 is 1st (odd from left), 1 is 2nd (even from right)
      const isOdd = i % 2 === 0;
      
      gsap.fromTo(card,
        { x: isOdd ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="relative w-full overflow-hidden bg-[var(--bg-primary)] z-10">
      
      {/* Absolute Solid Split Background for seamless full-width stretching */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-[var(--bg-dark)] z-0" />
      
      <div className="max-w-[var(--container-max)] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* Left Column (Dark) */}
        <div className="bg-[var(--bg-dark)] text-white px-6 py-20 lg:p-24 relative flex flex-col justify-center overflow-hidden">
          
          {/* Decorative Background M */}
          <div className="absolute -bottom-10 -left-10 text-[350px] font-serif font-bold text-white/[0.03] leading-none select-none pointer-events-none">
            M
          </div>
          
          <div ref={leftContentRef} className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1px] bg-[var(--green-500)]" />
              <span className="font-mono text-[13px] text-[var(--green-500)] uppercase tracking-widest font-semibold">
                Why Milestone Fin Academy
              </span>
            </div>
            
            <h2 className="gsap-heading font-serif text-[42px] md:text-[56px] text-white leading-[1.1] mb-8 -tracking-[0.02em]">
              Bridging the gap between <span className="italic text-[var(--green-500)]">Colleges</span> and <span className="italic text-[var(--green-500)]">Companies</span>.
            </h2>
            
            <p className="font-sans text-lg text-white/70 leading-relaxed mb-6">
              Traditional degrees teach you accounting theory. We teach you exactly how to do the job on day one.
            </p>
            
            <p className="font-sans text-lg text-white/70 leading-relaxed">
              Our curriculum is reversed-engineered from the specific tasks, ledgers, and softwares demanded by top accounting firms—guaranteeing you step into your career with unmatched confidence.
            </p>
          </div>
        </div>
        
        {/* Right Column (Light) */}
        <div className="bg-[var(--bg-primary)] px-6 py-20 lg:py-24 lg:pl-20 xl:pl-24 flex flex-col justify-center">
          
          <div className="flex flex-col gap-4 md:gap-6 w-full">
            {usps.map((usp, i) => {
               const Icon = usp.icon;
               return (
                <div 
                  key={i} 
                  className="usp-card group relative flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-[var(--green-50)] hover:translate-x-1 cursor-pointer bg-white border border-[var(--border-light)] shadow-sm hover:shadow-[var(--shadow-card)] overflow-hidden"
                >
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--green-500)] transition-all duration-300 group-hover:w-3" />
                  
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-light)] flex items-center justify-center text-[var(--green-600)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm">
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="font-sans font-bold text-[18px] text-[var(--text-primary)] mb-2 group-hover:text-[var(--green-700)] transition-colors">
                      {usp.title}
                    </h3>
                    <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed">
                      {usp.description}
                    </p>
                  </div>
                </div>
               );
            })}
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
