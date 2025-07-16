'use client'

import React from 'react'
import Masonry, { type MasonryProps } from 'react-masonry-css'
import { motion, stagger } from 'motion/react'
import { useIsServer } from '@/hooks'
import ArticleCard from './ArticleCard'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Article } from 'contentlayer/generated'

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

const breakpointCols = {
  default: 3,
  1000: 2,
  650: 1,
} satisfies MasonryProps['breakpointCols']

interface Props {
  articles: CoreContent<Article>[]
}

function MasonryArticleList(props: Props) {
  const { articles } = props
  const isServer = useIsServer()

  return (
    <motion.div variants={container} initial={isServer ? 'hidden' : 'show'} animate="show">
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-x-4"
        columnClassName="bg-clip-padding"
      >
        {articles.map((article) => (
          <motion.div key={article.slug} variants={item}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  )
}

export default MasonryArticleList
