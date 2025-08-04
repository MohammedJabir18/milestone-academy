
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';

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
  return (
    <section id="blog" className="py-20 bg-black/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Latest Trading <span className="text-trading-emerald">Insights</span></h2>
            <p className="text-gray-300 max-w-2xl">Expert analysis, strategies, and market observations from our professional traders and instructors.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald text-trading-emerald hover:bg-trading-emerald/10">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="glass-card rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <div className="relative h-48">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{post.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-trading-emerald mr-2" />
                    <span className="text-sm text-gray-300">{post.author}</span>
                  </div>
                  <Button variant="link" className="text-trading-emerald p-0 h-auto hover:text-trading-emerald/80">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
