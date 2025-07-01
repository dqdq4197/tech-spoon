import {
  Children,
  type ElementType,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from 'react'
import type { PolymorphicComponentProps, RefObjectOf } from 'types/polymorphic'
import { cn } from 'utils'

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children: ReactNode, separator: ReactElement<unknown>) {
  const childrenArray = Children.toArray(children).filter(Boolean)

  return childrenArray.reduce<ReactNode[]>((output, child, index) => {
    output.push(child)

    if (index < childrenArray.length - 1) {
      output.push(cloneElement(separator, { key: `separator-${index}` }))
    }

    return output
  }, [])
}

export type StackProps<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E,
  {
    divider?: ReactElement<unknown>
  }
>

const Stack = forwardRef(function Stack<E extends ElementType = 'div'>(
  props: StackProps<E>,
  ref: ForwardedRef<RefObjectOf<E>>
) {
  const { as, divider, className, children, ...divProps } = props

  const Component = as ?? 'div'

  return (
    <Component ref={ref} className={cn('flex flex-col', className)} {...divProps}>
      {divider ? joinChildren(children, divider) : children}
    </Component>
  )
})

export default Stack
