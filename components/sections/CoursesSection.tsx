import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore - TS sometimes fails to resolve GSAP plugin paths with moduleResolution: bundler
import { Flip } from "gsap/Flip";
import { type Course } from "@/lib/courses";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { TransitionLink as Link, usePageTransition } from "@/components/global/PageTransition";
import { ChevronDown, Loader2, BookOpen, ArrowRight } from "lucide-react";

// Register plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

const categories = ["All Programs", "Accounting", "Taxation", "Advanced"];

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<string>("All Programs");
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = usePageTransition();
  const supabase = createClient();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        
        const mappedData = (data || []).map((course: any) => ({
          ...course,
          badgeColor: course.badge_color,
          originalPrice: course.original_price,
          whoIsItFor: course.who_is_it_for,
        }));

        setDbCourses(mappedData);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, [supabase]);

  // Handle Tab Switch with GSAP Flip
  const handleTabClick = (tab: string) => {
    if (tab === activeTab || isLoading) return;
    
    // Capture state before updating react
    const state = Flip.getState(".course-wrapper", { props: "opacity" });
    setActiveTab(tab);
    
    // Let React render the display:none changes, then Flip
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 }),
        onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.95, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh()
      });
    });
  };

  // Entrance and Timeline GSAP animations
  useLayoutEffect(() => {
    if (isLoading || dbCourses.length === 0) return;
    
    // Use gsap.context for better cleanup in React
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".courses-header-anim", 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );

      // Wrapper-based triggers for node and card components
      const wrappers = gsap.utils.toArray(".course-wrapper") as HTMLElement[];
      wrappers.forEach((wrapper) => {
        const node = wrapper.querySelector(".course-node");
        const card = wrapper.querySelector(".course-card");

        if (node) {
          gsap.fromTo(node,
            { scale: 0 },
            {
              scale: 1,
              ease: "back.out(1.7)",
              duration: 0.6,
              scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
                once: true,
              }
            }
          );
        }

        if (card) {
          gsap.fromTo(card,
            { x: 30, opacity: 0 },
            {
              x: 0, opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 85%",
                once: true,
              }
            }
          );
        }
      });

      // Vertical line draw effect
      if (lineRef.current && containerRef.current) {
        gsap.fromTo(lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true
            }
          }
        );
      }

      // Final refresh to lock in positions after all setup
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading, dbCourses.length]);

  return (
    <section ref={sectionRef} id="courses" className="w-full py-24 md:py-32 bg-[var(--bg-primary)] relative z-10 overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="courses-header-anim flex justify-center items-center gap-3 mb-6">
            <span className="font-mono text-[13px] text-[var(--green-700)] uppercase tracking-[0.2em] font-bold">
              DIPLOMA PROGRAMS
            </span>
          </div>
          
          <h2 className="courses-header-anim font-serif text-[44px] md:text-[56px] text-[var(--text-primary)] leading-[1.1] mb-6 -tracking-[0.02em]">
            Four Levels. One Complete Career.
          </h2>
          
          <p className="courses-header-anim font-sans text-lg md:text-[20px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Start where you are. Graduate where you want to be.
          </p>
          
          {/* Filters */}
          <div className="courses-header-anim mt-8 flex justify-center items-center gap-3 overflow-x-auto max-w-full pb-2 no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-5 py-2.5 rounded-full font-sans text-[14px] font-bold transition-all duration-300 whitespace-nowrap shrink-0 ${
                  activeTab === tab 
                    ? "bg-[var(--green-500)] text-white shadow-[0_4px_12px_rgba(34,197,94,0.3)]" 
                    : "bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative max-w-[900px] mx-auto mt-16 min-h-[500px]">
          {isLoading ? (
             <div className="flex justify-center py-20">
                <Loader2 size={40} className="animate-spin text-[var(--green-500)] opacity-40" />
             </div>
          ) : (
            <>
              {/* VERTICAL LINE BACKGROUND */}
              <div className="absolute left-[35px] top-[30px] bottom-[30px] w-[2px] bg-[var(--green-500)]/20 z-0 hidden md:block" />
              
              {/* VERTICAL SCROLLING LINE */}
              <div className="absolute left-[35px] top-[30px] bottom-[30px] w-[2px] z-0 hidden md:block">
                <div ref={lineRef} className="w-full bg-[var(--green-500)] origin-top h-[0%]" />
              </div>

              {dbCourses.map((course, index) => {
                const isVisible = activeTab === "All Programs" || (course.category && course.category.toLowerCase() === activeTab.toLowerCase());
                
                // Get the subset array to determine if it is the last visible element
                const visibleArr = dbCourses.filter(c => activeTab === "All Programs" || (c.category && c.category.toLowerCase() === activeTab.toLowerCase()));
                const isLastVisible = visibleArr[visibleArr.length - 1]?.id === course.id;
                
                const levelNum = (course as any).sort_order || index + 1;
                const acronymMatch = course.title.match(/\(([^)]+)\)/);
                const parsedAcronym = acronymMatch ? acronymMatch[1] : course.title.substring(0, 4).toUpperCase();
                const shortCode = course.badge || parsedAcronym;
                
                return (
                  <div 
                    key={course.id} 
                    data-flip-id={course.id}
                    className="course-wrapper"
                    style={{ display: isVisible ? 'block' : 'none' }}
                  >
                    {/* TIMELINE ROW */}
                    <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-12 z-10 w-full group/row">
                      
                      {/* HUGE GLOWING NODE */}
                      <div className="course-node flex-shrink-0 w-[72px] h-[72px] relative z-20 hidden md:flex items-center justify-center group/node cursor-default mt-2">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 rounded-full bg-[var(--green-500)] blur-[16px] opacity-30 transition-opacity duration-500 group-hover/row:opacity-70"></div>
                        <div className="w-full h-full rounded-full flex items-center justify-center transition-all duration-500 group-hover/row:scale-[1.15] bg-gradient-to-br from-[var(--green-400)] to-[var(--green-600)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] border-[4px] border-white relative z-10">
                          <span className="font-mono text-[26px] font-black text-white leading-none drop-shadow-sm">
                            {levelNum}
                          </span>
                        </div>
                      </div>

                      {/* PREMIUM IMPRESSIVE CARD */}
                      <div className="course-card flex-1 bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col md:flex-row group/card transition-all duration-[0.5s] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-[8px] hover:shadow-[0_24px_50px_-12px_rgba(34,197,94,0.25)] hover:border-[var(--green-300)] w-full relative">
                        
                        {/* Glowing reflection on hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[var(--green-50)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-[0.6s] z-0 pointer-events-none rounded-3xl" />

                        {/* LEFT IMAGE SIDE */}
                        <div className="w-full md:w-[280px] h-[200px] md:h-full min-h-[220px] flex-shrink-0 relative overflow-hidden bg-[var(--bg-secondary)] z-10">
                          {course.image_url ? (
                            <Image 
                              src={course.image_url} 
                              alt={course.title} 
                              fill 
                              className="object-cover transition-transform duration-[0.7s] ease-out group-hover/card:scale-[1.1]" 
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center transition-transform duration-[0.7s] ease-out group-hover/card:scale-[1.1]"
                              style={{ background: course.gradient || "var(--gradient-green)" }}
                            >
                              <BookOpen size={64} className="text-white opacity-95 transition-transform duration-500 group-hover/card:scale-110" />
                            </div>
                          )}
                          
                          {/* Premium Glassmorphic Badge */}
                          <div className="absolute top-4 left-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-md rounded-full px-4 py-1.5 text-white font-mono text-[11px] font-bold uppercase tracking-widest z-10 border border-white/20 shadow-lg">
                            Level {levelNum}
                          </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 p-7 md:p-9 flex flex-col items-start bg-transparent z-10 relative">
                          
                          {/* Diploma code premium chip */}
                          <div className="inline-flex items-center bg-[var(--green-50)] border-l-2 border-[var(--green-500)] text-[var(--green-700)] font-sans font-bold tracking-widest text-[11px] px-3 py-1.5 mb-3 uppercase drop-shadow-sm transition-all duration-300 group-hover/card:bg-[var(--green-100)] rounded-r-md">
                            {shortCode} ACADEMY PROGRAM
                          </div>
                          
                          {/* Elegant, Large Typography for WOW factor */}
                          <h3 className="font-serif font-semibold text-[22px] md:text-[26px] text-[#0A1A0B] mt-1 line-clamp-2 leading-[1.3] group-hover/card:text-[var(--text-primary)] transition-colors duration-300 tracking-tight">
                            {course.title.replace(/\s*\([^)]*\)/, '')} {/* Strip acronym from visible elegant title */}
                          </h3>
                          
                          <p className="font-sans text-[14px] md:text-[15px] text-[var(--text-secondary)] mt-2 line-clamp-2 font-medium leading-relaxed">
                            {course.tagline}
                          </p>
                          
                          {/* High-quality rounded tags */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {(course.topics || []).slice(0, 4).map((topic, tIndex) => (
                              <span key={tIndex} className="bg-white/80 backdrop-blur-sm shadow-sm text-gray-700 font-sans font-medium text-[11px] px-3 py-1 rounded-full border border-gray-200 transition-colors group-hover/card:border-[var(--green-200)] group-hover/card:bg-[var(--green-50)]">
                                {topic}
                              </span>
                            ))}
                            {(course.topics || []).length > 4 && (
                              <span className="text-gray-500 font-sans font-medium text-[11px] px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                                +{(course.topics || []).length - 4} more
                              </span>
                            )}
                          </div>
                          
                          <div className="w-full my-6 border-t border-gray-100 group-hover/card:border-[var(--green-100)] transition-colors duration-300" />
                          
                          {/* Bottom Row: Duration, Price, Enroll */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-auto gap-5 sm:gap-0">
                            
                            <div className="font-sans font-semibold text-[13px] text-gray-500 flex items-center gap-2">
                               <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                               </div>
                               {course.duration || "Self-Paced"}
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                              
                              {/* Prominent Price Display */}
                              <div className="flex flex-col items-start sm:items-end">
                                {course.price && course.price > 0 ? (
                                  <>
                                    {course.originalPrice && course.originalPrice > course.price && (
                                      <span className="text-gray-400 line-through text-[13px] font-mono leading-none mb-1 font-medium">
                                        ₹{course.originalPrice.toLocaleString('en-IN')}
                                      </span>
                                    )}
                                    <span className="font-serif font-bold text-[26px] text-[#0A1A0B] leading-none tracking-tight">
                                      ₹{course.price.toLocaleString('en-IN')}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-serif font-bold text-[22px] text-[#0A1A0B]">Contact Us</span>
                                )}
                              </div>
                              
                              {/* Premium Sticky Button */}
                              <button 
                                onClick={() => navigateTo(`/courses/${course.slug}`)}
                                className="relative overflow-hidden bg-[#0A1A0B] text-white font-sans text-[13px] font-bold px-6 py-3 rounded-full transition-all duration-[0.4s] hover:bg-[var(--green-600)] hover:shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 hover:scale-[1.02] flex items-center gap-2 whitespace-nowrap"
                              >
                                View Details 
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover/card:translate-x-1" />
                              </button>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* CONNECTOR (Hidden after the last visible item) */}
                    {!isLastVisible && (
                      <div className="connector h-[50px] flex items-center relative mb-6 z-0 hidden md:flex">
                        <div className="absolute left-[28px] flex items-center justify-center bg-white border border-gray-100 rounded-full w-[16px] h-[16px] z-10 text-gray-400">
                          <ChevronDown size={12} strokeWidth={3} />
                        </div>
                        <div className="w-[12px] h-[2px] border-b-2 border-dashed border-gray-200 absolute left-[45px]" />
                        <span className="font-sans font-bold text-[10px] text-gray-400 ml-[68px] uppercase tracking-[0.2em]">
                          Next Level
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 w-full courses-header-anim">
          <Link 
            href="/courses"
            className="group flex items-center gap-3 bg-transparent border-2 border-[var(--green-500)] text-[var(--green-600)] font-sans font-semibold text-[15px] px-10 py-4 rounded-full transition-all duration-300 hover:bg-[var(--green-500)] hover:text-white shadow-sm"
          >
            View All Programs <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
