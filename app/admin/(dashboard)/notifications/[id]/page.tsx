import { createServer } from "@/lib/supabase/server";
import NotificationForm from "@/components/admin/NotificationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditNotificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServer();

  const { data: notification, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !notification) notFound();

  return (
    <div className="p-12 space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/notifications" className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-500 bg-white shadow-sm">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Edit Notification</h2>
          <p className="text-stone-500 mt-1">Update an existing banner.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <NotificationForm initialData={notification} />
      </div>
    </div>
  );
}
