
import React, { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@milestonetrading.com', 'support@milestonetrading.com'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 9567362208', 'Mon-Sat, 9AM-5PM EST'],
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: [
      'Brothers Complex, C.V, Edappal - Ayilakkad Rd, near Near institute, Keezhillam, Kuttikkad, Ponnani',
      'Kerala 679577',
    ],
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    lines: ['Chat with our support team', 'Available 24/7'],
  },
];

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    svg: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
  },
  {
    label: 'Twitter',
    href: '#',
    svg: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/_milestone_academy',
    svg: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

const ContactSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headingRef, { y: 30 });
  useScrollReveal(infoRef, { x: -40 });
  useScrollReveal(formRef, { x: 40, delay: 0.15 });

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-trading-emerald/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-trading-emerald/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── heading ── */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-trading-emerald/10 text-trading-emerald border border-trading-emerald/20">
            Enroll Now
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Get <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">Started</span> Today
          </h2>
          <p className="text-gray-400 text-lg">
            Ready to transform your trading skills? Contact us today to learn more about our programs or to schedule your free demo class.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ── contact info card ── */}
          <div ref={infoRef} className="rounded-2xl p-8 bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-0.5 h-11 w-11 shrink-0 rounded-xl bg-trading-emerald/10 border border-trading-emerald/20 flex items-center justify-center transition-colors group-hover:bg-trading-emerald/20">
                    <item.icon className="h-5 w-5 text-trading-emerald" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-gray-400 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* social icons */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-trading-emerald/40 hover:bg-trading-emerald/10 transition-all"
                  >
                    <svg className="h-4 w-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d={s.svg} clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── registration form ── */}
          <div ref={formRef} className="rounded-2xl p-8 bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">Register for Free Demo Class</h3>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and our team will reach out within 24 hours.</p>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Registration submitted!', {
                  description: 'Our team will contact you within 24 hours.',
                });
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-400 mb-1.5">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-400 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-gray-400 mb-1.5">Interested Program</label>
                <select
                  id="program"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all"
                >
                  <option value="" className="bg-trading-dark text-gray-300">Select a program</option>
                  <option value="stocks" className="bg-trading-dark text-gray-300">Stock Trading Mastery</option>
                  <option value="forex" className="bg-trading-dark text-gray-300">Forex Trading Strategies</option>
                  <option value="options" className="bg-trading-dark text-gray-300">Options Trading Specialization</option>
                  <option value="other" className="bg-trading-dark text-gray-300">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">Message (Optional)</label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-trading-emerald/50 focus:border-trading-emerald/50 transition-all resize-none"
                  placeholder="Tell us about your trading experience…"
                />
              </div>

              <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-trading-emerald to-trading-lightMint hover:opacity-90 text-black rounded-lg shadow-lg shadow-trading-emerald/20 hover:shadow-trading-emerald/30 transition-all duration-300 transform hover:-translate-y-0.5">
                Register Now
                <Send className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-gray-600">
                By registering, you agree to our terms & privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
