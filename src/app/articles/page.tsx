import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allArticles } from 'contentlayer/generated'
import { genPageMetadata } from '@/app/seo'
import ListLayout from '@/layouts/ListLayout'

const POSTS_PER_PAGE = 5
const PAGE_NUMBER = 1

export const metadata = genPageMetadata({ title: 'Articles' })

interface Props {
  searchParams: Promise<{ page: string }>
}

function Page(_props: Props) {
  const posts = allCoreContent(sortPosts(allArticles))
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * PAGE_NUMBER)
  const pagination = {
    currentPage: PAGE_NUMBER,
    totalPages,
  }

  return (
    <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
  )
}

export default Page
