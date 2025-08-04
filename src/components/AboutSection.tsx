
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-black/30 relative">
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-trading-emerald/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-trading-emerald/20 border border-trading-emerald/30 text-trading-emerald text-sm font-medium mb-6">
              About Milestone Trading Academy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">We're Redefining <span className="text-trading-emerald">Trading Education</span></h2>
            <p className="text-gray-300 text-lg mb-6">
              Milestone Trading Academy was founded by a team of professional traders with over 50 years of combined market experience. We've developed a comprehensive educational system designed to take traders of all levels from market basics to consistent profitability.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Founded by Professional Traders</h3>
                  <p className="text-gray-400">Our instructors have real experience across institutional and retail trading environments.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Practical Education</h3>
                  <p className="text-gray-400">We focus on real-world applications with live trading demonstrations and interactive simulations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">Supportive Community</h3>
                  <p className="text-gray-400">Join a network of like-minded traders for ongoing support, motivation, and collaboration.</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-trading-emerald hover:bg-trading-emerald/90 text-black">
              Our Story <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src="/images/TeamMilestone.jpg" alt="Trading Floor" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg font-medium">
                  "Our mission is to empower traders with the skills, knowledge, and psychological preparation needed for long-term success in the markets."
                </p>
                <p className="text-trading-emerald mt-2 font-semibold">
                  - Milestone Team
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="glass-card p-4 rounded-lg flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/20 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-trading-emerald" />
                </div>
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/20 flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-trading-emerald" />
                </div>
                <div className="text-2xl font-bold text-white">15k+</div>
                <div className="text-gray-400 text-sm">Students Trained</div>
              </div>
              
              <div className="glass-card p-4 rounded-lg flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/20 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-trading-emerald" />
                </div>
                <div className="text-2xl font-bold text-white">92%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
