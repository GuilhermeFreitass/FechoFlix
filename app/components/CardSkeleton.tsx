import { Skeleton } from 'antd'

export function CardSkeleton() {
  return (
    <div className="relative">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <Skeleton.Image 
          className="w-full h-full" 
          active 
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export function CardSkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
} 