import React from 'react';
import { createServer } from '@/lib/supabase/server';
import NewsTableClient from '@/components/admin/NewsTableClient';

export const metadata = {
  title: 'News Management | Admin Hub',
  description: 'Manage academy news, announcements, and media posts.',
};

export default async function AdminNewsPage() {
  const supabase = await createServer();
  
  const { data: posts, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching news posts:", error);
  }

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest">
            <span>ADMIN HUB</span>
            <span className="opacity-30">/</span>
            <span className="text-[var(--green-600)]">NEWS MANAGEMENT</span>
          </div>
          <h1 className="text-4xl font-serif text-stone-900">Milestone Moments</h1>
          <p className="text-sm text-stone-500 font-medium max-w-lg leading-relaxed">
            Curate and manage all academy news, announcements, and student successes. Published posts appear in the masonry feed.
          </p>
        </div>
      </div>

      {/* Main Table Content */}
      <NewsTableClient initialPosts={posts || []} />
    </div>
  );
}
