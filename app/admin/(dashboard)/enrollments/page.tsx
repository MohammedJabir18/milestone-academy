import { createServer } from "@/lib/supabase/server";
import EnrollmentsTableClient from "@/components/admin/EnrollmentsTableClient";

export const metadata = {
  title: "Enrollments & Leads | Admin Dashboard",
};

export default async function EnrollmentsPage() {
  const supabase = await createServer();
  
  const [enrollmentsRes, coursesRes] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("courses").select("id, title"),
  ]);

  if (enrollmentsRes.error) console.error("Error fetching enrollments", enrollmentsRes.error);

  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Enrollments & Contacts</h2>
        <p className="text-stone-500 mt-1">Manage student leads, mark contacted status, and export to CSV.</p>
      </div>
      <EnrollmentsTableClient 
        initialData={enrollmentsRes.data || []} 
      />
    </div>
  );
}
