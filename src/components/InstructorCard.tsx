
import React from 'react';
import { Award, BookOpen, Users } from 'lucide-react';

interface InstructorCardProps {
  name: string;
  role: string;
  image: string;
  experience: string;
  students: string;
  courses: string;
  description: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  role,
  image,
  experience,
  students,
  courses,
  description,
}) => {
  return (
    <div className="glass-card rounded-lg overflow-hidden group">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="p-6 relative z-10 -mt-20">
        <div className="flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-trading-dark bg-trading-dark">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <h3 className="text-white text-xl font-semibold mt-3">{name}</h3>
          <p className="text-trading-emerald font-medium">{role}</p>
          
          <div className="flex justify-between w-full mt-4 mb-4">
            <div className="flex flex-col items-center">
              <Award className="h-5 w-5 text-trading-emerald mb-1" />
              <div className="text-white font-medium">{experience}</div>
              <div className="text-gray-400 text-xs">Experience</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-trading-emerald mb-1" />
              <div className="text-white font-medium">{students}</div>
              <div className="text-gray-400 text-xs">Students</div>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5 text-trading-emerald mb-1" />
              <div className="text-white font-medium">{courses}</div>
              <div className="text-gray-400 text-xs">Courses</div>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mt-2">{description}</p>
          
          <button className="mt-4 px-4 py-2 bg-trading-emerald/20 text-trading-emerald rounded-full text-sm hover:bg-trading-emerald/30 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
