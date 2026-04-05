"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, MessageSquare, Bell, UserPlus,
  Info, Phone, Users, LineChart, LogOut
} from 'lucide-react';
import Image from 'next/image';

const SECTIONS = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard }
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Courses', href: '/admin/courses', icon: BookOpen },
      { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
      { name: 'Notifications', href: '/admin/notifications', icon: Bell }
    ]
  },
  {
    title: 'LEADS & INQUIRIES',
    items: [
      { name: 'Enrollments', href: '/admin/enrollments', icon: UserPlus }
    ]
  },
  {
    title: 'ACADEMY INFO',
    items: [
      { name: 'About Content', href: '/admin/about', icon: Info },
      { name: 'Contact Info', href: '/admin/contact-info', icon: Phone },
      { name: 'Faculty', href: '/admin/faculty', icon: Users }
    ]
  },
  {
    title: 'TRADING',
    items: [
      { name: 'Trading Courses', href: '/admin/trading-courses', icon: LineChart }
    ]
  }
];

import type { Session } from '@supabase/supabase-js';

export default function AdminSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 w-[260px] h-screen bg-[#0A1A0B] border-r border-white/10 flex flex-col text-white z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="relative w-8 h-8">
           <Image src="/logos/milestone-logo-dark.png" alt="Milestone Logo" fill className="object-contain" priority />
        </div>
        <span className="font-bold tracking-wide text-lg text-white">Admin Panel</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="text-xs font-semibold text-white/50 tracking-wider mb-2 px-2">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = item.href === '/admin' ? pathname === item.href : pathname?.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-l-[3px]
                      ${isActive 
                        ? 'bg-[var(--green-500)]/15 text-[var(--green-500)] border-[var(--green-500)]' 
                        : 'text-white/70 hover:text-white hover:bg-white/5 border-transparent'
                      }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold uppercase shrink-0">
            {session?.user?.email?.charAt(0) || 'A'}
          </div>
          <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap text-white/80">
            {session?.user?.email}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
