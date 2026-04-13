"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  emails: z.string().min(1, "Primary email is required"),
  whatsapp: z.string().optional(),
  office_hours: z.string().optional(),
  phones: z.array(z.object({ number: z.string() })).min(1, "At least one phone is required"),
  branches: z.array(
    z.object({
      name: z.string().min(1, "Branch name is required"),
      address: z.string().min(1, "Address is required"),
      google_maps_url: z.string().optional(),
    })
  ).min(1, "At least one branch is required"),
  social: z.object({
    instagram: z.string().optional(),
    youtube: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactInfoForm({ initialData, rowId }: { initialData?: any, rowId?: string }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse existing JSON or default mapping
  const content = initialData || {};

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      emails: content.emails || "milestone.pni@gmail.com",
      whatsapp: content.whatsapp || "",
      office_hours: content.office_hours || "Mon - Sat: 9:30 AM - 6:00 PM",
      phones: content.phones?.length ? content.phones.map((p: string) => ({ number: p })) : [{ number: "" }],
      branches: content.branches || [{ name: "Ponnani Branch", address: "C V BROTHERS COMPLEX, KUTTIKAD, PONNANI — 679577", google_maps_url: "" }],
      social: {
        instagram: content.social?.instagram || "",
        youtube: content.social?.youtube || "",
        facebook: content.social?.facebook || "",
        linkedin: content.social?.linkedin || "",
      }
    },
  });

  const { control, handleSubmit, register, formState: { errors } } = form;

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: "phones",
  });

  const { fields: branchFields, append: appendBranch, remove: removeBranch } = useFieldArray({
    control,
    name: "branches",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Map structures appropriately
      const payloadMap = {
        emails: data.emails,
        whatsapp: data.whatsapp,
        office_hours: data.office_hours,
        phones: data.phones.map(p => p.number),
        branches: data.branches,
        social: data.social,
      };

      if (rowId) {
        // Update existing row
        const { error } = await supabase
          .from("site_content")
          .update({ content: payloadMap, updated_at: new Date().toISOString() })
          .eq("id", rowId);
        if (error) throw error;
      } else {
        // Insert new row
        const { error } = await supabase
          .from("site_content")
          .insert({ section: "contact", content: payloadMap });
        if (error) throw error;
      }

      toast.success("Contact Information updated globally");
      router.refresh();
      
    } catch (error: any) {
      toast.error(error.message || "Failed to update contact content");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      
      {/* Basic Profile */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Direct Contact Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Email Addresses (Comma separated if multiple)</Label>
            <Input {...register("emails")} placeholder="support@milestone.academy" />
            {errors.emails && <p className="text-red-500 text-xs">{errors.emails.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>WhatsApp Number (With country code, no +)</Label>
            <Input {...register("whatsapp")} placeholder="919876543210" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Office Display Hours</Label>
            <Input {...register("office_hours")} placeholder="e.g. Mon-Fri 9AM-5PM" />
          </div>
        </div>
      </section>

      {/* Phone Numbers Multi-input */}
      <section className="space-y-4 border p-4 rounded-xl bg-neutral-50/50">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold">Phone Numbers</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendPhone({ number: "" })}>
            <Plus size={16} className="mr-1" /> Add Number
          </Button>
        </div>
        
        <div className="space-y-3">
          {phoneFields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="flex-1 space-y-1">
                <Input {...register(`phones.${index}.number`)} placeholder={`e.g. +91 98765 43210`} />
                {errors.phones?.[index]?.number && <p className="text-red-500 text-xs">Number required</p>}
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => removePhone(index)}
                disabled={phoneFields.length === 1}
                className="text-neutral-400 hover:text-red-500 hover:bg-red-50 px-2"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Branches Multi-input */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">Physical Addresses & Branches</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => appendBranch({ name: "", address: "", google_maps_url: "" })}>
            <Plus size={16} className="mr-1" /> Add Branch
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branchFields.map((field, index) => (
            <div key={field.id} className="border border-neutral-200 bg-white rounded-lg p-5 relative">
              <button 
                type="button" 
                onClick={() => removeBranch(index)}
                disabled={branchFields.length === 1}
                className="absolute top-2 right-2 p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-0"
              >
                <Trash2 size={16} />
              </button>
              
              <div className="space-y-4 mt-2">
                <div className="space-y-1">
                  <Label>Branch Label</Label>
                  <Input {...register(`branches.${index}.name`)} placeholder="e.g. Kochi Office" />
                  {errors.branches?.[index]?.name && <p className="text-red-500 text-xs">Required</p>}
                </div>
                
                <div className="space-y-1">
                  <Label>Full Address</Label>
                  <Textarea {...register(`branches.${index}.address`)} placeholder="Street, Floor, City, Pin" rows={3} />
                  {errors.branches?.[index]?.address && <p className="text-red-500 text-xs">Required</p>}
                </div>

                <div className="space-y-1">
                  <Label>Google Maps URL (Optional)</Label>
                  <Input {...register(`branches.${index}.google_maps_url`)} placeholder="https://maps.google.com/..." />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Social Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input {...register("social.instagram")} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label>YouTube URL</Label>
            <Input {...register("social.youtube")} placeholder="https://youtube.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Facebook URL</Label>
            <Input {...register("social.facebook")} placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input {...register("social.linkedin")} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
      </section>
      
      <div className="pt-6 border-t flex justify-end">
        <Button 
          type="submit" 
          className="bg-[var(--green-500)] text-black hover:bg-green-600 px-8 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish Contact Changes
        </Button>
      </div>

    </form>
  );
}

