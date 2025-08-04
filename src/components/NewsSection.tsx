
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, BookOpen, Award, TrendingUp, User, Bell } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: "Want to Learn Trading?",
    excerpt: "Join Milestone today — flexible payments, expert training, and support from all major banks.",
    image: "/images/emi.png",
    date: "April 12, 2025",
    category: "Academic",
    icon: BookOpen,
    important: true
  },
  {
    id: 2,
    title: "Student Success: John Smith's Journey to Full-time Trading",
    excerpt: "Learn how our graduate John Smith transitioned from corporate finance to profitable full-time trading in just 8 months.",
    image: "https://images.unsplash.com/photo-1607748851687-ba9a10438621?q=80&w=2670",
    date: "April 10, 2025",
    category: "Student Achievement",
    icon: Award
  },
  {
    id: 3,
    title: "Market Analysis: Impact of Recent Fed Decision",
    excerpt: "Our expert traders break down how the latest Federal Reserve policy changes will affect various market sectors.",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070",
    date: "April 5, 2025",
    category: "Market Insight",
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Welcome Dr. Sarah Chen to Our Faculty",
    excerpt: "We're excited to announce the addition of Dr. Sarah Chen, former hedge fund manager, to our team of expert instructors.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888",
    date: "April 1, 2025",
    category: "Faculty Spotlight",
    icon: User
  },
  {
    id: 5,
    title: "Platform Update: New Trading Simulator Features",
    excerpt: "Explore the enhanced capabilities of our trading simulator, now with advanced order types and improved market replay.",
    image: "https://images.unsplash.com/photo-1723587693269-8f53e5068980?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "March 28, 2025",
    category: "Operational",
    icon: Bell
  }
];

// Define category colors
const categoryColors = {
  "Academic": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Student Achievement": "bg-green-500/10 text-green-400 border-green-500/30",
  "Market Insight": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Faculty Spotlight": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Operational": "bg-red-500/10 text-red-400 border-red-500/30"
};

const NewsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Academic", "Student Achievement", "Market Insight", "Faculty Spotlight", "Operational"];

  const filteredNews = activeFilter === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-black/30 to-trading-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">News & <span className="text-trading-emerald">Updates</span></h2>
            <p className="text-gray-300 max-w-2xl">Stay informed with the latest announcements, market insights, and academy achievements.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-transparent border border-trading-emerald text-trading-emerald hover:bg-trading-emerald/10">
            View All Updates <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? "bg-trading-emerald text-black" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Featured News Item */}
        {filteredNews.length > 0 && (
          <div className="mb-8">
            <div className="glass-card rounded-xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 h-64 lg:h-auto relative">
                  <img 
                    src={filteredNews[0].image} 
                    alt={filteredNews[0].title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:bg-gradient-to-r"></div>
                </div>
                <div className="lg:col-span-3 p-6 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <div className={`px-3 py-1 rounded-full border text-sm mr-3 ${categoryColors[filteredNews[0].category as keyof typeof categoryColors] || "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}>
                      {filteredNews[0].category}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {filteredNews[0].date}
                    </div>
                    {filteredNews[0].important && (
                      <div className="ml-auto px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-sm font-medium">
                        Important
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{filteredNews[0].title}</h3>
                  <p className="text-gray-300 mb-6">{filteredNews[0].excerpt}</p>
                  
                  <Button variant="link" className="text-trading-emerald p-0 w-fit hover:text-trading-emerald/80">
                    Read Full Update <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.slice(1).map((item) => (
            <div key={item.id} className="glass-card rounded-lg overflow-hidden border border-white/10 transition-transform duration-300 hover:-translate-y-1">
              <div className="h-48 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <div className={`px-3 py-1 rounded-full border text-xs ${categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}>
                    {item.category}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4 text-sm line-clamp-2">{item.excerpt}</p>
                <Button variant="link" className="text-trading-emerald p-0 h-auto hover:text-trading-emerald/80">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 glass-card rounded-lg p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated with Trading Insights</h3>
              <p className="text-gray-300">Subscribe to our newsletter for weekly market insights, trading tips, and academy announcements.</p>
            </div>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-trading-emerald"
              />
              <Button className="bg-trading-emerald hover:bg-trading-emerald/90 text-black">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
