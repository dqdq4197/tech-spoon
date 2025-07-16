import Stack from '@/components/Stack'
import { MdOutlineCalendarToday, MdSchedule } from 'react-icons/md'
import { formatReadingTime } from '../utils'
import { cn } from '@/utils'
import type { Article } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

type Props = Pick<CoreContent<Article>, 'date' | 'readingTime' | 'tags' | 'title'>

function CardHeader(props: Props) {
  const { date, readingTime, tags, title } = props

  const formattedReadingTime = formatReadingTime(readingTime)
  const formattedDate = new Date(date).toLocaleDateString('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Stack className="gap-2 p-4 pb-2">
      <Stack
        className={cn('typo-body4 text-greyOpacity-80 flex-row gap-1', 'dark:text-white-80')}
        divider={<span>·</span>}
      >
        <Stack className="flex-row items-center gap-1">
          <MdOutlineCalendarToday />
          <span>{formattedDate}</span>
        </Stack>
        <Stack className="flex-row items-center gap-1">
          <MdSchedule />
          <span>{formattedReadingTime}</span>
        </Stack>
      </Stack>
      {tags.length > 0 && (
        <Stack className="mt-1 flex-row flex-wrap gap-x-1.5 gap-y-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'typo-bold12 border-greyOpacity-10 text-greyOpacity-80 rounded-lg border bg-gray-300/10 px-2',
                'dark:border-white/30 dark:bg-white/20 dark:text-white'
              )}
            >
              {tag}
            </span>
          ))}
        </Stack>
      )}
      <h3 className="typo-h3 text-grey-100 dark:text-white-100">{title}</h3>
    </Stack>
  )
}

export default CardHeader
