import { useState, useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { type Course } from "@/lib/courses";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
  useEffect(() => {
    if (isLoading || dbCourses.length === 0) return;
    
    // Header
    if (sectionRef.current) {
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
          }
        }
      );
    }

    // Node scaling entrance
    const nodes = gsap.utils.toArray(".course-node") as HTMLElement[];
    nodes.forEach(node => {
      gsap.fromTo(node,
        { scale: 0 },
        {
          scale: 1,
          ease: "back.out(1.7)",
          duration: 0.6,
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
          }
        }
      );
    });

    // Card slide entrance
    const cards = gsap.utils.toArray(".course-card") as HTMLElement[];
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { x: 70, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
          }
        }
      );
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
              <div className="absolute left-[29px] top-[30px] bottom-[30px] w-[2px] bg-[var(--green-500)]/20 z-0 hidden md:block" />
              
              {/* VERTICAL SCROLLING LINE */}
              <div className="absolute left-[29px] top-[30px] bottom-[30px] w-[2px] z-0 hidden md:block">
                <div ref={lineRef} className="w-full bg-[var(--green-500)] origin-top h-[0%]" />
              </div>

              {dbCourses.map((course, index) => {
                const isVisible = activeTab === "All Programs" || (course.category && course.category.toLowerCase() === activeTab.toLowerCase());
                
                // Get the subset array to determine if it is the last visible element
                const visibleArr = dbCourses.filter(c => activeTab === "All Programs" || (c.category && c.category.toLowerCase() === activeTab.toLowerCase()));
                const isLastVisible = visibleArr[visibleArr.length - 1]?.id === course.id;
                
                const levelNum = (course as any).sort_order || index + 1;
                const shortCode = course.badge || course.title.substring(0, 4).toUpperCase();
                
                return (
                  <div 
                    key={course.id} 
                    data-flip-id={course.id}
                    className="course-wrapper"
                    style={{ display: isVisible ? 'block' : 'none' }}
                  >
                    {/* TIMELINE ROW */}
                    <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8 z-10 w-full">
                      
                      {/* NODE */}
                      <div className="course-node flex-shrink-0 w-[60px] h-[60px] relative z-20 hidden md:flex items-center justify-center group cursor-default">
                        <div className={`w-full h-full rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.12] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] ${levelNum === 4 ? "bg-[var(--bg-dark)] border-2 border-[var(--accent-gold)]" : "bg-[var(--gradient-green)]"}`}>
                          <span className="font-mono text-[22px] font-bold text-white leading-none">
                            {levelNum}
                          </span>
                        </div>
                      </div>

                      {/* CARD */}
                      <div className="course-card flex-1 bg-white rounded-2xl overflow-hidden border border-[var(--border-light)] flex flex-col md:flex-row group/card transition-all duration-[0.35s] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[5px] hover:shadow-[0_12px_40px_-15px_rgba(34,197,94,0.15)] hover:border-[var(--green-300)] w-full">
                        
                        {/* LEFT IMAGE SIDE */}
                        <div className="w-full md:w-[240px] h-[180px] md:h-auto flex-shrink-0 relative overflow-hidden bg-[var(--bg-secondary)]">
                          {course.image_url ? (
                            <Image 
                              src={course.image_url} 
                              alt={course.title} 
                              fill 
                              className="object-cover transition-transform duration-[0.4s] group-hover/card:scale-[1.06]" 
                            />
                          ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center transition-transform duration-[0.4s] group-hover/card:scale-[1.06]"
                              style={{ background: course.gradient || "var(--gradient-green)" }}
                            >
                              <BookOpen size={56} className="text-white opacity-90" />
                            </div>
                          )}
                          
                          {/* Level badge */}
                          <div className="absolute top-3 left-3 bg-[rgba(10,26,11,0.78)] backdrop-blur rounded-full px-3 py-1 text-white font-mono text-[10px] uppercase tracking-wide z-10 border border-white/10">
                            Level {levelNum} · {shortCode}
                          </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1 p-6 md:p-7 flex flex-col items-start bg-white z-10">
                          {/* Diploma code chip */}
                          <div className="inline-flex items-center bg-[var(--green-50)] border border-[var(--green-100)] text-[var(--green-700)] font-mono text-[11px] rounded-full px-3 py-1 relative leading-[1.2]">
                            {shortCode}
                          </div>
                          
                          <h3 className="font-serif font-semibold text-[18px] text-[var(--text-primary)] mt-3 leading-tight line-clamp-2">
                            {course.title}
                          </h3>
                          
                          <p className="font-sans text-[13px] text-[var(--text-secondary)] mt-1 line-clamp-2">
                            {course.tagline}
                          </p>
                          
                          {/* Topics */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {(course.topics || []).slice(0, 5).map((topic, tIndex) => (
                              <span key={tIndex} className="bg-[var(--green-50)] text-[var(--green-700)] font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-[var(--green-100)]">
                                {topic}
                              </span>
                            ))}
                            {(course.topics || []).length > 5 && (
                              <span className="text-[var(--text-muted)] font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                                +{(course.topics || []).length - 5} more
                              </span>
                            )}
                          </div>
                          
                          {/* Divider */}
                          <div className="w-full my-4 border-t border-[var(--border-light)]" />
                          
                          {/* Bottom Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-auto pt-1 gap-4 sm:gap-0">
                            <div className="font-sans text-[12px] text-[var(--text-secondary)] flex items-center gap-1.5 whitespace-nowrap">
                              📅 {course.duration || "Self-Paced"}
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
                              {/* Price */}
                              <div className="flex flex-col items-start sm:items-end">
                                {course.price && course.price > 0 ? (
                                  <>
                                    {course.originalPrice && course.originalPrice > 0 && (
                                      <span className="text-[var(--text-muted)] line-through text-[13px] font-sans leading-none mb-0.5">
                                        ₹{course.originalPrice.toLocaleString('en-IN')}
                                      </span>
                                    )}
                                    <span className="font-mono font-semibold text-[22px] text-[var(--green-600)] leading-none">
                                      ₹{course.price.toLocaleString('en-IN')}
                                    </span>
                                  </>
                                ) : (
                                  <span className="font-sans font-semibold text-[15px] text-[var(--green-600)]">Contact</span>
                                )}
                              </div>
                              
                              <button 
                                onClick={() => router.push(`/courses/${course.slug}`)}
                                className="bg-[var(--gradient-green)] text-white font-sans text-[12px] font-semibold px-4 py-2 rounded-full transition-transform duration-300 hover:scale-[1.05] group-hover/card:scale-[1.06] group-hover/card:translate-x-[3px] shadow-[0_2px_10px_rgba(34,197,94,0.3)] whitespace-nowrap"
                              >
                                Enroll →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* CONNECTOR (Hidden after Level 4 or last visible item) */}
                    {levelNum < 4 && !isLastVisible && (
                      <div className="connector h-[40px] flex items-center relative mb-8 z-0 hidden md:flex">
                        <div className="absolute left-[21px] flex items-center justify-center bg-[var(--bg-primary)] w-[16px] h-[16px] z-10 text-[var(--text-muted)]">
                          <ChevronDown size={16} />
                        </div>
                        <div className="w-[12px] h-[1px] border-b border-dashed border-[var(--border-medium)] absolute left-[45px]" />
                        <span className="font-mono text-[10px] text-[var(--text-muted)] ml-[88px] uppercase tracking-wider">
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
