
import React, { useState } from 'react';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveDropdown(null);
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
    <nav className="sticky top-0 z-50 bg-trading-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}>
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img src="/images/logo.svg" alt="Milestone Trading Academy" className="w-full h-full object-cover" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">Milestone <span className="text-trading-emerald">Trading</span></span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <button 
                  onClick={() => scrollToSection(link.sectionId)}
                  className="text-gray-300 hover:text-trading-emerald transition-colors duration-200 font-medium green-underline"
                >
                  {link.name}
                </button>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              className="bg-trading-emerald hover:bg-trading-emerald/90 text-black"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-trading-dark/98 border-t border-white/5">
          {navLinks.map((link) => (
            <div key={link.name} className="py-1">
              <button
                onClick={() => {
                  scrollToSection(link.sectionId);
                  toggleMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800/50 hover:text-white"
              >
                {link.name}
              </button>
            </div>
          ))}
          
          <div className="pt-4 pb-2 border-t border-gray-800">
            <div className="space-y-2 px-3">
              <Button 
                className="w-full bg-trading-emerald hover:bg-trading-emerald/90 text-black justify-center"
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
      </div>
    </nav>
  );
};

export default Navbar;
