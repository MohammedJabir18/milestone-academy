import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Add New Course | Admin Dashboard",
};

export default function NewCoursePage() {
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
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Add New Course</h2>
          <p className="text-stone-500 mt-1">Create a new course in the curriculum.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <CourseForm />
      </div>
    </div>
  );
}
