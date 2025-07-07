import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-5xl px-5 pt-[3.75rem]">{children}</section>
}
