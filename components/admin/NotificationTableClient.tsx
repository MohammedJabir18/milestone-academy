"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import toast from "react-hot-toast";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { format, isBefore } from "date-fns";

import { DataTable, ColumnDef } from "@/components/admin/DataTable";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function NotificationTableClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const toggleStatus = async (id: string, currentValue: boolean) => {
    const nextValue = !currentValue;
    
    setData(prev => prev.map(item => item.id === id ? { ...item, is_active: nextValue } : item));
    
    const { error } = await supabase
      .from("notifications")
      .update({ is_active: nextValue })
      .eq("id", id);
      
    if (error) {
      toast.error(`Failed to update status`);
      setData(prev => prev.map(item => item.id === id ? { ...item, is_active: currentValue } : item));
    } else {
      toast.success(nextValue ? 'Notification activated' : 'Notification paused');
      router.refresh();
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification banner?")) return;
    
    const { error } = await supabase.from("notifications").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete notification");
    } else {
      toast.success("Notification deleted");
      setData(prev => prev.filter(item => item.id !== id));
      router.refresh();
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Message",
      accessorKey: "message",
      enableSorting: true,
      cell: (row) => (
        <div className="font-medium text-neutral-900 max-w-[300px] truncate" title={row.message}>
          {row.message}
        </div>
      )
    },
    {
      header: "Location",
      accessorKey: "display_location",
      enableSorting: true,
      cell: (row) => (
        <span className="text-xs uppercase bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md tracking-wider">
          {row.display_location.replace('-', ' ')}
        </span>
      )
    },
    {
      header: "Type",
      accessorKey: "type",
      enableSorting: true,
      cell: (row) => {
        let colors = "bg-neutral-100 text-neutral-700";
        if (row.type === "promo") colors = "bg-green-100 text-green-800";
        if (row.type === "info") colors = "bg-blue-100 text-blue-800";
        if (row.type === "warning") colors = "bg-yellow-100 text-yellow-800";
        if (row.type === "success") colors = "bg-green-100 text-green-800";

        return (
          <span className={`text-xs capitalize font-medium px-2.5 py-1 rounded-full ${colors}`}>
            {row.type}
          </span>
        );
      }
    },
    {
      header: "Timeline",
      cell: (row) => {
        const start = row.start_date ? format(new Date(row.start_date), "MMM dd, yy") : "Now";
        const end = row.end_date ? format(new Date(row.end_date), "MMM dd, yy") : "Never";
        return <span className="text-sm text-neutral-500">{start} → {end}</span>;
      }
    },
    {
      header: "State",
      accessorKey: "is_active",
      enableSorting: true,
      cell: (row) => {
        const isExpired = row.end_date ? isBefore(new Date(row.end_date), new Date()) : false;
        
        return (
          <div className="flex items-center gap-3">
            <Switch 
              checked={row.is_active}
              onCheckedChange={() => toggleStatus(row.id, row.is_active)}
            />
            {isExpired ? (
              <span className="text-xs font-semibold text-red-500">Expired</span>
            ) : row.is_active ? (
              <span className="text-xs font-semibold text-green-600">Active</span>
            ) : (
              <span className="text-xs font-semibold text-neutral-400">Paused</span>
            )}
          </div>
        );
      }
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Link href={`/admin/notifications/${row.id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-blue-600">
              <Edit2 size={16} />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => deleteRecord(row.id)} className="h-8 w-8 text-neutral-500 hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable 
      title="Active Banners & Notifications"
      data={data}
      columns={columns}
      searchKey="message"
      searchPlaceholder="Search message content..."
      actionSlot={
        <Link 
          href="/admin/notifications/new" 
          className="flex items-center gap-2 px-4 py-2 bg-[var(--green-500)] text-black rounded-lg hover:bg-green-400 font-medium transition-colors text-sm shadow-sm whitespace-nowrap"
        >
          <PlusCircle size={16} />
          <span className="hidden sm:inline">Add Notification</span>
        </Link>
      }
    />
  );
}

