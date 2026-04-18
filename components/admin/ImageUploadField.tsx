import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { createBrowserClient } from '@supabase/ssr';

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  label: string;
}

export function ImageUploadField({ value, onChange, label }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Basic validation
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // File unique name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `courses/${fileName}`;

      // Upload to bucket
      const { data, error: uploadError } = await supabase.storage
        .from('courses')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('courses')
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        onChange(publicUrlData.publicUrl);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('Failed to get public URL');
      }
      
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload error');
      toast.error(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    multiple: false,
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--text-primary)]">{label}</label>
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
          isDragActive ? 'border-[var(--green-500)] bg-[var(--green-50)]' : 'border-[var(--border-light)] hover:border-[var(--green-400)] bg-[var(--bg-secondary)]'
        }`}
      >
        <input {...getInputProps()} />
        
        {value ? (
          <div className="relative w-full aspect-[2/1]">
            <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-sm font-medium flex items-center gap-2">
                <Upload size={16} /> Replace Image
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="absolute top-2 right-2 bg-red-500/80 p-1.5 rounded-full text-white hover:bg-red-600 transition-colors z-10"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            {isUploading ? (
              <Loader2 className="animate-spin text-[var(--green-500)]" size={32} />
            ) : (
              <>
                <ImageIcon className="text-[var(--text-muted)] group-hover:text-[var(--green-500)] transition-colors" size={40} />
                <div className="text-center px-4">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Drop your image here</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">or click to browse</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
