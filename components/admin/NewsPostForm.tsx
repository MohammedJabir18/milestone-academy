"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { 
  Loader2, Plus, Trash2, X, UploadCloud, Image as ImageIcon, 
  Video as VideoIcon, FileText, Check, Star, Globe, Eye,
  ChevronRight, Calendar, Clock, AlertCircle
} from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
import type { NewsPost } from "@/lib/news";

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().max(160, "Excerpt must be under 160 characters").default(""),
  content: z.string().optional().default(""),
  type: z.enum(["image", "video", "text"]).default("image"),
  category: z.string().min(1, "Category is required"),
  cover_image_url: z.string().nullable().optional(),
  gallery_images: z.array(z.string()).default([]),
  video_url: z.string().nullable().optional(),
  video_type: z.enum(["youtube", "vimeo", "upload"]).nullable().optional(),
  video_thumbnail_url: z.string().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  published_at: z.string().nullable().optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

const CATEGORIES = [
  { id: 'announcement', name: 'Announcement', icon: <Bell size={14} /> },
  { id: 'student_win', name: 'Student Win', icon: <Star size={14} /> },
  { id: 'placement', name: 'Placement', icon: <Globe size={14} /> },
  { id: 'campus', name: 'Campus', icon: <ImageIcon size={14} /> },
  { id: 'event', name: 'Event', icon: <Calendar size={14} /> },
  { id: 'video', name: 'Video', icon: <VideoIcon size={14} /> }
];

import { Bell } from "lucide-react";

