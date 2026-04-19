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
  ArrowRight,
  TrendingUp
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CourseCard from "@/components/ui/CourseCard";
import { TransitionLink as Link } from "@/components/global/PageTransition";

export default function CourseDetailClient({ course }: { course: Course }) {
  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    FileText,
    TrendingUp,
    Award
  };
  const Icon = iconMap[course.icon] || BookOpen;
  const headerRef = useRef<HTMLDivElement>(null);
  
  const faculties = (course as any).faculties || (course.faculty ? [course.faculty] : []);
  
  // Ensure modules is an array, parse if it's a string from DB
  let syllabusModules = course.modules;
  if (typeof syllabusModules === 'string') {
    try {
      syllabusModules = JSON.parse(syllabusModules);
    } catch (e) {
      syllabusModules = [];
    }
  }
  
  const finalModules = (syllabusModules && syllabusModules.length > 0) 
    ? syllabusModules 
    : (course.topics && course.topics.length > 0 
        ? [{ title: "Course Curriculum", topics: course.topics }] 
        : []);

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
    const extra = courses.filter(c => c.id !== course.id && !relatedCourses.find(r => r.id === c.id)).slice(0, 3 - relatedCourses.length);
    relatedCourses.push(...extra);
  }

  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)]">
      
      {/* Navbar Spacer */}
      <div className="h-[100px] lg:h-[140px]" />

      {/* Premium Clean Split Hero */}
      <div 
        ref={headerRef}
        className="w-full pt-20 pb-24 px-6 relative overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-light)]"
      >
        <div className="max-w-[var(--container-max)] mx-auto relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
           
           {/* Left Content: Clean Typography */}
           <div className="flex flex-col text-center lg:text-left text-[var(--text-primary)] max-w-2xl lg:w-[50%]">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                 {course.badge && <span className="bg-[var(--green-500)] text-white px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] font-extrabold rounded-full">{course.badge}</span>}
                 <span className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-medium)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] font-bold rounded-full">{course.category}</span>
              </div>
              
              <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] mb-6 tracking-tight text-[var(--text-primary)]">
                {course.title}
              </h1>
              
              <p className="font-sans text-[18px] md:text-[20px] text-[var(--text-secondary)] mb-10 leading-relaxed max-w-xl">
                {course.tagline}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                 <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Duration</span>
                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                       <Clock size={16} className="text-[var(--green-500)]" />
                       <span className="font-sans font-bold text-[15px]">{course.duration}</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Experience</span>
                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                       <BarChart size={16} className="text-[var(--green-500)]" />
                       <span className="font-sans font-bold text-[15px]">{course.level}</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Format</span>
                    <div className="flex items-center gap-2 text-[var(--text-primary)]">
                       <div className="w-2 h-2 rounded-full bg-[var(--green-500)] animate-pulse" />
                       <span className="font-sans font-bold text-[15px]">Hybrid Learning</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="#syllabus" className="magnetic clickable px-10 h-[60px] rounded-full bg-[var(--text-primary)] text-white font-sans font-bold text-[16px] flex items-center justify-center gap-2 transition-all hover:bg-black hover:scale-[1.02]">
                  Explore Syllabus <ChevronDown size={18} />
                </a>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=${i+course.id}`} alt="student" className="w-full h-full object-cover" />
                        </div>
                      ))}
                   </div>
                   <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                         <Star size={12} className="fill-amber-400 text-amber-400" />
                         <span className="font-sans font-bold text-[14px]">4.9/5</span>
                      </div>
                      <span className="font-sans text-[12px] text-[var(--text-muted)]">from 2k+ students</span>
                   </div>
                </div>
              </div>
           </div>

           {/* Right Content: Premium Image Frame */}
           <div className="lg:w-[45%] relative">
              <div className="relative z-10 rounded-[32px] overflow-hidden border-[12px] border-white shadow-[var(--shadow-lift)] group transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"} 
                  alt={course.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Certificate Badge */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                   <div className="w-10 h-10 rounded-full bg-[var(--green-500)] flex items-center justify-center text-white">
                     <Award size={20} />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Certification</span>
                     <span className="text-[13px] font-bold text-[var(--text-primary)]">Industry Recognized</span>
                   </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--green-100)] rounded-full blur-[80px] -z-10 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-100 rounded-full blur-[80px] -z-10 animate-pulse delay-700" />
           </div>
        </div>
      </div>

      <div id="syllabus" className="max-w-[var(--container-max)] mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Syllabus & Content */}
          <div className="w-full lg:w-[60%]">
             
             {/* Key Highlights */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                {course.highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] group hover:border-[var(--green-500)] transition-colors">
                    <CheckCircle2 size={18} className="text-[var(--green-500)] shrink-0" />
                    <span className="font-sans font-medium text-[15px] text-[var(--text-primary)]">{item}</span>
                  </div>
                ))}
             </div>

            {/* Curriculum Accordion */}
            <h2 className="font-serif text-[36px] text-[var(--text-primary)] mb-8">What You'll Learn</h2>
            
            <Accordion.Root type="single" defaultValue="module-0" collapsible className="w-full flex flex-col gap-3 mb-16">
              {finalModules.map((module: any, i: number) => (
                <Accordion.Item 
                  key={i} 
                  value={`module-${i}`}
                  className="bg-white border border-[var(--border-light)] rounded-[16px] overflow-hidden data-[state=open]:border-[var(--green-500)] data-[state=open]:shadow-[var(--shadow-green)] transition-all duration-300"
                >
                  <Accordion.Header className="flex">
                    <Accordion.Trigger className="group w-full flex items-center justify-between p-6 focus:outline-none focus-visible:bg-[var(--green-50)]">
                      <div className="flex items-center gap-4">
                         <span className="font-mono text-[12px] font-bold text-[var(--text-secondary)] group-data-[state=open]:text-[var(--green-600)] transition-colors">MODULE 0{i+1}</span>
                         <span className="font-sans font-bold text-[18px] text-[var(--text-primary)] text-left group-data-[state=open]:text-[var(--green-700)] transition-colors">{module.title}</span>
                      </div>
                      <ChevronDown size={20} className="text-[var(--text-muted)] group-data-[state=open]:text-[var(--green-500)] transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden font-sans text-[15px] text-[var(--text-secondary)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-6 pt-0 leading-relaxed border-t border-[var(--border-light)] mt-2 pt-4">
                       <ul className="space-y-3">
                         {module.topics?.map((topic: string, j: number) => (
                           <li key={j} className="flex items-start gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-500)] mt-2 shrink-0" />
                             <span>{topic}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {/* Instructor Callout - Supports Multiple */}
            {faculties.length > 0 && (
              <div className="space-y-8 mb-16">
                <h2 className="font-serif text-[36px] text-[var(--text-primary)]">Meet Your Instructors</h2>
                {faculties.map((f: any, idx: number) => (
                  <div key={f.id || idx} className="p-8 pb-10 rounded-2xl border border-[var(--border-light)] bg-white shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
                     {f.photo_url ? (
                       <div className="w-[120px] h-[120px] shrink-0 rounded-full border-4 border-white shadow-[var(--shadow-card)] overflow-hidden">
                         <img src={f.photo_url} alt={f.name} className="w-full h-full object-cover" />
                       </div>
                     ) : (
                       <div className="w-[120px] h-[120px] shrink-0 rounded-full bg-[var(--green-50)] border-4 border-white shadow-[var(--shadow-card)] flex items-center justify-center font-serif text-[48px] text-[var(--green-600)] select-none">
                         {f.name?.charAt(0) || "I"}
                       </div>
                     )}
                     <div className="flex flex-col text-center md:text-left">
                       <span className="font-mono text-[11px] text-[var(--green-600)] uppercase tracking-widest font-bold mb-2 block">Lead Instructor</span>
                       <h3 className="font-serif text-[32px] md:text-[36px] text-[var(--text-primary)] leading-tight mb-2">{f.name}</h3>
                       <p className="font-sans font-semibold text-[15px] text-[var(--text-secondary)] mb-4">{f.role}</p>
                       {f.bio && (
                         <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-0 before:h-full before:w-[3px] before:bg-[var(--green-100)] pl-0 md:pl-0">
                            {f.bio}
                         </p>
                       )}
                     </div>
                  </div>
                ))}
              </div>
            )}
            
          </div>

          {/* Right Column: Sticky Enrollment Sidebar */}
          <div className="w-full lg:w-[40%] sticky top-28 mb-16">
            <div className="w-full bg-white border border-[var(--border-light)] rounded-[24px] shadow-[var(--shadow-lift)] overflow-hidden">
               
               {/* Header Block inside Sidebar */}
               <div className="p-8 border-b border-[var(--border-light)] text-center relative pointer-events-none">
                  <div className="absolute top-0 inset-x-0 h-1.5" style={{ background: course.gradient }} />
                  {course.originalPrice && (
                    <p className="font-sans text-[14px] text-[var(--text-secondary)] line-through mb-1">₹{course.originalPrice.toLocaleString('en-IN')}</p>
                  )}
                  <div className="flex items-center justify-center gap-2 mb-2">
                     <span className="font-sans font-bold text-[42px] text-[var(--green-600)] tracking-tight">
                        {course.price ? `₹${course.price.toLocaleString('en-IN')}` : 'Custom Pricing'}
                     </span>
                  </div>
                  {course.emi ? (
                    <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
                      EMI OPTIONS: {course.emi.toUpperCase()}
                    </p>
                  ) : (
                    <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
                      {course.price ? 'EMI OPTIONS AVAILABLE FROM ₹499/MO' : 'CONTACT US FOR MORE INFO'}
                    </p>
                  )}
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
