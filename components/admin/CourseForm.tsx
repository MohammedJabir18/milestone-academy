"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";
import { 
  Loader2, Plus, Trash2, ArrowUp, ArrowDown, X, ChevronDown, ChevronUp
} from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Dynamic import for React-Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Zod schema
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  tagline: z.string().optional().default(""),
  description: z.string().optional().default(""),
  badge: z.string().optional().default(""),
  badge_color: z.enum(["green", "gold", "blue", "red"]).default("green"),
  duration: z.string().optional().default(""),
  price: z.number().nullable().optional(),
  original_price: z.number().nullable().optional(),
  level: z.string().optional().default(""),
  category: z.string().optional().default(""),
  icon: z.string().optional().default(""),
  gradient: z.string().optional().default(""),
  rating: z.number().min(0).max(5).default(4.8),
  topics: z.array(z.string()).default([]),
  highlights_text: z.string().optional().default(""),
  who_is_it_for: z.string().optional().default(""),
  modules: z.array(
    z.object({
      title: z.string().min(1, "Module title is required"),
      topics: z.array(z.string()).default([]),
    })
  ).default([]),
  is_published: z.boolean().default(true),
  is_trading: z.boolean().default(false),
  sort_order: z.number().default(0),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// Quill modules
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

// --- Subcomponent: Tag Input ---
function TagInput({ tags, onChange }: { tags: string[], onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.trim();
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        setInput("");
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">
            {tag}
            <button type="button" onClick={() => removeTag(i)} className="text-neutral-500 hover:text-red-500">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter to add..."
        className="w-full text-sm"
      />
    </div>
  );
}


