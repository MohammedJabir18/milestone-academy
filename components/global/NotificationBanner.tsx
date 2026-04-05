"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { X } from "lucide-react";

type NotificationRow = {
  id: string;
  message: string;
  cta_text: string | null;
  cta_link: string | null;
};

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const today = new Date().toISOString().split("T")[0];
        
        const { data, error } = await supabase
          .from("notifications")
          .select("id, message, cta_text, cta_link")
          .eq("is_active", true)
          .lte("start_date", today)
          .gte("end_date", today)
          .order("created_at", { ascending: false });

        if (data && !error) {
          const dismissedStr = localStorage.getItem("milestone-dismissed-notifications");
          const dismissed = dismissedStr ? JSON.parse(dismissedStr) : [];
          
          const valid = data.filter((n) => !dismissed.includes(n.id));
          setNotifications(valid);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }
    
    if (isClient) {
      fetchNotifications();
    }
  }, [isClient]);

  const currentNotification = notifications[currentIndex];

  useEffect(() => {
    if (currentNotification && bannerRef.current) {
      const ctx = gsap.context(() => {
        // Entrance slide down per notification
        gsap.fromTo(bannerRef.current, 
          { y: -44 }, 
          { y: 0, duration: 0.5, ease: "power2.out" }
        );
      });
      return () => ctx.revert();
    }
  }, [currentNotification]);

  if (!isClient || notifications.length === 0 || currentIndex >= notifications.length) {
    return null;
  }

  const handleDismiss = () => {
    const isLast = currentIndex === notifications.length - 1;
    
    const tl = gsap.timeline({
      onComplete: () => {
        const dismissedStr = localStorage.getItem("milestone-dismissed-notifications");
        const dismissed = dismissedStr ? JSON.parse(dismissedStr) : [];
        if (!dismissed.includes(currentNotification.id)) {
            dismissed.push(currentNotification.id);
        }
        localStorage.setItem("milestone-dismissed-notifications", JSON.stringify(dismissed));
        
        setCurrentIndex((prev) => prev + 1);
      }
    });

    tl.to(bannerRef.current, {
      y: -44,
      duration: 0.4,
      ease: "power2.in",
    });

    // If it's the very last notification, collapse the wrapper height so the navbar pulls up cleanly
    if (isLast && wrapperRef.current) {
      tl.to(wrapperRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.inOut"
      }, "<0.2");
    }
  };

  return (
    <div ref={wrapperRef} className="w-full relative overflow-hidden" style={{ height: 44 }}>
      <div 
        ref={bannerRef}
        className="absolute top-0 left-0 w-full h-[44px] bg-[var(--green-500)] text-white font-mono text-[13px] flex items-center justify-center z-[50]"
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 flex items-center justify-center relative">
          <div className="flex items-center flex-wrap justify-center gap-x-3 gap-y-1 pr-8 text-center">
            <span>{currentNotification.message}</span>
            {currentNotification.cta_text && currentNotification.cta_link && (
              <Link 
                href={currentNotification.cta_link}
                className="underline underline-offset-4 hover:text-white/80 transition-colors shrink-0 font-medium"
              >
                {currentNotification.cta_text}
              </Link>
            )}
          </div>
          <button 
            onClick={handleDismiss} 
            className="absolute right-4 hover:opacity-70 transition-opacity flex items-center justify-center"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
