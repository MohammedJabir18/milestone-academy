import { createServer } from "@/lib/supabase/server";
import NotificationTableClient from "@/components/admin/NotificationTableClient";

export const metadata = {
  title: "Manage Notifications | Admin Dashboard",
};

export default async function NotificationsPage() {
  const supabase = await createServer();
  
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching notifications", error);

  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Notifications</h2>
        <p className="text-stone-500 mt-1">Manage floating banners and timed promotional popups.</p>
      </div>
      <NotificationTableClient initialData={notifications || []} />
    </div>
  );
}
