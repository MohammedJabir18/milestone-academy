"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";
import type { Course } from "@/lib/courses";

export default function CourseCard({ course }: { course: Course }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const Icon = course.icon;

  useEffect(() => {
    // 3D Tilt logic triggered only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = cardRef.current;
    if (!card) return;

    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      // Calculate cursor position from center (-0.5 to 0.5 range)
      const xObj = (e.clientX - rect.left) / rect.width - 0.5;
      const yObj = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Mult by max rotation degrees (-10 to 10)
      xTo(xObj * 12);
      yTo(-(yObj * 12));
    };

    const handleMouseLeave = () => {
      // Snap back seamlessly
      xTo(0);
      yTo(0);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="perspective-wrapper w-full h-full"
      style={{ perspective: "1000px" }}
    >
      <div 
        ref={cardRef} 
        className="group relative flex flex-col h-full bg-white rounded-[24px] overflow-hidden shadow-[var(--shadow-card)] transition-shadow duration-500 hover:shadow-[var(--shadow-hover)] transform-gpu clickable border border-[var(--border-light)] will-change-transform"
      >
        {/* Top Gradient Area */}
        <div 
          className="relative h-[180px] w-full p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
        >
          {/* Base Color Background that scales on hover */}
          <div 
            ref={bgRef}
            className="absolute inset-0 w-full h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.1] origin-center z-0"
            style={{ background: course.gradient }}
          />

          {/* Dotted pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.15] z-[1] pointer-events-none"
            style={{ 
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1.5px, transparent 0)",
              backgroundSize: "20px 20px" 
            }}
          />
          
          {/* Header Row: Icon & Badge */}
          <div className="relative z-10 flex justify-between items-start w-full">
            <div className="w-12 h-12 rounded-[14px] bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/20 transition-transform duration-500 group-hover:-translate-y-1">
              <Icon size={22} className="opacity-90" />
            </div>
            {course.badge && (
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase border border-white/20 shadow-sm">
                {course.badge}
              </span>
            )}
          </div>
          
          {/* Bottom Row: Category & Level */}
          <div className="relative z-10 flex gap-2 text-white/90 font-mono text-xs mt-auto">
            <span className="bg-black/10 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">{course.category}</span>
            <span className="bg-black/10 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">{course.level}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-6 sm:p-8 bg-white z-10 relative">
          
          <h3 className="font-sans font-bold text-[22px] text-[var(--text-primary)] leading-snug mb-3 group-hover:text-[var(--green-600)] transition-colors duration-300">
            {course.title}
          </h3>
          
          <p className="font-sans text-[15px] text-[var(--text-secondary)] line-clamp-2 mb-8 leading-relaxed flex-1">
            {course.description}
          </p>
          
          {/* Meta Info Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] text-[var(--text-secondary)] mb-6 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-[var(--green-500)]" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-[var(--accent-gold)] fill-[var(--accent-gold)]" />
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-[var(--text-primary)]">{course.rating}</span>
                <span className="text-[13px] opacity-70">({course.reviewCount})</span>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-[1px] bg-[var(--border-light)] mb-6" />
          
          {/* Pricing Row */}
          <div className="flex items-end justify-between w-full mb-8">
            <div className="flex flex-col">
              <span className="text-[13px] text-[var(--text-secondary)] line-through mb-1 decoration-red-500/40">
                ₹{course.originalPrice.toLocaleString('en-IN')}
              </span>
              <div className="flex items-baseline gap-1 relative">
                <span className="font-sans font-extrabold text-[28px] text-[var(--text-primary)] leading-none tracking-tight">
                  ₹{course.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-[var(--green-700)] bg-[var(--green-50)] border border-[var(--green-500)]/20 px-2.5 py-1.5 rounded-md font-bold uppercase tracking-wider mb-1 shadow-sm">
              EMI Available
            </span>
          </div>
          
          {/* Full Width CTA */}
          <Link 
            href={`/courses/${course.slug}`}
            className="w-full py-4 rounded-[14px] bg-[var(--bg-primary)] text-[var(--green-600)] font-sans font-bold text-center text-[15px] border border-[var(--border-medium)] transition-all duration-300 group-hover:bg-[var(--green-500)] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 relative overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Explore Syllabus</span> 
            <ArrowRight size={18} className="relative z-10 transition-transform duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" />
            
            {/* CTA Hover highlight pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] transition-transform duration-700 group-hover:translate-x-[150%] z-0" />
          </Link>

        </div>
      </div>
    </div>
  );
}
