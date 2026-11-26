import { cn } from '@/lib/utils'

type AlertVariant = 'info' | 'warning' | 'error' | 'success'

interface AlertProps {
  variant?: AlertVariant
  children: React.ReactNode
  className?: string
}

const alertClasses: Record<AlertVariant, string> = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
}

export function Alert({ variant = 'info', children, className }: AlertProps) {
  return (
    <div className={cn('rounded-lg border p-4', alertClasses[variant], className)}>
      {children}
    </div>
  )
}
