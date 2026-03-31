"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { courses, type CourseCategory } from "@/lib/courses";
import CourseCard from "@/components/ui/CourseCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Accounting", "Taxation", "Compliance", "Advanced"];

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredCourses = activeTab === "All" 
    ? courses 
    : courses.filter(c => c.category === activeTab);

  // Entrance animation for the section header components
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".courses-header-anim", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  // Grid filtering cross-fade animation
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    
    // Clear out GSAP styles rapidly to avoid lingering conflicts
    gsap.killTweensOf(cards);
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.98 });
    
    // Stagger newly rendered filtered cards securely in
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "all" // Important so it doesn't break hover effects
    });
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="courses" className="w-full py-24 md:py-32 bg-[var(--bg-primary)] relative z-10 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-[var(--container-max)] mx-auto px-6 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl w-full mb-16">
          <div className="courses-header-anim flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1.5px] bg-[var(--green-600)]" />
            <span className="font-mono text-[13px] text-[var(--green-700)] uppercase tracking-[0.2em] font-bold">
              Certification Programs
            </span>
            <div className="w-8 h-[1.5px] bg-[var(--green-600)]" />
          </div>
          
          <h2 className="gsap-heading courses-header-anim font-serif text-[44px] md:text-[56px] text-[var(--text-primary)] leading-[1.1] mb-8 -tracking-[0.02em]">
            Job-Ready in <span className="italic text-[var(--green-600)] pr-2">90 Days</span>
          </h2>
          
          <p className="courses-header-anim font-sans text-lg md:text-[20px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Hands-on training by industry CAs. Master the exact workflows, software, and ledgers used by the top 100 taxation firms and MNCs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="courses-header-anim flex items-center justify-start md:justify-center gap-2 mb-16 px-2 py-2 bg-white border border-[var(--border-light)] rounded-[20px] md:rounded-full shadow-sm max-w-full overflow-x-auto no-scrollbar scroll-smooth snap-x">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`clickable shrink-0 snap-center px-6 py-3 rounded-xl md:rounded-full font-sans text-[15px] font-bold transition-all duration-300 whitespace-nowrap border-2 ${
                activeTab === tab 
                  ? "bg-[var(--green-500)] text-white shadow-[var(--shadow-green)] border-transparent" 
                  : "bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Grid Container */}
        <div 
          ref={gridRef} 
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 min-h-[500px]"
        >
          {filteredCourses.map(course => (
            <div key={course.id} className="w-full flex"> 
              <CourseCard course={course} />
            </div>
          ))}
          
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-50">
               <span className="font-mono tracking-widest text-[var(--text-secondary)]">NO EXPERIENCES FOUND</span>
            </div>
          )}
        </div>

        {/* View All Button */}
        <Link 
          href="/courses"
          className="courses-header-anim magnetic clickable group flex items-center gap-3 bg-transparent border-2 border-[var(--border-medium)] text-[var(--text-primary)] font-sans font-bold text-[16px] px-[40px] py-[22px] rounded-full transition-all duration-300 hover:border-[var(--green-500)] hover:text-[var(--green-600)] hover:bg-[var(--green-50)]"
        >
          View All 12 Programs 
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        
      </div>
    </section>
  );
}
