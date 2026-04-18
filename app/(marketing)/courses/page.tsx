"use client";

import { useState, useEffect } from "react";
import { courses as staticCourses, type Course } from "@/lib/courses";
import CourseCard from "@/components/ui/CourseCard";
import { BookOpen, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categories = ["All", "Accounting", "Taxation", "Compliance", "Advanced"];
  const supabase = createClient();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        
        const mappedData = (data || []).map((course: any) => ({
          ...course,
          badgeColor: course.badge_color,
          originalPrice: course.original_price,
          whoIsItFor: course.who_is_it_for,
        }));

        setDbCourses(mappedData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setDbCourses(staticCourses); // Fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, [supabase]);

  const filteredCourses = activeTab === "All" 
    ? dbCourses 
    : dbCourses.filter(c => c.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <main className="w-full flex flex-col items-center bg-[var(--bg-primary)] pt-32 pb-24 min-h-screen">
      
      {/* Hero Banner Area */}
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 mb-16 text-center animate-fade-in-up mt-10">
        <h1 className="font-serif text-[56px] md:text-[80px] text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6">
          <span className="italic text-[var(--green-600)] pr-2">Master</span> the Corporate<br/>Financial Arsenal
        </h1>
        <p className="font-sans text-lg md:text-[20px] text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          From Tally basics to advanced SAP FICO configurations — browse all 12 of our industry-engineered curriculums designed by practicing CAs.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 mb-16 px-4 py-2 bg-white border border-[var(--border-light)] rounded-[20px] md:rounded-full shadow-sm max-w-[90%] md:max-w-max overflow-x-auto no-scrollbar animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`clickable shrink-0 px-6 py-3 rounded-full font-sans text-[15px] font-bold transition-all duration-300 whitespace-nowrap border-2 ${
              activeTab === tab 
                ? "bg-[var(--green-500)] text-white shadow-[var(--shadow-green)] border-transparent" 
                : "bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Grid Container */}
      <div className="w-full max-w-[var(--container-max)] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 min-h-[400px]">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center">
            <Loader2 size={40} className="animate-spin text-[var(--green-500)] opacity-40" />
          </div>
        ) : (
          <>
            {filteredCourses.map(course => (
              <div key={`${course.id}-${activeTab}`} className="w-full flex animate-fade-in-up"> 
                <CourseCard course={course} />
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-50">
                <BookOpen size={48} className="text-[var(--text-secondary)] mb-4" />
                <span className="font-mono tracking-widest text-[var(--text-secondary)]">NO EXPERIENCES FOUND</span>
              </div>
            )}
          </>
        )}
      </div>
      
    </main>
  );
}
