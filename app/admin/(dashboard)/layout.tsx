import { createServer } from "@/lib/supabase/server";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServer();
  const { data: { user } } = await supabase.auth.getUser();

  // NOTE: Auth check is handled by middleware.ts for all /admin routes.
  // We just fetch the user here for the UI profile.
  
  // Fetch count for the notification circle
  const { count: leadsCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  return (
    <AdminLayoutWrapper 
      userEmail={user?.email} 
      leadsCount={leadsCount || 0}
    >
      {children}
    </AdminLayoutWrapper>
  );
}
