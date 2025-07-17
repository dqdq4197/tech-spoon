import Avatar from '@/components/Avatar'
import Hr from '@/components/Hr'
import Stack from '@/components/Stack'
import { resolveAuthors } from '@/utils'
import type { Article, Author } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

type Props = Pick<CoreContent<Article>, 'summary' | 'authors'>

function CardContent(props: Props) {
  const { summary, authors } = props

  const { avatars, names } = (() => {
    const resolvedAuthors = resolveAuthors(authors)

    return resolvedAuthors.reduce(
      (acc, author) => {
        acc.avatars.push(author.avatar)
        acc.names.push(author.name)
        return acc
      },
      { avatars: [], names: [] } as { avatars: Author['avatar'][]; names: Author['name'][] }
    )
  })()

  return (
    <Stack className="px-4 pb-4" divider={<Hr className="my-3" />}>
      {summary && <p className="typo-body2 text-grey-100 dark:text-white/70">{summary}</p>}
      <Stack className="flex-row items-center gap-2">
        <Avatar avatars={avatars} size="small" />
        <Stack
          className="typo-h5 text-greyOpacity-80 dark:text-white-80 flex-row gap-0.5"
          divider={<span>·</span>}
        >
          {names}
        </Stack>
      </Stack>
    </Stack>
  )
}
export default CardContent
