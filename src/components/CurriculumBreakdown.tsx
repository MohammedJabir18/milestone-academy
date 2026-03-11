import React, { useState, useRef } from 'react';
import { ChevronDown, Check, BookOpen, TrendingUp, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/hooks/useGSAP';

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: string[];
}

const phases: Phase[] = [
  {
    id: 1,
    title: 'Foundation',
    subtitle: 'Build your trading bedrock',
    duration: '2 Weeks',
    icon: BookOpen,
    color: 'from-sky-500 to-sky-400',
    topics: [
      'Introduction to financial markets and asset classes',
      'How exchanges work: order books, market makers, liquidity',
      'Reading candlestick charts and price action basics',
      'Risk management fundamentals & position sizing',
      'Trading psychology: discipline, fear, and greed',
      'Setting up your trading workspace & broker account',
    ],
  },
  {
    id: 2,
    title: 'Technical Analysis',
    subtitle: 'Master chart reading & indicators',
    duration: '4 Weeks',
    icon: TrendingUp,
    color: 'from-amber-500 to-yellow-400',
    topics: [
      'Support & resistance levels — identification and use',
      'Trend lines, channels, and price structure',
      'Moving averages: SMA, EMA, VWAP',
      'Momentum indicators: RSI, MACD, Stochastic',
      'Volume analysis and market breadth',
      'Chart patterns: head & shoulders, flags, triangles',
      'Fibonacci retracements and extensions',
      'Multi-timeframe analysis workflow',
    ],
  },
  {
    id: 3,
    title: 'Strategy Development',
    subtitle: 'Build and backtest your edge',
    duration: '4 Weeks',
    icon: Target,
    color: 'from-trading-emerald to-emerald-400',
    topics: [
      'Building a rule-based trading system',
      'Backtesting methodology and avoiding overfitting',
      'Entry triggers, stop-loss placement, and take-profit targets',
      'Swing trading vs. day trading frameworks',
      'Options strategies: calls, puts, spreads',
      'Forex pair selection and session timing',
      'Trade journaling and performance review process',
      'Position sizing calculator and risk-reward optimization',
    ],
  },
  {
    id: 4,
    title: 'Live Trading',
    subtitle: 'Execute with confidence in real markets',
    duration: '4 Weeks',
    icon: Zap,
    color: 'from-orange-500 to-red-400',
    topics: [
      'Paper trading to live trading transition plan',
      'Pre-market preparation and watchlist building',
      'Real-time trade execution and order management',
      'Managing open positions under live market pressure',
      'Adapting strategies to changing market conditions',
      'Weekly review sessions with mentor feedback',
      'Portfolio performance tracking and reporting',
      'Career pathways: prop trading, fund management, freelancing',
    ],
  },
];

const CurriculumBreakdown: React.FC = () => {
  const [openPhase, setOpenPhase] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, { y: 30, duration: 0.7 });

  const toggle = (id: number) => setOpenPhase((prev) => (prev === id ? null : id));

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-trading-emerald mb-4 px-4 py-1.5 rounded-full border border-trading-emerald/20 bg-trading-emerald/5">
            Learning Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
            Your 14-Week{' '}
            <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Our structured curriculum takes you from zero to live trading in 14 weeks with mentor-led
            sessions, real market practice, and a proven framework used by 4,000+ graduates.
          </p>
        </div>

        {/* Phase Accordion */}
        <div className="space-y-4">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const isOpen = openPhase === phase.id;

            return (
              <div
                key={phase.id}
                className={cn(
                  'glass-card rounded-2xl border transition-all duration-500 overflow-hidden',
                  isOpen
                    ? 'border-trading-emerald/25 shadow-[0_0_30px_rgba(0,200,83,0.06)]'
                    : 'border-white/[0.06] hover:border-white/[0.12]'
                )}
              >
                {/* Header */}
                <button
                  className="w-full flex items-center gap-5 p-6 text-left"
                  onClick={() => toggle(phase.id)}
                >
                  {/* Phase number + icon */}
                  <div
                    className={cn(
                      'flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg',
                      phase.color
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Phase {phase.id}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg font-montserrat leading-tight">
                      {phase.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{phase.subtitle}</p>
                  </div>

                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-300',
                      isOpen && 'rotate-180 text-trading-emerald'
                    )}
                  />
                </button>

                {/* Expandable Topics */}
                <div
                  className={cn(
                    'transition-all duration-500 ease-in-out',
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  )}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-5">
                      {phase.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-trading-emerald/15 border border-trading-emerald/25 flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-trading-emerald" />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 text-xs mt-8 leading-relaxed">
          All phases include live Q&amp;A sessions, recorded replays, and 1-on-1 mentor check-ins.
        </p>
      </div>
    </section>
  );
};

export default CurriculumBreakdown;
