import { Skeleton, TableSkeleton } from "@/components/ui/skeleton";

export default function EnrollmentsLoading() {
  return (
    <div className="p-12 space-y-6 max-w-[1400px]">
      <div className="space-y-2">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-5 w-[400px]" />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8">
        <TableSkeleton rows={10} cols={6} />
      </div>
    </div>
  );
}
