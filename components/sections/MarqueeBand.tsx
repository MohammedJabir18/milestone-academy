import React from "react";

const TOPICS = [
  "Manual Accounting", "Tally Prime", "GST Filing", "UAE VAT", "Corporate Tax",
  "Zoho Books", "Power BI", "Excel Mastery", "Income Tax", "QuickBooks",
  "Payroll Management", "Financial Reporting", "Stock Trading", "Technical Analysis",
  "Options Trading", "Portfolio Management"
];

export default function MarqueeBand() {
  return (
    <div className="group relative flex h-[56px] w-full cursor-default overflow-hidden whitespace-nowrap bg-[var(--bg-dark)]">
      <style suppressHydrationWarning>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* 
        We render two identical sets as direct children of a single flex container.
        Using gap-8 creates perfect spacing. translateX(-50%) will shift it exactly 
        by the length of one set, creating a flawless seamless loop.
      */}
      <div className="animate-marquee flex w-max items-center gap-8 pl-8 pr-8">
        {[1, 2].map((groupIndex) => (
          <React.Fragment key={groupIndex}>
            {TOPICS.map((topic, i) => (
              <React.Fragment key={`${groupIndex}-${i}`}>
                <span 
                  className="uppercase tracking-[0.1em] text-[var(--accent-mint)]"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}
                >
                  {topic}
                </span>
                <span className="text-[var(--green-600)]">✦</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
