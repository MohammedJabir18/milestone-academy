"use client";

import HeroSection from "@/components/sections/HeroSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import StatsSection from "@/components/sections/StatsSection";
import CoursesSection from "@/components/sections/CoursesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CurriculumSection from "@/components/sections/CurriculumSection";
import FacultySection from "@/components/sections/FacultySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PlacementSection from "@/components/sections/PlacementSection";
import NewsSection from "@/components/sections/NewsSection";
import CtaSection from "@/components/sections/CtaSection";
import TradingTeaseSection from "@/components/sections/TradingTeaseSection";

export default function Home() {
  return (
    <>
      {/* Sections Array */}
      <div className="w-full flex flex-col items-center">
        <HeroSection />
        <MarqueeBand />
        <StatsSection />
        <CoursesSection />
        <TradingTeaseSection />
        <WhyUsSection />
        <CurriculumSection />
        <FacultySection />
        <TestimonialsSection />
        <NewsSection />
        <PlacementSection />
        <CtaSection />
      </div>
    </>
  );
}
