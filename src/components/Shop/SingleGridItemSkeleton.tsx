"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const SingleGridItemSkeleton = () => {
  return (
    <div className="group">
      {/* Image Placeholder */}
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        <Skeleton className="w-[250px] h-[250px] rounded-md" />

        {/* Hover Buttons Placeholder */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <Skeleton className="w-9 h-9 rounded-[5px]" />
          <Skeleton className="h-9 px-5 rounded-[5px] w-[100px]" />
          <Skeleton className="w-9 h-9 rounded-[5px]" />
        </div>
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-[15px] h-[15px] rounded-sm" />
          ))}
        </div>
        <Skeleton className="w-[40px] h-[15px]" />
      </div>

      {/* Title */}
      <Skeleton className="h-5 w-3/4 mb-1.5" />

      {/* Price */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-[60px]" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
    </div>
  );
};
