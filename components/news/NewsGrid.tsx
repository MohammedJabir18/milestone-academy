'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore - TS sometimes fails to resolve GSAP plugin paths with moduleResolution: bundler
import { Flip } from 'gsap/Flip';
import { Search, Calendar, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { NewsPost } from '@/lib/news';
import NewsCard from './NewsCard';

// Register plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

const CATEGORIES = [
  'All',
  'Announcements',
  'Student Wins',
  'Placements',
  'Campus',
  'Events',
  'Videos'
];

const ITEMS_PER_PAGE = 9;

export default function NewsGrid() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<NewsPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  
  const supabase = createClient();
  const gridRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  // Initial Fetch
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    setIsLoading(true);
    try {
      const { data, count, error } = await supabase
        .from('news_posts')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(0, ITEMS_PER_PAGE - 1);

      if (error) throw error;
      setPosts(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Error fetching initial news posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (isLoadingMore || posts.length >= totalCount) return;
    
    setIsLoadingMore(true);
    const newOffset = offset + ITEMS_PER_PAGE;
    
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(newOffset, newOffset + ITEMS_PER_PAGE - 1);

      if (error) throw error;
      
      const newPosts = data || [];
      setOffset(newOffset);
      setPosts(prev => [...prev, ...newPosts]);
      
      // Animate new cards
      setTimeout(() => {
        gsap.fromTo('.news-card-new', 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      }, 100);
      
    } catch (err) {
      console.error('Error loading more news posts:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Client-side filtering
  useEffect(() => {
    let result = [...posts];

    if (activeCategory !== 'All') {
      const catSlug = activeCategory.toLowerCase().replace(' ', '_').replace('student_wins', 'student_win').replace('videos', 'video');
      // Normalize category names
      result = result.filter(post => {
        const pCat = post.category?.toLowerCase();
        if (activeCategory === 'Videos' && post.type === 'video') return true;
        if (catSlug === 'student_win' && (pCat === 'student_win' || pCat === 'placement')) return true;
        return pCat === catSlug;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt?.toLowerCase().includes(query)
      );
    }

    // Capture state for Flip
    const state = Flip.getState('.news-card-wrapper');

    setFilteredPosts(result);

    // Run Flip on next frame
    if (!firstLoad.current) {
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.5,
          ease: 'power3.inOut',
          stagger: 0.05,
          onComplete: () => ScrollTrigger.refresh()
        });
      });
    } else {
      firstLoad.current = false;
    }
  }, [posts, activeCategory, searchQuery]);

  const hasMore = posts.length < totalCount;

  return (
    <div className="w-full">
      {/* STICKY FILTER BAR */}
      <div className="sticky top-[72px] z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-light)] py-3">
        <div className="max-w-[var(--container-max)] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-syne text-[14px] font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[var(--green-500)] text-white shadow-lift'
                    : 'bg-[var(--green-50)] text-[var(--text-secondary)] hover:bg-[var(--green-100)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[var(--border-light)] font-syne text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--green-500)]/20 focus:border-[var(--green-500)] transition-all"
            />
          </div>

        </div>
      </div>

      <div className="max-w-[var(--container-max)] mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={48} className="animate-spin text-[var(--green-500)]" />
            <p className="font-syne text-[var(--text-secondary)]">Loading Milestone moments...</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-5">
              {filteredPosts.map((post, idx) => (
                <div 
                  key={post.id} 
                  className={`news-card-wrapper break-inside-avoid ${idx >= posts.length - ITEMS_PER_PAGE ? 'news-card-new' : ''}`}
                >
                  <NewsCard post={post} />
                </div>
              ))}
            </div>

            {hasMore && !searchQuery && activeCategory === 'All' && (
              <div className="flex justify-center mt-12 pb-20">
                <button
                  onClick={loadMorePosts}
                  disabled={isLoadingMore}
                  className="group flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-[var(--green-500)] text-[var(--green-600)] font-syne font-semibold text-[15px] transition-all hover:bg-[var(--green-500)] hover:text-white disabled:opacity-50"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Updates <span className="transition-transform group-hover:translate-y-1">↓</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--green-50)] flex items-center justify-center mb-6">
              <Calendar size={40} className="text-[var(--green-500)]" />
            </div>
            <h3 className="font-serif text-3xl text-[var(--text-primary)] mb-2">No updates yet</h3>
            <p className="font-syne text-[var(--text-secondary)] max-w-md mb-8">
              We couldn't find any news posts matching your search or category. Check back later for fresh updates!
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-8 py-3 rounded-full bg-[var(--bg-dark)] text-white font-syne font-semibold text-[14px] hover:bg-black transition-all"
            >
              ← Back to All Updates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
