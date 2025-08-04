
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
    <div className={cn(
      "glass-card p-6 rounded-lg flex flex-col h-full relative overflow-hidden group",
      className
    )}>
      <div className={cn(
        "absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 h-24 w-24 rounded-full bg-trading-emerald/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
        iconClassName
      )}>
        <Icon className="h-8 w-8 text-trading-emerald opacity-50" />
      </div>
      <div className="mb-2 text-gray-400">{title}</div>
      <div className="text-3xl font-bold mb-2 text-white">{value}</div>
      <div className="text-sm text-gray-400 mt-auto">{description}</div>
    </div>
  );
};

export default StatCard;
