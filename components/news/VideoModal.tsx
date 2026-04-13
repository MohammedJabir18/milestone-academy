'use client';

import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      ).fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X size={32} />
      </button>

      <div
        ref={contentRef}
        className="relative aspect-video w-full max-w-[1000px] overflow-hidden rounded-2xl bg-black shadow-2xl"
      >
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          playing={isOpen}
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
        />
      </div>
    </div>
  );
};

export default VideoModal;
