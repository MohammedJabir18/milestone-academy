
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const blogPosts = [
  {
    title: "5 Essential Risk Management Strategies for New Traders",
    excerpt: "Discover the fundamental risk management techniques that every new trader should master before entering the markets.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "April 10, 2025",
    readTime: "6 min read",
    author: "David Miller"
  },
  {
    title: "Technical Analysis: Moving Averages Explained",
    excerpt: "A comprehensive guide to understanding and utilizing moving averages in your technical analysis trading strategy.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070",
    date: "April 5, 2025",
    readTime: "8 min read",
    author: "Jennifer Patel"
  },
  {
    title: "Market Psychology: How Emotions Affect Your Trading",
    excerpt: "Learn how fear, greed, and other emotions impact market movements and how to maintain emotional discipline.",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070",
    date: "March 28, 2025",
    readTime: "5 min read",
    author: "Marcus Johnson"
  }
];

const BlogSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headingRef, { y: 30 });
  useStaggerReveal(gridRef, '.blog-card', { y: 40, stagger: 0.12 });

  return (
    <section id="blog" className="py-24 bg-black/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14">
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-trading-emerald/10 text-trading-emerald border border-trading-emerald/20">
              Blog
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
              Latest Trading{' '}
              <span className="bg-gradient-to-r from-trading-emerald to-trading-lightMint bg-clip-text text-transparent">Insights</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Expert analysis, strategies, and market observations from our professional traders and instructors.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald/40 text-trading-emerald hover:bg-trading-emerald/10 rounded-full px-6">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="blog-card group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-trading-emerald/30 hover:shadow-lg hover:shadow-trading-emerald/5"
            >
              {/* image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* read-time badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-gray-300 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </div>
              </div>

              {/* body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2 group-hover:text-trading-emerald transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-trading-emerald/20 flex items-center justify-center">
                      <User className="h-3.5 w-3.5 text-trading-emerald" />
                    </div>
                    <span className="text-xs text-gray-400">{post.author}</span>
                  </div>
                  <Button variant="link" className="text-trading-emerald p-0 h-auto text-xs hover:text-trading-emerald/80">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
