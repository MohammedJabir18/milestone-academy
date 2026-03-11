import React from 'react';
import { ArrowRight, Clock, BarChart2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  students: number;
  rating: number;
  price: string;
  className?: string;
}

const levelConfig: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/30' },
  Intermediate: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  Advanced: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  Expert: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  level,
  duration,
  students,
  rating,
  price,
  className,
}) => {
  const config = levelConfig[level] ?? { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' };

  return (
    <div
      className={cn(
        'glass-card rounded-2xl overflow-hidden group transition-all duration-500',
        'hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,200,83,0.12)]',
        'border border-white/[0.06] hover:border-trading-emerald/20',
        className
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Level badge */}
        <div
          className={cn(
            'absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold border backdrop-blur-sm',
            config.bg,
            config.text,
            config.border
          )}
        >
          {level}
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-trading-emerald text-sm font-bold px-3 py-1 rounded-full border border-trading-emerald/20">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-trading-emerald transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">{description}</p>

        {/* Meta row */}
        <div className="flex justify-between mb-5 text-sm">
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-trading-emerald/60" />
            {duration}
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <Users className="h-3.5 w-3.5 mr-1.5 text-trading-emerald/60" />
            {students.toLocaleString()}+
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <BarChart2 className="h-3.5 w-3.5 mr-1.5 text-trading-emerald/60" />
            {rating}/5
          </div>
        </div>

        {/* CTA */}
        <div className="pt-5 border-t border-white/[0.06]">
          <button className="interactive-button w-full flex items-center justify-center text-white bg-trading-emerald/15 hover:bg-trading-emerald/25 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group-hover:bg-trading-emerald/20 border border-trading-emerald/20 hover:border-trading-emerald/40">
            Learn More{' '}
            <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
