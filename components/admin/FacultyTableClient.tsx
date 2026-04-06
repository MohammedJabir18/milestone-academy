"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function FacultyTableClient({ initialFaculty }: { initialFaculty: any[] }) {
  const [faculty, setFaculty] = useState(initialFaculty);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    
    // Optimistic update
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    
    const { error } = await supabase
      .from("faculty")
      .update({ status: newStatus })
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update status");
      // Revert
      setFaculty(prev => prev.map(f => f.id === id ? { ...f, status: currentStatus } : f));
    } else {
      toast.success(newStatus ? "Faculty activated" : "Faculty deactivated");
      router.refresh();
    }
  };

  const handleDelete = async (id: string, photo_url: string | null) => {
    try {
      // If there's a photo, delete from storage
      if (photo_url && photo_url.includes('faculty')) {
        // Simple extraction of path from public URL
        const urlParts = photo_url.split('/faculty/');
        if (urlParts.length > 1) {
          const path = urlParts[1];
          await supabase.storage.from("faculty").remove([path]);
        }
      }

      const { error } = await supabase.from("faculty").delete().eq("id", id);
      
      if (error) throw error;
      
      setFaculty(prev => prev.filter(f => f.id !== id));
      toast.success("Faculty member deleted");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  return (
    <div className="w-full relative">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
          <tr>
            <th className="px-6 py-4 font-medium">Photo</th>
            <th className="px-6 py-4 font-medium">Name & Role</th>
            <th className="px-6 py-4 font-medium">Specialization</th>
            <th className="px-6 py-4 font-medium">Courses</th>
            <th className="px-6 py-4 font-medium">Active</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                No faculty members found.
              </td>
            </tr>
          ) : (
            faculty.map((member) => (
              <tr key={member.id} className="bg-white border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 min-w-[100px]">
                  {member.photo_url ? (
                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden relative border border-stone-200">
                      <Image 
                        src={member.photo_url} 
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-[60px] h-[60px] rounded-full bg-stone-200 flex items-center justify-center border border-stone-300">
                      <span className="font-syne font-bold text-xl text-stone-500">
                        {member.name?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-stone-900 text-base">{member.name}</div>
                  <div className="text-stone-500 mt-0.5">{member.role}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-200">
                    {member.specialization}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {member.courses && member.courses.map((c: string, i: number) => (
                      <span key={i} className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Switch 
                    checked={member.status !== false} // Default to true if undefined
                    onCheckedChange={() => toggleStatus(member.id, member.status !== false)}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/faculty/${member.id}`} className="text-stone-400 hover:text-green-600 transition-colors">
                      <Edit size={18} />
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-stone-400 hover:text-red-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {member.name}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the faculty record and their photo from storage.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(member.id, member.photo_url)}
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                          >
                            Delete Record
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
