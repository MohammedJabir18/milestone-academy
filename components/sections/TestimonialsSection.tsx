"use client";

import { Star } from "lucide-react";

// Real 12 Testimonials Dataset
const row1Data = [
  {
    name: "Aisha Rahman",
    text: "I went from not knowing what a ledger was to filing GST returns for 8 clients in just 3 months. Milestone's Tally course is the most practical training I've ever attended.",
    role: "GST Consultant, Kozhikode",
    course: "Tally Prime",
    initial: "A"
  },
  {
    name: "Arjun Menon",
    text: "The SAP FICO program placed me in Infosys BPM within a month of completion. The faculty's industry experience is unparalleled — they taught us exactly what multinationals expect.",
    role: "SAP FICO Analyst, Infosys",
    course: "SAP FICO",
    initial: "A"
  },
  {
    name: "Fathima Zubair",
    text: "As a housewife returning to work, I was terrified. Milestone's income tax course rebuilt my confidence. I now run my own ITR filing practice from home.",
    role: "Freelance Tax Consultant",
    course: "Income Tax",
    initial: "F"
  },
  {
    name: "Mohammed Riyas",
    text: "The Cost Accounting program changed how I think about business. My company's CFO noticed the difference immediately and fast-tracked my promotion.",
    role: "Management Accountant, Kerala Pvt Ltd",
    course: "Cost Accounting",
    initial: "M"
  },
  {
    name: "Sneha Pillai",
    text: "Every class felt like sitting with a CA at their office, not inside a classroom. The real-world scenarios made everything click.",
    role: "Finance Executive, HDFC",
    course: "Financial Accounting",
    initial: "S"
  },
  {
    name: "Vishnu K",
    text: "I cleared CA Foundation in my first attempt using Milestone's accelerator program. The structured approach and mentor support was everything.",
    role: "CA Student",
    course: "CA Foundation",
    initial: "V"
  }
];

const row2Data = [
  {
    name: "Divya Thomas",
    text: "Payroll compliance used to terrify me. Now I handle 200+ employee payroll for a manufacturing company. The course paid for itself in Week 1.",
    role: "HR & Payroll Manager",
    course: "Payroll",
    initial: "D"
  },
  {
    name: "Nabil Haris",
    text: "Tally Prime + GST together in one program? That's what the market actually needs. Got hired before I even finished the course!",
    role: "Accounts Executive, Startup",
    course: "Tally + GST",
    initial: "N"
  },
  {
    name: "Ananya Krishnan",
    text: "The lifetime doubt support is REAL. I WhatsApped at 11pm about an ITC mismatch and got a detailed reply by 7am. That's beyond any institute I've seen.",
    role: "CA Firm Associate",
    course: "GST",
    initial: "A"
  },
  {
    name: "Santhosh Kumar",
    text: "From a factory floor to a finance desk — Milestone made that jump possible for me. The banking operations course was my turning point.",
    role: "Banking Operations, Federal Bank",
    course: "Banking",
    initial: "S"
  },
  {
    name: "Lakshmi Nair",
    text: "I've done three courses here and each one opened a new door. The certificates are genuinely recognized — HR executives mention Milestone by name.",
    role: "Senior Accountant, MNC",
    course: "Multiple Courses",
    initial: "L"
  },
  {
    name: "Asif Ali",
    text: "The placement team is insanely committed. They helped me polish my LinkedIn, prep for 4 interview rounds, and connected me directly to the hiring manager.",
    role: "Finance Analyst, IT Firm",
    course: "Placement",
    initial: "A"
  }
];

