import { createServer } from "@/lib/supabase/server";
import TestimonialTableClient from "@/components/admin/TestimonialTableClient";

export const metadata = {
  title: "Manage Testimonials | Admin Dashboard",
};

export default async function TestimonialsPage() {
  const supabase = await createServer();
  
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select(`*, courses:course_id (title)`)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching testimonials", error);

  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Testimonials</h2>
        <p className="text-stone-500 mt-1">Manage student reviews appearing across the website.</p>
      </div>
      <TestimonialTableClient initialData={testimonials || []} />
    </div>
  );
}
