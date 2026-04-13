"use client";

import { useState } from "react";
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Star, 
  Eye, 
  ImageIcon, 
  Video as VideoIcon, 
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { NewsPost } from "@/lib/news";

interface NewsTableClientProps {
  initialPosts: NewsPost[];
}

export default function NewsTableClient({ initialPosts }: NewsTableClientProps) {
  const [posts, setPosts] = useState<NewsPost[]>(initialPosts);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'published') return matchesSearch && post.is_published;
    if (filter === 'draft') return matchesSearch && !post.is_published;
    if (filter === 'featured') return matchesSearch && post.is_featured;
    return matchesSearch;
  });

  const getPostTypeIcon = (type: string) => {
    switch(type) {
      case 'image': return <ImageIcon size={14} className="text-blue-500" />;
      case 'video': return <VideoIcon size={14} className="text-purple-500" />;
      case 'text': return <FileText size={14} className="text-orange-500" />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex bg-stone-100 p-1 rounded-xl">
          {(['all', 'published', 'draft', 'featured'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`
                px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all
                ${filter === tab ? 'bg-white shadow-sm text-stone-900' : 'text-stone-400 hover:text-stone-600'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
            <Input 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl border-stone-200"
            />
          </div>
          <Link href="/admin/news/new">
            <Button className="h-10 rounded-xl bg-stone-900 text-white font-bold hover:bg-black transition-all">
              <Plus size={18} className="mr-2" /> New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Thumbnail</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Post Title</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">Featured</th>
              <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="group hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-[60px] h-[45px] rounded-lg overflow-hidden border border-stone-100 bg-stone-50">
                      {(post.cover_image_url || post.video_thumbnail_url) ? (
                        <Image 
                          src={post.cover_image_url || post.video_thumbnail_url || ''} 
                          alt={post.title} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-stone-200">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-stone-900 group-hover:text-[var(--green-700)] transition-colors line-clamp-1">{post.title}</p>
                      <p className="text-[10px] text-stone-400 flex items-center gap-1 font-mono uppercase tracking-wider">
                         {post.published_at ? format(new Date(post.published_at), 'MMM dd, yyyy') : 'No Date'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-2 py-1 bg-stone-50 rounded-md border border-stone-100 w-fit">
                      {getPostTypeIcon(post.type)}
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">{post.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold text-stone-600 capitalize px-2 py-0.5 bg-stone-100 rounded-full">{post.category?.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${post.is_published ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-stone-100 text-stone-500 hover:bg-stone-100'}`}>
                      {post.is_published ? (
                        <span className="flex items-center gap-1.5"><CheckCircle2 size={10} /> Published</span>
                      ) : (
                        <span className="flex items-center gap-1.5"><XCircle size={10} /> Draft</span>
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {post.is_featured ? (
                      <Star size={16} className="mx-auto text-amber-500 fill-amber-500" />
                    ) : (
                      <Star size={16} className="mx-auto text-stone-200" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-stone-900">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-stone-100 shadow-xl">
                        <Link href={`/admin/news/${post.id}`}>
                          <DropdownMenuItem className="py-2.5 font-bold cursor-pointer">
                            <Edit2 size={16} className="mr-3 text-stone-400" /> Edit Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                          className="py-2.5 font-bold cursor-pointer"
                          onClick={() => window.open(`/news/${post.slug}`, '_blank')}
                        >
                          <Eye size={16} className="mr-3 text-stone-400" /> View Post ↗
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-2.5 font-bold cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-500">
                          <Trash2 size={16} className="mr-3" /> Quick Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-20 text-center text-stone-400 space-y-4">
                   <FileText className="mx-auto text-stone-200" size={48} />
                   <div className="space-y-1">
                     <p className="text-xl font-serif text-stone-700">No posts found</p>
                     <p className="text-sm">Try adjusting your filters or search query.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
