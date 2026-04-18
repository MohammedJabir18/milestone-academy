import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <TableSkeleton rows={8} cols={5} />
      </div>
    </div>
  );
}