export default function NewsPostForm({ initialData }: { initialData?: NewsPost }) {
  const router = useRouter();
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const isEditing = !!initialData;

  const { control, handleSubmit, watch, setValue, register, formState: { errors } } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData ? {
      ...initialData,
      excerpt: initialData.excerpt || "",
      content: initialData.content || "",
      gallery_images: initialData.gallery_images || [],
    } : {
      type: "image",
      is_published: false,
      is_featured: false,
      gallery_images: [],
      published_at: new Date().toISOString(),
    },
  });

  const postType = watch("type");
  const title = watch("title");
  const coverImageUrl = watch("cover_image_url");
  const galleryImages = watch("gallery_images");
  const videoUrl = watch("video_url");
  const videoThumbnailUrl = watch("video_thumbnail_url");
  const excerpt = watch("excerpt") || "";

  // Auto-generate slug
  useEffect(() => {
    if (!isEditing && title) {
      const generatedSlug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [title, isEditing, setValue]);

  const onUpload = useCallback(async (file: File, pathPrefix: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const tempId = initialData?.id || crypto.randomUUID();
      const ext = file.name.split('.').pop();
      const filePath = `${tempId}/${pathPrefix}.${ext}`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "news");
      formData.append("path", filePath);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      return url;
    } catch (err) {
      toast.error("Upload failed");
      return null;
    } finally {
      setIsUploading(false);
    }
  }, [initialData]);

  const onDropCover = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const url = await onUpload(file, "cover");
    if (url) setValue("cover_image_url", url, { shouldValidate: true });
  }, [onUpload, setValue]);

  const onDropGallery = useCallback(async (acceptedFiles: File[]) => {
    if (galleryImages.length + acceptedFiles.length > 8) {
      toast.error("Max 8 gallery images allowed");
      return;
    }
    
    for (const file of acceptedFiles) {
      const url = await onUpload(file, `gallery/${Date.now()}-${file.name}`);
      if (url) setValue("gallery_images", [...galleryImages, url]);
    }
  }, [galleryImages, onUpload, setValue]);

  const { getRootProps: getCoverProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: onDropCover,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const { getRootProps: getGalleryProps, getInputProps: getGalleryInputProps } = useDropzone({
    onDrop: onDropGallery,
    accept: { 'image/*': [] }
  });

  const onSubmit = async (data: NewsFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        const { error } = await supabase.from("news_posts").update(data).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Post updated!");
      } else {
        const { error } = await supabase.from("news_posts").insert(data);
        if (error) throw error;
        toast.success("Post created!");
      }
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* MAIN FORM CONTENT */}
        <div className="flex-1 space-y-12">
          
          {/* STEP 1: POST TYPE */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm">1</span>
              Choose Post Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'image', title: 'Image Post', desc: 'Feature a photo or album', icon: <ImageIcon size={32} /> },
                { id: 'video', title: 'Video Post', desc: 'Share YouTube or recorded video', icon: <VideoIcon size={32} /> },
                { id: 'text', title: 'Text + Image', desc: 'Write news with cover optional', icon: <FileText size={32} /> }
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setValue("type", type.id as any)}
                  className={`
                    relative h-[160px] flex flex-col items-center justify-center rounded-2xl transition-all border-2 group
                    ${postType === type.id 
                      ? 'border-[var(--green-500)] bg-[var(--green-50)] text-[var(--green-700)]' 
                      : 'border-dashed border-stone-200 hover:border-[var(--green-500)] hover:bg-[var(--green-50)]/50 text-stone-400'}
                  `}
                >
                  <div className={`mb-3 transition-transform group-hover:scale-110`}>{type.icon}</div>
                  <span className="font-bold text-sm mb-1">{type.title}</span>
                  <p className="text-[11px] text-center px-4 opacity-70">{type.desc}</p>
                  {postType === type.id && (
                    <div className="absolute top-3 right-3 bg-[var(--green-500)] text-white p-1 rounded-full">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: MEDIA */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm">2</span>
              Media Content
            </h2>

            {/* Image & Text cover dropzone */}
            {(postType === 'image' || postType === 'text') && (
              <div className="space-y-4">
                <Label>Cover Image {postType === 'image' && '*'}</Label>
                <div 
                  {...getCoverProps()} 
                  className={`
                    relative h-[260px] md:h-[320px] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center
                    ${coverImageUrl ? 'border-transparent' : 'border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300'}
                  `}
                >
                  <input {...getCoverInputProps()} />
                  {coverImageUrl ? (
                    <>
                      <Image src={coverImageUrl} alt="Cover" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <Button variant="secondary" className="font-bold pointer-events-auto">Replace Image</Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center px-6">
                      <UploadCloud className="mx-auto mb-4 text-stone-400" size={48} />
                      <p className="font-bold text-stone-700">Drop cover image here or click</p>
                      <p className="text-sm text-stone-400 mt-2">Recommended: 16:9 or 4:5 aspect ratios</p>
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                      <Loader2 className="animate-spin text-[var(--green-500)] mb-4" size={40} />
                      <p className="font-bold text-stone-900">Uploading...</p>
                    </div>
                  )}
                </div>

                {/* Gallery for Image post */}
                {postType === 'image' && (
                  <div className="space-y-4 pt-6">
                    <Label>Image Gallery (Optional, up to 8)</Label>
                    <div className="flex flex-wrap gap-4">
                      {galleryImages.map((url, idx) => (
                        <div key={idx} className="relative w-24 h-20 rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                          <Image src={url} alt={`Gallery ${idx}`} fill className="object-cover" />
                          <button 
                            type="button"
                            onClick={() => setValue("gallery_images", galleryImages.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-lg"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {galleryImages.length < 8 && (
                        <div 
                          {...getGalleryProps()} 
                          className="w-24 h-20 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-400 flex flex-col items-center justify-center cursor-pointer transition-all"
                        >
                          <input {...getGalleryInputProps()} />
                          <Plus className="text-stone-400" size={20} />
                          <span className="text-[9px] font-bold text-stone-400 mt-1 uppercase tracking-wider">Add More</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video content */}
            {postType === 'video' && (
              <div className="space-y-6">
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="bg-stone-100 p-1 rounded-xl mb-6">
                    <TabsTrigger value="url" className="rounded-lg font-bold">Paste URL</TabsTrigger>
                    <TabsTrigger value="upload" className="rounded-lg font-bold">Direct Upload</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label>YouTube or Vimeo Link</Label>
                      <Input 
                        {...register("video_url")}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="rounded-xl border-stone-200 h-12"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4 text-center py-10 border-2 border-dashed border-stone-200 rounded-2xl bg-stone-50">
                    <VideoIcon className="mx-auto mb-4 text-stone-400" size={40} />
                    <p className="font-bold text-stone-700">Video upload coming soon in this UI</p>
                    <p className="text-xs text-stone-400">Please use YouTube/Vimeo links for now.</p>
                  </TabsContent>
                </Tabs>
                
                <div className="space-y-4">
                  <Label>Custom Video Thumbnail</Label>
                  <div 
                    {...getCoverProps()} 
                    className="relative w-full h-[180px] rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 hover:bg-stone-100 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
                  >
                    <input {...getCoverInputProps()} />
                    {coverImageUrl ? (
                      <Image src={coverImageUrl} alt="Video Thumbnail" fill className="object-cover" />
                    ) : (
                      <div className="text-center group">
                        <ImageIcon className="mx-auto mb-2 text-stone-400 group-hover:scale-110 transition-transform" size={32} />
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Select Thumbnail</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* STEP 3: CONTENT */}
          <section className="space-y-8">
            <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm">3</span>
              Post Details
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-stone-500 font-bold uppercase text-[11px] tracking-widest">Post Title *</Label>
                <Input 
                  {...register("title")}
                  placeholder="Your post title..."
                  className="text-3xl font-serif font-bold h-20 border-none px-0 focus-visible:ring-0 placeholder:opacity-20"
                />
                {errors.title && <p className="text-red-500 text-xs font-bold">{errors.title.message}</p>}
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-mono text-stone-400 uppercase">Slug:</span>
                   <Input 
                     {...register("slug")}
                     className="h-6 text-[11px] font-mono border-none bg-stone-50 w-auto px-2 min-w-[200px] text-stone-600 focus-visible:ring-0"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <Label className="text-stone-500 font-bold uppercase text-[11px] tracking-widest">Category *</Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="h-12 rounded-xl border-stone-200">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat.id} value={cat.id} className="font-bold">
                              <div className="flex items-center gap-2">
                                {cat.icon}
                                {cat.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                     <Label className="text-stone-500 font-bold uppercase text-[11px] tracking-widest">Excerpt</Label>
                     <span className={`text-[10px] font-bold ${excerpt.length > 160 ? 'text-red-500' : 'text-stone-300'}`}>
                       {excerpt.length}/160
                     </span>
                   </div>
                   <Textarea 
                     {...register("excerpt")}
                     placeholder="Brief summary for list views..."
                     className="rounded-xl border-stone-200 resize-none h-[76px]"
                     maxLength={160}
                   />
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <Label className="text-stone-500 font-bold uppercase text-[11px] tracking-widest">Post Content</Label>
                <div className="rich-text-wrapper border-t border-stone-100 pt-6 min-h-[400px]">
                  <Controller
                   control={control}
                   name="content"
                   render={({ field }) => (
                     <ReactQuill 
                       value={field.value} 
                       onChange={field.onChange}
                       modules={quillModules}
                       className="news-editor"
                       placeholder="Write your story here..."
                     />
                   )}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR PUBLISHING CONTROLS */}
        <aside className="w-full lg:w-[320px] space-y-6">
          <div className="sticky top-24 space-y-6">
            
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-8">
              <div className="space-y-4">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">Publishing Status</p>
                <Controller
                  control={control}
                  name="is_published"
                  render={({ field }) => (
                    <div className="bg-stone-50 p-1 rounded-xl flex">
                      <button
                        type="button"
                        onClick={() => field.onChange(false)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${!field.value ? 'bg-white shadow-sm text-stone-900 border border-stone-100' : 'text-stone-400'}`}
                      >
                        Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => field.onChange(true)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${field.value ? 'bg-[var(--green-500)] text-white shadow-lift' : 'text-stone-400'}`}
                      >
                        Published
                      </button>
                    </div>
                  )}
                />
              </div>

              <div className="space-y-6 py-4 border-y border-stone-50">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-stone-900">Featured Post</p>
                    <p className="text-[10px] text-stone-400">Pin to top of news feed</p>
                  </div>
                  <Controller
                    control={control}
                    name="is_featured"
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Clock size={16} />
                  <p className="text-[10px] font-bold">Schedule Publish coming soon</p>
                </div>
                
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full justify-start rounded-xl border-stone-200 font-bold h-12"
                  onClick={() => window.open(`/news/${watch("slug")}`, '_blank')}
                  disabled={!watch("slug")}
                >
                  <Eye size={18} className="mr-3" /> Preview Post ↗
                </Button>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[var(--green-600)] hover:bg-[var(--green-700)] text-white font-bold h-12 shadow-lg shadow-green-600/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" /> saving...
                    </>
                  ) : (
                    "Save Post"
                  )}
                </Button>
              </div>
            </div>

            {isEditing && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold py-6 px-4">
                    <Trash2 size={18} className="mr-3" /> Delete Post
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl border-stone-200">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif text-2xl">Remove this post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the post and all its media. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={async () => {
                        await supabase.from("news_posts").delete().eq("id", initialData.id);
                        router.push("/admin/news");
                        router.refresh();
                        toast.success("Post deleted");
                      }}
                      className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                      Delete Forever
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="text-stone-400 shrink-0 mt-0.5" size={18} />
              <p className="text-[11px] leading-relaxed text-stone-500">
                Ensure images are optimized for web (under 2MB) for best performance in the masonry feed.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
