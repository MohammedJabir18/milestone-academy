"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

// Schema for form validation
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[+\-0-9\s]{10,16}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  course: z.string().min(1, "Please select an option"),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function CtaSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

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
    
    try {
      // 1. Insert into Supabase enrollments table
      const { error: submitError } = await supabase
        .from("enrollments")
        .insert([{
          name: data.fullName,
          phone: data.phone,
          email: data.email,
          course_name: data.course, // using course_name string for this dropdown
          message: data.message || "",
          status: "new"
        }]);

      if (submitError) throw submitError;

      // 2. Send email notification via /api/contact route
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (emailError) {
        // Silently ignore email failures so it doesn't break user experience,
        // since it's already saved to the database.
        console.error("Email notification failed:", emailError);
      }

      // 3. Show react-hot-toast success toast
      toast.success("Details submitted successfully!");
      
      // 4. Update UI to success state
      setIsSuccess(true);
      
      // 5. Reset form
      reset();
      
      // Auto-hide success after 5 seconds to allow other submissions
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-[120px] bg-[var(--bg-dark)] relative overflow-hidden">
      
      {/* Decorative elements */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-[var(--green-500)]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[var(--green-500)]/6 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-[860px] mx-auto px-6 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center">
          <span className="font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-[0.15em] font-bold mb-4 block">
            Start Your Journey
          </span>
          <h2 className="font-serif text-[68px] text-[var(--text-inverse)] leading-[1.05] mb-4">
            Ready to Become a<br/>
            Certified Finance Expert?
          </h2>
          <p className="font-sans text-[18px] text-[var(--text-inverse)]/70 max-w-xl mx-auto">
            Fill out the form below and our career counsellors will get back to you with the perfect roadmap for your goals.
          </p>
        </div>

        {/* Glassmorphic Intake Form */}
        <div className="w-full mt-12 bg-[var(--bg-dark-glass)] backdrop-blur-md border border-white/10 rounded-[24px] p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Name */}
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <input 
                {...register("fullName")}
                type="text" 
                placeholder="Full Name"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-white/12 rounded-xl px-5 py-3.5 text-[var(--text-inverse)] font-sans text-[14px] placeholder:text-[var(--text-inverse)]/40 focus:outline-none focus:border-[var(--green-500)] focus:ring-2 focus:ring-[var(--green-500)]/20 transition-all duration-250 disabled:opacity-50"
                disabled={isSubmitting || isSuccess}
              />
              {errors.fullName && <span className="font-sans text-xs text-red-400 px-1">{errors.fullName.message}</span>}
            </div>
            
            {/* Phone */}
            <div className="flex flex-col gap-1.5 md:col-span-1">
              <input 
                {...register("phone")}
                type="tel" 
                placeholder="Phone Number"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-white/12 rounded-xl px-5 py-3.5 text-[var(--text-inverse)] font-sans text-[14px] placeholder:text-[var(--text-inverse)]/40 focus:outline-none focus:border-[var(--green-500)] focus:ring-2 focus:ring-[var(--green-500)]/20 transition-all duration-250 disabled:opacity-50"
                disabled={isSubmitting || isSuccess}
              />
              {errors.phone && <span className="font-sans text-xs text-red-400 px-1">{errors.phone.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
              <input 
                {...register("email")}
                type="email" 
                placeholder="Email Address"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-white/12 rounded-xl px-5 py-3.5 text-[var(--text-inverse)] font-sans text-[14px] placeholder:text-[var(--text-inverse)]/40 focus:outline-none focus:border-[var(--green-500)] focus:ring-2 focus:ring-[var(--green-500)]/20 transition-all duration-250 disabled:opacity-50"
                disabled={isSubmitting || isSuccess}
              />
              {errors.email && <span className="font-sans text-xs text-red-400 px-1">{errors.email.message}</span>}
            </div>

            {/* Course Dropdown */}
            <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2 relative">
              <select 
                {...register("course")}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-white/12 rounded-xl px-5 py-3.5 text-[var(--text-inverse)] font-sans text-[14px] focus:outline-none focus:border-[var(--green-500)] focus:ring-2 focus:ring-[var(--green-500)]/20 transition-all duration-250 appearance-none disabled:opacity-50 cursor-pointer [&>option]:text-black"
                disabled={isSubmitting || isSuccess}
                defaultValue=""
              >
                <option value="" disabled className="text-gray-500">Program of Interest</option>
                <option value="Basic Package">Basic Package</option>
                <option value="Short-Term Tax & Software Package">Short-Term Tax & Software Package</option>
                <option value="Intermediate Package">Intermediate Package</option>
                <option value="Comprehensive Package">Comprehensive Package</option>
                <option value="Trading Course">Trading Course</option>
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
              {/* Custom select arrow overlay */}
              <div className="absolute right-5 top-[18px] pointer-events-none opacity-50 text-[var(--text-inverse)]">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1.5L6 6.5L11 1.5"/></svg>
              </div>
              {errors.course && <span className="font-sans text-xs text-red-400 px-1">{errors.course.message}</span>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
              <textarea 
                {...register("message")}
                rows={3}
                placeholder="Any specific questions? (Optional)"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-white/12 rounded-xl px-5 py-3.5 text-[var(--text-inverse)] font-sans text-[14px] placeholder:text-[var(--text-inverse)]/40 focus:outline-none focus:border-[var(--green-500)] focus:ring-2 focus:ring-[var(--green-500)]/20 transition-all duration-250 resize-none disabled:opacity-50"
                disabled={isSubmitting || isSuccess}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 mt-1">
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className={`w-full h-[54px] rounded-xl flex items-center justify-center font-sans font-semibold text-[16px] transition-all duration-300 relative overflow-hidden group ${
                  isSuccess 
                    ? "bg-[var(--green-500)] text-white scale-[1.02] animate-in" 
                    : "bg-[var(--gradient-green)] text-white hover:shadow-[var(--shadow-green)] disabled:opacity-60 disabled:cursor-not-allowed"
                }`}
              >
                {isSubmitting && (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </span>
                )}
                
                {isSuccess && !isSubmitting && (
                  <span className="flex items-center gap-2 font-bold transform">
                    ✓ We'll Call You Within 2 Hours!
                  </span>
                )}
                
                {!isSubmitting && !isSuccess && (
                  <span className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    Book Free Counselling Session →
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Below Form Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-[var(--text-inverse)]/60 font-sans text-[13px]">
          <a href="tel:+919876543210" className="hover:text-[var(--text-inverse)] transition-colors">📞 +91 98765 43210</a>
          <a href="mailto:admissions@milestone.academy" className="hover:text-[var(--text-inverse)] transition-colors">📧 admissions@milestone.academy</a>
          <span>📍 Calicut | Malappuram | Thrissur | Online</span>
        </div>

      </div>
    </section>
  );
}
