
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TradeChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  change: string;
  isPositive: boolean;
}

const TradeChart: React.FC<TradeChartProps> = ({ data, title, change, isPositive }) => {
  return (
    <div className="glass-card rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">{title}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
        }`}>
          {change}
        </div>
      </div>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#00C853" : "#f44336"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isPositive ? "#00C853" : "#f44336"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#9e9e9e' }}
              axisLine={{ stroke: '#333' }}
              tickLine={{ stroke: '#333' }}
            />
            <YAxis 
              hide={true}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '4px' }}
              labelStyle={{ color: '#e0e0e0' }}
              itemStyle={{ color: isPositive ? '#00C853' : '#f44336' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#00C853" : "#f44336"} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: isPositive ? "#00C853" : "#f44336", strokeWidth: 2, fill: '#1e1e1e' }}
              fillOpacity={1}
              fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradeChart;
