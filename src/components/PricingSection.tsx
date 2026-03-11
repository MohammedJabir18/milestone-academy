import React, { useRef } from 'react';
import { Check, X, Zap, Star, Crown, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useStaggerReveal } from '@/hooks/useGSAP';

interface Feature {
  label: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: boolean;
  badge?: string;
  features: Feature[];
  cta: string;
  ctaStyle: string;
}

const plans: Plan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹9,999',
    period: '/ program',
    tagline: 'Perfect for self-paced learners',
    icon: BookOpen,
    highlight: false,
    features: [
      { label: 'Course video library access', included: true },
      { label: 'PDF study materials', included: true },
      { label: 'Community forum access', included: true },
      { label: 'Monthly live webinars', included: true },
      { label: '1-on-1 mentor sessions', included: false },
      { label: 'Live trading simulations', included: false },
      { label: 'Certificate of completion', included: false },
      { label: 'Lifetime access & updates', included: false },
    ],
    cta: 'Get Started',
    ctaStyle:
      'w-full border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₹24,999',
    period: '/ program',
    tagline: 'Most popular · Best value',
    icon: Star,
    highlight: true,
    badge: 'Most Popular',
    features: [
      { label: 'Course video library access', included: true },
      { label: 'PDF study materials', included: true },
      { label: 'Community forum access', included: true },
      { label: 'Weekly live webinars', included: true },
      { label: '4 × 1-on-1 mentor sessions', included: true },
      { label: 'Live trading simulations', included: true },
      { label: 'Certificate of completion', included: true },
      { label: 'Lifetime access & updates', included: false },
    ],
    cta: 'Enrol Now',
    ctaStyle:
      'w-full bg-gradient-to-r from-trading-emerald to-emerald-500 hover:from-emerald-500 hover:to-trading-emerald text-black font-bold shadow-[0_0_25px_rgba(0,200,83,0.35)] hover:shadow-[0_0_35px_rgba(0,200,83,0.55)] transition-all duration-300',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '₹44,999',
    period: '/ program',
    tagline: 'For serious traders & career changers',
    icon: Crown,
    highlight: false,
    features: [
      { label: 'Course video library access', included: true },
      { label: 'PDF study materials', included: true },
      { label: 'Community forum access', included: true },
      { label: 'Daily live webinars', included: true },
      { label: 'Unlimited mentor sessions', included: true },
      { label: 'Live trading simulations', included: true },
      { label: 'Certificate of completion', included: true },
      { label: 'Lifetime access & updates', included: true },
    ],
    cta: 'Go Elite',
    ctaStyle:
      'w-full border border-trading-emerald/40 text-trading-emerald hover:bg-trading-emerald/10 hover:border-trading-emerald/60 transition-all duration-300',
  },
];

const PricingSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(gridRef, '.pricing-card', { stagger: 0.12, y: 40, duration: 0.7 });

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-trading-emerald mb-4 px-4 py-1.5 rounded-full border border-trading-emerald/20 bg-trading-emerald/5">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">
              Investment
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every plan includes access to our expert-crafted curriculum. Upgrade anytime to unlock
            mentorship and live trading practice.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={cn(
                  'pricing-card relative glass-card rounded-2xl p-8 flex flex-col transition-all duration-500',
                  plan.highlight
                    ? 'border border-trading-emerald/30 shadow-[0_0_40px_rgba(0,200,83,0.1)] md:-mt-4 md:-mb-4'
                    : 'border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,200,83,0.06)]'
                )}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-trading-emerald to-emerald-500 text-black text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-trading-emerald/30 whitespace-nowrap flex items-center gap-1.5">
                    <Zap className="h-3 w-3" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan icon + name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      'h-11 w-11 rounded-xl flex items-center justify-center',
                      plan.highlight
                        ? 'bg-gradient-to-br from-trading-emerald to-emerald-500 shadow-lg shadow-trading-emerald/25'
                        : 'bg-white/[0.06] border border-white/10'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', plan.highlight ? 'text-black' : 'text-gray-300')} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg font-montserrat leading-none">{plan.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        'text-4xl font-extrabold font-montserrat',
                        plan.highlight
                          ? 'bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent'
                          : 'text-white'
                      )}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feat.included ? (
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-trading-emerald/15 border border-trading-emerald/25 flex items-center justify-center">
                          <Check className="h-3 w-3 text-trading-emerald" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <X className="h-3 w-3 text-gray-600" />
                        </div>
                      )}
                      <span
                        className={cn(
                          'text-sm',
                          feat.included ? 'text-gray-300' : 'text-gray-600 line-through'
                        )}
                      >
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button className={plan.ctaStyle}>{plan.cta}</Button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 text-xs mt-10 leading-relaxed">
          All prices in INR. EMI options available. Satisfaction guarantee — full refund within 7 days if not
          satisfied.{' '}
          <a href="#contact" className="text-trading-emerald hover:underline">
            Talk to an advisor →
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
