"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type EnrollmentData = { date: string; rawDate?: string; count: number };

export function EnrollmentsLineChart({ data }: { data: EnrollmentData[] }) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#2D9E44" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#2D9E44" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type CourseData = { title: string; enrolled_count: number };

export function CoursesBarChart({ data }: { data: CourseData[] }) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
          <XAxis 
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis 
            dataKey="title" 
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#374151" }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="enrolled_count" 
            fill="#2D9E44" 
            radius={[0, 4, 4, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
