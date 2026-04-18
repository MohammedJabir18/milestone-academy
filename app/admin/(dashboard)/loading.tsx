import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminLoading() {
  return (
    <div className="p-12 space-y-10 max-w-[1400px]">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>

      {/* Stats Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-stone-200 rounded-[24px] shadow-sm bg-white p-8">
            <div className="flex justify-between items-start mb-6">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-16" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity Skeleton */}
        <Card className="lg:col-span-2 border-stone-200 rounded-[24px] shadow-sm overflow-hidden bg-white">
          <CardHeader className="border-b border-stone-100 p-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-32" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-stone-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 flex gap-4">
                  <Skeleton className="w-2 mt-1.5 h-2 rounded-full shrink-0" />
                  <div className="flex flex-col flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Skeleton */}
        <div className="space-y-8">
          <Card className="border-stone-200 rounded-[24px] shadow-sm bg-white p-8">
            <Skeleton className="h-7 w-32 mb-6" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none rounded-[24px] shadow-xl bg-stone-100 p-8 h-48 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
