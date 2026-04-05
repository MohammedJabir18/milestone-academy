"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Edit2, 
  Trash2, 
  Plus, 
  ExternalLink, 
  Search,
  BookOpen,
  Layout,
  Clock,
  IndianRupee
} from "lucide-react";
import { Course } from "@/lib/courses";
import CourseForm from "./CourseForm";
import { deleteCourse } from "../../../actions/course-actions";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface CourseListProps {
  initialCourses: Course[];
}

export default function CourseList({ initialCourses }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCourse(null);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const result = await deleteCourse(courseToDelete.id, courseToDelete.slug);
      if (result.success) {
        toast.success("Course deleted successfully");
        setCourses(courses.filter(c => c.id !== courseToDelete.id));
      } else {
        toast.error("Error deleting course: " + result.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setCourseToDelete(null);
      setIsDeleteAlertOpen(false);
    }
  };

  const refreshData = async () => {
    // In a real app, you'd refetch from server action or use useTransition/router.refresh()
    // For now, we'll assume the parent component will re-render or we can manually update local state
    // if we had a fetcher. But upsertCourse already calls revalidatePath.
    window.location.reload(); 
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input 
            placeholder="Search courses..." 
            className="pl-10 rounded-xl border-stone-200 h-11 focus-visible:ring-[var(--green-600)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleAddNew}
          className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl px-6 font-bold h-11 shadow-lg shadow-stone-200 transition-all active:scale-95 gap-2"
        >
          <Plus size={20} /> Add New Course
        </Button>
      </div>

      <Card className="border-stone-200 rounded-[24px] shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-stone-50/50">
              <TableRow className="hover:bg-transparent border-stone-100 h-16">
                <TableHead className="pl-8 font-bold text-stone-900">Course Detail</TableHead>
                <TableHead className="font-bold text-stone-900 whitespace-nowrap">Duration & Level</TableHead>
                <TableHead className="font-bold text-stone-900">Pricing</TableHead>
                <TableHead className="font-bold text-stone-900">Category</TableHead>
                <TableHead className="text-right pr-8 font-bold text-stone-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-stone-50/50 border-stone-100 h-24 transition-colors group">
                    <TableCell className="pl-8 py-4">
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0"
                          style={{ background: course.gradient }}
                        >
                          <BookOpen size={20} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[15px] font-bold text-stone-900 truncate">{course.title}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">/{course.slug}</span>
                            {course.badge && (
                              <Badge className="text-[10px] h-4 rounded-full px-1.5 font-black uppercase bg-stone-100 text-stone-500 border-none">
                                {course.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="flex items-center gap-2 text-stone-600 text-[13px] font-bold">
                          <Clock size={14} className="text-stone-300" /> {course.duration}
                        </div>
                        <div className="text-stone-400 text-[12px] font-medium ml-5">
                          {course.level}
                        </div>
                      </div>
                    </TableCell>
  
                    <TableCell>
                      <div className="flex flex-col min-w-[100px]">
                        <span className="text-[14px] font-bold text-stone-900 flex items-center">
                          <IndianRupee size={12} className="mr-0.5" />
                          {course.price ? course.price.toLocaleString() : "Contact Us"}
                        </span>
                        {course.originalPrice && (
                          <span className="text-[11px] text-stone-300 line-through font-medium">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
  
                    <TableCell>
                      <Badge variant="outline" className="bg-stone-50 border-stone-100 text-stone-600 font-bold capitalize px-3 py-1">
                        {course.category}
                      </Badge>
                    </TableCell>
  
                    <TableCell className="text-right pr-8">
                      <div className="flex items-center justify-end gap-2 min-w-[120px]">
                         <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(course)}
                          className="rounded-xl hover:bg-stone-100 transition-all text-stone-400 hover:text-[var(--green-600)]"
                         >
                           <Edit2 size={18} />
                         </Button>
                         <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            setCourseToDelete(course);
                            setIsDeleteAlertOpen(true);
                          }}
                          className="rounded-xl hover:bg-stone-100 transition-all text-stone-400 hover:text-red-500"
                         >
                           <Trash2 size={18} />
                         </Button>
                         <a href={`/courses/${course.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-stone-100 transition-all text-stone-400 hover:text-blue-500">
                            <ExternalLink size={18} />
                          </Button>
                         </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center text-stone-400 font-medium border-none font-sans">
                     No courses found. Try a different search or add a new one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <CourseForm 
        course={selectedCourse} 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={refreshData}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="rounded-[24px] border-stone-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-stone-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-stone-500">
              This will permanently delete the course <span className="font-bold text-stone-900">{courseToDelete?.title}</span> and remove all its curriculum modules from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-xl font-bold border-stone-200">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
