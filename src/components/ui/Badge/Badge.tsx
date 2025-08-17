import React from 'react'
import { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}

const variantClasses = {
  default: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  success: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  danger: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  info: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  gray: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
}

const iconSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-3.5 w-3.5', 
  lg: 'h-4 w-4'
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon: Icon,
  children,
  className
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center space-x-1 rounded-full font-medium whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {Icon && (
        <Icon className={clsx('flex-shrink-0', iconSizeClasses[size])} />
      )}
      <span>{children}</span>
    </span>
  )
}

// Status-specific badge variants for certificates
export interface StatusBadgeProps {
  status: 'completo' | 'em_andamento' | 'expirado' | 'n/a' | string
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusProps = (status: string) => {
    const normalizedStatus = status.toLowerCase().trim()
    
    switch (normalizedStatus) {
      case 'ativo':
      case 'completo':
      case 'complete':
      case 'concluído':
      case 'concluido':
        return {
          variant: 'success' as const,
          children: 'Completo'
        }
      case 'em_andamento':
      case 'em andamento':
      case 'progress':
      case 'andamento':
        return {
          variant: 'warning' as const,
          children: 'Em Andamento'
        }
      case 'expirado':
      case 'expired':
      case 'vencido':
        return {
          variant: 'danger' as const,
          children: 'Expirado'
        }
      case 'n/a':
      case 'na':
      case '':
      case 'undefined':
      case 'null':
        return {
          variant: 'gray' as const,
          children: 'N/A'
        }
      default:
        return {
          variant: 'gray' as const,
          children: 'N/A'
        }
    }
  }
  
  const statusProps = getStatusProps(status)
  
  return (
    <Badge
      variant={statusProps.variant}
      size="sm"
      className={className}
    >
      {statusProps.children}
    </Badge>
  )
}