
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const quickLinks = [
  { to: '/programs', label: 'Trading Programs' },
  { to: '/learning-hub', label: 'Learning Hub' },
  { to: '/about', label: 'About Us' },
  { to: '/testimonials', label: 'Success Stories' },
  { to: '/free-resources', label: 'Free Resources' },
  { to: '/blog', label: 'Blog & Insights' },
  { to: '/contact', label: 'Contact Us' },
];

const programs = [
  { to: '/programs/stocks', label: 'Stock Trading Mastery' },
  { to: '/programs/forex', label: 'Forex Fundamentals' },
  { to: '/programs/options', label: 'Options Trading' },
  { to: '/programs/beginner', label: 'Beginner Pathways' },
  { to: '/programs/advanced', label: 'Advanced Strategies' },
  { to: '/programs/mentorship', label: 'Personal Mentorship' },
  { to: '/programs/certification', label: 'Expert Certification' },
];

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/_milestone_academy/', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef, { y: 20 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black/80 border-t border-white/10 pt-16 pb-8">
      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-trading-emerald/40 to-transparent" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-trading-emerald to-trading-lightMint flex items-center justify-center shadow-lg shadow-trading-emerald/20">
                <span className="text-trading-dark text-lg font-bold">M</span>
              </div>
              <span className="ml-3 text-lg font-bold text-white">
                Milestone <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">Trading</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Professional trading education for aspiring traders. Learn from experts and take control of your financial future.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@milestonetrading.com" className="flex items-center text-sm text-gray-400 hover:text-trading-emerald transition-colors">
                <Mail className="h-4 w-4 mr-2 shrink-0 text-trading-emerald/60" /> info@milestonetrading.com
              </a>
              <a href="tel:+919567362208" className="flex items-center text-sm text-gray-400 hover:text-trading-emerald transition-colors">
                <Phone className="h-4 w-4 mr-2 shrink-0 text-trading-emerald/60" /> +91 9567362208
              </a>
              <address className="flex items-start text-sm text-gray-400 not-italic leading-relaxed">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-trading-emerald/60" />
                <span>Brothers Complex, C.V, Edappal - Ayilakkad Rd,<br />Keezhillam, Kuttikkad, Ponnani<br />Kerala 679577</span>
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-trading-emerald transition-colors hover:translate-x-1 inline-block">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-5">Our Programs</h3>
            <ul className="space-y-2.5">
              {programs.map(p => (
                <li key={p.to}>
                  <Link to={p.to} className="text-sm text-gray-500 hover:text-trading-emerald transition-colors hover:translate-x-1 inline-block">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Socials */}
          <div>
            <h3 className="text-white font-semibold mb-5">Weekly Market Insights</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Subscribe for weekly trading tips, market insights, and exclusive educational content.
            </p>
            <div className="space-y-2.5">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 transition-all"
              />
              <Button className="w-full bg-gradient-to-r from-trading-emerald to-trading-lightMint hover:opacity-90 text-black font-semibold rounded-lg shadow-md shadow-trading-emerald/15">
                Subscribe
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-2">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-trading-emerald/40 hover:bg-trading-emerald/10 transition-all text-gray-400 hover:text-trading-emerald"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Milestone Trading Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-gray-400 transition-colors">Risk Disclaimer</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-trading-emerald/10 hover:border-trading-emerald/30 transition-all text-gray-500 hover:text-trading-emerald"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
