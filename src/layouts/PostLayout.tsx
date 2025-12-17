import type { ReactNode } from 'react'
import { LuGithub } from 'react-icons/lu'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Article, Author } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import CldImage from '@/components/CldImage'
import { MdArrowBackIosNew, MdSchedule } from 'react-icons/md'
import { MdOutlineMailOutline } from 'react-icons/md'
import Stack from '@/components/Stack'
import { formatReadingTime } from '@/app/components/MasonryArticleList/utils'
import TextButton from '@/components/TextButton'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Article>
  authorDetails: CoreContent<Author>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

function PostLayout(props: LayoutProps) {
  const { content, authorDetails, next, prev, children } = props
  const { filePath, slug, date, title, tags, readingTime } = content
  const formattedReadingTime = formatReadingTime(readingTime)

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="space-y-1 pt-6 xl:pb-6">
            <Stack
              as="dl"
              className="typo-body2 sm:typo-body1 flex-row text-gray-500 dark:text-gray-400"
              divider={<span className="px-2"> · </span>}
            >
              <div>
                <dt className="sr-only">Published on</dt>
                <dd>
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="sr-only">reading time</dt>
                <dd className="flex items-center gap-1">
                  <MdSchedule className="size-3.5" />
                  <span>{formattedReadingTime}</span>
                </dd>
              </div>
            </Stack>
            <PageTitle>{title}</PageTitle>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                  {authorDetails.map((author) => (
                    <li className="space-y-4" key={author.name}>
                      <div className="flex items-center space-x-2">
                        {author.avatar && (
                          <CldImage
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="space-y-0.5 whitespace-nowrap">
                          <Stack className="flex-row space-x-1 text-gray-900 dark:text-gray-100">
                            <div>
                              <dt className="sr-only">Name</dt>
                              <dd className="typo-body2 md:typo-body1">{author.name}</dd>
                            </div>
                            <div>
                              <dt className="sr-only">Twitter</dt>
                              <dd>
                                {author.twitter && (
                                  <Link
                                    href={author.twitter}
                                    className="typo-body2 text-brand-100 hover:text-brand-105 dark:hover:text-brand-95"
                                  >
                                    {author.twitter
                                      .replace('https://twitter.com/', '@')
                                      .replace('https://x.com/', '@')}
                                  </Link>
                                )}
                              </dd>
                            </div>
                          </Stack>
                          <Stack className="typo-body4 text-grey-100 dark:text-grey-20 flex-row gap-1 xl:flex-col">
                            <div>
                              <dt className="sr-only">Email</dt>
                              {author.email && (
                                <dd>
                                  <Link
                                    href={`mailto:${author.email}`}
                                    className="flex items-center gap-1"
                                  >
                                    <MdOutlineMailOutline className="size-4" />
                                    {author.email}
                                  </Link>
                                </dd>
                              )}
                            </div>
                            <div>
                              <dt className="sr-only">Github</dt>
                              {author.github && (
                                <dd>
                                  <Link href={author.github} className="flex items-center gap-1">
                                    <LuGithub className="size-4" />
                                    {author.github.replace('https://github.com/', '')}
                                  </Link>
                                </dd>
                              )}
                            </div>
                          </Stack>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              <div className="typo-body2 pt-6 pb-6 text-gray-700 dark:text-gray-300">
                <Link href={editUrl(filePath)}>GitHub에서 보기</Link>
              </div>
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="typo-body4 tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      태그
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          이전 아티클
                        </h2>
                        <div className="text-brand-100 hover:text-brand-105 dark:hover:text-brand-95">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          다음 아티클
                        </h2>
                        <div className="text-brand-100 hover:text-brand-105 dark:hover:text-brand-95">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <TextButton asChild className="typo-body1" startIcon={<MdArrowBackIosNew />}>
                  <Link href="/articles" aria-label="All articles">
                    모든 아티클로 이동
                  </Link>
                </TextButton>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

export default PostLayout
