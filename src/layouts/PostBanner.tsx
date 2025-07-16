import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import type { Article } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { ReactNode } from 'react'

interface LayoutProps {
  content: CoreContent<Article>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostBanner({ content, next, prev, children }: LayoutProps) {
  const { slug, title, images } = content
  const displayImage =
    images && images.length > 0
      ? images[0]
      : 'https://res.cloudinary.com/dm5amo7c8/image/upload/v1752631860/brand-banner.png'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-2/1 w-full">
                  <Image src={displayImage} alt={title} fill className="rounded-4xl object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none py-4">{children}</div>
          <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
            <Comments slug={slug} />
          </div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-brand-100 hover:text-brand-105 dark:hover:text-brand-95"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-brand-100 hover:text-brand-105 dark:hover:text-brand-95"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
