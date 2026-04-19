import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diploma Programs — Accounting & Finance Courses",
  description:
    "Explore all 4 diploma programs at Milestone Academy: DABS, DUTC, PGDAFA, EMDAT. Professional accounting, taxation & financial analytics certifications.",
  alternates: {
    canonical: "https://milestonefinacademy.info/courses",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
