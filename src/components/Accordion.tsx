import type { ReactNode } from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

interface Props {
  summary: string
  children: ReactNode
}

function Accordion(props: Props) {
  const { summary, children } = props

  return (
    <details className="group border-grey-10 bg-grey-3 my-4 overflow-hidden rounded-lg border dark:border-gray-700 dark:bg-gray-800/50">
      <summary className="typo-body1 dark:text-white-80 text-grey-100 flex cursor-pointer list-none items-center justify-between p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
        {summary}
        <MdArrowForwardIos className="size-3 transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <div className="prose dark:prose-invert dark:text-white-80 text-grey-700 max-w-none p-4 pt-2">
        {children}
      </div>
    </details>
  )
}

export default Accordion
