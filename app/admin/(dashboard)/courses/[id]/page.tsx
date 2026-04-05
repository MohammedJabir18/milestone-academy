import { createServer } from "@/lib/supabase/server";
import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Course | Admin Dashboard",
};

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServer();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) {
    notFound();
  }

  return (
    <div className="p-12 space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/courses" 
          className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-500 transition-colors bg-white shadow-sm"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Edit Course</h2>
          <p className="text-stone-500 mt-1">Updating: {course.title}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <CourseForm initialData={course} />
      </div>
    </div>
  );
}
