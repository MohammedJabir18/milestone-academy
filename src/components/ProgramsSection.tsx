import React, { useRef } from 'react';
import { ArrowRight, BarChart2, BookOpen, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGSAP';

const programs = [
  {
    title: 'Stock Trading Mastery',
    description:
      'Learn to analyze and trade stocks profitably with our comprehensive stock trading course. Covering technical analysis, fundamental research, and risk management.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070',
    level: 'Beginner' as const,
    duration: '8 weeks',
    students: 2500,
    rating: 4.8,
    price: '$499',
  },
  {
    title: 'Forex Trading Strategies',
    description:
      'Master currency trading with our proven forex strategies. Learn about currency pairs, economic indicators, and develop a profitable trading system.',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071',
    level: 'Intermediate' as const,
    duration: '10 weeks',
    students: 1800,
    rating: 4.7,
    price: '$599',
  },
  {
    title: 'Options Trading Specialization',
    description:
      'Discover the power of options trading with strategies for income generation and portfolio protection. Learn about calls, puts, spreads, and advanced strategies.',
    image:
      'https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    level: 'Advanced' as const,
    duration: '12 weeks',
    students: 1200,
    rating: 4.9,
    price: '$699',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Structured learning path from fundamentals to advanced strategies',
  },
  {
    icon: Users,
    title: 'Live Coaching Sessions',
    description: 'Weekly group sessions with professional trading instructors',
  },
  {
    icon: BarChart2,
    title: 'Trading Simulator',
    description: 'Practice your strategies in a risk-free environment',
  },
  {
    icon: Clock,
    title: 'Lifetime Access',
    description: 'Unlimited access to all course materials and updates',
  },
];

const benefits = [
  { title: 'Trading System Development', desc: 'Learn to build and test your own trading systems based on your risk tolerance and goals.' },
  { title: 'Risk Management Mastery', desc: 'Develop robust risk management skills to protect your capital and maximize returns.' },
  { title: 'Technical Analysis Proficiency', desc: 'Master chart patterns, indicators, and price action techniques for any market condition.' },
  { title: 'Psychology and Mindset Training', desc: 'Develop the mental resilience required for consistent execution and long-term success.' },
  { title: 'Ongoing Support Community', desc: 'Join our vibrant community of traders for continuous learning and motivation.' },
];

const ProgramsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const benefitsImgRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef, { y: 30 });
  useStaggerReveal(cardsRef, '.program-card', { y: 40, scale: 0.95, stagger: 0.15 });
  useScrollReveal(featuredRef, { y: 30, delay: 0.1 });
  useStaggerReveal(featuresGridRef, '.feature-card', { y: 25, stagger: 0.1 });
  useScrollReveal(benefitsImgRef, { x: -40 });
  useStaggerReveal(benefitsRef, '.benefit-row', { x: 30, stagger: 0.1 });

  return (
    <section id="programs" className="py-24 bg-black/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[2px] bg-gradient-to-r from-transparent via-trading-emerald/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-trading-emerald/15 border border-trading-emerald/25 text-trading-emerald text-sm font-medium mb-4">
              Our Programs
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
              Trading{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-emerald to-emerald-400">
                Programs
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl text-lg">
              Comprehensive trading education for all levels, from beginners to advanced traders looking to refine their
              edge.
            </p>
          </div>
          <Button className="mt-6 md:mt-0 bg-transparent border border-trading-emerald/50 text-trading-emerald hover:bg-trading-emerald/10 hover:border-trading-emerald transition-all duration-300">
            View All Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Course cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <CourseCard {...program} />
            </div>
          ))}
        </div>

        {/* Featured Program */}
        <div ref={featuredRef} className="glass-card rounded-2xl overflow-hidden mb-20 border border-white/[0.06]">
          <div className="p-8 lg:p-12 relative">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-trading-emerald/8 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-trading-emerald/20 border border-trading-emerald/30 text-trading-emerald text-sm font-medium mb-6">
                Premium Program
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Professional Trader Certification
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed">
                Our most comprehensive program designed to take you from beginner to professional trader. This 6-month
                intensive certification includes all our courses, personal mentorship, and exclusive access to our
                proprietary trading strategies.
              </p>

              <div ref={featuresGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-card bg-white/5 rounded-xl p-6 hover:bg-white/[0.08] transition-all duration-300 group hover:-translate-y-1 border border-transparent hover:border-white/[0.06]"
                  >
                    <div className="h-12 w-12 rounded-full bg-trading-emerald/20 flex items-center justify-center mb-4 group-hover:bg-trading-emerald/30 transition-colors">
                      <feature.icon className="h-6 w-6 text-trading-emerald" />
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 mr-0.5" fill="currentColor" />
                  ))}
                  <span className="ml-2 text-white font-medium">5.0 (250 ratings)</span>
                </div>
                <div className="text-gray-300">
                  <Users className="h-5 w-5 inline mr-2 text-trading-emerald" />
                  850+ Certified Graduates
                </div>
                <div className="text-gray-300">
                  <Clock className="h-5 w-5 inline mr-2 text-trading-emerald" />
                  6-Month Program
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-gradient-to-r from-trading-emerald to-emerald-500 hover:from-emerald-500 hover:to-trading-emerald text-black font-semibold px-8 shadow-[0_0_20px_rgba(0,200,83,0.2)] hover:shadow-[0_0_30px_rgba(0,200,83,0.4)] transition-all duration-300">
                  Enroll Now – $1,999
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Program Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div ref={benefitsImgRef} className="relative rounded-xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2070"
              alt="Trading Education"
              className="rounded-xl w-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent rounded-xl" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              What You'll Get From Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-emerald to-emerald-400">
                Trading Programs
              </span>
            </h3>
            <div ref={benefitsRef} className="space-y-5">
              {benefits.map((b, i) => (
                <div key={i} className="benefit-row flex items-start group">
                  <div className="mt-1 mr-4 h-7 w-7 bg-trading-emerald/15 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-trading-emerald/25 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 text-trading-emerald" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg group-hover:text-trading-emerald transition-colors duration-300">
                      {b.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="mt-8 bg-gradient-to-r from-trading-emerald to-emerald-500 hover:from-emerald-500 hover:to-trading-emerald text-black font-semibold shadow-[0_0_20px_rgba(0,200,83,0.2)] hover:shadow-[0_0_30px_rgba(0,200,83,0.4)] transition-all duration-300 hover:-translate-y-0.5">
              Compare Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
