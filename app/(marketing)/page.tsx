"use client";

import LoadingScreen from "@/components/global/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import StatsSection from "@/components/sections/StatsSection";
import CoursesSection from "@/components/sections/CoursesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import CurriculumSection from "@/components/sections/CurriculumSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PlacementSection from "@/components/sections/PlacementSection";
import CtaSection from "@/components/sections/CtaSection";
import TradingTeaseSection from "@/components/sections/TradingTeaseSection";










export default function Home() {
  return (
    <>
      <LoadingScreen />
      
      {/* Sections Array */}
      <div className="w-full flex flex-col items-center">
        <HeroSection />
        <MarqueeBand />
        <StatsSection />
        <CoursesSection />
        <TradingTeaseSection />
        <WhyUsSection />
        <CurriculumSection />
        <TestimonialsSection />
        <PlacementSection />
        <CtaSection />
      </div>
    </>
  );
}
