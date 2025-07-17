import React from 'react'
import Link from 'next/link'
import Stack from '@/components/Stack'
import { cn } from '@/utils'
import CardHeader from './CardHeader'
import CardContent from './CardContent'
import type { Article } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import CldImage from '@/components/CldImage'

interface Props {
  article: CoreContent<Article>
}

function ArticleCard(props: Props) {
  const { article } = props
  const { title, summary, date, tags, images, readingTime, path, authors } = article
  const thumbnail = images && images[0]

  return (
    <Link href={`/${path}`}>
      <Stack
        className={cn(
          'border-greyOpacity-5 mb-6 overflow-hidden rounded-3xl border bg-white/40 shadow-xl backdrop-blur-md transition-all',
          'hover:border-greyOpacity-10 hover:shadow-brand-20/40 hover:scale-[1.02]',
          'dark:hover:shadow-brand-105/40 dark:border-white/10 dark:bg-white/10 dark:hover:border-white/20'
        )}
      >
        {thumbnail && (
          <CldImage src={thumbnail} alt={title} width={500} height={500} className="w-full" />
        )}
        <CardHeader title={title} date={date} tags={tags} readingTime={readingTime} />
        <CardContent summary={summary} authors={authors} />
      </Stack>
    </Link>
  )
}

export default ArticleCard
