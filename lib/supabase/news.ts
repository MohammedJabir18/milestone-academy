import { createServer } from "./server";
import type { NewsPost } from "@/lib/news";

export async function getLatestNewsPosts(limit: number = 3) {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching latest news posts:", error);
    return [];
  }
  return data as NewsPost[];
}

export async function getNewsPostBySlug(slug: string) {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching news post by slug:", error);
    return null;
  }
  return data as NewsPost;
}

export async function getAllNewsPosts() {
  const supabase = await createServer();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching all news posts:", error);
    return [];
  }
  return data as NewsPost[];
}

export async function getNewsPostsPaginated({
  limit = 9,
  offset = 0,
  category = 'All',
  search = '',
}: {
  limit?: number;
  offset?: number;
  category?: string;
  search?: string;
}) {
  const supabase = await createServer();
  let query = supabase
    .from("news_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category && category !== 'All') {
    query = query.eq("category", category.toLowerCase().replace(' ', '_'));
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching paginated news posts:", error);
    return { data: [], count: 0 };
  }
  return { data: data as NewsPost[], count: count || 0 };
}
