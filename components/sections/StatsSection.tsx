"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const statsData = [
  { target: 4800, suffix: "+", label: "Students", delay: 0 },
  { target: 96, suffix: "%", label: "Placement", delay: 0.2 },
  { target: 12, suffix: "+", label: "Courses", delay: 0.4 },
  { target: 1200, suffix: "+", label: "Companies", delay: 0.6 },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".stat-card") as HTMLElement[];
    const counters = gsap.utils.toArray(".stat-number") as HTMLElement[];

    // 1. Stagger Entrance
    gsap.fromTo(cards, 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      }
    );

    // 2. Count UP Animation
    counters.forEach((counter, i) => {
      const targetStr = counter.getAttribute("data-target");
      const target = parseInt(targetStr || "0", 10);
      const suffix = counter.getAttribute("data-suffix") || "";
      
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        delay: i * 0.15 + 0.2, // Offset start so translation begins slightly earlier
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        onUpdate: () => {
          // Format with English commas accurately
          const result = Math.floor(obj.val).toLocaleString("en-US");
          counter.innerHTML = `${result}<span class="text-[var(--green-500)]">${suffix}</span>`;
        }
      });
    });

  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 bg-[var(--bg-dark)] overflow-hidden z-10 border-t border-white/5"
    >
      {/* Background Graph-Paper Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      
      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full max-h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)] blur-3xl z-0 pointer-events-none" />

      <div className="max-w-[var(--container-max)] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          
          {statsData.map((stat, i) => (
            <div 
              key={i} 
              className="stat-card group relative flex flex-col items-center justify-center py-10 md:py-14 px-4 rounded-[20px] bg-white/[0.03] border border-white/10 backdrop-blur-[12px] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[var(--green-500)]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] overflow-hidden clickable"
            >
              
              {/* Inner Pulsing Green Glow specific to each card offset by array index scale */}
              <div 
                className="absolute -top-12 -left-12 w-32 h-32 bg-[var(--green-500)]/20 rounded-full blur-3xl animate-pulse pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"
                style={{ animationDelay: `${stat.delay}s`, animationDuration: '3s' }}
              />
              <div 
                className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--accent-mint)]/10 rounded-full blur-2xl animate-pulse pointer-events-none transition-opacity duration-500 opacity-30 group-hover:opacity-100"
                style={{ animationDelay: `${stat.delay + 1}s`, animationDuration: '4s' }}
              />

              <div 
                className="stat-number font-sans font-bold text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white tracking-tight text-center relative z-10 flex items-center gap-1 drop-shadow-[0_2px_10px_rgba(34,197,94,0.2)]"
                data-target={stat.target}
                data-suffix={stat.suffix}
              >
                0<span className="text-[var(--green-500)]">{stat.suffix}</span>
              </div>
              
              <h3 className="font-sans font-semibold text-xs md:text-sm text-white/50 uppercase tracking-[0.2em] md:tracking-[0.25em] mt-3 md:mt-5 text-center relative z-10 group-hover:text-white/80 transition-colors duration-300">
                {stat.label}
              </h3>
              
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
