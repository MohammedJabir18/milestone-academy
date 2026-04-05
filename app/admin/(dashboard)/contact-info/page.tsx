import { createServer } from "@/lib/supabase/server";
import ContactInfoForm from "@/components/admin/ContactInfoForm";

export const metadata = {
  title: "Contact Information | Admin Dashboard",
};

export default async function ContactInfoPage() {
  const supabase = await createServer();
  
  const { data: contactData, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "contact")
    .maybeSingle();

  if (error) console.error("Error fetching contact info", error);

  return (
    <div className="p-12 space-y-8 max-w-5xl">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-900">Global Contact Information</h2>
        <p className="text-stone-500 mt-1 max-w-2xl">
          Update addresses, phone numbers, and social links here. Changes reflect instantly in the footer and contact page.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <ContactInfoForm 
          initialData={contactData?.content} 
          rowId={contactData?.id} 
        />
      </div>
    </div>
  );
}
