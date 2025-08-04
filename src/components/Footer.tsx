
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-black/80 border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company & Contact Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-trading-emerald to-trading-lightMint flex items-center justify-center">
                <span className="text-trading-dark text-lg font-bold">M</span>
              </div>
              <span className="ml-3 text-lg font-bold text-white">Milestone <span className="text-trading-emerald">Trading</span></span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional trading education for aspiring traders. Learn from experts and take control of your financial future.
            </p>
            <div className="space-y-2">
              <a href="mailto:info@milestonetrading.com" className="flex items-center text-gray-300 hover:text-trading-emerald">
                <Mail className="h-4 w-4 mr-2" />
                info@milestonetrading.com
              </a>
              <a href="tel:+919567362208" className="flex items-center text-gray-300 hover:text-trading-emerald">
                <Phone className="h-4 w-4 mr-2" />
                +91 9567362208
              </a>
              <address className="flex items-start text-gray-300 not-italic">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>Brothers Complex, C.V, Edappal - Ayilakkad Rd, near Near institute<br /> Keezhillam, Kuttikkad, Ponnani<br />Kerala 679577</span>
              </address>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-300 hover:text-trading-emerald transition-colors">Trading Programs</Link></li>
              <li><Link to="/learning-hub" className="text-gray-300 hover:text-trading-emerald transition-colors">Learning Hub</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-trading-emerald transition-colors">About Us</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-trading-emerald transition-colors">Success Stories</Link></li>
              <li><Link to="/free-resources" className="text-gray-300 hover:text-trading-emerald transition-colors">Free Resources</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-trading-emerald transition-colors">Blog & Insights</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-trading-emerald transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li><Link to="/programs/stocks" className="text-gray-300 hover:text-trading-emerald transition-colors">Stock Trading Mastery</Link></li>
              <li><Link to="/programs/forex" className="text-gray-300 hover:text-trading-emerald transition-colors">Forex Fundamentals</Link></li>
              <li><Link to="/programs/options" className="text-gray-300 hover:text-trading-emerald transition-colors">Options Trading Specialization</Link></li>
              <li><Link to="/programs/beginner" className="text-gray-300 hover:text-trading-emerald transition-colors">Beginner Pathways</Link></li>
              <li><Link to="/programs/advanced" className="text-gray-300 hover:text-trading-emerald transition-colors">Advanced Strategies</Link></li>
              <li><Link to="/programs/mentorship" className="text-gray-300 hover:text-trading-emerald transition-colors">Personal Mentorship</Link></li>
              <li><Link to="/programs/certification" className="text-gray-300 hover:text-trading-emerald transition-colors">Expert Certification</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Weekly Market Insights</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for weekly market insights, trading tips, and exclusive educational content.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border-white/10 focus:border-trading-emerald text-white"
              />
              <Button className="w-full bg-trading-emerald hover:bg-trading-emerald/90 text-black">
                Subscribe
              </Button>
            </div>
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/_milestone_academy/" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-trading-emerald transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-trading-emerald transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-trading-emerald transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-trading-emerald transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-trading-emerald transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Milestone Trading Academy. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-gray-300 transition-colors">Risk Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
