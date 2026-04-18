"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { Loader2, UploadCloud, X, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const testimonialSchema = z.object({
  student_name: z.string().min(1, "Student name is required"),
  role: z.string().optional().default(""),
  company: z.string().optional().default(""),
  course_id: z.string().optional().or(z.literal('')),
  review_text: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().min(1).max(5).default(5),
  avatar_url: z.string().optional().default(""),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export default function TestimonialForm({ initialData, courses }: { initialData?: any, courses: any[] }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const isEditing = !!initialData;

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      course_id: initialData.course_id || '',
      avatar_url: initialData.avatar_url || '',
      role: initialData.role || '',
      company: initialData.company || '',
      rating: typeof initialData.rating === 'number' ? initialData.rating : 5,
      is_published: Boolean(initialData.is_published),
      is_featured: Boolean(initialData.is_featured),
    } : {
      rating: 5,
      is_published: false,
      is_featured: false,
      course_id: '',
      avatar_url: '',
      role: '',
      company: '',
    },
  });

  const { control, handleSubmit, register, watch, setValue, formState: { errors } } = form;
  const avatarUrl = watch("avatar_url");

  // Avatar Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        toast.error('File must be an image');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB
        toast.error('Image must be less than 2MB');
        return;
      }

      setIsUploading(true);
      
      // File unique name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to bucket
      const { data, error } = await supabase.storage
        .from('milestone-assets')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('milestone-assets')
        .getPublicUrl(filePath);

      setValue('avatar_url', publicUrlData.publicUrl, { shouldValidate: true });
      toast.success('Avatar uploaded successfully');
      
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
      // Reset input value to allow uploading the same file again if aborted
      e.target.value = '';
    }
  };

  const removeAvatar = () => {
    setValue('avatar_url', '', { shouldValidate: true });
  };

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...data,
        course_id: data.course_id === '' ? null : data.course_id,
      };

      if (isEditing) {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Testimonial updated successfully");
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
        if (error) throw error;
        toast.success("Testimonial created successfully");
      }

      router.push("/admin/testimonials");
      router.refresh();
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, (errs) => console.log("Form errors:", errs))} className="space-y-8">
      
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <p className="text-red-500 font-bold mb-2">Please fix the following validation errors:</p>
          <ul className="list-disc pl-5">
            {Object.entries(errors).map(([key, err]) => (
              <li key={key} className="text-red-600 text-sm">{key}: {String((err as any)?.message)}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col - Avatar Upload */}
        <div className="md:col-span-1 space-y-4">
          <Label className="text-base font-semibold">Avatar Image</Label>
          <div className="border border-neutral-200 bg-neutral-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            {avatarUrl ? (
              <div className="relative">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image src={avatarUrl} alt="Avatar preview" fill className="object-cover" />
                </div>
                <button 
                  type="button" 
                  onClick={removeAvatar}
                  className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full translate-x-1/4 -translate-y-1/4 hover:bg-red-600 shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-neutral-200 border-4 border-white flex justify-center items-center mb-2 shadow-sm text-neutral-400">
                {isUploading ? <Loader2 className="animate-spin" size={24} /> : <UploadCloud size={32} />}
              </div>
            )}
            
            <div className="mt-4 w-full">
              <Label 
                htmlFor="avatar-upload" 
                className={`w-full flex items-center justify-center gap-2 cursor-pointer 
                  ${isUploading ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' : 'bg-white border hover:bg-neutral-50 text-neutral-700'} 
                  font-medium py-2 px-4 rounded-md transition-colors text-sm shadow-sm`}
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <p className="text-xs text-neutral-500 mt-2">Max limit: 2MB</p>
            </div>
          </div>
        </div>

        {/* Right Col - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Student Name *</Label>
              <Input {...register("student_name")} placeholder="e.g. John Doe" />
              {errors.student_name && <p className="text-red-500 text-xs">{errors.student_name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>Role</Label>
              <Input {...register("role")} placeholder="e.g. GST Executive" />
            </div>

            <div className="space-y-2">
              <Label>Company</Label>
              <Input {...register("company")} placeholder="e.g. Deloitte Kerala" />
            </div>

            <div className="space-y-2">
              <Label>Associated Course</Label>
              <select 
                {...register("course_id")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">-- No specific course --</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Review Text *</Label>
            <Textarea 
              {...register("review_text")} 
              placeholder="Their actual testimonial..."
              rows={5}
            />
            {errors.review_text && <p className="text-red-500 text-xs">{errors.review_text.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star, { shouldValidate: true })}
                  className="focus:outline-none"
                >
                  <Star 
                    size={24} 
                    className={`${watch("rating") >= star ? "fill-yellow-400 text-yellow-500" : "fill-neutral-100 text-neutral-300"} transition-colors`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-lg border border-neutral-200 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="is_published"
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
              <div className="space-y-0.5">
                <Label className="font-semibold">Published</Label>
                <p className="text-xs text-neutral-500">Visible publicly</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="is_featured"
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
              <div className="space-y-0.5">
                <Label className="font-semibold">Featured</Label>
                <p className="text-xs text-neutral-500">Show on homepage</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-6 border-t flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/testimonials")}
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
          {isEditing ? "Save Changes" : "Create Testimonial"}
        </Button>
      </div>

    </form>
  );
}

