import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7 }
    );
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        '-=0.4'
      );
    }
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5 },
      '-=0.3'
    );
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = ['about', 'testimonials', 'blog', 'contact', 'news'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About Us', sectionId: 'about' },
    { name: 'Testimonials', sectionId: 'testimonials' },
    { name: 'Blog', sectionId: 'blog' },
    { name: 'Contact', sectionId: 'contact' },
    { name: 'News', sectionId: 'news' },
  ];

  return (
    <nav
      ref={navRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-trading-dark/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,200,83,0.08)] border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a
              ref={logoRef}
              href="#"
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-trading-emerald/30 group-hover:ring-trading-emerald/60 transition-all duration-300">
                <img
                  src="/images/logo.svg"
                  alt="Milestone Trading Academy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-3 text-xl font-bold text-white tracking-tight">
                Milestone{' '}
                <span className="text-trading-emerald drop-shadow-[0_0_8px_rgba(0,200,83,0.4)]">
                  Trading
                </span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div ref={linksRef} className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId)}
                className={cn(
                  'relative transition-colors duration-300 font-medium text-sm uppercase tracking-wider group',
                  activeSection === link.sectionId
                    ? 'text-trading-emerald'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-trading-emerald to-trading-emerald/50 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div ref={ctaRef} className="hidden lg:flex items-center space-x-4">
            <Button
              className="bg-gradient-to-r from-trading-emerald to-emerald-500 hover:from-emerald-500 hover:to-trading-emerald text-black font-semibold shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => scrollToSection('contact')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Free Demo Class
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden transition-all duration-400 ease-out overflow-hidden',
          isMenuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 bg-trading-dark/95 backdrop-blur-xl border-t border-white/5">
          {navLinks.map((link, i) => (
            <button
              key={link.name}
              onClick={() => {
                scrollToSection(link.sectionId);
                toggleMenu();
              }}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
                activeSection === link.sectionId
                  ? 'text-trading-emerald bg-trading-emerald/5'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.name}
            </button>
          ))}

          <div className="pt-4 pb-2 border-t border-white/10 mt-4">
            <Button
              className="w-full bg-gradient-to-r from-trading-emerald to-emerald-500 text-black font-semibold justify-center shadow-[0_0_20px_rgba(0,200,83,0.2)]"
              onClick={() => {
                scrollToSection('contact');
                toggleMenu();
              }}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Free Demo Class
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
