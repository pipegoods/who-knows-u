export default function LoadingSkeleton() {
  return (
    <div className='animate-pulse space-y-4'>
      {/* Input skeleton */}
      <div className='h-16 bg-gray-200 rounded-2xl'></div>
      {/* Footer skeleton */}
      <div className='space-y-3 mt-8'>
        <div className='h-4 bg-gray-200 rounded w-3/4 mx-auto'></div>
        <div className='flex justify-center gap-2'>
          <div className='h-6 bg-gray-200 rounded-full w-16'></div>
          <div className='h-6 bg-gray-200 rounded-full w-20'></div>
          <div className='h-6 bg-gray-200 rounded-full w-24'></div>
        </div>
        <div className='h-10 bg-gray-200 rounded-full w-32 mx-auto'></div>
      </div>
    </div>
  )
}
