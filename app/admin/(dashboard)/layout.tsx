import { createServer } from "@/lib/supabase/server";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Plus, 
  Search, 
  Bell, 
  ChevronRight, 
  BarChart3, 
  GraduationCap,
  Star,
  BellRing,
  Phone,
  ClipboardList,
  Globe
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServer();
  const { data: { user } } = await supabase.auth.getUser();

  // NOTE: Auth check is handled by middleware.ts for all /admin routes.
  // We just fetch the user here for the UI profile.
  
  // Fetch count for the notification circle
  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex bg-white font-sans text-stone-900 overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-stone-200 flex flex-col h-screen fixed top-0 left-0">
        <div className="p-8 pb-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-[var(--green-600)] shadow-sm border border-stone-100">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-900">Admin Hub</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto" data-lenis-prevent="true">
          <p className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-4">Main Menu</p>
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/admin" />
          <NavItem icon={<ClipboardList size={20} />} label="Enrollments" href="/admin/enrollments" />
          <NavItem icon={<BookOpen size={20} />} label="Courses" href="/admin/courses" />
          <NavItem icon={<Star size={20} />} label="Testimonials" href="/admin/testimonials" />
          <NavItem icon={<BellRing size={20} />} label="Notifications" href="/admin/notifications" />
          
          <p className="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-widest mt-10 mb-4">Settings</p>
          <NavItem icon={<Phone size={20} />} label="Contact Info" href="/admin/contact-info" />
          <NavItem icon={<Settings size={20} />} label="Site Config" href="/admin/settings" />
          <NavItem icon={<ShieldCheck size={20} />} label="Security" href="/admin/security" />
        </nav>

        {/* User Info / Logout Section */}
        <div className="p-6 border-t border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-2xl transition-all hover:bg-white border border-transparent hover:border-stone-100">
            <div className="w-10 h-10 rounded-full bg-[var(--green-100)] flex items-center justify-center text-[var(--green-700)] font-bold">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-stone-900 truncate">{user?.email?.split("@")[0] || "Admin"}</span>
              <span className="text-[11px] text-stone-400 truncate font-medium">Administrator</span>
            </div>
          </div>
          
          <form action="/auth/signout" method="post">
            <Button variant="ghost" className="w-full justify-start text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium py-6 px-4">
              <LogOut size={18} className="mr-3" /> Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 min-h-screen">
        {/* Top Header Bar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-stone-100 px-10 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-xl border border-stone-100 w-[400px]">
            <Search size={18} className="text-stone-400" />
            <input 
              type="text" 
              placeholder="Search leads, courses..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder:text-stone-300"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="ghost" className="font-bold text-stone-600 hover:text-stone-900 rounded-xl px-4 hover:bg-stone-50">
                <Globe size={18} className="mr-2" /> View Site
              </Button>
            </Link>
            <div className="h-4 w-[1px] bg-stone-200" />
            <button className="relative text-stone-400 hover:text-stone-900 transition-colors">
              <Bell size={22} />
              {(leadsCount || 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <div className="h-8 w-[1px] bg-stone-100" />
            <Link href="/admin/courses/new">
              <Button className="bg-[var(--green-600)] hover:bg-[var(--green-700)] rounded-xl font-bold px-6 shadow-lg shadow-green-500/20">
                <Plus size={18} className="mr-2" /> New Course
              </Button>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        {children}
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
