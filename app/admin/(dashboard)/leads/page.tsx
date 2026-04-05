import { createServer } from "@/lib/supabase/server";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Calendar, Filter, MoreHorizontal, Clock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function LeadsPage() {
  const supabase = await createServer();
  
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
  }

  return (
    <div className="p-12 space-y-10 max-w-[1400px]">
      <div>
        <div className="flex items-center gap-3 mb-2 font-sans">
          <Badge className="bg-stone-100 text-stone-600 border-stone-200 font-bold px-2 py-0.5">Live CRM</Badge>
          <span className="text-stone-300 text-sm font-medium">•</span>
          <span className="text-stone-400 text-sm font-medium">Automatic sync enabled</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 tracking-tighter">Student Inquiries</h1>
        <p className="text-stone-500 text-[15px] font-medium mt-1 font-sans">Track and manage potential enrollments from the website contact forms.</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-stone-200 font-bold text-stone-600 gap-2 h-11 px-5 hover:bg-stone-50 transition-all">
            <Filter size={18} className="text-stone-400" /> Filter by Program
          </Button>
          <Button variant="outline" className="rounded-xl border-stone-200 font-bold text-stone-600 gap-2 h-11 px-5 hover:bg-stone-50 transition-all">
            <Clock size={18} className="text-stone-400" /> Sort by Date
          </Button>
        </div>
        
        <div className="text-sm font-bold text-stone-400 font-sans">
           Management Console <span className="text-stone-300 mx-2">|</span> <span className="text-stone-900">{(leads?.length || 0)}</span> Total Leads
        </div>
      </div>

      <Card className="border-stone-200 rounded-[24px] shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-stone-50/50">
            <TableRow className="hover:bg-transparent border-stone-100 h-16">
              <TableHead className="pl-8 font-bold text-stone-900 border-none">Student Name</TableHead>
              <TableHead className="font-bold text-stone-900">Program Interest</TableHead>
              <TableHead className="font-bold text-stone-900">Contact Details</TableHead>
              <TableHead className="font-bold text-stone-900">Submission Date</TableHead>
              <TableHead className="font-bold text-stone-900">Status</TableHead>
              <TableHead className="text-right pr-8 font-bold text-stone-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads && leads.length > 0 ? (
              leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-stone-50/50 border-stone-100 h-24 transition-colors group">
                  <TableCell className="pl-8 font-bold text-stone-900 border-none">
                    <div className="flex flex-col">
                      <span className="text-[15px]">{lead.full_name}</span>
                      <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-1">ID: {lead.id.split('-')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-none whitespace-nowrap">
                    <Badge variant="outline" className="bg-stone-50 border-stone-100 text-stone-600 font-bold capitalize px-3 py-1">
                      {lead.course_slug.replace(/-/g, ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-none">
                    <div className="flex flex-col gap-1.5">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-stone-600 hover:text-[var(--green-600)] transition-colors text-[13px] font-bold">
                        <Phone size={14} className="text-stone-300" /> {lead.phone}
                      </a>
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-stone-400 hover:text-[var(--green-600)] transition-colors text-[12px] font-medium">
                        <Mail size={14} className="text-stone-200" /> {lead.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="border-none">
                    <div className="flex items-center gap-2 text-stone-500 text-[13px] font-medium font-sans">
                      <Calendar size={14} className="text-stone-300" />
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </TableCell>
                  <TableCell className="border-none">
                    <StatusBadge status={lead.status} />
                  </TableCell>
                  <TableCell className="text-right pr-8 border-none">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="rounded-xl hover:bg-stone-100 transition-all text-stone-400 hover:text-[var(--green-600)]">
                         <UserCheck size={18} />
                       </Button>
                       <Button variant="ghost" size="icon" className="rounded-xl hover:bg-stone-100 transition-all text-stone-400 hover:text-stone-900">
                         <MoreHorizontal size={20} />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center text-stone-400 font-medium border-none font-sans">
                   No inquiries found in the database.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    new: { label: 'New Inquiry', class: 'bg-blue-50 text-blue-700 border-blue-100' },
    contacted: { label: 'Contacted', class: 'bg-amber-50 text-amber-700 border-amber-100' },
    interested: { label: 'Interested', class: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    closed: { label: 'Closed', class: 'bg-stone-50 text-stone-700 border-stone-200' },
    junk: { label: 'Junk', class: 'bg-red-50 text-red-700 border-red-100' }
  };

  const config = configs[status] || configs.new;

  return (
    <Badge className={`${config.class} font-bold px-2.5 py-1 rounded-lg border shadow-none font-sans`}>
       {config.label}
    </Badge>
  );
}
