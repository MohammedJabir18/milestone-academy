"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import toast from "react-hot-toast";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

import { DataTable, ColumnDef } from "@/components/admin/DataTable";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function TestimonialTableClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const toggleStatus = async (id: string, field: "is_published" | "is_featured", currentValue: boolean) => {
    const nextValue = !currentValue;
    
    setData(prev => prev.map(item => item.id === id ? { ...item, [field]: nextValue } : item));
    
    const { error } = await supabase
      .from("testimonials")
      .update({ [field]: nextValue })
      .eq("id", id);
      
    if (error) {
      toast.error(`Failed to update ${field}`);
      setData(prev => prev.map(item => item.id === id ? { ...item, [field]: currentValue } : item));
    } else {
      toast.success("Updated successfully");
      router.refresh();
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete testimonial");
    } else {
      toast.success("Testimonial deleted");
      setData(prev => prev.filter(item => item.id !== id));
      router.refresh();
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Student",
      accessorKey: "student_name",
      enableSorting: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
            {row.avatar_url ? (
              <Image src={row.avatar_url} alt={row.student_name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex justify-center items-center font-bold text-neutral-400">
                {row.student_name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-neutral-900">{row.student_name}</div>
            <div className="text-xs text-neutral-500">{row.role || 'Student'} {row.company && `at ${row.company}`}</div>
          </div>
        </div>
      )
    },
    {
      header: "Rating",
      accessorKey: "rating",
      enableSorting: true,
      cell: (row) => (
        <div className="flex text-yellow-500 text-sm">
          {"★".repeat(row.rating)}{"☆".repeat(5 - row.rating)}
        </div>
      )
    },
    {
      header: "Course",
      accessorKey: "courses.title",
      enableSorting: true,
      cell: (row) => <span className="text-sm">{row.courses?.title || '—'}</span>
    },
    {
      header: "Published",
      accessorKey: "is_published",
      enableSorting: true,
      cell: (row) => (
        <Switch 
          checked={row.is_published}
          onCheckedChange={() => toggleStatus(row.id, "is_published", row.is_published)}
        />
      )
    },
    {
      header: "Featured",
      accessorKey: "is_featured",
      enableSorting: true,
      cell: (row) => (
        <Switch 
          checked={row.is_featured}
          onCheckedChange={() => toggleStatus(row.id, "is_featured", row.is_featured)}
        />
      )
    },
    {
      header: "Date",
      accessorKey: "created_at",
      enableSorting: true,
      cell: (row) => <span className="text-sm text-neutral-500">{format(new Date(row.created_at), 'MMM dd, yyyy')}</span>
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-2">
          <Link href={`/admin/testimonials/${row.id}`}>
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
      title="Testimonials Database"
      data={data}
      columns={columns}
      searchKey="student_name"
      searchPlaceholder="Search student names..."
      actionSlot={
        <Link 
          href="/admin/testimonials/new" 
          className="flex items-center gap-2 px-4 py-2 bg-[var(--green-500)] text-black rounded-lg hover:bg-green-400 font-medium transition-colors text-sm shadow-sm"
        >
          <PlusCircle size={16} />
          <span>Add Testimonial</span>
        </Link>
      }
      emptyMessage="No testimonials have been added yet."
    />
  );
}

