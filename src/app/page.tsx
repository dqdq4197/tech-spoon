import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allArticles } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import PulsingBlobs from './components/PulsingBlobs'
import siteMetadata from '@/data/siteMetadata'
import MasonryArticleList from './components/MasonryArticleList'
import Link from '@/components/Link'
import NewsletterForm from 'pliny/ui/NewsletterForm'

async function Page() {
  const sortedArticles = sortPosts(allArticles)
  const articles = allCoreContent(sortedArticles)
  console.log('articles:', articles)

  return (
    <SectionContainer>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <PulsingBlobs />
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          Articles
        </h1>
        <p className="typo-body1 text-greyOpacity-80 dark:text-white-80">
          {siteMetadata.description}
        </p>
        <MasonryArticleList articles={articles} />
      </div>
      <div className="flex justify-end">
        <Link
          href="/articles"
          className="typo-body1 text-brand-100 hover:text-brand-105 dark:hover:text-brand-95"
          aria-label="All articles"
        >
          All Articles &rarr;
        </Link>
      </div>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </SectionContainer>
  )
}

export default Page
