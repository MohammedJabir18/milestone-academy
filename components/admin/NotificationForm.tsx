"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, ArrowRight } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const notificationSchema = z.object({
  message: z.string().min(1, "Message is required").max(120, "Maximum 120 characters"),
  type: z.enum(["info", "success", "warning", "promo"]).default("promo"),
  display_location: z.enum(["top-banner", "hero-popup", "all-pages"]).default("top-banner"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  cta_text: z.string().optional().default(""),
  cta_link: z.string().optional().default(""),
  is_active: z.boolean().default(true),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

function getBannerColors(type: string) {
  switch (type) {
    case 'info': return 'bg-blue-600 border-blue-700 text-white';
    case 'success': return 'bg-green-600 border-green-700 text-white';
    case 'warning': return 'bg-yellow-500 border-yellow-600 text-black';
    case 'promo': return 'bg-[var(--green-500)] border-green-400 text-black';
    default: return 'bg-neutral-800 border-neutral-900 text-white';
  }
}

export default function NotificationForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialData ? {
      ...initialData,
      start_date: initialData.start_date ? format(new Date(initialData.start_date), 'yyyy-MM-dd') : '',
      end_date: initialData.end_date ? format(new Date(initialData.end_date), 'yyyy-MM-dd') : '',
    } : {
      type: "promo",
      display_location: "top-banner",
      is_active: true,
      start_date: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const { control, handleSubmit, register, watch, formState: { errors } } = form;
  
  const formValues = watch();

  const isExpired = formValues.end_date ? isBefore(new Date(formValues.end_date), new Date()) : false;
  // Compute true active state matching the client-side/DB check simulation
  const visuallyActive = formValues.is_active && !isExpired;

  const onSubmit = async (data: NotificationFormValues) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...data,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
      };

      if (isEditing) {
        const { error } = await supabase.from("notifications").update(payload).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Notification updated successfully");
      } else {
        const { error } = await supabase.from("notifications").insert(payload);
        if (error) throw error;
        toast.success("Notification created successfully");
      }

      router.push("/admin/notifications");
      router.refresh();
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      
      {/* Real-time Preview Area */}
      <div className="bg-neutral-100 p-8 rounded-xl border border-neutral-200 shadow-inner flex flex-col items-center justify-center min-h-[160px] overflow-hidden">
        <div className="w-full max-w-4xl opacity-50 mb-2 font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
          Live Preview
        </div>
        
        {/* Banner Preview */}
        <div className={`w-full max-w-4xl py-3 px-4 font-mono text-[13px] relative flex md:justify-center items-center gap-4 ${getBannerColors(formValues.type)}`}>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left font-medium">
            <span>{formValues.message || "Your notification message will appear here..."}</span>
            {formValues.cta_text && (
              <span className="flex items-center gap-1 font-bold underline underline-offset-4 cursor-pointer whitespace-nowrap opacity-90 hover:opacity-100">
                {formValues.cta_text}
                <ArrowRight size={14} />
              </span>
            )}
          </div>
        </div>

        {isExpired && (
          <div className="mt-4 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full border border-red-200">
            Note: This banner is currently expired based on End Date
          </div>
        )}
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Message Content *</Label>
              <span className="text-xs text-neutral-400">{formValues.message?.length || 0}/120</span>
            </div>
            <Input {...register("message")} placeholder="New batch starting May 5th!" maxLength={120} />
            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <select 
                {...register("type")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-50"
              >
                <option value="promo">Promo (Green Focus)</option>
                <option value="info">Info (Blue)</option>
                <option value="success">Success (Green Solid)</option>
                <option value="warning">Warning (Yellow)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Display Location</Label>
              <select 
                {...register("display_location")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-50"
              >
                <option value="top-banner">Top Banner (All Pages)</option>
                <option value="hero-popup">Hero Popup (Home Only)</option>
                <option value="all-pages">All Pages Corner</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Call to Action Text</Label>
              <Input {...register("cta_text")} placeholder="e.g. Enroll Now" />
            </div>
            
            <div className="space-y-2">
              <Label>CTA Link URL</Label>
              <Input {...register("cta_link")} placeholder="e.g. /courses/basic-package" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...register("start_date")} />
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" {...register("end_date")} />
              <p className="text-[10px] text-neutral-500 mt-1">Leaves banner active permanently if blank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-neutral-200 bg-white inline-flex w-full md:w-auto">
        <div className="flex items-center gap-3">
          <Controller
            control={control}
            name="is_active"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <div className="space-y-0.5">
            <Label className="font-semibold text-base">Global Override: Active Status</Label>
            <p className="text-xs text-neutral-500">Toggle off to forcefully hide this banner regardless of dates.</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/notifications")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-[var(--green-500)] text-black hover:bg-green-600 px-8 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Save Changes" : "Create Notification"}
        </Button>
      </div>

    </form>
  );
}

