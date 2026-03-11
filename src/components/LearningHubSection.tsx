
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Video, BarChart2, Download, Clock, Calendar, Users } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const resources = [
  {
    icon: BookOpen,
    title: 'E-Books & Trading Guides',
    desc: 'Comprehensive guides on trading strategies, market analysis, and risk management techniques.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    stats: [
      { icon: Download, label: '25+ Downloadable Resources' },
      { icon: Clock, label: 'Updated Monthly' },
    ],
    cta: 'Browse E-Books',
  },
  {
    icon: Video,
    title: 'Video Tutorials Library',
    desc: 'Step-by-step video tutorials covering technical analysis, trading psychology, and market execution.',
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070',
    stats: [
      { icon: Video, label: '200+ Hours of Content' },
      { icon: Calendar, label: 'Weekly New Releases' },
    ],
    cta: 'Watch Videos',
  },
  {
    icon: BarChart2,
    title: 'Trading Tools & Calculators',
    desc: 'Professional tools for position sizing, risk management, and technical analysis.',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1973',
    stats: [
      { icon: BarChart2, label: '15+ Interactive Tools' },
      { icon: Users, label: 'Used by 20,000+ Traders' },
    ],
    cta: 'Access Tools',
  },
];

const simulatorFeatures = [
  { title: 'Real-Time Data', desc: 'Practice with actual market conditions' },
  { title: 'Performance Analytics', desc: 'Track and analyze your results' },
  { title: 'Scenario Builder', desc: 'Create custom trading scenarios' },
  { title: 'Risk-Free Practice', desc: 'Learn without financial risk' },
];

const LearningHubSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headingRef, { y: 30 });
  useStaggerReveal(gridRef, '.hub-card', { y: 40, stagger: 0.12 });
  useScrollReveal(featuredRef, { y: 30, delay: 0.1 });

  return (
    <section id="learning-hub" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-trading-emerald/10 text-trading-emerald border border-trading-emerald/20">
              Resources
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
              Trading{' '}
              <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">Learning Hub</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Access our comprehensive library of trading resources, tools, and educational content for traders at all levels.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald/40 text-trading-emerald hover:bg-trading-emerald/10 rounded-full px-6">
            Explore All Resources <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* resource cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((r, i) => (
            <div
              key={i}
              className="hub-card group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-trading-emerald/30 hover:shadow-lg hover:shadow-trading-emerald/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-xl bg-trading-emerald/90 flex items-center justify-center shadow-lg shadow-trading-emerald/25">
                  <r.icon className="h-6 w-6 text-black" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-trading-emerald transition-colors">{r.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{r.desc}</p>
                <div className="space-y-2 mb-5">
                  {r.stats.map((s, j) => (
                    <div key={j} className="flex items-center text-sm text-gray-400">
                      <s.icon className="h-4 w-4 mr-2 text-trading-emerald" />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg">{r.cta}</Button>
              </div>
            </div>
          ))}
        </div>

        {/* featured – trading simulator */}
        <div ref={featuredRef} className="mt-16 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-full min-h-[300px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1974" alt="Trading Simulator" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute top-8 left-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-trading-emerald text-black text-sm font-semibold shadow-lg shadow-trading-emerald/25">
                  Featured Resource
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Trading Simulator Platform</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Practice trading in real market conditions without risking real capital. Our simulator uses historical market data to recreate actual trading scenarios.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {simulatorFeatures.map((f, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-trading-emerald font-semibold text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                ))}
              </div>
              <Button className="w-full md:w-auto bg-gradient-to-r from-trading-emerald to-trading-lightMint hover:opacity-90 text-black font-semibold rounded-lg px-8 py-3 shadow-lg shadow-trading-emerald/20 transition-all hover:-translate-y-0.5">
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