// --- Main Component ---
export default function CourseForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  // Transform initial data if editing
  let defaultValues: Partial<CourseFormValues> = {
    badge_color: "green",
    rating: 4.8,
    is_published: true,
    is_trading: false,
    sort_order: 0,
    topics: [],
    modules: [],
  };

  if (initialData) {
    defaultValues = {
      ...initialData,
      badge_color: initialData.badge_color || "green",
      highlights_text: (initialData.highlights || []).join("\n"),
      modules: initialData.modules || [],
      topics: initialData.topics || [],
    };
  }

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  const { control, handleSubmit, watch, setValue, register, formState: { errors } } = form;
  
  // Dynamic Modules
  const { fields: moduleFields, append: appendModule, remove: removeModule, swap: swapModule } = useFieldArray({
    control,
    name: "modules",
  });

  // Watch title to auto-generate slug (only if not editing)
  const title = watch("title");
  useEffect(() => {
    if (!isEditing && title) {
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [title, isEditing, setValue]);

  const onSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Process highlights from textarea back to array
      const highlightsArray = data.highlights_text
        .split("\n")
        .map(h => h.trim())
        .filter(h => h.length > 0);

      const payload = {
        title: data.title,
        slug: data.slug,
        tagline: data.tagline,
        description: data.description,
        badge: data.badge,
        badge_color: data.badge_color,
        duration: data.duration,
        price: data.price ? Number(data.price) : null,
        original_price: data.original_price ? Number(data.original_price) : null,
        level: data.level,
        category: data.category,
        icon: data.icon,
        gradient: data.gradient,
        rating: Number(data.rating),
        topics: data.topics,
        highlights: highlightsArray,
        who_is_it_for: data.who_is_it_for,
        modules: data.modules,
        is_published: data.is_published,
        is_trading: data.is_trading,
        sort_order: Number(data.sort_order),
      };

      if (isEditing) {
        const { error } = await supabase.from("courses").update(payload).eq("id", initialData.id);
        if (error) throw error;
        toast.success("Course updated successfully");
      } else {
        const { error } = await supabase.from("courses").insert(payload);
        if (error) throw error;
        toast.success("Course created successfully");
      }

      router.push("/admin/courses");
      router.refresh();
      
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      
      {/* 1. Basic Info */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Basic Info</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Course Title *</Label>
            <Input {...register("title")} placeholder="e.g. Basic Package" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Slug *</Label>
            <Input {...register("slug")} placeholder="e.g. basic-package" />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tagline</Label>
          <Input {...register("tagline")} placeholder="e.g. Your first step into professional accounting" />
        </div>

        <div className="space-y-2 py-2">
          <Label>Description</Label>
          <div className="bg-white [&_.ql-container]:min-h-[150px] [&_.ql-container]:text-base [&_.ql-toolbar]:rounded-t-md [&_.ql-container]:rounded-b-md">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <ReactQuill theme="snow" modules={quillModules} value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
      </section>

      {/* 2. Attributes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Attributes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Duration</Label>
            <Input {...register("duration")} placeholder="e.g. 3 Months" />
          </div>
          <div className="space-y-2">
            <Label>Current Price (₹)</Label>
            <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="Leave empty for 'Contact'" />
          </div>
          <div className="space-y-2">
            <Label>Original Price (₹)</Label>
            <Input type="number" {...register("original_price", { valueAsNumber: true })} placeholder="For strikethrough" />
          </div>
          <div className="space-y-2">
            <Label>Level</Label>
            <Input {...register("level")} placeholder="e.g. Beginner" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input {...register("category")} placeholder="e.g. accounting" />
          </div>
          <div className="space-y-2">
            <Label>Rating (0-5)</Label>
            <Input type="number" step="0.1" {...register("rating", { valueAsNumber: true })} />
          </div>
        </div>
      </section>

      {/* 3. Badges and Aesthetics */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Badges & UI Elements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input {...register("badge")} placeholder="e.g. BESTSELLER" />
          </div>
          <div className="space-y-2">
            <Label>Badge Color</Label>
            <select 
              {...register("badge_color")} 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="green">Green</option>
              <option value="gold">Gold</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Icon (Lucide name)</Label>
            <Input {...register("icon")} placeholder="e.g. BookOpen" />
          </div>
          <div className="space-y-2">
            <Label>CSS Gradient</Label>
            <Input {...register("gradient")} placeholder="linear-gradient(...)" />
          </div>
        </div>
      </section>

      {/* 4. Lists & Arrays */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Highlights & Topics</h3>
        
        <div className="space-y-2 focus-within:ring-0">
          <Label>Taught Topics (Tag Input)</Label>
          <Controller
            control={control}
            name="topics"
            render={({ field }) => (
              <TagInput tags={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Highlights (One per line)</Label>
          <Textarea 
            {...register("highlights_text")} 
            placeholder="Hands-on Tally Prime practice&#10;Real-world accounting entries"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label>Who is it for?</Label>
          <Input {...register("who_is_it_for")} placeholder="e.g. Freshers, students, and career-changers" />
        </div>
      </section>

      {/* 5. Modules Builder */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">Course Modules Builder</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => appendModule({ title: "", topics: [] })}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Add Module
          </Button>
        </div>

        <div className="space-y-4">
          {moduleFields.map((field, index) => (
            <div key={field.id} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 shadow-sm relative group">
              <div className="flex items-start gap-4">
                
                {/* Reorder Buttons */}
                <div className="flex flex-col items-center gap-1 mt-1">
                  <button type="button" onClick={() => swapModule(index, index - 1)} disabled={index === 0} className="p-1 rounded bg-white border shadow-sm text-neutral-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => swapModule(index, index + 1)} disabled={index === moduleFields.length - 1} className="p-1 rounded bg-white border shadow-sm text-neutral-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDown size={14} /></button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Module {index + 1} Title</Label>
                    <Input {...register(`modules.${index}.title` as const)} placeholder="e.g. Manual Accounting Fundamentals" />
                    {errors.modules?.[index]?.title && <p className="text-red-500 text-sm">Required</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Module Topics</Label>
                    <Controller
                      control={control}
                      name={`modules.${index}.topics` as const}
                      render={({ field: topicField }) => (
                        <TagInput tags={topicField.value} onChange={topicField.onChange} />
                      )}
                    />
                  </div>
                </div>

                {/* Delete Button */}
                <button 
                  type="button" 
                  onClick={() => removeModule(index)} 
                  className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

          {moduleFields.length === 0 && (
            <div className="p-8 text-center text-neutral-500 border border-dashed border-neutral-300 rounded-lg">
              No modules added yet. Click "Add Module" to start compiling the curriculum.
            </div>
          )}
        </div>
      </section>

      {/* 6. Settings */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Publishing Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <Controller
              control={control}
              name="is_published"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <Label className="font-semibold">Publish Course</Label>
          </div>

          <div className="flex items-center gap-3 bg-neutral-50 p-4 rounded-lg border border-neutral-100">
            <Controller
              control={control}
              name="is_trading"
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
            <div className="space-y-0.5">
              <Label className="font-semibold">Trading Category</Label>
              <p className="text-xs text-neutral-500">Enable if this is a trading course</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sort Order</Label>
            <Input type="number" {...register("sort_order", { valueAsNumber: true })} />
            <p className="text-xs text-neutral-500">Lower numbers appear first</p>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="pt-6 border-t flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/courses")}
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
          {isEditing ? "Save Changes" : "Create Course"}
        </Button>
      </div>

    </form>
  );
}

