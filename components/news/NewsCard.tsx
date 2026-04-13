'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import type { NewsPost } from '@/lib/news';
import VideoModal from './VideoModal';
import { format } from 'date-fns';

interface NewsCardProps {
  post: NewsPost;
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!buttonRef.current) return;
    
    // Initial state for button
    gsap.set(buttonRef.current, { y: 20, opacity: 0 });
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current && imageRef.current && buttonRef.current) {
      gsap.to(cardRef.current, { y: -5, duration: 0.4, ease: 'power2.out' });
      gsap.to(imageRef.current, { scale: 1.06, duration: 0.4, ease: 'power2.out' });
      gsap.to(buttonRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && imageRef.current && buttonRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(imageRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(buttonRef.current, { y: 20, opacity: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  const aspectClass = post.type === 'video' ? 'aspect-[16/9]' : 'aspect-auto';
  
  // Dynamic aspect ratio for images based on common patterns
  const getAspectRatioClass = () => {
    if (post.type === 'video') return 'aspect-[16/9]';
    // Mocking aspect ratio based on title length or other properties if not available
    // In a real app, this would come from metadata
    const idNum = parseInt(post.id.slice(0, 8), 16) || 0;
    const ratios = ['aspect-[1/1]', 'aspect-[4/5]', 'aspect-[16/9]'];
    return ratios[idNum % ratios.length];
  };

  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), 'MMMM d, yyyy')
    : format(new Date(post.created_at), 'MMMM d, yyyy');

  const CardContent = (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative mb-5 overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift cursor-pointer"
      onClick={() => post.type === 'video' ? setIsVideoModalOpen(true) : null}
    >
      <div className={`relative overflow-hidden ${getAspectRatioClass()}`}>
        <div ref={imageRef} className="h-full w-full">
          <Image
            src={post.type === 'video' ? (post.video_thumbnail_url || post.cover_image_url || '') : (post.cover_image_url || '')}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-w-[768px]) 100vw, (max-w-[1200px]) 50vw, 33vw"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0B]/90 via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="mb-3 inline-block rounded-full bg-[var(--green-500)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
            {post.category.replace('_', ' ')}
          </span>
          <h3 className="line-clamp-2 font-syne text-[15px] font-semibold leading-snug text-white">
            {post.title}
          </h3>
          <p className="mt-2 font-mono text-[11px] text-white/50">
            {formattedDate}
          </p>

          <div ref={buttonRef} className="mt-3">
            <span className="inline-block rounded-full bg-white/15 px-4 py-2 font-syne text-[12px] text-white backdrop-blur-md">
              Read More →
            </span>
          </div>
        </div>

        {/* Video Play Button */}
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[var(--green-500)] shadow-lg transition-transform hover:scale-110">
              <Play size={28} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      
      {post.type === 'video' && post.video_url && (
        <VideoModal 
          isOpen={isVideoModalOpen} 
          onClose={() => setIsVideoModalOpen(false)} 
          videoUrl={post.video_url} 
        />
      )}
    </div>
  );

  if (post.type === 'video') {
    return CardContent;
  }

  return (
    <Link href={`/news/${post.slug}`}>
      {CardContent}
    </Link>
  );
};

export default NewsCard;
