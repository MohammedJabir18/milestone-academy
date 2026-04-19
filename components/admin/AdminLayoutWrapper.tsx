"use client";

import { TransitionLink } from "@/components/global/PageTransition";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  LogOut, 
  ShieldCheck, 
  Settings,
  Plus, 
  Search, 
  Bell, 
  Menu,
  X,
  ChevronRight, 
  BarChart3, 
  GraduationCap,
  Star,
  BellRing,
  Phone,
  ClipboardList,
  Globe,
  UploadCloud
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  userEmail?: string;
  leadsCount?: number;
}

export default function AdminLayoutWrapper({
  children,
  userEmail,
  leadsCount: initialLeadsCount,
}: AdminLayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [leadsCount, setLeadsCount] = useState(initialLeadsCount || 0);
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch leads count on client
  useEffect(() => {
    const fetchLeadsCount = async () => {
      const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });
      
      if (count !== null) setLeadsCount(count);
    };

    fetchLeadsCount();

    // Set up real-time subscription for new leads
    const channel = supabase
      .channel("admin-leads-count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        () => fetchLeadsCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Close sidebar on navigation change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Redirect if not logged in
  useEffect(() => {
    if (!userEmail) {
      router.push("/admin/login");
    }
  }, [userEmail, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex bg-white font-sans text-stone-900 overflow-x-hidden relative">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white border-r border-stone-200 flex flex-col z-[50]
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-[var(--green-600)] shadow-sm border border-stone-100">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Admin Hub</span>
          </div>
          <button 
            className="lg:hidden p-2 text-stone-400 hover:text-stone-900 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto" data-lenis-prevent="true">
          <p className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-4">Main Menu</p>
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/admin" active={pathname === "/admin"} />
          <NavItem icon={<ClipboardList size={20} />} label="Enrollments" href="/admin/enrollments" active={pathname?.startsWith("/admin/enrollments")} />
          <NavItem icon={<BookOpen size={20} />} label="Courses" href="/admin/courses" active={pathname?.startsWith("/admin/courses")} />
          <NavItem icon={<Star size={20} />} label="Testimonials" href="/admin/testimonials" active={pathname?.startsWith("/admin/testimonials")} />
          <NavItem icon={<Globe size={20} />} label="Milestone Moments" href="/admin/news" active={pathname?.startsWith("/admin/news")} />
          <NavItem icon={<UploadCloud size={20} />} label="Media Library" href="/admin/media" active={pathname?.startsWith("/admin/media")} />
          <NavItem icon={<BellRing size={20} />} label="Notifications" href="/admin/notifications" active={pathname?.startsWith("/admin/notifications")} />
          
          <p className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-10 mb-4">Settings</p>
          <NavItem icon={<Phone size={20} />} label="Contact Info" href="/admin/contact-info" active={pathname?.startsWith("/admin/contact-info")} />
          <NavItem icon={<Users size={20} />} label="Faculty Team" href="/admin/faculty" active={pathname?.startsWith("/admin/faculty")} />
          <NavItem icon={<ShieldCheck size={20} />} label="Security" href="/admin/security" active={pathname?.startsWith("/admin/security")} />

        </nav>

        {/* User Info / Logout Section */}
        <div className="p-6 border-t border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-2xl transition-all hover:bg-white border border-transparent hover:border-stone-100">
            <div className="w-10 h-10 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] font-bold">
              {userEmail?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-stone-900 truncate">Admin</span>
              <span className="text-[11px] text-stone-400 truncate font-medium">{userEmail}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium py-6 px-4"
          >
            <LogOut size={18} className="mr-3" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 min-h-screen transition-all duration-300 lg:ml-72`}>
        {/* Top Header Bar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-stone-100 px-4 sm:px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button 
              className="lg:hidden p-2 text-stone-500 hover:text-stone-900 transition-all active:scale-95"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-xl border border-stone-100 w-full max-w-[400px]">
              <Search size={18} className="text-stone-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search leads..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-stone-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <TransitionLink href="/">
              <Button variant="ghost" className="font-bold text-stone-600 hover:text-stone-900 rounded-xl px-2 sm:px-4 hover:bg-stone-50 h-10 transition-all">
                <Globe size={18} className="sm:mr-2" /> 
                <span className="hidden sm:inline">View Site</span>
              </Button>
            </TransitionLink>
            <div className="h-4 w-[1px] bg-stone-200" />
            <button className="relative text-stone-400 hover:text-stone-900 transition-colors p-2">
              <Bell size={22} />
              {(leadsCount || 0) > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <div className="h-8 w-[1px] bg-stone-100 hidden sm:block" />
            <Link href="/admin/courses/new">
              <Button className="bg-[var(--green-600)] hover:bg-[var(--green-700)] rounded-xl font-bold px-3 sm:px-6 shadow-lg shadow-green-500/20 h-10 transition-all">
                <Plus size={18} className="sm:mr-2" /> 
                <span className="hidden sm:inline">New Course</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-bold ${
        active 
          ? "bg-[var(--green-50)] text-[var(--green-700)] shadow-sm" 
          : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
      }`}
    >
      <span className={active ? "text-[var(--green-600)]" : "text-stone-400"}>{icon}</span>
      <span className="text-[14px] leading-none">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--green-600)]" />}
    </Link>
  );
}
