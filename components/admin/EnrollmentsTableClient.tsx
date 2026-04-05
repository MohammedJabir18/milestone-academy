"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import toast from "react-hot-toast";
import { Eye, Download, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { DataTable, ColumnDef } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type LeadStatus = 'new' | 'contacted' | 'interested' | 'closed' | 'junk';

export default function EnrollmentsTableClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const updateStatus = async (id: string, newStatus: LeadStatus) => {
    const previousState = data.find(item => item.id === id)?.status;
    
    // Optimistic Update
    setData(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update status");
      setData(prev => prev.map(item => item.id === id ? { ...item, status: previousState } : item));
    } else {
      toast.success(`Status updated to ${newStatus}`);
      router.refresh();
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry forever?")) return;
    
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete record");
    } else {
      toast.success("Lead completely removed");
      setData(prev => prev.filter(item => item.id !== id));
      router.refresh();
    }
  };

  const exportCSV = () => {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Name", "Phone", "Email", "Course Slug", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => {
        return [
          `"${row.full_name || ''}"`,
          `"${row.phone || ''}"`,
          `"${row.email || ''}"`,
          `"${row.course_slug || ''}"`,
          `"${row.status}"`,
          `"${format(new Date(row.created_at), 'yyyy-MM-dd HH:mm:ss')}"`
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `milestone_leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openDetails = (row: any) => {
    setSelectedItem(row);
    setDialogOpen(true);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Lead Profile",
      accessorKey: "full_name",
      enableSorting: true,
      cell: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">{row.full_name}</span>
            {row.status === 'new' && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </div>
          <span className="text-xs text-neutral-500">{row.phone} {row.email && `• ${row.email}`}</span>
        </div>
      )
    },
    {
      header: "Course Interest",
      accessorKey: "course_slug",
      enableSorting: true,
      cell: (row) => (
        <span className="text-sm font-medium capitalize">
          {(row.course_slug || 'General Inquiry').replace(/-/g, ' ')}
        </span>
      )
    },
    {
      header: "Date",
      accessorKey: "created_at",
      enableSorting: true,
      cell: (row) => <span className="text-sm text-neutral-500">{format(new Date(row.created_at), 'MMM dd, yyyy')}</span>
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: true,
      cell: (row) => {
        let colors = "bg-neutral-100 text-neutral-700 border-neutral-200";
        if (row.status === "new") colors = "bg-blue-50 text-blue-600 border border-blue-200";
        if (row.status === "contacted") colors = "bg-amber-50 text-amber-600 border border-amber-200";
        if (row.status === "interested") colors = "bg-green-50 text-green-700 border border-green-200";
        if (row.status === "junk") colors = "bg-red-50 text-red-600 border border-red-200";
        if (row.status === "closed") colors = "bg-neutral-100 text-neutral-500 border border-neutral-200";

        return (
          <select 
            value={row.status}
            onChange={(e) => updateStatus(row.id, e.target.value as LeadStatus)}
            className={`text-xs px-2.5 py-1.5 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-200 cursor-pointer appearance-none ${colors}`}
          >
            <option value="new">● New Inquiry</option>
            <option value="contacted">● Contacted</option>
            <option value="interested">● Interested</option>
            <option value="closed">● Closed</option>
            <option value="junk">● Junk</option>
          </select>
        );
      }
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => openDetails(row)} className="h-8 w-8 text-neutral-500 hover:text-[var(--green-500)]">
            <Eye size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteRecord(row.id)} className="h-8 w-8 text-neutral-500 hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable 
        title="Student Inquiries & Leads"
        data={data}
        columns={columns}
        searchKey="full_name"
        searchPlaceholder="Search leads by name..."
        actionSlot={
          <Button 
            onClick={exportCSV}
            variant="outline"
            className="flex items-center gap-2 border-neutral-300 shadow-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        }
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Inquiry Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedItem && format(new Date(selectedItem.created_at), "MMMM do, yyyy 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Name</p>
                  <p className="font-semibold text-neutral-900">{selectedItem.full_name}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Status</p>
                  <span className="inline-flex capitalize text-sm font-semibold">{selectedItem.status}</span>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${selectedItem.phone}`} className="text-blue-600 hover:underline">{selectedItem.phone}</a>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-1">Email</p>
                  {selectedItem.email ? (
                    <a href={`mailto:${selectedItem.email}`} className="text-blue-600 hover:underline">{selectedItem.email}</a>
                  ) : (
                    <span className="text-neutral-400">Not provided</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider mb-2">Interested Course</p>
                <div className="p-3 bg-white border border-neutral-200 rounded-md font-medium text-neutral-900 capitalize">
                  {(selectedItem.course_slug || 'General Inquiry').replace(/-/g, ' ')}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
