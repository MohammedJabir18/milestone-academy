
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProgramsSection from '@/components/ProgramsSection';
import LearningHubSection from '@/components/LearningHubSection';
import AboutSection from '@/components/AboutSection';
import TestimonialCard from '@/components/TestimonialCard';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import NewsSection from '@/components/NewsSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Full-time Trader, Former Finance Analyst",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887",
    content: "Milestone Trading Academy completely transformed my approach to the markets. The structured curriculum and hands-on mentorship gave me the confidence to quit my corporate job and become a profitable full-time trader. Best investment I've ever made!",
    rating: 5
  },
  {
    name: "Mohammed Jabir",
    role: "Part-time Trader, Data Scientist",
    image: "/images/jabir.png",
    content: "As a busy professional, I needed a flexible trading education that was still comprehensive. Milestone delivered exactly that! The on-demand videos and weekend coaching sessions fit perfectly with my schedule, and I'm now consistently generating additional income.",
    rating: 5
  },
  {
    name: "Rebecca Williams",
    role: "Investment Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888",
    content: "The technical analysis course exceeded my expectations. The instructors break down complex patterns into easy-to-understand concepts, and the trading simulator helped me practice without risk. My clients have benefited tremendously from my improved market insights.",
    rating: 4
  }
];

const Index = () => {
  const testimonialsHeadingRef = useRef<HTMLDivElement>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(testimonialsHeadingRef, { y: 30 });
  useStaggerReveal(testimonialsGridRef, '.testimonial-item', { y: 40, stagger: 0.12 });

  return (
    <div className="min-h-screen bg-trading-dark">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Us Section */}
      <AboutSection />
      
      {/* Programs Section */}
      <div className="relative z-10">
        <ProgramsSection />
      </div>
      
      {/* Learning Hub Section */}
      <div className="relative z-10">
        <LearningHubSection />
      </div>
      
      {/* News & Updates Section */}
      <div className="relative z-10">
        <NewsSection />
      </div>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={testimonialsHeadingRef} className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-trading-emerald/10 text-trading-emerald border border-trading-emerald/20">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Success <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-gray-400 text-lg">Hear from our students who have transformed their trading and financial future with our academy.</p>
          </div>
          
          <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-item">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-transparent border border-trading-emerald/40 text-trading-emerald hover:bg-trading-emerald/10 rounded-full px-8 py-3">
              View All Testimonials <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <div className="relative z-10">
        <BlogSection />
      </div>
      
      {/* Contact Section */}
      <div className="relative z-10">
        <ContactSection />
      </div>
      
      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
