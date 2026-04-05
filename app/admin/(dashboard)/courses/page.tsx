import { createServer } from "@/lib/supabase/server";
import CoursesTableClient from "@/components/admin/CoursesTableClient";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata = {
  title: "Manage Courses | Admin Dashboard",
};

export default async function CoursesPage() {
  const supabase = await createServer();
  
  const { data: courses, error } = await supabase
    .from("courses")
    .select("id, title, slug, badge, duration, price, is_published, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses", error);
  }

  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Course Catalog</h2>
          <p className="text-stone-500 mt-1">Manage your training programs, curriculum modules, and pricing.</p>
        </div>
        <Link 
          href="/admin/courses/new" 
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--green-500)] text-black rounded-xl hover:bg-green-400 font-bold transition-colors text-sm shadow-sm"
        >
          <PlusCircle size={16} />
          <span>Add New Course</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <CoursesTableClient initialCourses={courses || []} />
      </div>
    </div>
  );
}
