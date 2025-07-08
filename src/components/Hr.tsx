import type { PolymorphicComponentProps } from '@/types/polymorphic'
import { cn } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type { ElementType } from 'react'

export const hrVariants = cva('border-0', {
  variants: {
    type: {
      solid: 'border-solid',
      dash: 'border-dashed',
    },
    direction: {
      horizontal: 'h-px w-full border-t',
      vertical: 'h-full w-px border-l',
    },
    color: {
      default: 'border-white/12',
      white80: 'border-white/80',
      white30: 'border-white/30',
      primary: 'border-brand-100',
      shade: 'border-white/5',
    },
  },
  defaultVariants: {
    type: 'solid',
    direction: 'horizontal',
    color: 'default',
  },
})

export type HrProps<E extends ElementType = 'hr'> = PolymorphicComponentProps<E, object> &
  VariantProps<typeof hrVariants>

function Hr<E extends ElementType = 'hr'>(props: HrProps<E>) {
  const { as, type, direction, color, className, ...hrProps } = props

  const Component = as ?? 'hr'

  return (
    <Component className={cn(hrVariants({ type, direction, color, className }))} {...hrProps} />
  )
}

export default Hr
