"use client";

import { useRef, useEffect } from "react";
import { type Course, courses } from "@/lib/courses";
import { 
  Clock, 
  Star, 
  BarChart, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Download, 
  FileText, 
  Award,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CourseCard from "@/components/ui/CourseCard";
import { TransitionLink as Link } from "@/components/global/PageTransition";

export default function CourseDetailClient({ course }: { course: Course }) {
  const Icon = course.icon;
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Quick dynamic random instructor matching for prototypes
  const instructorPool = [
    { name: "CA Rashida Nair", role: "Tax Advisory Lead", exp: "12+ Yrs", img: "R" },
    { name: "Suresh Menon CPA", role: "Senior Financial Analyst", exp: "8+ Yrs", img: "S" },
    { name: "Anjali Krishnan", role: "Audit Director", exp: "15 Yrs", img: "A" }
  ];
  const instructor = instructorPool[course.title.length % instructorPool.length];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (headerRef.current) {
       gsap.fromTo(headerRef.current.children, 
         { y: 30, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
       );
    }
  }, []);

  // Filter 3 related courses in similar category
  const relatedCourses = courses
    .filter(c => c.category === course.category && c.id !== course.id)
    .slice(0, 3);
    
  if (relatedCourses.length < 3) {
    // Padding if category has few courses
    relatedCourses.push(...courses.filter(c => c.id !== course.id).slice(0, 3 - relatedCourses.length));
  }

  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)]">
      
      {/* Dynamic Gradient Hero */}
      <div 
        ref={headerRef}
        className="w-full pt-32 pb-20 px-6 relative overflow-hidden"
        style={{ background: course.gradient }}
      >
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-[var(--container-max)] mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mt-8">
           <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform rotate-3">
              <Icon size={48} className="text-white drop-shadow-md" />
           </div>
           <div className="flex flex-col text-center md:text-left text-white max-w-3xl">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 {course.badge && <span className="bg-white/20 text-white border border-white/30 px-3 py-1 font-mono text-[11px] uppercase tracking-widest font-bold rounded shadow-sm">{course.badge}</span>}
                 <span className="bg-black/20 text-white/90 px-3 py-1 font-mono text-[11px] uppercase tracking-widest rounded shadow-sm hidden sm:block">{course.category}</span>
              </div>
              <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.05] tracking-tight mb-4 drop-shadow-sm">{course.title}</h1>
              <p className="font-sans text-[17px] md:text-[20px] text-white/80 leading-relaxed font-medium">{course.description}</p>
           </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
          
          {/* Left Column: Flow & Accordion */}
          <div className="w-full lg:w-[60%] flex flex-col">
            
            {/* Overview Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 p-6 mb-12 bg-white rounded-2xl border border-[var(--border-light)] shadow-[var(--shadow-card)]">
               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="w-10 h-10 rounded-full bg-[var(--green-50)] text-[var(--green-600)] flex items-center justify-center"><Clock size={18} /></div>
                 <div>
                   <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Duration</p>
                   <p className="font-sans font-bold text-[15px]">{course.duration}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="w-10 h-10 rounded-full bg-[var(--green-50)] text-[var(--green-600)] flex items-center justify-center"><BarChart size={18} /></div>
                 <div>
                   <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Level</p>
                   <p className="font-sans font-bold text-[15px]">{course.level}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 w-full sm:w-auto">
                 <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"><Star size={18} fill="currentColor" /></div>
                 <div>
                   <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-wider mb-0.5">Rating</p>
                   <div className="flex items-center gap-1.5"><strong className="font-sans font-bold text-[15px]">{course.rating}</strong><span className="text-[12px] text-[var(--text-secondary)]">({course.reviewCount})</span></div>
                 </div>
               </div>
            </div>

            {/* Curriculum Accordion */}
            <h2 className="font-serif text-[36px] text-[var(--text-primary)] mb-8">What You'll Learn</h2>
            
            <Accordion.Root type="single" defaultValue="topic-0" collapsible className="w-full flex flex-col gap-3 mb-16">
              {course.topics.map((topic, i) => (
                <Accordion.Item 
                  key={i} 
                  value={`topic-${i}`}
                  className="bg-white border border-[var(--border-light)] rounded-[16px] overflow-hidden data-[state=open]:border-[var(--green-500)] data-[state=open]:shadow-[var(--shadow-green)] transition-all duration-300"
                >
                  <Accordion.Header className="flex">
                    <Accordion.Trigger className="group w-full flex items-center justify-between p-6 focus:outline-none focus-visible:bg-[var(--green-50)]">
                      <div className="flex items-center gap-4">
                         <span className="font-mono text-[12px] font-bold text-[var(--text-secondary)] group-data-[state=open]:text-[var(--green-600)] transition-colors">MODULE 0{i+1}</span>
                         <span className="font-sans font-bold text-[18px] text-[var(--text-primary)] text-left group-data-[state=open]:text-[var(--green-700)] transition-colors">{topic}</span>
                      </div>
                      <ChevronDown size={20} className="text-[var(--text-muted)] group-data-[state=open]:text-[var(--green-500)] transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden font-sans text-[15px] text-[var(--text-secondary)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-6 pt-0 leading-relaxed border-t border-[var(--border-light)] mt-2 pt-4">
                       Deep-dive sessions covering theoretical concepts mapped verbatim to industry use-cases concerning {topic.toLowerCase()}. Includes exact case-study recreations of major audits and workflow validations so you command absolute authority inside operations.
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {/* Instructor Callout */}
            <div className="p-8 pb-10 rounded-2xl border border-[var(--border-light)] bg-white shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start mb-16">
               <div className="w-[120px] h-[120px] shrink-0 rounded-full bg-[var(--green-50)] border-4 border-white shadow-[var(--shadow-card)] flex items-center justify-center font-serif text-[48px] text-[var(--green-600)] select-none">
                 {instructor.img}
               </div>
               <div className="flex flex-col text-center md:text-left">
                 <span className="font-mono text-[11px] text-[var(--green-600)] uppercase tracking-widest font-bold mb-2 block">Lead Instructor</span>
                 <h3 className="font-serif text-[32px] md:text-[36px] text-[var(--text-primary)] leading-tight mb-2">{instructor.name}</h3>
                 <p className="font-sans font-semibold text-[15px] text-[var(--text-secondary)] mb-4">{instructor.role} • {instructor.exp} Industry Experience</p>
                 <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:w-[3px] before:bg-[var(--green-100)] pl-0 md:pl-0">
                    "I don't teach theory. Every dataset you see inside this course is mapped one-to-one to actual financial infrastructures I utilize daily."
                 </p>
               </div>
            </div>
            
          </div>

          {/* Right Column: Sticky Enrollment Sidebar */}
          <div className="w-full lg:w-[40%] sticky top-28 mb-16">
            <div className="w-full bg-white border border-[var(--border-light)] rounded-[24px] shadow-[var(--shadow-lift)] overflow-hidden">
               
               {/* Header Block inside Sidebar */}
               <div className="p-8 border-b border-[var(--border-light)] text-center relative pointer-events-none">
                  <div className="absolute top-0 inset-x-0 h-1.5" style={{ background: course.gradient }} />
                  <p className="font-sans text-[14px] text-[var(--text-secondary)] line-through mb-1">₹{course.originalPrice.toLocaleString('en-IN')}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <span className="font-sans font-bold text-[42px] text-[var(--green-600)] tracking-tight">₹{course.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">EMI OPTIONS AVAILABLE FROM ₹499/MO</p>
               </div>

               {/* Inclusion Checklist */}
               <div className="p-8">
                 <h4 className="font-sans font-bold text-[18px] text-[var(--text-primary)] mb-6">Course Includes:</h4>
                 <ul className="flex flex-col gap-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                      <span className="font-sans text-[15px] text-[var(--text-secondary)]">Live interactive sessions & lifetime recordings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                      <span className="font-sans text-[15px] text-[var(--text-secondary)]">Real-world case studies & datasets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                      <span className="font-sans text-[15px] text-[var(--text-secondary)]">24/7 dedicated mentor WhatsApp support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                      <span className="font-sans text-[15px] text-[var(--text-secondary)]">100% Placement assistance & interview prep</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                      <span className="font-sans text-[15px] text-[var(--text-secondary)]">Industry recognized certification on completion</span>
                    </li>
                 </ul>
                 
                 <div className="flex flex-col gap-3">
                   <Link href="/contact" className="magnetic clickable w-full h-[54px] rounded-xl bg-[var(--green-500)] text-white font-sans font-bold text-[16px] flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] hover:bg-[var(--green-600)] shadow-[var(--shadow-green)]">
                     Enroll Now <ArrowRight size={18} />
                   </Link>
                   <button className="clickable w-full h-[54px] border-2 border-[var(--border-medium)] text-[var(--text-primary)] rounded-xl font-sans font-bold text-[15px] flex items-center justify-center gap-2 transition-all hover:border-[var(--green-500)] hover:text-[var(--green-600)] hover:bg-[var(--green-50)] group">
                     <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Download Syllabus PDF
                   </button>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Related Programs Area */}
      <div className="w-full bg-white border-t border-[var(--border-light)] py-20 px-6 mt-10">
         <div className="max-w-[var(--container-max)] mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[36px] md:text-[48px] text-[var(--text-primary)] mb-4 text-center">Take Your Skills Further</h2>
            <p className="font-sans text-[16px] text-[var(--text-secondary)] mb-12 text-center max-w-2xl">
              Students who accelerate their career with {course.title} often find these advanced modules critically useful to their pipeline.
            </p>
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <div key={relatedCourse.id} className="w-full">
                  <CourseCard course={relatedCourse} />
                </div>
              ))}
            </div>
         </div>
      </div>

    </main>
  );
}
