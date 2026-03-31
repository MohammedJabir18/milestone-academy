"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { courses } from "@/lib/courses";

// Strict validation matrix using Zod
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[+\-0-9\s]{10,16}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  course: z.string().min(1, "Please select a program of interest"),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function CtaSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate robust network call latency
    await new Promise(resolve => setTimeout(resolve, 1800));
    console.log("Form successfully captured:", data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset state after success read mode
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 5000);
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32 bg-[var(--bg-dark)] relative overflow-hidden z-10">
      
      {/* Immersive mesh & orb background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Animated Orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.12)_0%,transparent_70%)] blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-[10%] -right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)] blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
        
        {/* Deep texture overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-6 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-[var(--accent-mint)]" />
            <span className="font-mono text-[12px] text-[var(--accent-mint)] uppercase tracking-widest font-semibold flex-1">
              Start Your Journey
            </span>
            <div className="w-6 h-[1px] bg-[var(--accent-mint)]" />
          </div>
          
          <h2 className="gsap-heading font-serif text-[48px] md:text-[72px] text-white leading-[1.05] mb-6 tracking-tight">
            Ready to Become a <br/>
            <span className="italic text-[var(--green-500)] tracking-normal pr-2">Certified</span> Finance Expert?
          </h2>
          
          <p className="font-sans text-[17px] md:text-[18px] text-white/70 leading-relaxed max-w-[560px]">
            Join 4,800+ students who chose Milestone Academy — and never looked back. Cohorts are filling fast.
          </p>
        </div>

        {/* Glassmorphic Intake Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/[0.04] backdrop-blur-[16px] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[24px] p-6 sm:p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <input 
                {...register("fullName")}
                type="text" 
                placeholder="Your Full Name"
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[12px] px-5 py-[14px] text-white font-sans text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[var(--green-500)] focus:ring-[3px] focus:ring-[var(--green-500)]/20 transition-all duration-300"
                disabled={isSubmitting || isSuccess}
              />
              {errors.fullName && <span className="font-sans text-xs text-red-400 pl-2">{errors.fullName.message}</span>}
            </div>
            
            <div className="flex flex-col gap-2">
              <input 
                {...register("phone")}
                type="tel" 
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[12px] px-5 py-[14px] text-white font-sans text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[var(--green-500)] focus:ring-[3px] focus:ring-[var(--green-500)]/20 transition-all duration-300"
                disabled={isSubmitting || isSuccess}
              />
              {errors.phone && <span className="font-sans text-xs text-red-400 pl-2">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input 
              {...register("email")}
              type="email" 
              placeholder="Primary Email Address"
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[12px] px-5 py-[14px] text-white font-sans text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[var(--green-500)] focus:ring-[3px] focus:ring-[var(--green-500)]/20 transition-all duration-300"
              disabled={isSubmitting || isSuccess}
            />
            {errors.email && <span className="font-sans text-xs text-red-400 pl-2">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2 relative">
            <select 
              {...register("course")}
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[12px] px-5 py-[14px] text-white font-sans text-[15px] focus:outline-none focus:border-[var(--green-500)] focus:ring-[3px] focus:ring-[var(--green-500)]/20 transition-all duration-300 appearance-none cursor-pointer [&>option]:text-black"
              disabled={isSubmitting || isSuccess}
              defaultValue=""
            >
              <option value="" disabled className="text-gray-500">Select a Program of Interest</option>
              {courses.map(c => (
                <option key={c.id} value={c.slug}>{c.title}</option>
              ))}
            </select>
            {/* Custom chevron to fix default dark-mode appearance-none dropdowns */}
            <div className="absolute right-5 top-[18px] pointer-events-none opacity-40">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5L6 6.5L11 1.5"/></svg>
            </div>
            {errors.course && <span className="font-sans text-xs text-red-400 pl-2">{errors.course.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <textarea 
              {...register("message")}
              rows={3}
              placeholder="Any specific questions? (Optional)"
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-[12px] px-5 py-[14px] text-white font-sans text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[var(--green-500)] focus:ring-[3px] focus:ring-[var(--green-500)]/20 transition-all duration-300 resize-none"
              disabled={isSubmitting || isSuccess}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || isSuccess}
            className={`magnetic clickable w-full h-[56px] rounded-[12px] flex items-center justify-center font-sans font-bold text-[16px] transition-all duration-400 mt-2 relative overflow-hidden ${
              isSuccess 
                ? "bg-[var(--green-500)] text-white" 
                : "bg-[var(--gradient-green)] text-white hover:-translate-y-1 hover:shadow-[var(--shadow-green)] group"
            }`}
          >
            {/* Dark background loading layer */}
            {isSubmitting && (
              <span className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" />
              </span>
            )}
            
            {/* Success rendering */}
            {isSuccess && !isSubmitting && (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={20} className="animate-bounce" />
                Session Booked! We'll call shortly.
              </span>
            )}
            
            {/* Default Rendering */}
            {!isSubmitting && !isSuccess && (
               <span className="relative z-10 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform duration-300">
                 Book Free Counselling Session
               </span>
            )}
            
            {/* Subtle gloss overlay */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </form>

        {/* Alternate Contact Links */}
        <div className="mt-14 w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 opacity-80">
          <a href="tel:+919876543210" className="flex items-center gap-2.5 text-white font-sans text-[15px] transition-colors hover:text-[var(--green-400)]">
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--green-500)]"><Phone size={16} /></div>
             +91 98765 43210
          </a>
          <a href="mailto:admissions@milestone.academy" className="flex items-center gap-2.5 text-white font-sans text-[15px] transition-colors hover:text-[var(--green-400)]">
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--green-500)]"><Mail size={16} /></div>
             admissions@milestone.academy
          </a>
          <div className="flex items-center gap-2.5 text-white font-sans text-[15px]">
             <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--green-500)]"><MapPin size={16} /></div>
             Calicut • Malappuram • Online
          </div>
        </div>

      </div>
    </section>
  );
}
