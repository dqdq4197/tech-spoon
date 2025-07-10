import type { Post } from '@/app/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Stack from '@/components/Stack'
import { cn } from '@/utils'
import Hr from '@/components/Hr'

interface Props {
  post: Post
}

function PostCard(props: Props) {
  const { post } = props
  const { title, summary, tags, images, readingTime, path, authors } = post
  const thumbnail = images && images[0]

  // 날짜 형식을 보기 좋게 변환합니다. (예: August 5, 2023)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/${path}`}>
      <Stack
        className={cn(
          'border-greyOpacity-5 mb-6 overflow-hidden rounded-3xl border bg-white/40 shadow-xl backdrop-blur-md transition-all',
          'hover:border-greyOpacity-10 hover:shadow-brand-20/40 hover:before:from-greyOpacity-5 hover:scale-[1.02] hover:shadow-2xl hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-br',
          'dark:hover:shadow-brand-105/40 dark:border-white/10 dark:bg-white/10 dark:hover:border-white/20 dark:hover:before:from-white/12'
        )}
      >
        {thumbnail && (
          <Image
            src={`${process.env.BASE_PATH ?? ''}${thumbnail}`}
            alt={''}
            width={500}
            height={500}
            className="w-full"
          />
        )}
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

          {summary && (
            <p className="typo-body2 mb-4 flex-grow text-gray-950 dark:text-white/70">{summary}</p>
          )}
          <Hr />
          <div>
            {/* 작성자와 날짜 */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{authors?.[0]}</span>
              <span>{formattedDate}</span>
            </div>
          </div>
          {/* 읽는 시간 */}
          <div className="mt-auto text-right">
            <span className="text-sm text-gray-600">
              {readingTime ? readingTime.text : '읽는 시간 알 수 없음'}
            </span>
          </div>
        </div>
      </Stack>
    </Link>
  )
}

export default PostCard
