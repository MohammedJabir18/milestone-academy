import React from 'react';
import { createServer } from '@/lib/supabase/server';
import { 
  Plus, 
  Search, 
  Grid2X2, 
  List, 
  HardDrive, 
  Trash2, 
  ExternalLink, 
  FileIcon, 
  ImageIcon, 
  FileVideo, 
  UploadCloud 
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const BUCKETS = ["news", "courses", "testimonials", "faculty"];

export default async function MediaLibraryPage() {
  const supabase = await createServer();
  
  // Fetch files from all buckets
  const allFiles: any[] = [];
  let totalSizeBytes = 0;

  for (const bucket of BUCKETS) {
    const { data: files, error } = await supabase.storage.from(bucket).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (files) {
      files.forEach(file => {
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(file.name);
        allFiles.push({
          ...file,
          bucket,
          url: publicUrl,
        });
        totalSizeBytes += file.metadata?.size || 0;
      });
    }
  }

  const totalMB = (totalSizeBytes / (1024 * 1024)).toFixed(2);
  const quotaGB = 1; // Assume 1GB free tier
  const usagePercent = (parseFloat(totalMB) / (quotaGB * 1024) * 100).toFixed(1);

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest">
            <span>ADMIN HUB</span>
            <span className="opacity-30">/</span>
            <span className="text-[var(--green-600)]">MEDIA LIBRARY</span>
          </div>
          <h1 className="text-4xl font-serif text-stone-900">Platform Assets</h1>
          <p className="text-sm text-stone-500 font-medium max-w-lg leading-relaxed">
            Consolidated view of all media uploaded across the platform. Managed safely via Supabase Storage.
          </p>
        </div>

        {/* Storage Stats */}
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <HardDrive size={16} className="text-[var(--green-600)]" />
               <span className="text-sm font-bold text-stone-900">Storage Usage</span>
             </div>
             <span className="text-xs font-bold text-stone-400 uppercase tracking-tighter">{usagePercent}% used</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
             <div 
               className="h-full bg-[var(--green-500)] transition-all" 
               style={{ width: `${usagePercent}%` }} 
             />
          </div>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
            {totalMB} MB of {quotaGB} GB Total
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {allFiles.length > 0 ? (
          allFiles.map((file, idx) => (
            <div key={idx} className="group aspect-square relative bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
              {file.metadata?.mimetype?.includes('image') ? (
                 <Image src={file.url} alt={file.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 p-4">
                    {file.metadata?.mimetype?.includes('video') ? <FileVideo size={40} className="text-stone-300" /> : <FileIcon size={40} className="text-stone-300" />}
                    <span className="text-[9px] font-mono text-stone-400 mt-2 truncate w-full text-center">{file.name}</span>
                 </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <Button 
                   size="icon" 
                   variant="secondary" 
                   className="h-10 w-10 rounded-xl font-bold bg-white/90"
                   onClick={() => window.open(file.url, '_blank')}
                 >
                   <ExternalLink size={18} />
                 </Button>
                 <Button 
                   size="icon" 
                   variant="destructive" 
                   className="h-10 w-10 rounded-xl font-bold bg-red-500/90"
                 >
                   <Trash2 size={18} />
                 </Button>
              </div>
              
              {/* Bucket Label */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-md text-[8px] font-bold text-stone-600 uppercase tracking-widest border border-white/50">
                {file.bucket}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center text-stone-400 space-y-6">
             <UploadCloud className="mx-auto text-stone-100" size={80} />
             <div className="space-y-2">
               <p className="text-2xl font-serif text-stone-800">Media Library is empty</p>
               <p className="text-sm">Media will appear here as you upload them in the editor.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
