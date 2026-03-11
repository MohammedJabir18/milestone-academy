import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Users, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundAnimation from './BackgroundAnimation';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated SVG chart illustration ───────────────────────── */
const TradingChartSVG = () => (
  <svg
    viewBox="0 0 420 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto drop-shadow-2xl"
    aria-hidden="true"
  >
    {/* Background card */}
    <rect x="0" y="0" width="420" height="300" rx="20" fill="rgba(15,15,20,0.65)" stroke="rgba(0,200,83,0.12)" strokeWidth="1" />

    {/* Subtle grid */}
    {[60, 120, 180, 240].map((y) => (
      <line key={`h-${y}`} x1="30" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}
    {[90, 150, 210, 270, 330].map((x) => (
      <line key={`v-${x}`} x1={x} y1="30" x2={x} y2="270" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}

    {/* Price line (main curve) */}
    <path
      className="chart-line-draw"
      d="M40 220 C70 210, 90 195, 110 200 S150 170, 170 160 S200 180, 220 150 S250 120, 270 130 S300 90, 320 80 S350 100, 370 60"
      stroke="url(#chartGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Area fill under the line */}
    <path
      d="M40 220 C70 210, 90 195, 110 200 S150 170, 170 160 S200 180, 220 150 S250 120, 270 130 S300 90, 320 80 S350 100, 370 60 L370 270 L40 270 Z"
      fill="url(#areaFill)"
      opacity="0.25"
    />

    {/* Candlesticks */}
    {[
      { x: 90, o: 200, c: 185, h: 175, l: 210, green: true },
      { x: 130, o: 180, c: 190, h: 170, l: 195, green: false },
      { x: 170, o: 165, c: 155, h: 145, l: 175, green: true },
      { x: 210, o: 155, c: 160, h: 145, l: 170, green: false },
      { x: 250, o: 140, c: 120, h: 110, l: 150, green: true },
      { x: 290, o: 125, c: 115, h: 100, l: 135, green: true },
      { x: 330, o: 100, c: 75, h: 60, l: 110, green: true },
    ].map((c, i) => (
      <g key={i} opacity="0.45">
        {/* Wick */}
        <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={c.green ? '#00C853' : '#FF5252'} strokeWidth="1" />
        {/* Body */}
        <rect
          x={c.x - 5}
          y={Math.min(c.o, c.c)}
          width="10"
          height={Math.abs(c.o - c.c) || 2}
          rx="1"
          fill={c.green ? '#00C853' : '#FF5252'}
        />
      </g>
    ))}

    {/* Glowing dot at tip */}
    <circle cx="370" cy="60" r="5" fill="#00C853" opacity="0.9">
      <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
    </circle>

    {/* Profit label */}
    <rect x="330" y="32" width="72" height="24" rx="6" fill="rgba(0,200,83,0.15)" />
    <text x="366" y="48" textAnchor="middle" fill="#00C853" fontSize="11" fontFamily="monospace" fontWeight="600">
      +127.4%
    </text>

    {/* Defs */}
    <defs>
      <linearGradient id="chartGradient" x1="40" y1="220" x2="370" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00C853" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#00E676" />
      </linearGradient>
      <linearGradient id="areaFill" x1="200" y1="60" x2="200" y2="270" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00C853" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Main Hero Section ─────────────────────────────────────── */
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useCountUp(stat1Ref, 10000, { suffix: '+', duration: 2.5, start: 'top 90%' });
  useCountUp(stat2Ref, 25,    { suffix: '+', duration: 2,   start: 'top 90%' });
  useCountUp(stat3Ref, 92,    { suffix: '%', duration: 2.5, start: 'top 90%' });

  /* ── GSAP entrance timeline ─────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge',   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.hero-heading', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
        .fromTo('.hero-sub',     { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta',     { y: 25, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-trust',   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-chart',   { x: 80, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.8')
        .fromTo('.chart-line-draw', { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, '-=0.7')
        .fromTo('.hero-stat',    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── Canvas background ──────────────────── */}
      <BackgroundAnimation />

      {/* ── Unsplash overlay ───────────────────── */}
      <div className="absolute inset-0 z-[1]">
        <img
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=30&w=1920"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* ── Decorative glow orbs ────────────────── */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-trading-emerald/10 rounded-full blur-[140px] z-[2] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-trading-emerald/[0.06] rounded-full blur-[160px] z-[2] pointer-events-none animate-float-delayed" />
      <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-trading-navy/40 rounded-full blur-[120px] z-[2] pointer-events-none" />

      {/* ── Main content ────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-12 lg:pt-28 lg:pb-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="max-w-xl lg:max-w-none">

            {/* Badge */}
            <div className="hero-badge opacity-0 inline-flex items-center gap-2 shimmer-badge rounded-full border border-trading-emerald/20 bg-trading-emerald/[0.07] backdrop-blur-sm px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trading-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-trading-emerald" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-trading-emerald tracking-wide uppercase">
                Enrollment Open — Limited Seats
              </span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading opacity-0 font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.1] tracking-tight text-white mb-5">
              Master the Art of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-emerald via-emerald-400 to-trading-lightMint">
                Financial Markets
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="hero-sub opacity-0 font-opensans text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg mb-8">
              Join thousands of traders transforming their financial future with
              expert-led courses, real-time market analysis, and a community of
              ambitious learners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/courses"
                className="hero-cta opacity-0 group relative inline-flex items-center gap-2 bg-trading-emerald hover:bg-emerald-500 text-black font-semibold rounded-lg px-7 py-3.5 transition-all duration-300 shadow-[0_0_24px_rgba(0,200,83,0.25)] hover:shadow-[0_0_36px_rgba(0,200,83,0.45)] hover:-translate-y-0.5"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="hero-cta opacity-0 group inline-flex items-center gap-2 border border-white/10 hover:border-trading-emerald/40 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-white font-semibold rounded-lg px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-trading-emerald" />
                Watch Demo
              </Link>
            </div>

            {/* Trust strip */}
            <div className="hero-trust opacity-0 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-trading-emerald" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No experience needed
              </span>
              <span className="w-px h-3 bg-gray-700" />
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-trading-emerald" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Lifetime access
              </span>
              <span className="hidden sm:inline w-px h-3 bg-gray-700" />
              <span className="hidden sm:flex items-center gap-1.5">
                <svg className="w-4 h-4 text-trading-emerald" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Certificate on completion
              </span>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN — Chart ═══ */}
          <div className="hero-chart opacity-0 hidden lg:flex justify-center items-center relative">
            {/* Glow behind chart */}
            <div className="absolute inset-0 bg-trading-emerald/[0.04] rounded-3xl blur-3xl scale-110 animate-pulse-glow pointer-events-none" />
            <div className="relative w-full max-w-md xl:max-w-lg animate-float">
              <TradingChartSVG />
              {/* Floating mini badges */}
              <div className="absolute -top-4 -left-4 bg-black/70 backdrop-blur-md border border-trading-emerald/20 rounded-xl px-3 py-2 shadow-xl animate-float-delayed">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-trading-emerald" />
                  <span className="text-xs font-semibold text-white">Live Signals</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-black/70 backdrop-blur-md border border-trading-emerald/20 rounded-xl px-3 py-2 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-white">Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ──────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 divide-x divide-white/[0.06]">

            {/* Stat 1 */}
            <div className="hero-stat opacity-0 flex flex-col sm:flex-row items-center sm:gap-3 py-6 sm:py-8 justify-center text-center sm:text-left">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-trading-emerald/10 text-trading-emerald mb-2 sm:mb-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span ref={stat1Ref} className="block text-xl sm:text-2xl font-bold text-white font-montserrat">0</span>
                <span className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider">Active Students</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="hero-stat opacity-0 flex flex-col sm:flex-row items-center sm:gap-3 py-6 sm:py-8 justify-center text-center sm:text-left">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-trading-emerald/10 text-trading-emerald mb-2 sm:mb-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span ref={stat2Ref} className="block text-xl sm:text-2xl font-bold text-white font-montserrat">0</span>
                <span className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider">Expert Instructors</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="hero-stat opacity-0 flex flex-col sm:flex-row items-center sm:gap-3 py-6 sm:py-8 justify-center text-center sm:text-left">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-trading-emerald/10 text-trading-emerald mb-2 sm:mb-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span ref={stat3Ref} className="block text-xl sm:text-2xl font-bold text-white font-montserrat">0</span>
                <span className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider">Success Rate</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom edge gradient ────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[3] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
