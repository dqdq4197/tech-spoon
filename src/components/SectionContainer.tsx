import { cn } from '@/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

function SectionContainer(props: Props) {
  const { className, ...sectionProps } = props

  return (
    <section className={cn('mx-auto max-w-5xl px-6 pt-[3.75rem]', className)} {...sectionProps} />
  )
}

export default SectionContainer
