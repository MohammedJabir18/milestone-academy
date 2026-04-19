import { MetadataRoute } from "next";
import { COURSES } from "@/lib/courses";

const SITE_URL = "https://milestonefinacademy.info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Course pages from static data
  const coursePages: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Dynamic news pages (fetch from Supabase if available)
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase
      .from("news_posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    newsPages = (data ?? []).map(
      (post: { slug: string; updated_at: string }) => ({
        url: `${SITE_URL}/news/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })
    );
  } catch {
    // Supabase not available at build time — skip dynamic pages
  }

  return [...staticPages, ...coursePages, ...newsPages];
}
