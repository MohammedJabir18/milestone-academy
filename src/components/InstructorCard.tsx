
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

const stats = [
  { key: 'experience', icon: Award, label: 'Experience' },
  { key: 'students', icon: Users, label: 'Students' },
  { key: 'courses', icon: BookOpen, label: 'Courses' },
] as const;

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  role,
  image,
  experience,
  students,
  courses,
  description,
}) => {
  const values: Record<string, string> = { experience, students, courses };

  return (
    <div className="rounded-2xl overflow-hidden group bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-trading-emerald/20 hover:shadow-lg hover:shadow-trading-emerald/5">
      {/* image */}
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* content */}
      <div className="p-6 relative -mt-16">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full overflow-hidden border-[3px] border-trading-emerald/30 shadow-lg shadow-trading-emerald/10">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <h3 className="text-white text-lg font-semibold mt-3">{name}</h3>
          <p className="text-trading-emerald text-sm font-medium">{role}</p>

          {/* stats */}
          <div className="flex justify-between w-full mt-5 mb-4 gap-3">
            {stats.map(s => (
              <div key={s.key} className="flex flex-col items-center flex-1 py-3 rounded-xl bg-white/5">
                <s.icon className="h-4 w-4 text-trading-emerald mb-1.5" />
                <div className="text-white font-semibold text-sm">{values[s.key]}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

          <button className="mt-5 px-5 py-2 bg-trading-emerald/10 text-trading-emerald rounded-full text-sm font-medium border border-trading-emerald/20 hover:bg-trading-emerald/20 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
