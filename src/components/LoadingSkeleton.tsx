
import { Card, CardContent } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="h-40 bg-gray-200 rounded-md animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
};
