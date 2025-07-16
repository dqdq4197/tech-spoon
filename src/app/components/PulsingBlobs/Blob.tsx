import { cn } from '@/utils'

interface Props {
  className: string
}

function Blob(props: Props) {
  const { className } = props

  return <div className={cn('absolute animate-pulse rounded-full blur-3xl', className)} />
}

export default Blob