// Helper to determine arbitrary avatar colors
const getAvatarBg = (initial: string) => {
  const colors = [
    "bg-emerald-500/20 text-emerald-300",
    "bg-sky-500/20 text-sky-300",
    "bg-indigo-500/20 text-indigo-300",
    "bg-amber-500/20 text-amber-300",
    "bg-rose-500/20 text-rose-300"
  ];
  return colors[initial.charCodeAt(0) % colors.length];
};

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-24 md:py-32 bg-[var(--bg-dark)] overflow-hidden relative">
      <div className="max-w-[var(--container-max)] mx-auto px-6 mb-16 relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-[var(--accent-mint)]/80" />
          <span className="font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-widest font-semibold flex-1">
            Student Stories
          </span>
          <div className="w-8 h-[1px] bg-[var(--accent-mint)]/80" />
        </div>
        
        <h2 className="gsap-heading font-serif text-[48px] md:text-[64px] text-white leading-[1.05] -tracking-[0.02em]">
          Real People.<br />
          <span className="italic text-[var(--green-500)]">Real Results.</span>
        </h2>
      </div>

      {/* Marquee Wrapper Row 1 (Forwards) */}
      <div className="relative w-full flex overflow-hidden group mb-8">
        
        {/* Edge Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-[1] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-[1] pointer-events-none" />
        
        {/* Animate-Marquee */}
        <div className="flex w-max shrink-0 animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
           
           {/* Rendering two identical chunks side by side for exactly -50% loop offset */}
           {[0, 1].map((copyIdx) => (
             <div key={`row1-copy-${copyIdx}`} className="flex gap-6 items-center shrink-0">
               {row1Data.map((t, i) => (
                 <TestimonialCard key={`row1-${copyIdx}-${i}`} data={t} />
               ))}
             </div>
           ))}
           
        </div>
      </div>

      {/* Marquee Wrapper Row 2 (Reverse) */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* Edge Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-[1] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-[1] pointer-events-none" />
        
        {/* Animate-Reverse-Marquee */}
        <div className="flex w-max shrink-0 animate-marquee-reverse hover:[animation-play-state:paused] gap-6 px-3">
           
           {[0, 1].map((copyIdx) => (
             <div key={`row2-copy-${copyIdx}`} className="flex gap-6 items-center shrink-0">
               {row2Data.map((t, i) => (
                 <TestimonialCard key={`row2-${copyIdx}-${i}`} data={t} />
               ))}
             </div>
           ))}
           
        </div>
      </div>
      
    </section>
  );
}

// Subcomponent rendering the individual dark cards
function TestimonialCard({ data }: { data: any }) {
  return (
    <div className="group relative w-[320px] md:w-[360px] flex flex-col justify-between shrink-0 bg-white/[0.04] border border-white/[0.08] backdrop-blur-[12px] p-6 md:p-8 rounded-[20px] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.15] cursor-default overflow-hidden">
      
      {/* Decorative Quote Mark */}
      <div className="absolute -top-6 -left-2 text-[120px] font-serif font-black text-[var(--green-500)] opacity-10 leading-none select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
        "
      </div>
      
      <div className="relative z-10">
        <p className="font-sans text-[15px] text-white/80 leading-[1.6] italic mb-6">
          "{data.text}"
        </p>
        
        <div className="flex text-[var(--accent-gold)] mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} fill="currentColor" strokeWidth={1} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="w-full h-[1px] bg-white/[0.08] mb-5" />
        
        <div className="flex items-center gap-3 relative z-10 w-full">
          {/* Avatar Initial Component */}
          <div className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center font-sans font-bold text-[18px] border border-white/10 ${getAvatarBg(data.initial)}`}>
            {data.initial}
          </div>
          
          <div className="flex flex-col overflow-hidden leading-tight flex-1">
            <span className="font-sans font-semibold text-[15px] text-white mb-1 truncate">{data.name}</span>
            <span className="font-mono text-[11px] text-white/50 truncate mb-1.5">{data.role}</span>
          </div>
          
          <span className="font-mono text-[10px] bg-[var(--green-500)]/20 text-[var(--green-400)] border border-[var(--green-500)]/30 px-2.5 py-1 rounded whitespace-nowrap hidden sm:block">
            {data.course}
          </span>
        </div>
      </div>
      
    </div>
  );
}
