import { courses } from "@/lib/courses";
import { notFound } from "next/navigation";
import CourseDetailClient from "./CourseDetailClient";

// Generate static routes for all 12 courses at build time
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
