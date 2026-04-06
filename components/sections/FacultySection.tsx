"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";
import { FacultyMember, fallbackFaculty } from "@/lib/faculty";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FacultySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("public_faculty")
          .select("*")
          // Adjust order as needed, ensuring consistent presentation
          .order("id");
        
        if (error || !data || data.length === 0) {
          setFaculty(fallbackFaculty);
        } else {
          setFaculty(data as FacultyMember[]);
        }
      } catch (e) {
        setFaculty(fallbackFaculty);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (loading || faculty.length === 0) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean), // Ensure no nulls are passed to GSAP
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, faculty]);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-mono text-sm font-bold tracking-widest text-[var(--primary-color)] uppercase mb-4">
            MEET YOUR MENTORS
          </p>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1] mb-6">
            Learn from Those<br />Who Do It Daily.
          </h2>
          <p className="text-lg text-stone-600 font-medium font-syne">
            Practicing accountants and tax professionals — not just teachers.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto opacity-50">
            {/* Loading Skeletons */}
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[500px] bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
            {faculty.map((member, index) => (
              <div 
                key={member.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group bg-white rounded-3xl overflow-hidden border border-[var(--border-light)] transform-gpu hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] hover:border-[var(--green-300)] flex flex-col"
                style={{ 
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              >
                {/* Custom active CSS for nested targeting since basic Tailwind forms might not inherit group nicely for generic vars */}
                <style jsx>{`
                  .group:hover .name-element {
                    color: var(--green-600);
                  }
                  .name-element {
                    transition: color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                  }
                `}</style>
                
                {/* PHOTO AREA */}
                <div className="h-[280px] relative overflow-hidden flex-shrink-0">
                  {member.photo_url ? (
                    <div className="photo-element w-full h-full relative group-hover:scale-105 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                      <Image 
                        src={member.photo_url} 
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div 
                      className="photo-element w-full h-full relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{ background: "linear-gradient(160deg, var(--green-900), var(--green-700))" }}
                    >
                      {/* Background text */}
                      <span className="absolute text-white/[0.08] select-none" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "200px", lineHeight: 1 }}>
                        {member.name[0]?.toUpperCase()}
                      </span>
                      {/* Foreground initial circle */}
                      <div className="relative w-[80px] h-[80px] rounded-full flex items-center justify-center bg-[var(--green-500)]/30 backdrop-blur-sm">
                        <span className="font-syne font-bold text-[40px] text-white leading-none">
                          {member.name[0]?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bottom overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(10,26,11,0.85), transparent 60%)" }}
                  />

                  {/* Absolute bottom left */}
                  <div className="absolute bottom-0 left-0 p-5">
                    <div className="bg-[var(--green-500)]/25 backdrop-blur-md rounded-full px-3 py-1 border border-[var(--green-500)]/20 inline-block">
                      <span className="font-mono text-[10px] text-[var(--accent-mint)] uppercase tracking-wider">
                        {member.specialization}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-7 flex flex-col flex-grow bg-white relative z-10">
                  <h3 className="name-element font-syne font-semibold text-[22px] text-stone-900">
                    {member.name}
                  </h3>
                  <p className="font-syne text-[13px] text-[var(--green-600)] mt-1 font-medium">
                    {member.role}
                  </p>

                  <div className="h-[1px] border-b border-[var(--border-light)] w-full my-4" />

                  <p className="font-syne text-[13px] text-stone-600 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.courses?.map((courseCode, idx) => (
                      <span 
                        key={idx}
                        className="bg-[var(--green-50)] border border-[var(--green-200)] text-[var(--green-700)] font-mono text-[10px] font-bold rounded-full px-3 py-1"
                      >
                        {courseCode}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-auto flex-grow flex items-end">
                    <Link href="/contact" className="w-full">
                      <button className="w-full border-[1.5px] border-[var(--green-500)] text-[var(--green-600)] font-syne text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-[var(--green-500)] hover:text-white hover:border-transparent flex justify-center items-center group/btn">
                        Connect with {member.name.split(' ')[0]} 
                        <span className="ml-2 transform transition-transform group-hover/btn:translate-x-1 inline-block">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
