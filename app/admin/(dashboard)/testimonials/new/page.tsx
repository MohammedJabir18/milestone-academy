import TestimonialForm from "@/components/admin/TestimonialForm";
import { createServer } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewTestimonialPage() {
  const supabase = await createServer();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title")
    .order("title");

  return (
    <div className="p-12 space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials" className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-500 bg-white shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">New Testimonial</h2>
          <p className="text-stone-500 mt-1">Add a student review manually.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <TestimonialForm courses={courses || []} />
      </div>
    </div>
  );
}
