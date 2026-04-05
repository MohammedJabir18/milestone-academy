"use client";

import { useEffect, useRef } from "react";
import { TransitionLink as Link } from "@/components/global/PageTransition";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Optional: Only log here or remove animation to ensure footer is always safely visible.
    // We removed the opacity: 0 GSAP wrapper here to prevent the 'invisible footer block'
    // effect when scrolltriggers calculate wrong heights on soft navigation.
  }, []);

  return (
    <footer ref={footerRef} className="bg-[var(--bg-dark)] text-[var(--text-inverse)] pt-20 pb-6 overflow-hidden relative z-10 w-full mt-auto">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div ref={(el) => { colRefs.current[0] = el; }} className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-6 clickable magnetic self-start">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="text-white shrink-0">
                <path 
                  d="M 20 80 L 20 20 L 50 60 L 80 20 L 80 80" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <span className="font-sans font-semibold text-xl tracking-tight text-white">
                Milestone Academy
              </span>
            </Link>
            
            <p className="font-sans text-[15px] text-[var(--text-inverse)] opacity-70 mb-8 max-w-[280px] leading-relaxed">
              India's Most Practical Accounting Academy
            </p>
            
            <div className="flex items-center gap-3">
              {[
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ), href: "#" },
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                ), href: "#" },
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                ), href: "#" },
                { icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                ), href: "#" } 
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  className="w-[38px] h-[38px] rounded-full bg-white/5 flex items-center justify-center text-white transition-colors duration-300 hover:bg-[var(--green-500)] clickable magnetic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="mt-8 font-mono text-xs opacity-50 uppercase tracking-widest hidden lg:block">
              © 2025 Milestone Academy. All rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div ref={(el) => { colRefs.current[1] = el; }} className="flex flex-col">
            <h4 className="font-sans font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "Courses", path: "/courses" },
                { name: "About Us", path: "/about" },
                { name: "Placements", path: "/#placements" },
                { name: "Blog", path: "/#blog" },
                { name: "Contact", path: "/contact" },
                { name: "Admin Login", path: "/admin" },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="font-sans text-[14px] text-[var(--text-inverse)]/60 transition-all duration-300 hover:text-[var(--green-400)] hover:translate-x-1 inline-flex w-fit clickable"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Programs */}
          <div ref={(el) => { colRefs.current[2] = el; }} className="flex flex-col">
            <h4 className="font-sans font-semibold text-lg mb-6 text-white">Programs</h4>
            <div className="flex flex-col gap-4">
              {[
                "Tally Prime",
                "GST Filing",
                "Income Tax",
                "SAP FICO",
                "CA Foundation",
                "All Courses"
              ].map((program) => (
                <Link 
                  key={program} 
                  href={program === "All Courses" ? "/courses" : `/courses/${program.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-sans text-[14px] text-[var(--text-inverse)]/60 transition-all duration-300 hover:text-[var(--green-400)] hover:translate-x-1 inline-flex w-fit clickable"
                >
                  {program}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div ref={(el) => { colRefs.current[3] = el; }} className="flex flex-col">
            <h4 className="font-sans font-semibold text-lg mb-6 text-white">Contact Us</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[var(--green-500)] shrink-0 mt-0.5" />
                <span className="font-sans text-[14px] text-[var(--text-inverse)]/70 leading-relaxed">
                  1st Floor, Calicut Business Centre, Kozhikode — 673001
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[var(--green-500)] shrink-0" />
                <a href="tel:+919876543210" className="font-mono text-[14px] text-[var(--text-inverse)]/70 transition-colors hover:text-[var(--green-400)] clickable inline-flex w-fit">
                  +91 98765 43210
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[var(--green-500)] shrink-0" />
                <a href="mailto:admissions@milestone.academy" className="font-mono text-[14px] text-[var(--text-inverse)]/70 transition-colors hover:text-[var(--green-400)] clickable inline-flex w-fit">
                  admissions@milestone.academy
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-[var(--green-500)] shrink-0" />
                <span className="font-sans text-[14px] text-[var(--text-inverse)]/70">
                  Mon–Sat: 9 AM – 7 PM
                </span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div ref={(el) => { colRefs.current[4] = el; }} className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[14px] text-[var(--text-inverse)]/60">
            Made with <span className="text-[var(--green-500)] px-1">💚</span> in Kerala, India
          </p>
          
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Sitemap"].map((link, i) => (
              <a 
                key={i} 
                href="#" 
                className="font-sans text-[13px] text-[var(--text-inverse)]/50 transition-colors hover:text-[var(--green-400)] clickable"
              >
                {link}
              </a>
            ))}
          </div>
          
          <div className="font-mono text-xs opacity-50 uppercase tracking-widest md:hidden">
            © 2025 Milestone Academy
          </div>
        </div>
        
      </div>
    </footer>
  );
}
