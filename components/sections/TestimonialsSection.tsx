"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Star } from "lucide-react";

interface Testimonial {
  student_name: string;
  role: string;
  company?: string;
  course_name: string;
  review_text: string;
  rating: number;
}

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    student_name: "Rahul M.",
    role: "Junior Accountant",
    company: "TechNova",
    course_name: "Basic Package",
    review_text: "This course gave me the perfect foundation. Tally Prime is now second nature to me.",
    rating: 5,
  },
  {
    student_name: "Priya S.",
    role: "GST Executive",
    company: "Deloitte",
    course_name: "Intermediate Package",
    review_text: "The GST modules are incredibly detailed. I was able to practically apply the learning immediately at work.",
    rating: 5,
  },
  {
    student_name: "Ahmad K.",
    role: "Finance Manager",
    company: "Al Futtaim Group",
    course_name: "Short-Term Tax",
    review_text: "Exactly what I needed for the UAE market. Zoho Books and UAE Corporate Tax coverage is phenomenal.",
    rating: 5,
  },
  {
    student_name: "Sneha V.",
    role: "Senior Analyst",
    company: "KPMG",
    course_name: "Comprehensive Package",
    review_text: "The Power BI and advanced Excel training completely transformed how I handle financial modeling.",
    rating: 5,
  },
  {
    student_name: "Arjun T.",
    role: "Freelance Acct.",
    company: "",
    course_name: "Basic Package",
    review_text: "Highly recommend! The manual accounting classes cleared all my basic doubts.",
    rating: 4,
  },
  {
    student_name: "Riya D.",
    role: "Tax Consultant",
    company: "Ernst & Young",
    course_name: "Intermediate Package",
    review_text: "Milestone's approach to teaching live GST return filing gave me a huge edge over my peers.",
    rating: 5,
  },
  {
    student_name: "Omar M.",
    role: "Accounts Executive",
    company: "Lulu Group",
    course_name: "Short-Term Tax",
    review_text: "I secured a job in Dubai within a month of completing this course. The UAE VAT module is spot on.",
    rating: 5,
  },
  {
    student_name: "Kavita R.",
    role: "Financial Controller",
    company: "Reliance Retail",
    course_name: "Comprehensive Package",
    review_text: "A masterclass in accounting. The triple software proficiency (Zoho, QB, Tally) is unparalleled.",
    rating: 5,
  },
  {
    student_name: "Vikram J.",
    role: "Accounts Assistant",
    company: "TCS",
    course_name: "Basic Package",
    review_text: "The trainers are very patient and explain concepts with real-world examples.",
    rating: 5,
  },
  {
    student_name: "Neha P.",
    role: "Audit Associate",
    company: "PwC",
    course_name: "Intermediate Package",
    review_text: "The practical approach to Tally Prime and advanced MS Office really streamlined my audit tasks.",
    rating: 5,
  },
  {
    student_name: "Zayed H.",
    role: "Business Owner",
    company: "Desert Ventures",
    course_name: "Short-Term Tax",
    review_text: "As a business owner in the UAE, this helped me understand my own compliance and accounting software.",
    rating: 4,
  },
  {
    student_name: "Siddharth C.",
    role: "CFO",
    company: "Startup Inc.",
    course_name: "Comprehensive Package",
    review_text: "The best investment for my career. The mentors are top-notch industry experts.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("student_name, role, company, courses(title), review_text, rating")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (error || !data || data.length === 0) {
          setTestimonials(STATIC_TESTIMONIALS);
        } else {
          // Normalize the data format from Supabase
          const formatted = data.map((item: any) => ({
            student_name: item.student_name,
            role: item.role,
            company: item.company,
            course_name: item.courses ? item.courses.title : "Milestone Student",
            review_text: item.review_text,
            rating: item.rating || 5,
          }));
          
          // Pad with static data if less than 12
          if (formatted.length < 12) {
            setTestimonials([...formatted, ...STATIC_TESTIMONIALS.slice(0, 12 - formatted.length)]);
          } else {
            setTestimonials(formatted.slice(0, 12));
          }
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials(STATIC_TESTIMONIALS);
      }
    }

    fetchTestimonials();
  }, []);

  // Split testimonials into two rows for the marquee
  const row1Data = testimonials.slice(0, 6);
  const row2Data = testimonials.slice(6, 12);

  // If we haven't loaded yet, use static testimonials to prevent layout shift
  const displayRow1 = row1Data.length > 0 ? row1Data : STATIC_TESTIMONIALS.slice(0, 6);
  const displayRow2 = row2Data.length > 0 ? row2Data : STATIC_TESTIMONIALS.slice(6, 12);

  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-[var(--bg-dark)] overflow-hidden">
      {/* Header */}
      <div className="max-w-[var(--container)] mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <span className="font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-[0.15em] font-bold mb-6">
          Student Stories
        </span>
        <h2 className="font-serif text-[48px] md:text-[64px] text-[var(--text-inverse)] leading-[1.05] -tracking-[0.02em]">
          Real People.<br />
          <span className="italic text-[var(--green-500)]">Real Results.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6 w-full relative">
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-10 pointer-events-none" />

        <div className="relative w-full overflow-hidden group">
          <div className="flex w-max shrink-0 gap-[20px] px-[10px] animate-marquee_40s hover:[animation-play-state:paused]">
            {[0, 1, 2].map((copyIdx) => (
              <div key={`row1-copy-${copyIdx}`} className="flex gap-[20px] shrink-0">
                {displayRow1.map((t, i) => (
                  <TestimonialCard key={`row1-${copyIdx}-${i}`} data={t} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden group">
          <div className="flex w-max shrink-0 gap-[20px] px-[10px] animate-marquee_52s_reverse hover:[animation-play-state:paused]">
            {[0, 1, 2].map((copyIdx) => (
              <div key={`row2-copy-${copyIdx}`} className="flex gap-[20px] shrink-0">
                {displayRow2.map((t, i) => (
                  <TestimonialCard key={`row2-${copyIdx}-${i}`} data={t} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Inline styles for custom marquees if not in tailwind.config */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.333333% - 6.666px)); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(calc(-33.333333% - 6.666px)); }
            100% { transform: translateX(0); }
          }
          .animate-marquee_40s {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee_52s_reverse {
            animation: marquee-reverse 52s linear infinite;
          }
        `
      }} />
    </section>
  );
}

function TestimonialCard({ data }: { data: Testimonial }) {
  const initial = data.student_name.charAt(0);
  const companyString = data.company ? `, ${data.company}` : "";

  return (
    <div className="group relative w-[340px] shrink-0 bg-[var(--bg-dark-glass)] backdrop-blur-sm border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] cursor-default">
      
      {/* Quote Mark */}
      <div className="absolute top-2 left-6 text-[100px] font-serif font-black text-[var(--green-500)]/20 leading-none pointer-events-none select-none transition-transform duration-500 group-hover:-translate-y-1">
        "
      </div>
      
      {/* Review Text */}
      <p className="relative z-10 font-sans text-[14px] text-[var(--text-inverse)]/80 leading-relaxed italic mb-5">
        "{data.review_text}"
      </p>
      
      {/* Rating */}
      <div className="flex text-[var(--accent-gold)] text-base mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < data.rating ? "currentColor" : "none"} strokeWidth={1} />
        ))}
      </div>
      
      {/* Divider */}
      <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)] mb-4" />
      
      {/* Student Info */}
      <div className="flex items-center gap-3 relative z-10 w-full">
        {/* Avatar */}
        <div className="w-[42px] h-[42px] shrink-0 rounded-full bg-[var(--green-600)] flex items-center justify-center font-sans font-semibold text-[16px] text-white">
          {initial}
        </div>
        
        <div className="flex flex-col overflow-hidden max-w-[150px]">
          <span className="font-sans font-semibold text-[14px] text-[var(--text-inverse)] mb-0.5 truncate">{data.student_name}</span>
          <span className="font-mono text-[11px] text-[var(--text-muted)] truncate">{data.role}{companyString}</span>
        </div>
        
        {/* Course Badge */}
        <span className="ml-auto bg-[var(--green-500)]/20 text-[var(--green-300)] font-mono text-[10px] px-3 py-1 rounded-full whitespace-nowrap">
          {data.course_name}
        </span>
      </div>
      
    </div>
  );
}
