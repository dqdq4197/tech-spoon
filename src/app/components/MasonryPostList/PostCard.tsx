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
  const thumnail = images && images[0]

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
          'group mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition-all duration-300 ease-out',
          'before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/20 hover:before:opacity-100'
        )}
      >
        {thumnail && (
          <Image
            src={thumnail}
            alt={title}
            width={500}
            height={500}
            className="h-auto w-full object-cover transition-transform hover:scale-[1.05]"
          />
        )}
        <div className="p-4">
          {/* 태그 */}
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="typo-bold12 rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-white transition-colors duration-300 hover:bg-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="typo-h3 mb-2 text-white">{title}</h3>

          {summary && <p className="typo-body2 mb-4 flex-grow text-white/70">{summary}</p>}
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
