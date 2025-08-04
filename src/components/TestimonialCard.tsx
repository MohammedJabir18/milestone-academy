
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  image,
  content,
  rating,
}) => {
  return (
    <div className="glass-card p-6 rounded-lg flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-trading-emerald">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-trading-emerald text-xs text-black font-semibold rounded-full h-6 w-6 flex items-center justify-center">
            {rating}
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating ? 'text-trading-emerald fill-trading-emerald' : 'text-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <blockquote className="text-gray-300 italic flex-grow">"{content}"</blockquote>
    </div>
  );
};

export default TestimonialCard;
