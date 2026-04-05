import { createServer } from "@/lib/supabase/server";
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight, 
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  const supabase = await createServer();

  // Fetch counts and recent activity
  const [
    { count: leadsCount }, 
    { count: coursesCount }, 
    { count: testimonialsCount },
    { data: recentLeads }
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5)
  ]);

  return (
    <div className="p-12 space-y-10 max-w-[1400px]">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 mb-2 tracking-tighter">Welcome, Admin 👋</h1>
        <p className="text-stone-500 text-[15px] font-medium font-sans">System Monitoring | {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatsCard 
          label="Course Inquiries" 
          value={(leadsCount || 0).toString()} 
          icon={<Users className="text-blue-600" />} 
          trend="Current Total" 
        />
        <StatsCard 
          label="Active Courses" 
          value={(coursesCount || 0).toString()} 
          icon={<BookOpen className="text-emerald-600" />} 
        />
        <StatsCard 
          label="Public Reviews" 
          value={(testimonialsCount || 0).toString()} 
          trend="Published" 
          icon={<GraduationCap className="text-violet-600" />} 
        />
        <StatsCard 
          label="Server Status" 
          value="Online" 
          icon={<ShieldCheck className="text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Leads Activity */}
        <Card className="lg:col-span-2 border-stone-200 rounded-[24px] shadow-sm overflow-hidden bg-white">
          <CardHeader className="border-b border-stone-100 p-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Latest Student Inquiries</CardTitle>
              <Link href="/admin/leads">
                <Button variant="ghost" className="text-xs font-bold text-[var(--green-600)]">Manage All Leads <ChevronRight size={14} className="ml-1" /></Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-stone-100">
              {recentLeads && recentLeads.length > 0 ? (
                recentLeads.map((lead: any) => (
                  <ActivityItem 
                    key={lead.id}
                    title={lead.full_name} 
                    desc={`Inquiry for ${lead.course_slug.replace(/-/g, ' ')}`} 
                    time={new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} 
                    type="enroll" 
                  />
                ))
              ) : (
                <div className="p-12 text-center text-stone-400 font-medium font-sans">No inquiries received yet.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="space-y-8">
          <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white p-8">
            <CardTitle className="text-xl font-bold mb-6">Service Health</CardTitle>
            <div className="space-y-6">
              <ServiceStatus label="Supabase Backend" status="Online" color="bg-emerald-500" />
              <ServiceStatus label="Marketing API" status="Stable" color="bg-emerald-500" />
              <ServiceStatus label="Auth Engine" status="Online" color="bg-emerald-500" />
            </div>
          </Card>

          <Card className="border-none rounded-[24px] shadow-xl bg-gradient-to-br from-stone-800 to-stone-950 text-white p-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2 text-white">System Security</h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">Lead capture is secured via Row Level Security (RLS). Only authenticated admins can manage student data.</p>
              <Link href="/admin/settings">
                <Button className="w-full bg-white text-stone-900 font-bold rounded-xl hover:bg-white/90">Review Security Policy</Button>
              </Link>
            </div>
            <ShieldCheck className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value, trend, icon }: { label: string, value: string, trend?: string, icon: React.ReactNode }) {
  return (
    <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white p-8 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-xl bg-stone-50 group-hover:scale-110 transition-transform duration-300 border border-stone-100">
          {icon}
        </div>
        {trend && (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold px-2 py-0.5">{trend}</Badge>
        )}
      </div>
      <div>
        <p className="text-stone-400 text-[13px] font-bold uppercase tracking-wider mb-1 font-sans">{label}</p>
        <p className="text-3xl font-extrabold text-stone-900 tracking-tight">{value}</p>
      </div>
    </Card>
  );
}

function ActivityItem({ title, desc, time, type }: any) {
  return (
    <div className="p-6 flex gap-4 hover:bg-stone-50 transition-colors">
      <div className={`w-2 mt-1.5 h-2 rounded-full shrink-0 ${
        type === 'enroll' ? 'bg-blue-500' : type === 'update' ? 'bg-amber-500' : 'bg-purple-500'
      }`} />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-stone-900">{title}</span>
        <span className="text-sm text-stone-500 mb-1 leading-relaxed">{desc}</span>
        <span className="text-[11px] font-bold text-stone-300 uppercase font-sans tracking-tight">{time}</span>
      </div>
    </div>
  );
}

function ServiceStatus({ label, status, color }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-stone-900">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-xs font-bold text-stone-500">{status}</span>
      </div>
    </div>
  );
}
