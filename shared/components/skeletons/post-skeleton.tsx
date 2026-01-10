import React from "react";
import { Skeleton } from "../ui/skeleton";

export const PostSkeleton: React.FC = () => {
  return (
    <div className='mb-4'>
      <div className='flex items-center mb-3'>
        <Skeleton className='w-12.5 h-12.5 rounded-full mr-3' />
        <Skeleton className='w-12.5 h-2.5' />
      </div>
      <div>
        <Skeleton className='w-100 h-2.5 mb-2' />
        <Skeleton className='w-100 h-2.5 mb-2' />
        <Skeleton className='w-85 h-2.5' />
      </div>
    </div>
  );
};
