import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-[#0d6b75] text-white hover:bg-[#094d55] focus-visible:ring-[#0d6b75]',
    secondary: 'bg-[#e0f2f4] text-[#0d6b75] hover:bg-[#c5e8ec]',
    danger: 'bg-red-700 text-white hover:bg-red-800',
    ghost: 'hover:bg-gray-100 text-gray-700',
    outline: 'border border-[#0d6b75] text-[#0d6b75] hover:bg-[#e0f2f4]',
  }
  const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>
}
