"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import { ChevronDown, Video, Target, FileText, CheckCircle2, Download, BadgeCheck, Clock, Users, PlayCircle, BookOpen } from "lucide-react";

// Mock Data for Tabs & Courses
const curriculumTabs = [
  "Tally Prime Mastery", 
  "GST & Tax Expert", 
  "SAP FICO Pro", 
  "Corporate Accounting", 
  "CA Accelerator"
];

// Sample modules reflecting 8 deep segments
const modules = [
  { title: "Module 1: Principles & Software Navigation", details: "Core concepts of financial mechanics, setting up company profiles, mapping the chart of accounts, and recording standard foundational voucher entries from raw data." },
  { title: "Module 2: Inventory & Advanced Processing", details: "Handling physical stock movements, complex price levels, multi-currency order processing, and tracking negative inventory adjustments accurately." },
  { title: "Module 3: Bank Reconciliation & MIS Reports", details: "Step-by-step BRS workflow against actual statements, generating deep MIS reports, exporting trial balances, and management dashboard configuration." },
  { title: "Module 4: GST Configuration & Transactions", details: "Setting up robust GST rate matrixes, managing state codes, recording intra/inter state sales, and mapping reverse charge mechanisms flawlessly." },
  { title: "Module 5: TDS & Inter-tax Deductions", details: "Automating TDS deductions against thresholds, handling challan reconciliations, and mapping TCS ledgers without breaching compliance." },
  { title: "Module 6: Payroll Management Systems", details: "Employee hierarchical setup, attendance mapping, generating dynamic payslips, and executing core ESI/PF statutory calculations." },
  { title: "Module 7: Final Accounts & Audit Verification", details: "Closing financial years properly, handling mandated audit trails, security controls, and finalizing clean P&L balances." },
  { title: "Module 8: Live Client Project Simulation", details: "You are given a raw unstructured data dump of a 50-employee manufacturing firm. Reconcile an entire month of operations start-to-finish." },
];

export default function CurriculumSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  // Tab Sliding Logic
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Entrance animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    gsap.fromTo(".curriculum-header", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  // Sync Sliding Indicator exactly with tab bounds
  useEffect(() => {
    const activeTabEl = tabRefs.current[activeTabIndex];
    const containerEl = tabsContainerRef.current;
    
    if (activeTabEl && indicatorRef.current && containerEl) {
       // Offset relative to the container for accurate tracking
       const offsetLeft = activeTabEl.offsetLeft;
       const width = activeTabEl.offsetWidth;
       
       gsap.to(indicatorRef.current, {
           x: offsetLeft,
           width: width,
           duration: 0.4,
           ease: "power3.out"
       });
    }
  }, [activeTabIndex]);

  // Content Cross-fade
  useEffect(() => {
    if (!listRef.current) return;
    
    gsap.killTweensOf(listRef.current);
    gsap.fromTo(listRef.current, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeTabIndex]);

  return (
    <section ref={sectionRef} id="curriculum" className="w-full py-24 md:py-32 bg-[var(--bg-primary)] border-t border-[var(--border-light)] overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        
        {/* Header */}
        <div className="curriculum-header flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
            <span className="font-mono text-[13px] text-[var(--green-600)] uppercase tracking-widest font-bold">
              Deep-Dive Syllabus
            </span>
            <div className="w-8 h-[1px] bg-[var(--green-600)]" />
          </div>
          <h2 className="gsap-heading font-serif text-[42px] md:text-[56px] text-[var(--text-primary)] leading-tight mb-6 -tracking-[0.02em]">
            What you will actually <span className="italic text-[var(--green-600)]">Learn</span>
          </h2>
        </div>

        {/* Sliding Tab Navigation */}
        <div className="w-full max-w-5xl mx-auto mb-12">
          <div 
            ref={tabsContainerRef}
            className="relative flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar border-b border-[var(--border-light)] pb-4"
          >
             {/* Indicator GSAP Target */}
             <div 
               ref={indicatorRef} 
               className="absolute bottom-0 left-0 h-[3px] bg-[var(--green-500)] rounded-t-full transition-shadow shadow-[0_-2px_10px_rgba(34,197,94,0.4)]"
               style={{ width: 0, transform: "translateX(0px)" }}
             />
             
             {curriculumTabs.map((tab, idx) => (
               <button
                 key={tab}
                 ref={(el) => { tabRefs.current[idx] = el; }}
                 onClick={() => setActiveTabIndex(idx)}
                 className={`clickable relative shrink-0 px-6 py-3 font-sans font-semibold text-[15px] transition-colors duration-300 ${
                   activeTabIndex === idx ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {/* Modules Section */}
        <div className="max-w-4xl mx-auto" ref={listRef}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 px-2">
            <h3 className="font-sans font-bold text-2xl text-[var(--text-primary)]">
              {curriculumTabs[activeTabIndex]} Curriculum
            </h3>
            <span className="font-mono text-sm px-4 py-1.5 bg-[var(--green-50)] text-[var(--green-700)] rounded-full border border-[var(--green-500)]/20 font-semibold shadow-sm">
              8 Modules
            </span>
          </div>
          
          <Accordion.Root type="single" collapsible className="w-full flex flex-col gap-3" defaultValue="item-0">
            {modules.map((m, i) => (
              <Accordion.Item 
                key={i} 
                value={`item-${i}`}
                className="group bg-white border border-[var(--border-light)] rounded-[20px] overflow-hidden transition-all duration-300 data-[state=open]:border-[var(--green-500)] data-[state=open]:shadow-[var(--shadow-green)] data-[state=open]:bg-[var(--green-50)]/50 focus-within:ring-2 focus-within:ring-[var(--green-500)]/30"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="clickable flex items-center justify-between w-full px-6 py-5.5 cursor-pointer outline-none">
                     <span className="font-sans font-bold text-[17px] text-[var(--text-primary)] text-left group-data-[state=open]:text-[var(--green-700)] transition-colors">
                       {m.title}
                     </span>
                     <ChevronDown size={20} className="text-[var(--text-secondary)] transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--green-600)] shrink-0 ml-4" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up px-6 pb-6 pt-0">
                  <p className="font-sans text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">
                    {m.details}
                  </p>
                  
                  {/* Inner module tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md border border-[var(--border-medium)] text-[12px] font-sans font-medium text-[var(--text-secondary)]">
                      <Video size={14} className="text-[var(--green-500)]" /> 12 Video Lessons
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md border border-[var(--border-medium)] text-[12px] font-sans font-medium text-[var(--text-secondary)]">
                      <FileText size={14} className="text-[var(--green-300)]" /> 4 Assignments
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
