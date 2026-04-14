export default function LoadingSkeleton() {
  return (
    <div
      className='animate-pulse space-y-4'
      role='status'
      aria-live='polite'
      aria-busy='true'
    >
      <span className='visually-hidden'>Cargando contenido...</span>
      {/* Input skeleton */}
      <div className='h-16 bg-surface-subtle rounded-2xl'></div>
      {/* Footer skeleton */}
      <div className='space-y-3 mt-8'>
        <div className='h-4 bg-surface-subtle rounded w-3/4 mx-auto'></div>
        <div className='flex justify-center gap-2'>
          <div className='h-6 bg-surface-subtle rounded-full w-16'></div>
          <div className='h-6 bg-surface-subtle rounded-full w-20'></div>
          <div className='h-6 bg-surface-subtle rounded-full w-24'></div>
        </div>
        <div className='h-10 bg-surface-subtle rounded-full w-32 mx-auto'></div>
      </div>
    </div>
  )
}
