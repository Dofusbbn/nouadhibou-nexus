
import { Skeleton } from "@/components/ui/skeleton";

const VehicleSkeleton = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  );
};

export default VehicleSkeleton;
