import React from 'react';
import NewsGrid from '@/components/news/NewsGrid';

export const metadata = {
  title: 'Milestone Moments — News & Updates',
  description: 'Latest news, student wins, placements, and campus updates from Milestone Academy. Stay connected with Kerala\'s premier accounting & finance academy.',
  alternates: {
    canonical: 'https://milestonefinacademy.info/news',
  },
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* HEADER BANNER */}
      <header className="w-full bg-[var(--bg-dark)] py-24 md:py-32 relative overflow-hidden">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--green-500)]/5 rounded-full blur-[120px] -mr-64 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--green-500)]/5 rounded-full blur-[100px] -ml-32 -mb-16" />
        
        <div className="max-w-[var(--container-max)] mx-auto px-6 relative z-10 text-center">
          <span className="inline-block mb-6 font-mono text-[13px] text-[var(--accent-mint)] uppercase tracking-[0.3em]">
            OUR FEED
          </span>
          <h1 className="font-serif text-[56px] md:text-[72px] text-white leading-[1.1] mb-6">
            Milestone Moments
          </h1>
          <p className="font-syne text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Stay updated with everything happening at <span className="text-white font-semibold">Milestone Fin Academy</span> — from campus events to global student wins.
          </p>
        </div>
      </header>

      {/* CLient-side Filterable Grid */}
      <section>
        <NewsGrid />
      </section>
    </main>
  );
}
