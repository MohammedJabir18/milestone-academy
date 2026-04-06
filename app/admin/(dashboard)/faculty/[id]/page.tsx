import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServer } from "@/lib/supabase/server";
import FacultyForm from "@/components/admin/FacultyForm";

export const metadata = {
  title: "Edit Faculty | Admin Dashboard",
};

export default async function EditFacultyPage({ params }: { params: { id: string } }) {
  const supabase = await createServer();
  const { id } = await params;
  
  const { data: faculty, error } = await supabase
    .from("faculty")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !faculty) {
    notFound();
  }

  return (
    <div className="p-12 space-y-6 max-w-[1000px] mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/faculty" 
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-500 hover:text-stone-900"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Edit Faculty</h2>
          <p className="text-stone-500 mt-1">Update mentor profile for {faculty.name}.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
        <FacultyForm initialData={faculty} />
      </div>
    </div>
  );
}
