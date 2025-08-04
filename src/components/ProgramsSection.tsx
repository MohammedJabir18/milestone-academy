
import React from 'react';
import { ArrowRight, BarChart2, BookOpen, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';

const programs = [
  {
    title: "Stock Trading Mastery",
    description: "Learn to analyze and trade stocks profitably with our comprehensive stock trading course. Covering technical analysis, fundamental research, and risk management.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070",
    level: "Beginner" as const,
    duration: "8 weeks",
    students: 2500,
    rating: 4.8,
    price: "$499"
  },
  {
    title: "Forex Trading Strategies",
    description: "Master currency trading with our proven forex strategies. Learn about currency pairs, economic indicators, and develop a profitable trading system.",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2071",
    level: "Intermediate" as const,
    duration: "10 weeks",
    students: 1800,
    rating: 4.7,
    price: "$599"
  },
  {
    title: "Options Trading Specialization",
    description: "Discover the power of options trading with strategies for income generation and portfolio protection. Learn about calls, puts, spreads, and advanced strategies.",
    image: "https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: "Advanced" as const,
    duration: "12 weeks",
    students: 1200,
    rating: 4.9,
    price: "$699"
  }
];

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "Structured learning path from fundamentals to advanced strategies"
  },
  {
    icon: Users,
    title: "Live Coaching Sessions",
    description: "Weekly group sessions with professional trading instructors"
  },
  {
    icon: BarChart2,
    title: "Trading Simulator",
    description: "Practice your strategies in a risk-free environment"
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Unlimited access to all course materials and updates"
  }
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-20 bg-black/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trading <span className="text-trading-emerald">Programs</span></h2>
            <p className="text-gray-300 max-w-2xl">Comprehensive trading education for all levels, from beginners to advanced traders looking to refine their edge.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald text-trading-emerald hover:bg-trading-emerald/10">
            View All Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <CourseCard key={index} {...program} />
          ))}
        </div>
        
        {/* Featured Program */}
        <div className="glass-card rounded-lg overflow-hidden mb-16">
          <div className="p-8 lg:p-12 relative">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-trading-emerald/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-trading-emerald/20 border border-trading-emerald/30 text-trading-emerald text-sm font-medium mb-6">
                Premium Program
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Professional Trader Certification</h3>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl">
                Our most comprehensive program designed to take you from beginner to professional trader. This 6-month intensive certification includes all our courses, personal mentorship, and exclusive access to our proprietary trading strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <div className="h-12 w-12 rounded-full bg-trading-emerald/20 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-trading-emerald" />
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
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
                <Button className="bg-trading-emerald hover:bg-trading-emerald/90 text-black px-8">
                  Enroll Now - $1,999
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Program Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2070" alt="Trading Education" className="rounded-lg" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">What You'll Get From Our <span className="text-trading-emerald">Trading Programs</span></h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Trading System Development</h4>
                  <p className="text-gray-400">Learn to build and test your own trading systems based on your risk tolerance and goals.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Risk Management Mastery</h4>
                  <p className="text-gray-400">Develop robust risk management skills to protect your capital and maximize returns.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Technical Analysis Proficiency</h4>
                  <p className="text-gray-400">Master chart patterns, indicators, and price action techniques for any market condition.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Psychology and Mindset Training</h4>
                  <p className="text-gray-400">Develop the mental resilience required for consistent execution and long-term success.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-trading-emerald/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-trading-emerald" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Ongoing Support Community</h4>
                  <p className="text-gray-400">Join our vibrant community of traders for continuous learning and motivation.</p>
                </div>
              </div>
            </div>
            
            <Button className="mt-8 bg-trading-emerald hover:bg-trading-emerald/90 text-black">
              Compare Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
