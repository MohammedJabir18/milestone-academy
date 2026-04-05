"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Course, CourseModule } from "@/lib/courses";
import { upsertCourse } from "../../../actions/course-actions";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Trash2, X, MoveUp, MoveDown } from "lucide-react";

const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  tagline: z.string().min(1, "Tagline is required"),
  badge: z.string().optional(),
  badgeColor: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().nullable().optional(),
  originalPrice: z.number().nullable().optional(),
  emi: z.string().nullable().optional(),
  level: z.string().min(1, "Level is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon name is required"),
  gradient: z.string().min(1, "Gradient is required"),
  rating: z.number().min(0).max(5).default(4.5),
  reviews: z.number().min(0).default(0),
  enrolled: z.number().min(0).default(0),
  topics: z.array(z.string()),
  highlights: z.array(z.string()),
  description: z.string().min(1, "Description is required"),
  whoIsItFor: z.string().min(1, "Who is it for is required"),
  modules: z.array(z.object({
    title: z.string().min(1, "Module title is required"),
    topics: z.array(z.string())
  }))
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CourseForm({ course, isOpen, onClose, onSuccess }: CourseFormProps) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: "",
      slug: "",
      tagline: "",
      badge: "NEW",
      badgeColor: "green",
      duration: "",
      price: null,
      originalPrice: null,
      emi: null,
      level: "Beginner",
      category: "accounting",
      icon: "BookOpen",
      gradient: "linear-gradient(135deg, #2D9E44, #4ADE80)",
      rating: 4.8,
      reviews: 0,
      enrolled: 0,
      topics: [""],
      highlights: [""],
      description: "",
      whoIsItFor: "",
      modules: [{ title: "", topics: [""] }]
    }
  });

  useEffect(() => {
    if (course) {
      form.reset({
        ...course,
        price: course.price ?? null,
        originalPrice: course.originalPrice ?? null,
        emi: course.emi ?? null,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        tagline: "",
        badge: "NEW",
        badgeColor: "green",
        duration: "",
        price: null,
        originalPrice: null,
        emi: null,
        level: "Beginner",
        category: "accounting",
        icon: "BookOpen",
        gradient: "linear-gradient(135deg, #2D9E44, #4ADE80)",
        rating: 4.8,
        reviews: 0,
        enrolled: 0,
        topics: [""],
        highlights: [""],
        description: "",
        whoIsItFor: "",
        modules: [{ title: "", topics: [""] }]
      });
    }
  }, [course, form, isOpen]);

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules"
  });

  const { fields: topicFields, append: appendTopic, remove: removeTopic } = useFieldArray({
    control: form.control,
    name: "topics" as any
  });

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
    control: form.control,
    name: "highlights" as any
  });

  async function onSubmit(values: CourseFormValues) {
    setIsPending(true);
    try {
      const result = await upsertCourse(values as any);
      if (result.success) {
        toast.success(course ? "Course updated successfully" : "Course created successfully");
        onSuccess();
        onClose();
      } else {
        toast.error("Error saving course: " + result.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("title", e.target.value);
    if (!course) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-stone-200">
        <DialogHeader className="p-6 border-b border-stone-100">
          <DialogTitle className="text-2xl font-bold text-stone-900">
            {course ? "Edit Course" : "Add New Course"}
          </DialogTitle>
          <DialogDescription className="text-stone-500">
            Fill in the details for the course. Slug is automatically generated.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-200">
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tally Prime Mastery" {...field} onChange={handleTitleChange} className="rounded-xl border-stone-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Slug (URL)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. tally-prime-mastery" {...field} readOnly={!!course} className="rounded-xl border-stone-200 bg-stone-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-stone-700">Tagline</FormLabel>
                      <FormControl>
                        <Input placeholder="Short catchphrase for the course card" {...field} className="rounded-xl border-stone-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-stone-200">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-stone-200">
                            <SelectItem value="accounting">Accounting</SelectItem>
                            <SelectItem value="taxation">Taxation</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="trading">Trading</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-stone-200">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-stone-200">
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Intermediate → Advanced">Intermediate → Advanced</SelectItem>
                            <SelectItem value="All Levels → Expert">All Levels → Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 3 Months" {...field} className="rounded-xl border-stone-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="h-px bg-stone-100" />

                {/* Pricing */}
                <div className="space-y-4">
                   <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Pricing & Value</h3>
                   <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">Price (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              {...field} 
                              value={field.value === null ? "" : field.value} 
                              onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                              className="rounded-xl border-stone-200" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">Orig. Price (₹)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              {...field} 
                              value={field.value === null ? "" : field.value}
                              onChange={(e) => field.onChange(e.target.value === "" ? null : Number(e.target.value))}
                              className="rounded-xl border-stone-200" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">EMI Text</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ₹10,000/mo" {...field} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value === "" ? null : e.target.value)} className="rounded-xl border-stone-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Design Tokens */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Design & Identity</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="badge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">Badge</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. STARTER" {...field} className="rounded-xl border-stone-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="badgeColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">Color</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "green"}>
                            <FormControl>
                              <SelectTrigger className="rounded-xl border-stone-200">
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-stone-200">
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="gold">Gold</SelectItem>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-stone-700">Icon Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. BookOpen" {...field} className="rounded-xl border-stone-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gradient"
                      render={({ field }) => (
                        <FormItem className="col-span-1">
                          <FormLabel className="font-bold text-stone-700">Gradient CSS</FormLabel>
                          <FormControl>
                            <Input placeholder="linear-gradient(...)" {...field} className="rounded-xl border-stone-200 font-mono text-xs" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Content Descriptions */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Full Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the course value proposition..." className="min-h-[100px] rounded-xl border-stone-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whoIsItFor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-stone-700">Target Audience</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Who should enroll in this course?" className="min-h-[80px] rounded-xl border-stone-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="h-px bg-stone-100" />

                {/* Topics & Highlights (Simple Arrays) */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold text-stone-700">Key Topics</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => appendTopic("")}
                        className="text-[var(--green-600)] hover:text-[var(--green-700)] h-8 font-bold"
                      >
                        <Plus size={16} className="mr-1" /> Add Topic
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {topicFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                          <Input 
                            {...form.register(`topics.${index}` as any)} 
                            className="rounded-xl border-stone-200 flex-1" 
                            placeholder={`Topic ${index + 1}`}
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeTopic(index)}
                            disabled={topicFields.length === 1}
                            className="text-stone-300 hover:text-red-500 rounded-xl"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold text-stone-700">Core Highlights</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => appendHighlight("")}
                        className="text-[var(--green-600)] hover:text-[var(--green-700)] h-8 font-bold"
                      >
                        <Plus size={16} className="mr-1" /> Add Highlight
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {highlightFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                          <Input 
                            {...form.register(`highlights.${index}` as any)} 
                            className="rounded-xl border-stone-200 flex-1" 
                            placeholder={`Highlight ${index + 1}`}
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeHighlight(index)}
                            disabled={highlightFields.length === 1}
                            className="text-stone-300 hover:text-red-500 rounded-xl"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Modules (Nested JSON) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="font-bold text-stone-900 text-lg">Curriculum Modules</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => appendModule({ title: "", topics: [""] })}
                      className="border-stone-200 rounded-xl font-bold h-10 px-4"
                    >
                      <Plus size={18} className="mr-2 text-stone-400" /> New Module
                    </Button>
                  </div>
                  
                  <div className="space-y-8">
                    {moduleFields.map((module, moduleIndex) => (
                      <div key={module.id} className="bg-stone-50/50 border border-stone-200 rounded-[20px] p-6 space-y-4 relative group/module">
                        <div className="flex items-center gap-4">
                          <div className="bg-stone-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs">
                            {moduleIndex + 1}
                          </div>
                          <FormField
                            control={form.control}
                            name={`modules.${moduleIndex}.title`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Module Title (e.g. Tally Prime Mastery)" {...field} className="font-bold text-stone-900 border-none bg-transparent focus-visible:ring-0 text-lg p-0 h-auto" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeModule(moduleIndex)}
                            className="opacity-0 group-hover/module:opacity-100 transition-opacity hover:bg-white hover:text-red-500 rounded-xl"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>

                        <div className="pl-12 space-y-3">
                          <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Module Topics</div>
                          <ModuleTopicsList form={form} moduleIndex={moduleIndex} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 bg-stone-50 border-t border-stone-100 rounded-b-[24px]">
              <div className="flex items-center justify-between w-full">
                <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold text-stone-500 hover:text-stone-900">
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl px-8 font-bold h-12 shadow-lg shadow-stone-200 transition-all active:scale-95">
                  {isPending ? "Saving..." : (course ? "Update Course" : "Create Course")}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ModuleTopicsList({ form, moduleIndex }: { form: any, moduleIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.topics`
  });

  return (
    <div className="space-y-2">
      {fields.map((field, topicIndex) => (
        <div key={field.id} className="flex gap-2 items-center group/topic">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-300 group-focus-within/topic:bg-stone-900 transition-colors" />
          <Input 
            {...form.register(`modules.${moduleIndex}.topics.${topicIndex}`)} 
            className="border-none bg-transparent h-8 py-0 focus-visible:ring-0 text-[13px] font-medium text-stone-600 hover:text-stone-900 transition-colors" 
            placeholder={`Topic ${topicIndex + 1}`}
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => remove(topicIndex)}
            disabled={fields.length === 1}
            className="h-6 w-6 opacity-0 group-hover/topic:opacity-100 transition-opacity rounded-md hover:bg-white text-stone-300 hover:text-red-400"
          >
            <X size={12} />
          </Button>
        </div>
      ))}
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={() => append("")}
        className="text-[11px] font-bold text-[var(--green-600)] hover:text-[var(--green-700)] h-7 px-2 -ml-2"
      >
        <Plus size={14} className="mr-1" /> Add Topic Detail
      </Button>
    </div>
  );
}
