"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import toast from "react-hot-toast";
import { Edit2, Eye, Trash2, ArrowUp, ArrowDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Course = {
  id: string;
  title: string;
  slug: string;
  badge: string;
  duration: string;
  price: number | null;
  is_published: boolean;
  sort_order: number;
  image_url: string | null;
};

export default function CoursesTableClient({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    
    // Optimistic update
    setCourses(prev => prev.map(c => c.id === id ? { ...c, is_published: nextStatus } : c));
    
    const { error } = await supabase
      .from("courses")
      .update({ is_published: nextStatus })
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update status");
      // Revert optimism
      setCourses(prev => prev.map(c => c.id === id ? { ...c, is_published: currentStatus } : c));
    } else {
      toast.success(nextStatus ? "Course published" : "Course hidden");
      router.refresh();
    }
  };

  const deleteCourse = async (id: string) => {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete course");
    } else {
      toast.success("Course deleted");
      setCourses(prev => prev.filter(c => c.id !== id));
      router.refresh();
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === courses.length - 1)
    ) return;

    const newCourses = [...courses];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items in memory
    const temp = newCourses[index];
    newCourses[index] = newCourses[targetIndex];
    newCourses[targetIndex] = temp;
    
    // Re-assign explicit deterministic order
    const updatedWithOrder = newCourses.map((c, i) => ({ ...c, sort_order: i }));
    setCourses(updatedWithOrder);

    // Save batch to specific DB rows
    const updates = updatedWithOrder.map(c => ({
      id: c.id,
      sort_order: c.sort_order
    }));

    // In Supabase, if you don't have proper upsert RPC, we'll map multiple updates.
    // However, Supabase upsert works with array of objects if you include PK.
    const { error } = await supabase
      .from("courses")
      .upsert(updates.map(u => ({ id: u.id, sort_order: u.sort_order })));
      
    if (error) {
      toast.error("Failed to reorder items.");
      setCourses(courses); // Revert
    } else {
      toast.success("Order updated");
      router.refresh();
    }
  };

  return (
    <Table>
      <TableHeader className="bg-neutral-50/50">
        <TableRow>
          <TableHead className="w-[80px] text-center">Sort</TableHead>
          <TableHead className="w-[100px]">Photo</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Badge</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-neutral-500">
              No courses found. Add a course to get started.
            </TableCell>
          </TableRow>
        )}
        {courses.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell className="text-center">
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => moveOrder(index, 'up')} 
                  disabled={index === 0}
                  className="text-neutral-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp size={16} />
                </button>
                <span className="text-xs font-mono text-neutral-500">{course.sort_order ?? index}</span>
                <button 
                  onClick={() => moveOrder(index, 'down')} 
                  disabled={index === courses.length - 1}
                  className="text-neutral-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </TableCell>
            <TableCell>
              {course.image_url ? (
                <div className="w-16 h-10 relative rounded-md overflow-hidden border">
                  <img src={course.image_url} alt={course.title} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="w-16 h-10 bg-neutral-100 rounded-md flex items-center justify-center border">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">No Photo</span>
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium text-neutral-900">{course.title}</TableCell>
            <TableCell>
              {course.badge ? (
                <Badge variant="outline" className="text-xs uppercase bg-neutral-100">
                  {course.badge}
                </Badge>
              ) : (
                <span className="text-neutral-400">—</span>
              )}
            </TableCell>
            <TableCell className="text-neutral-600">{course.duration}</TableCell>
            <TableCell className="text-neutral-600">
              {course.price ? `₹${course.price.toLocaleString()}` : 'Contact'}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={course.is_published}
                  onCheckedChange={() => togglePublish(course.id, course.is_published)}
                />
                <span className={`text-xs font-semibold ${course.is_published ? 'text-green-600' : 'text-neutral-500'}`}>
                  {course.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link href={`/courses/${course.slug}`} target="_blank" rel="noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-neutral-900">
                    <Eye size={16} />
                  </Button>
                </Link>
                <Link href={`/admin/courses/${course.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-blue-600">
                    <Edit2 size={16} />
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the course "{course.title}" and remove its data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

