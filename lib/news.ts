export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  type: 'image' | 'video' | 'text';
  category: string;
  cover_image_url: string | null;
  gallery_images: string[] | null;
  video_url: string | null;
  video_type: 'youtube' | 'vimeo' | 'upload' | null;
  video_thumbnail_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
