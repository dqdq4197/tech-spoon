'use client'

import type { Post } from '@/app/types'
import React from 'react'
import Masonry, { type MasonryProps } from 'react-masonry-css'
import PostCard from './PostCard'
import { motion, stagger } from 'motion/react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.05, { from: 'center' }),
    },
  },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

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
    <div className="mx-auto max-w-6xl lg:block">
      <motion.div variants={container} initial="hidden" animate="show">
        <Masonry
          breakpointCols={breakpointCols}
          className="flex gap-x-4"
          columnClassName="bg-clip-padding"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </Masonry>
      </motion.div>
    </div>
  )
}

export default MasonryPostList
