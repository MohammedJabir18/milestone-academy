import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, image, content, rating }) => {
  return (
    <div className="glass-card p-7 rounded-2xl flex flex-col h-full group hover:border-trading-emerald/20 transition-all duration-400 hover:-translate-y-1 border border-white/[0.06] relative overflow-hidden">
      {/* Decorative quote icon */}
      <Quote className="absolute top-5 right-5 h-10 w-10 text-trading-emerald/8 group-hover:text-trading-emerald/15 transition-colors duration-500" />

      {/* Header */}
      <div className="flex items-center mb-5">
        <div className="relative">
          <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-trading-emerald/40 group-hover:border-trading-emerald/70 transition-colors duration-300 ring-2 ring-trading-emerald/10">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-trading-emerald text-[10px] text-black font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
            {rating}
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-white font-semibold group-hover:text-trading-emerald transition-colors duration-300">
            {name}
          </h4>
          <p className="text-gray-400 text-sm">{role}</p>
          <div className="flex mt-1.5 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating ? 'text-trading-emerald fill-trading-emerald' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <blockquote className="text-gray-300 italic flex-grow leading-relaxed text-[15px]">
        "{content}"
      </blockquote>

      {/* Bottom gradient line */}
      <div className="mt-5 h-[2px] w-full bg-gradient-to-r from-transparent via-trading-emerald/20 to-transparent group-hover:via-trading-emerald/40 transition-all duration-500" />
    </div>
  );
};

export default TestimonialCard;
