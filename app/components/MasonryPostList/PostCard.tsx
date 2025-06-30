import type { Post } from 'app/types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  post: Post
}

function PostCard(props: Props) {
  const { post } = props
  const { title, summary, tags, images, readingTime, path } = post
  const thumnail = images && images[0]

  // 날짜 형식을 보기 좋게 변환합니다. (예: August 5, 2023)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/${path}`}>
      <div className="mb-4 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
          <h2 className="typo-h2 mb-2">{title}</h2>

          {summary && <p className="typo-body1 mb-4 flex-grow text-gray-700">{summary}</p>}

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* 읽는 시간 */}
          <div className="mt-auto text-right">
            <span className="text-sm text-gray-600">
              {readingTime ? readingTime.text : '읽는 시간 알 수 없음'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
