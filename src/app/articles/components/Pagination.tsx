import TextButton, { type TextButtonProps } from '@/components/TextButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

interface PaginationButtonProps extends TextButtonProps {
  href: string
}

const PaginationButton = (props: PaginationButtonProps) => {
  const { href, rel, disabled, children, ...rest } = props

  const buttonProps = {
    variant: 'neutral' as const,
    className: 'typo-body1 px-1',
    ...rest,
  }

  if (disabled) {
    return (
      <TextButton {...buttonProps} disabled>
        {children}
      </TextButton>
    )
  }

  return (
    <TextButton {...buttonProps} asChild>
      <Link href={href} rel={rel}>
        {children}
      </Link>
    </TextButton>
  )
}

export interface PaginationProps {
  totalPages: number
  currentPage: number
}

function Pagination(props: PaginationProps) {
  const { totalPages, currentPage } = props
  const pathname = usePathname()
  const basePath = pathname.split('/page/')[0]
  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const prevPageUrl = currentPage - 1 === 1 ? basePath : `${basePath}/page/${currentPage - 1}`
  const nextPageUrl = `${basePath}/page/${currentPage + 1}`

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex items-center justify-between">
        <PaginationButton
          href={prevPageUrl}
          rel="prev"
          disabled={!hasPrevPage}
          startIcon={<MdArrowBackIosNew className="w-3" />}
        >
          이전
        </PaginationButton>
        <span>
          {currentPage} / {totalPages}
        </span>
        <PaginationButton
          href={nextPageUrl}
          rel="next"
          disabled={!hasNextPage}
          endIcon={<MdArrowForwardIos className="w-3" />}
        >
          다음
        </PaginationButton>
      </nav>
    </div>
  )
}

export default Pagination
