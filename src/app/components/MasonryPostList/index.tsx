'use client'

import type { Post } from '@/app/types'
import React from 'react'
import Masonry, { type MasonryProps } from 'react-masonry-css'
import PostCard from './PostCard'

interface Props {
  posts: Post[]
}

const breakpointCols = {
  default: 3,
  1000: 2,
  650: 1,
} satisfies MasonryProps['breakpointCols']

function MasonryPostList(props: Props) {
  const { posts } = props

  return (
    <div className="mx-auto max-w-6xl">
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-x-4"
        columnClassName="bg-clip-padding"
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Masonry>
    </div>
  )
}

export default MasonryPostList
