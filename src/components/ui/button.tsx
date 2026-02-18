import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { memo } from 'react'

const buttonVariants = cva(
  // Base styles - shared across all variants
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-[background-color,box-shadow,transform,border-color] duration-200 touch-manipulation focus-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary-active text-primary-foreground shadow-md hover:shadow-lg hover:glow-outer hover:scale-[1.01] active:scale-[0.99]',
        secondary:
          'bg-surface border border-border-soft hover:bg-surface-elevated hover:border-border-emphasis hover:glow-inner active:bg-surface text-text-primary shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]',
        ghost:
          'bg-transparent hover:bg-surface-elevated text-text-primary hover:glow-inner',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm rounded-lg',
        default: 'h-11 px-6 py-3 text-base rounded-lg',
        lg: 'h-12 px-8 py-4 text-base rounded-xl',
        icon: 'size-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant,
  size,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  // React 19: ref is a regular prop, no forwardRef needed
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
}

// Export buttonVariants for use in other components (like links styled as buttons)
export { buttonVariants }

export default memo(Button)
