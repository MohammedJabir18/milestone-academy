import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Enroll — Milestone Academy",
  description:
    "Enroll in Milestone Academy's diploma programs. Fill our contact form for free counselling and course guidance.",
  alternates: {
    canonical: "https://milestonefinacademy.info/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
