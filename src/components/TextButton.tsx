import { type VariantProps, cva } from 'class-variance-authority'
import { type ButtonHTMLAttributes } from 'react'

import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '@/utils'

export const textButtonVariants = cva(
  'typo-body3 inline-flex h-9 w-auto min-w-14 items-center bg-transparent disabled:cursor-not-allowed hover:bg-greyOpacity-10 dark:hover:bg-gray-900 rounded-md transition-colors',
  {
    variants: {
      variant: {
        primary: 'text-brand-100 hover:text-brand-105 dark:hover:text-brand-95',
        neutral: 'hover:text-brand-100 dark:hover:text-brand-95 dark:text-white-100 text-grey-100',
      },
      align: {
        center: 'px-2 text-center',
        left: 'pr-2 text-left',
        right: 'pl-2 text-right',
      },
    },
    defaultVariants: {
      variant: 'primary',
      align: 'center',
    },
  }
)

export interface TextButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textButtonVariants> {
  asChild?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

function TextButton(props: TextButtonProps) {
  const {
    asChild = false,
    variant = 'primary',
    align = 'center',
    startIcon,
    endIcon,
    children,
    className,
    ...restProps
  } = props
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        textButtonVariants({ variant, align }),
        {
          'px-0': startIcon || endIcon,
        },
        className
      )}
      {...restProps}
    >
      {startIcon && (
        <span className="mr-0.5 size-4 shrink-0 text-inherit [&>svg]:size-full">{startIcon}</span>
      )}
      <Slottable>{children}</Slottable>
      {endIcon && (
        <span className="ml-0.5 size-4 shrink-0 text-inherit [&>svg]:size-full">{endIcon}</span>
      )}
    </Comp>
  )
}

export default TextButton
