"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Course } from "@/lib/courses";

export async function upsertCourse(course: Partial<Course>) {
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("courses")
    .upsert({
      id: course.id,
      slug: course.slug,
      title: course.title,
      tagline: course.tagline,
      badge: course.badge,
      badge_color: course.badgeColor,
      duration: course.duration,
      price: course.price,
      original_price: course.originalPrice,
      emi: course.emi,
      level: course.level,
      category: course.category,
      icon: course.icon,
      gradient: course.gradient,
      rating: course.rating,
      reviews: course.reviews,
      enrolled: course.enrolled,
      topics: course.topics,
      highlights: course.highlights,
      description: course.description,
      who_is_it_for: course.whoIsItFor,
      image_url: (course as any).imageUrl,
      faculty_id: (course as any).facultyId,
      modules: course.modules as any,
    })
    .select()
    .single();

  if (error) {
    console.error("Error upserting course:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${course.slug}`);
  
  return { success: true, data };
}

export async function deleteCourse(id: string, slug: string) {
  const supabase = await createServer();

  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${slug}`);

  return { success: true };
}
