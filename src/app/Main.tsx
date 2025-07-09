import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import MasonryPostList from './components/MasonryPostList'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

const MAX_DISPLAY = 5

interface Props {
  posts: CoreContent<Blog>[]
}

function Home(props: Props) {
  const { posts } = props

  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 h-64 w-64 animate-pulse rounded-full bg-pink-500/20 blur-3xl delay-500"></div>
        </div>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          Posts
        </h1>
        <p className="typo-body1 text-greyOpacity-80 dark:text-white-80">
          {siteMetadata.description}
        </p>
        <MasonryPostList posts={posts} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end">
          <Link
            href="/blog"
            className="typo-body1 text-brand-100 hover:text-brand-105 dark:hover:text-brand-95"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

export default Home
