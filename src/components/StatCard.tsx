
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  className,
  iconClassName,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-2xl p-6 flex flex-col h-full overflow-hidden group bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-trading-emerald/20 hover:shadow-lg hover:shadow-trading-emerald/5',
        className
      )}
    >
      {/* icon circle */}
      <div
        className={cn(
          'absolute -top-3 -right-3 h-20 w-20 rounded-full bg-trading-emerald/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-125',
          iconClassName
        )}
      >
        <Icon className="h-7 w-7 text-trading-emerald/40" />
      </div>

      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">{title}</div>
      <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value}</div>
      <div className="text-sm text-gray-500 mt-auto leading-relaxed">{description}</div>
    </div>
  );
};

export default StatCard;
