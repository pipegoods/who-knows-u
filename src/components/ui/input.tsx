import { cn } from '@/lib/utils'
import { memo } from 'react'

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

function Input({ className, type, error, ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <div className='relative'>
      <input
        type={type}
        className={cn(
          'flex w-full bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted transition-colors duration-200 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'placeholder:text-destructive',
          className
        )}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${props.id}-error`}
          className='mt-1 text-sm text-destructive'
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default memo(Input)
