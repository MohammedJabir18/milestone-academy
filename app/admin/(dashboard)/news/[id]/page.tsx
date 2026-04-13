import React from 'react';
import { notFound } from 'next/navigation';
import { createServer } from '@/lib/supabase/server';
import NewsPostForm from '@/components/admin/NewsPostForm';
import Link from 'next/link';

export default async function EditNewsPostPage({ params }: { params: { id: string } }) {
  const supabase = await createServer();
  
  // Resolve id from params
  const { id } = await params;

  const { data: post, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post || error) {
    notFound();
  }

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/news" 
            className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all font-bold"
          >
            ←
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest">
              <span>ADMIN HUB</span>
              <span className="opacity-30">/</span>
              <span>NEWS</span>
              <span className="opacity-30">/</span>
              <span className="text-[var(--green-600)]">EDIT POST</span>
            </div>
            <h1 className="text-3xl font-serif font-medium text-stone-900 truncate max-w-[500px]">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <NewsPostForm initialData={post} />
    </div>
  );
}
