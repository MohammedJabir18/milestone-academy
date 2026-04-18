import { createServer } from "@/lib/supabase/server";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <AdminLayoutWrapper 
      userEmail={user?.email} 
    >
      {children}
    </AdminLayoutWrapper>
  );
}
