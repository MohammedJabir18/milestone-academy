import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';
import { useCountUp } from '@/hooks/useCountUp';

const checkpoints = [
  {
    title: 'Founded by Professional Traders',
    description: 'Our instructors have real experience across institutional and retail trading environments.',
  },
  {
    title: 'Practical Education',
    description: 'We focus on real-world applications with live trading demonstrations and interactive simulations.',
  },
  {
    title: 'Supportive Community',
    description: 'Join a network of like-minded traders for ongoing support, motivation, and collaboration.',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);
  const checkpointsRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  // Stat counter refs
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  // Scroll-triggered reveals
  useScrollReveal(textBlockRef, { y: 40 });
  useScrollReveal(imageBlockRef, { y: 40, delay: 0.2 });
  useStaggerReveal(checkpointsRef, '.about-checkpoint', { y: 25, stagger: 0.12 });
  useStaggerReveal(statsContainerRef, '.about-stat-card', { y: 20, scale: 0.9, stagger: 0.15, delay: 0.3 });

  // Animated counters
  useCountUp(stat1Ref, 10, { suffix: '+', duration: 2 });
  useCountUp(stat2Ref, 15, { suffix: 'K+', duration: 2.3 });
  useCountUp(stat3Ref, 92, { suffix: '%', duration: 2.6 });

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-black/30 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-trading-emerald/5 rounded-full blur-[100px]" />
      <div className="absolute top-20 right-0 w-48 h-48 bg-emerald-500/3 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Block */}
          <div ref={textBlockRef}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-trading-emerald/15 border border-trading-emerald/25 text-trading-emerald text-sm font-medium mb-8 backdrop-blur-sm">
              About Milestone Trading Academy
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              We're Redefining{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-emerald to-emerald-400">
                Trading Education
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Milestone Trading Academy was founded by a team of professional traders with over 50 years of combined
              market experience. We've developed a comprehensive educational system designed to take traders of all
              levels from market basics to consistent profitability.
            </p>

            {/* Checkpoints */}
            <div ref={checkpointsRef} className="space-y-5 mb-10">
              {checkpoints.map((item, i) => (
                <div key={i} className="about-checkpoint flex items-start group">
                  <div className="mt-1 mr-4 h-7 w-7 bg-trading-emerald/15 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-trading-emerald/25 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-trading-emerald" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-trading-emerald transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="interactive-button bg-gradient-to-r from-trading-emerald to-emerald-500 hover:from-emerald-500 hover:to-trading-emerald text-black font-semibold shadow-[0_0_20px_rgba(0,200,83,0.2)] hover:shadow-[0_0_30px_rgba(0,200,83,0.4)] transition-all duration-300 hover:-translate-y-0.5">
              Our Story <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Image Block */}
          <div ref={imageBlockRef} className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/40 group">
              <img
                src="/images/TeamMilestone.jpg"
                alt="Milestone Trading Team"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg font-medium italic leading-relaxed">
                  "Our mission is to empower traders with the skills, knowledge, and psychological preparation needed
                  for long-term success in the markets."
                </p>
                <p className="text-trading-emerald mt-3 font-semibold text-base">— Milestone Team</p>
              </div>
            </div>

            {/* Stats Row */}
            <div ref={statsContainerRef} className="grid grid-cols-3 gap-4 mt-5">
              <div className="about-stat-card glass-card p-5 rounded-xl flex flex-col items-center text-center group hover:border-trading-emerald/30 transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/15 flex items-center justify-center mb-3 group-hover:bg-trading-emerald/25 transition-colors">
                  <Award className="h-6 w-6 text-trading-emerald" />
                </div>
                <div ref={stat1Ref} className="text-2xl font-bold text-white">
                  0
                </div>
                <div className="text-gray-400 text-xs font-medium mt-1">Years Experience</div>
              </div>

              <div className="about-stat-card glass-card p-5 rounded-xl flex flex-col items-center text-center group hover:border-trading-emerald/30 transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/15 flex items-center justify-center mb-3 group-hover:bg-trading-emerald/25 transition-colors">
                  <Target className="h-6 w-6 text-trading-emerald" />
                </div>
                <div ref={stat2Ref} className="text-2xl font-bold text-white">
                  0
                </div>
                <div className="text-gray-400 text-xs font-medium mt-1">Students Trained</div>
              </div>

              <div className="about-stat-card glass-card p-5 rounded-xl flex flex-col items-center text-center group hover:border-trading-emerald/30 transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/15 flex items-center justify-center mb-3 group-hover:bg-trading-emerald/25 transition-colors">
                  <TrendingUp className="h-6 w-6 text-trading-emerald" />
                </div>
                <div ref={stat3Ref} className="text-2xl font-bold text-white">
                  0
                </div>
                <div className="text-gray-400 text-xs font-medium mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
