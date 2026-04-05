"use client";

import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

const SECTIONS = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Courses', href: '/admin/courses' },
  { name: 'Course Editor', href: '/admin/courses/new' },
  { name: 'Testimonials', href: '/admin/testimonials' },
  { name: 'Notifications', href: '/admin/notifications' },
  { name: 'Enrollments', href: '/admin/enrollments' },
  { name: 'About Content', href: '/admin/about' },
  { name: 'Contact Info', href: '/admin/contact-info' },
  { name: 'Faculty', href: '/admin/faculty' },
  { name: 'Trading Courses', href: '/admin/trading-courses' },
];

import type { Session } from '@supabase/supabase-js';

export default function AdminTopBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  
  let pageTitle = 'Dashboard';
  for (const section of SECTIONS) {
    if (pathname === section.href || (pathname !== '/admin' && section.href !== '/admin' && pathname?.startsWith(section.href))) {
      pageTitle = section.name;
    }
  }

  // Override specific paths
  if (pathname?.includes('/admin/courses/') && !pathname.endsWith('/new')) {
    pageTitle = 'Edit Course';
  }

  return (
    <header className="sticky top-0 right-0 h-16 bg-white border-b border-neutral-200 z-40 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold text-neutral-800 tracking-tight">{pageTitle}</h1>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="relative text-neutral-500 hover:text-neutral-800 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
        </button>
        
        <div className="flex items-center gap-3 pl-5 border-l border-neutral-200">
          <span className="text-sm font-medium text-neutral-700 hidden sm:block">
            {session?.user?.email}
          </span>
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 uppercase">
            {session?.user?.email?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
