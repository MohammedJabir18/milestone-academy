"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, UploadCloud, Lock, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const facultySchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  specialization: z.string().default(""),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  phone: z.string().default(""),
  bio: z.string().default(""),
  courses: z.array(z.string()).default([]),
  status: z.boolean().default(true),
  sort_order: z.number().default(0),
  photo_url: z.string().nullable().optional(),
});

type FacultyFormValues = z.infer<typeof facultySchema>;

const AVAILABLE_COURSES = [
  { id: "DABS", label: "DABS — Accounting & Business Systems" },
  { id: "DUTC", label: "DUTC — UAE Taxation & Compliance" },
  { id: "PGDAFA", label: "PGDAFA — Accounting & Financial Analytics" },
  { id: "EMDAT", label: "EMDAT — Executive Accounting & Taxation" },
];

export default function FacultyForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const isEditing = !!initialData;

  const defaultValues: Partial<FacultyFormValues> = {
    name: initialData?.name || "",
    role: initialData?.role || "",
    specialization: initialData?.specialization || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    bio: initialData?.bio || "",
    courses: initialData?.courses || [],
    status: initialData?.status !== false,
    sort_order: initialData?.sort_order || 0,
    photo_url: initialData?.photo_url || null,
  };

  const form = useForm<FacultyFormValues>({
    resolver: zodResolver(facultySchema) as any,
    defaultValues,
  });

  const { control, handleSubmit, register, setValue, watch, formState: { errors } } = form;
  const photoUrl = watch("photo_url");

  // Dropzone setup
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is larger than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const tempId = isEditing ? initialData.id : crypto.randomUUID();
      const path = `${tempId}/photo-${Date.now()}.jpg`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "faculty");
      formData.append("path", path);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const { url } = await res.json();
      setValue("photo_url", url, { shouldValidate: true });
      toast.success("Photo uploaded successfully");
    } catch (e: any) {
      toast.error(e.message || "Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  }, [isEditing, initialData, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemovePhoto = async () => {
    if (!photoUrl) return;
    try {
      setValue("photo_url", null, { shouldValidate: true });
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data: FacultyFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.name,
        role: data.role,
        specialization: data.specialization,
        email: data.email || null,
        phone: data.phone || null,
        bio: data.bio,
        courses: data.courses,
        status: data.status,
        sort_order: Number(data.sort_order),
        photo_url: data.photo_url,
      };

      if (isEditing) {
        const { error } = await supabase.from("faculty").update(payload).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Faculty updated successfully");
      } else {
        const { error } = await supabase.from("faculty").insert(payload);
        if (error) throw error;
        toast.success("Faculty created successfully");
      }

      router.push("/admin/faculty");
      router.refresh();
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (photoUrl && photoUrl.includes('faculty')) {
        const urlParts = photoUrl.split('/faculty/');
        if (urlParts.length > 1) {
          await supabase.storage.from("faculty").remove([urlParts[1]]);
        }
      }
      const { error } = await supabase.from("faculty").delete().eq("id", initialData.id);
      if (error) throw error;
      toast.success("Faculty member deleted");
      router.push("/admin/faculty");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* Privacy Notice Notice */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl flex items-start gap-3 mb-6">
        <Lock className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
        <div className="text-sm">
          <strong>Privacy Notice:</strong> Email and phone fields are stored securely and NEVER displayed
          on the public website. Only visible to administrators.
        </div>
      </div>

      {/* Photo Upload area */}
      <section className="flex flex-col items-center justify-center py-4">
        <div className="relative group rounded-full">
          {photoUrl ? (
            <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-stone-100 shadow-sm">
              <Image src={photoUrl} alt="Preview" fill className="object-cover object-top" />
              
              {/* Replace Overlay */}
              <div 
                {...getRootProps()} 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
              >
                <input {...getInputProps()} />
                <UploadCloud size={32} className="mb-2" />
                <span className="text-sm font-medium">Replace Photo</span>
              </div>
              
              {/* Remove button */}
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10 shadow-sm"
              >
                <X size={16} />
              </button>
              
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                  <Loader2 className="animate-spin text-[var(--green-600)]" size={32} />
                </div>
              )}
            </div>
          ) : (
            <div 
              {...getRootProps()} 
              className={`w-[200px] h-[200px] rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragActive ? 'border-[var(--green-500)] bg-[var(--green-50)]' : 'border-stone-300 bg-stone-50 hover:bg-stone-100'}`}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <Loader2 className="animate-spin text-stone-400" size={32} />
              ) : (
                <>
                  <UploadCloud size={32} className="text-stone-400 mb-2" />
                  <span className="text-sm text-stone-500 font-medium">Drop photo or click</span>
                  <span className="text-xs text-stone-400 mt-1">JPEG/PNG/WebP, max 5MB</span>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="h-[1px] bg-stone-100 w-full" />

      {/* Basic Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label>Name *</Label>
          <Input {...register("name")} placeholder="e.g. Dr. Sarah Varghese" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Role *</Label>
          <Input {...register("role")} placeholder="e.g. Senior Instructor" />
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Specialization</Label>
          <Input {...register("specialization")} placeholder="e.g. Corporate Finance & Taxation" />
        </div>

        <div className="space-y-2 relative">
          <Label className="flex items-center gap-1">
            Email <span title="Private — not shown publicly"><Lock size={12} className="text-stone-400" /></span>
          </Label>
          <Input {...register("email")} type="email" placeholder="sarah@milestone.com" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-2 relative">
          <Label className="flex items-center gap-1">
            Phone <span title="Private — not shown publicly"><Lock size={12} className="text-stone-400" /></span>
          </Label>
          <Input {...register("phone")} placeholder="+971 50 XXXXXXX" />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label>Bio</Label>
          <Textarea {...register("bio")} placeholder="Short professional biography..." rows={5} />
        </div>
      </section>

      <div className="h-[1px] bg-stone-100 w-full" />

      {/* Courses Taught */}
      <section className="space-y-4">
        <Label className="text-base">Which programs does this faculty teach?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Controller
            name="courses"
            control={control}
            render={({ field }) => (
              <>
                {AVAILABLE_COURSES.map((course) => {
                  const isChecked = field.value.includes(course.id);
                  return (
                    <div 
                      key={course.id}
                      onClick={() => {
                        const newArr = isChecked 
                          ? field.value.filter(id => id !== course.id)
                          : [...field.value, course.id];
                        field.onChange(newArr);
                      }}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-colors flex items-center gap-3 select-none
                        ${isChecked ? 'border-[var(--green-500)] bg-[var(--green-50)]' : 'border-stone-200 bg-white hover:border-stone-300'}
                      `}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isChecked ? 'bg-[var(--green-500)] border-[var(--green-500)] text-white' : 'border-stone-300'}`}>
                        {isChecked && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`font-medium ${isChecked ? 'text-green-900' : 'text-stone-700'}`}>
                        {course.label}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          />
        </div>
      </section>

      <div className="h-[1px] bg-stone-100 w-full" />

      {/* Settings */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg border border-stone-100">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <div className="space-y-0.5">
              <Label className="font-semibold cursor-pointer">Active Faculty</Label>
              <p className="text-xs text-stone-500">Inactive faculty are hidden from public pages.</p>
            </div>
          </div>
          
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="font-semibold">Sort Order</Label>
              <p className="text-xs text-stone-500">Lower numbers appear first.</p>
            </div>
            <Input type="number" {...register("sort_order", { valueAsNumber: true })} className="w-24 text-right bg-white" />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="pt-6 border-t flex justify-between items-center bg-white sticky bottom-0 py-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10 px-2 mt-4 rounded-b-2xl">
        {isEditing ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                <Trash2 size={16} className="mr-2" />
                Delete Faculty
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the faculty record for {initialData.name}. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 focus:ring-red-500">
                  Delete Record
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <div /> // Spacer
        )}

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push("/admin/faculty")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-[var(--green-500)] text-black hover:bg-green-600 px-8 disabled:opacity-70"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? "Save Changes" : "Save Faculty"}
          </Button>
        </div>
      </div>
    </form>
  );
}
