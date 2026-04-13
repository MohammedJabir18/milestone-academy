'use client';

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { NewsPost } from "@/lib/news";
import NewsCard from "@/components/news/NewsCard";

// Register plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NewsSection = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("news_posts")
          .select("*")
          .eq("is_published", true)
          .order("published_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching news posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [supabase]);

  useEffect(() => {
    if (isLoading || posts.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(".news-header-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Cards animations
      gsap.from(".news-card-anim", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      });

      // Bottom button animation
      gsap.from(".news-btn-anim", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".news-btn-anim",
          start: "top 95%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, posts.length]);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-[var(--container-max)] mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="news-header-anim inline-block mb-4 font-mono text-[13px] text-[var(--green-700)] uppercase tracking-[0.2em] font-bold">
              MILESTONE MOMENTS
            </span>
            <h2 className="news-header-anim font-serif text-[44px] md:text-[56px] text-[var(--text-primary)] leading-[1.1] -tracking-[0.02em]">
              From Our Academy,<br />to Your Screen.
            </h2>
          </div>
          
          <Link 
            href="/news" 
            className="news-header-anim group flex items-center gap-2 font-syne text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--green-600)]"
          >
            See All Updates <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* MASONRY GRID */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={40} className="animate-spin text-[var(--green-500)] opacity-40" />
          </div>
        ) : posts.length > 0 ? (
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {posts.map((post) => (
              <div key={post.id} className="news-card-anim break-inside-avoid">
                <NewsCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-[var(--border-light)]">
            <p className="font-syne text-[var(--text-secondary)]">No news posts found.</p>
          </div>
        )}

        {/* BOTTOM BUTTON */}
        {!isLoading && posts.length > 0 && (
          <div className="news-btn-anim flex justify-center mt-12">
            <Link 
              href="/news"
              className="px-8 py-3.5 rounded-full border-2 border-[var(--green-500)] text-[var(--green-600)] font-syne font-semibold text-[15px] transition-all hover:bg-[var(--green-500)] hover:text-white"
            >
              View All Updates →
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default NewsSection;
