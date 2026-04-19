import Image from "next/image";
import { MoveRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Milestone Academy — Kerala's Premier Finance Academy",
  description:
    "Learn how Milestone Academy grew from a trading academy to Kerala's most comprehensive accounting & finance diploma provider. 4,800+ students. 96% placement.",
  alternates: {
    canonical: "https://milestonefinacademy.info/about",
  },
};

export default function AboutPage() {
  return (
    <main className="w-full flex flex-col items-center bg-[var(--bg-primary)] pt-32 pb-24 min-h-screen">
      
      {/* Hero Thread Section */}
      <div className="w-full max-w-[800px] mx-auto px-6 mb-24 mt-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[var(--green-600)]" />
          <span className="font-mono text-[13px] text-[var(--green-600)] uppercase tracking-widest font-bold">
            The Milestone Story
          </span>
        </div>
        
        <h1 className="font-serif text-[48px] md:text-[64px] text-[var(--text-primary)] leading-[1.1] tracking-tight mb-8">
          Not another coaching center. A <span className="italic text-[var(--green-600)]">career transformation</span> engine.
        </h1>
        
        <div className="flex flex-col gap-6 font-sans text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.8]">
          <p>
            Milestone began as a vision — to democratize financial education in India. Starting as Milestone Trading Academy, we've trained over 10,000 traders across the country. Our students demanded more. They wanted accounting. They wanted compliance. They wanted careers in corporate finance.
          </p>
          <p>
            So we built Milestone Fin Academy.
          </p>
          <p>
            Our faculty are practicing Chartered Accountants, SAP-certified consultants, and seasoned tax practitioners — professionals who work in the field every day and teach what the industry actually demands, not what textbooks say.
          </p>
        </div>
      </div>

      {/* Differentiators Module */}
      <div className="w-full bg-[var(--bg-dark)] py-24 md:py-32 my-12 text-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <span className="font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-widest font-semibold mb-6 block">What Makes Us Different</span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.1]">The Architecture of Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-20">
            {/* Iteration 01 */}
            <div className="flex flex-col gap-4 group">
              <span className="font-mono text-[var(--green-500)] text-[14px]">01 — Industry-First Curriculum</span>
              <h3 className="font-sans font-bold text-[24px]">Reverse-Engineered Logic</h3>
              <p className="font-sans text-[16px] text-white/70 leading-relaxed">
                Every course is built from job descriptions, not syllabi. We analyze what companies actually hire for, then reverse-engineer the curriculum.
              </p>
            </div>
            {/* Iteration 02 */}
            <div className="flex flex-col gap-4 group">
              <span className="font-mono text-[var(--green-500)] text-[14px]">02 — Live Software Environments</span>
              <h3 className="font-sans font-bold text-[24px]">No Sandbox Simulations</h3>
              <p className="font-sans text-[16px] text-white/70 leading-relaxed">
                No screenshots. No simulations. You practice on real Tally Prime instances, live GST government portals, and actual SAP training environments.
              </p>
            </div>
            {/* Iteration 03 */}
            <div className="flex flex-col gap-4 group">
              <span className="font-mono text-[var(--green-500)] text-[14px]">03 — Kerala's Most Recognized</span>
              <h3 className="font-sans font-bold text-[24px]">Brand Authority</h3>
              <p className="font-sans text-[16px] text-white/70 leading-relaxed">
                Walk into any accounting firm, CA office, or MNC in Kerala and mention Milestone Fin Academy — they know our rigorous standards.
              </p>
            </div>
            {/* Iteration 04 */}
            <div className="flex flex-col gap-4 group">
              <span className="font-mono text-[var(--green-500)] text-[14px]">04 — Community Support</span>
              <h3 className="font-sans font-bold text-[24px]">A Network, Not Just classes</h3>
              <p className="font-sans text-[16px] text-white/70 leading-relaxed">
                Join our exclusive WhatsApp group of 4,800+ Milestone alumni — share massive opportunities, get daily technical advice, and grow together globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Module */}
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
           <div className="flex flex-col items-center text-center gap-2">
              <span className="font-mono font-bold text-[40px] md:text-[56px] text-[var(--green-600)] tracking-tighter">10,000<span className="text-[var(--green-400)]">+</span></span>
              <span className="font-sans font-semibold text-[14px] text-[var(--text-secondary)] uppercase tracking-wide">Total Students</span>
           </div>
           <div className="flex flex-col items-center text-center gap-2">
              <span className="font-mono font-bold text-[40px] md:text-[56px] text-[var(--green-600)] tracking-tighter">4,800<span className="text-[var(--green-400)]">+</span></span>
              <span className="font-sans font-semibold text-[14px] text-[var(--text-secondary)] uppercase tracking-wide">Accounting Students</span>
           </div>
           <div className="flex flex-col items-center text-center gap-2">
              <span className="font-mono font-bold text-[40px] md:text-[56px] text-[var(--green-600)] tracking-tighter">96<span className="text-[var(--green-400)]">%</span></span>
              <span className="font-sans font-semibold text-[14px] text-[var(--text-secondary)] uppercase tracking-wide">Placement Rate</span>
           </div>
           <div className="flex flex-col items-center text-center gap-2">
              <span className="font-mono font-bold text-[40px] md:text-[56px] text-[var(--green-600)] tracking-tighter">₹45k<span className="text-[var(--green-400)]">+</span></span>
              <span className="font-sans font-semibold text-[14px] text-[var(--text-secondary)] uppercase tracking-wide">Avg. Salary Hike</span>
           </div>
        </div>
      </div>
      
    </main>
  );
}
