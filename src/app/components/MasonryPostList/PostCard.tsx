import type { Post } from '@/app/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Stack from '@/components/Stack'
import { cn, resolveAuthors } from '@/utils'
import Hr from '@/components/Hr'
import Avatar from '@/components/Avatar'

interface Props {
  post: Post
}

function PostCard(props: Props) {
  const { post } = props
  const { title, summary, tags, images, readingTime, path, authors } = post
  const thumbnail = images && images[0]

  const formattedDate = new Date(post.date).toLocaleDateString('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const resolvedAuthors = resolveAuthors(authors)

  return (
    <Link href={`/${path}`}>
      <Stack
        className={cn(
          'border-greyOpacity-5 mb-6 overflow-hidden rounded-3xl border bg-white/40 shadow-xl backdrop-blur-md transition-all',
          'hover:border-greyOpacity-10 hover:shadow-brand-20/40 hover:scale-[1.02]',
          'dark:hover:shadow-brand-105/40 dark:border-white/10 dark:bg-white/10 dark:hover:border-white/20'
        )}
      >
        {thumbnail && <Image src={thumbnail} alt="" width={500} height={500} className="w-full" />}
        <div className="p-4">
          {/* 태그 */}
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="typo-bold12 rounded-full border bg-gray-300/20 px-2.5 py-0.5 text-gray-600/80 dark:border-white/30 dark:bg-white/20 dark:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="typo-h3 text-grey-100 dark:text-white-100 mb-2">{title}</h3>
          <Stack
            className="typo-body3 text-greyOpacity-80 dark:text-white-80 flex-row gap-0.5"
            divider={<span>·</span>}
          >
            <span>{formattedDate}</span>
            <span>{readingTime.text}</span>
          </Stack>
          {summary && (
            <p className="typo-body2 flex-grow text-gray-950 dark:text-white/70">{summary}</p>
          )}
          <Hr className="my-3" />
          <Stack className="flex-row items-center gap-2">
            <Avatar avatars={['heesu_avatar', 'brand-icon']} size="small" />
            <Stack
              className="typo-h5 text-greyOpacity-80 dark:text-white-80 flex-row gap-0.5"
              divider={<span>·</span>}
            >
              {resolvedAuthors.map((author) => author.name)}
            </Stack>
          </Stack>
        </div>
      </Stack>
    </Link>
  )
}

export default PostCard
