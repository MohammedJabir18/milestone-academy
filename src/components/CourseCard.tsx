
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
  // Function to get level color
  const getLevelColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Advanced':
        return 'bg-orange-500';
      case 'Expert':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-lg overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg",
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className={`absolute top-4 left-4 ${getLevelColor()} text-white text-xs px-2 py-1 rounded-full font-medium`}>
          {level}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-trading-emerald transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="flex justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <Users className="h-4 w-4 mr-1" />
            {students}+ students
          </div>
          <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors">
            <BarChart2 className="h-4 w-4 mr-1" />
            {rating}/5 rating
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="text-trading-emerald font-semibold">{price}</div>
          <button className="interactive-button flex items-center text-white bg-trading-emerald/20 hover:bg-trading-emerald/30 px-3 py-1.5 rounded-full text-sm transition-all duration-300 transform group-hover:scale-105">
            Learn More <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
