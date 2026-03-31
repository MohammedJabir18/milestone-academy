"use client";

// Define the core topics to be endlessly looped
const topics = [
  "TALLY PRIME", "GST FILING", "INCOME TAX", "SAP FICO", "UAE VAT", 
  "GULF ACCOUNTING", "QUICKBOOKS", "PEACHTREE", "ADVANCED EXCEL", 
  "PAYROLL MANAGEMENT", "CA FOUNDATION", "CMA FOUNDATION", "PRACTICAL TRAINING"
];

export default function MarqueeBand() {
  return (
    <div className="w-full h-[60px] bg-[var(--bg-dark)] flex items-center overflow-hidden relative z-10 select-none">
      
      {/* Background border layers */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-white/10" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-[var(--green-500)]/20" />

      {/* Marquee Track: width max to prevent wrapping while container overflows. Add pause on hover. */}
      {/* Our animate-marquee moves from 0 to -50% translateX identically replacing list 1 with list 2 */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center cursor-default">
        
        {/* Set 1 */}
        <div className="flex items-center">
          {topics.map((word, i) => (
            <div key={`set1-${i}`} className="flex items-center shrink-0">
              <span className="text-[var(--accent-mint)] font-mono font-medium tracking-widest text-[13px] md:text-[14px] whitespace-nowrap transition-colors hover:text-white">
                {word}
              </span>
              <span className="text-white/20 px-8 text-[12px]">✦</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Exact visual replica of Set 1 to loop linearly) */}
        <div className="flex items-center">
          {topics.map((word, i) => (
            <div key={`set2-${i}`} className="flex items-center shrink-0">
              <span className="text-[var(--accent-mint)] font-mono font-medium tracking-widest text-[13px] md:text-[14px] whitespace-nowrap transition-colors hover:text-white">
                {word}
              </span>
              <span className="text-white/20 px-8 text-[12px]">✦</span>
            </div>
          ))}
        </div>
        
      </div>
      
      {/* Edge Gradients for seamless fading illusion */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-dark)] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-dark)] to-transparent pointer-events-none" />
      
    </div>
  );
}
