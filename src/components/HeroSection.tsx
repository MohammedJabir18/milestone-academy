import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, PlayCircle } from 'lucide-react';
import BackgroundAnimation from './BackgroundAnimation';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation />
      
      {/* Background Image with Overlay - Keep as fallback */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070')] bg-cover bg-center opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
        <div className="max-w-3xl">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
              <img src="/images/logo.svg" alt="Milestone Trading Academy" className="w-full h-full object-cover" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-trading-emerald/20 border border-trading-emerald/30 text-trading-emerald text-sm font-medium animate-pulse-green">
              Transform Your Trading Career
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master the <span className="text-trading-emerald">Financial Markets</span> With Expert Guidance
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join Milestone Trading Academy for professional-grade education in stocks, forex, and options trading. Learn proven strategies from experienced traders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="interactive-button h-12 px-8 bg-gradient-to-r from-trading-emerald to-trading-emerald/90 hover:from-trading-emerald/90 hover:to-trading-emerald text-black font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => scrollToSection('programs')}
            >
              Explore Programs
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="interactive-button h-12 px-8 border-white/20 text-white hover:bg-white/10 font-medium backdrop-blur-sm hover:border-trading-emerald/50 hover:text-trading-emerald transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="glass-card p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
              <div className="text-gray-400 text-sm">Students Trained</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">25+</div>
              <div className="text-gray-400 text-sm">Expert Instructors</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">92%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-trading-dark to-transparent"></div>
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-trading-emerald/20 blur-3xl"></div>
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-trading-emerald/10 blur-2xl"></div>
    </div>
  );
};

export default HeroSection;
