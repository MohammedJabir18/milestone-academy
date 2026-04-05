import { createServer } from "./server";
import type { Course } from "@/lib/courses";

export async function getAllCourses() {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error);
    return null;
  }
  return data;
}

export async function getCourseBySlug(slug: string) {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching course by slug:", error);
    return null;
  }
  return data;
}

export async function upsertCourse(courseData: Partial<Course>) {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("courses")
    .upsert(courseData)
    .select()
    .single();

  if (error) {
    console.error("Error upserting course:", error);
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCourse(id: string) {
  const supabase = await createServer();
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    throw new Error(error.message);
  }
  return true;
}
