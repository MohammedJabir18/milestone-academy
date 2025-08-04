
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Video, Download, BarChart2, Users, Calendar, Clock } from 'lucide-react';

const LearningHubSection = () => {
  return (
    <section id="learning-hub" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Trading <span className="text-trading-emerald">Learning Hub</span></h2>
            <p className="text-gray-300 max-w-2xl">Access our comprehensive library of trading resources, tools, and educational content for traders at all levels.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald text-trading-emerald hover:bg-trading-emerald/10">
            Explore All Resources <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resource Categories */}
          <div className="glass-card rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015" alt="E-Books & Guides" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/90 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-black" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-semibold mb-3">E-Books & Trading Guides</h3>
              <p className="text-gray-400 mb-4">
                Comprehensive guides on trading strategies, market analysis, and risk management techniques.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Download className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>25+ Downloadable Resources</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>Updated Monthly</span>
                </div>
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white">Browse E-Books</Button>
            </div>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070" alt="Video Library" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/90 flex items-center justify-center">
                  <Video className="h-6 w-6 text-black" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-semibold mb-3">Video Tutorials Library</h3>
              <p className="text-gray-400 mb-4">
                Step-by-step video tutorials covering technical analysis, trading psychology, and market execution.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <Video className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>200+ Hours of Content</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>Weekly New Releases</span>
                </div>
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white">Watch Videos</Button>
            </div>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973" alt="Trading Tools" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="h-12 w-12 rounded-full bg-trading-emerald/90 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-black" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-white text-xl font-semibold mb-3">Trading Tools & Calculators</h3>
              <p className="text-gray-400 mb-4">
                Professional tools for position sizing, risk management, and technical analysis.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <BarChart2 className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>15+ Interactive Tools</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Users className="h-4 w-4 mr-2 text-trading-emerald" />
                  <span>Used by 20,000+ Traders</span>
                </div>
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white">Access Tools</Button>
            </div>
          </div>
        </div>
        
        {/* Featured Learning Resource */}
        <div className="mt-16 glass-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-full min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1974" alt="Trading Simulator" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent lg:via-transparent lg:to-transparent"></div>
              <div className="absolute top-8 left-8">
                <div className="inline-block px-3 py-1 rounded-full bg-trading-emerald text-black text-sm font-medium">
                  Featured Resource
                </div>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Trading Simulator Platform</h3>
              <p className="text-lg text-gray-300 mb-6">
                Practice trading in real market conditions without risking real capital. Our simulator uses historical market data to recreate actual trading scenarios.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-trading-emerald font-semibold mb-1">Real-Time Data</div>
                  <div className="text-sm text-gray-400">Practice with actual market conditions</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-trading-emerald font-semibold mb-1">Performance Analytics</div>
                  <div className="text-sm text-gray-400">Track and analyze your results</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-trading-emerald font-semibold mb-1">Scenario Builder</div>
                  <div className="text-sm text-gray-400">Create custom trading scenarios</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-trading-emerald font-semibold mb-1">Risk-Free Practice</div>
                  <div className="text-sm text-gray-400">Learn without financial risk</div>
                </div>
              </div>
              <Button className="w-full md:w-auto bg-trading-emerald hover:bg-trading-emerald/90 text-black">
                Try Trading Simulator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningHubSection;
