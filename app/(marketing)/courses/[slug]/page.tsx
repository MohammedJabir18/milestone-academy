import { courses } from "@/lib/courses";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";
import { createServer } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";

// Generate static routes for all 12 courses at build time
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createServer();
  
  // Try to fetch from database first to get the latest data (including images)
  const { data: dbCourse } = await supabase
    .from("courses")
    .select("*, faculty(*)")
    .eq("slug", slug)
    .single();

  let course: any = dbCourse;

  // Fallback to static if not found in DB or DB errors
  if (!course) {
    course = courses.find((c) => c.slug === slug);
  }

  if (!course) {
    notFound();
  }

  // Find all faculty assigned to this course
  // We check both the direct faculty_id on course and the courses array on faculty table
  let faculties: any[] = [];
  
  if (course.faculty) {
    faculties.push(course.faculty);
  }

  // Extract abbreviation from title, e.g. "Diploma in Accounting & Business Systems (DABS)" → "DABS"
  const abbreviationMatch = course.title?.match(/\(([A-Z]+)\)/);
  if (abbreviationMatch) {
    const abbreviation = abbreviationMatch[1];
    const { data: matchedFaculties } = await supabase
      .from("faculty")
      .select("*")
      .eq("status", true)
      .contains("courses", [abbreviation]);
    
    if (matchedFaculties) {
      // Avoid duplicates if faculty_id already caught them
      matchedFaculties.forEach(f => {
        if (!faculties.some(existing => existing.id === f.id)) {
          faculties.push(f);
        }
      });
    }
  }

  // Ensure property mapping for frontend components
  const mappedCourse = {
    ...course,
    faculties, // Pass the array of instructors
    badgeColor: course.badge_color || course.badgeColor,
    originalPrice: course.original_price || course.originalPrice,
    whoIsItFor: course.who_is_it_for || course.whoIsItFor,
  };

  return <CourseDetailClient course={mappedCourse} />;
}
