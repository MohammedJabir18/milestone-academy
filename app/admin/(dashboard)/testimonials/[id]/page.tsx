import { createServer } from "@/lib/supabase/server";
import TestimonialForm from "@/components/admin/TestimonialForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServer();

  const [testimonialRes, coursesRes] = await Promise.all([
    supabase.from("testimonials").select("*").eq("id", id).single(),
    supabase.from("courses").select("id, title").order("title"),
  ]);

  if (testimonialRes.error || !testimonialRes.data) notFound();

  return (
    <div className="p-12 space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials" className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-500 bg-white shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Edit Testimonial</h2>
          <p className="text-stone-500 mt-1">Update this student review.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <TestimonialForm initialData={testimonialRes.data} courses={coursesRes.data || []} />
      </div>
    </div>
  );
}
