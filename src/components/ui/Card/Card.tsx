import React from 'react'
import { motion, HTMLMotionProps } from 'motion/react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  clickable?: boolean
  children: React.ReactNode
}

const variantClasses = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700',
  outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
  glass: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50'
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = clsx(
    'rounded-xl transition-all duration-300',
    variantClasses[variant],
    paddingClasses[padding],
    {
      'hover:shadow-xl hover:-translate-y-1': hover && !clickable,
      'cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]': clickable,
      'transform-gpu': hover || clickable // GPU acceleration for better performance
    },
    className
  )

  if (clickable || hover) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={clickable ? { y: -4, scale: 1.02 } : hover ? { y: -2 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  )
}

// Card sub-components for better composition
export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={clsx('mb-4', className)}>
    {children}
  </div>
)

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <h3 className={clsx('text-lg font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h3>
)

export const CardDescription: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <p className={clsx('text-sm text-gray-600 dark:text-gray-400', className)}>
    {children}
  </p>
)

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={clsx('flex-1', className)}>
    {children}
  </div>
)

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children
}) => (
  <div className={clsx('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
)