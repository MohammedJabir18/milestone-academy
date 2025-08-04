
import React from 'react';
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
  return (
    <div className="min-h-screen bg-trading-dark">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Us Section - Moved to be right after Hero */}
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
      <section id="testimonials" className="py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Success <span className="text-trading-emerald">Stories</span></h2>
            <p className="text-gray-300 text-lg">Hear from our students who have transformed their trading and financial future with our academy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-list">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="gradient-button glow-on-hover">
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
