import type { PolymorphicComponentProps } from '@/types/polymorphic'
import { cn } from '@/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import type { ElementType } from 'react'

const hrVariants = cva('border-0 border-greyOpacity-10 dark:border-white-10', {
  variants: {
    type: {
      solid: 'border-solid',
      dash: 'border-dashed',
    },
    direction: {
      horizontal: 'h-px w-full border-t',
      vertical: 'h-full w-px border-l',
    },
  },
  defaultVariants: {
    type: 'solid',
    direction: 'horizontal',
  },
})

export type HrProps<E extends ElementType = 'hr'> = PolymorphicComponentProps<E, object> &
  VariantProps<typeof hrVariants>

function Hr<E extends ElementType = 'hr'>(props: HrProps<E>) {
  const { as, type, direction, className, ...hrProps } = props

  const Component = as ?? 'hr'

  return <Component className={cn(hrVariants({ type, direction, className }))} {...hrProps} />
}

export default Hr
