import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allArticles } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import PulsingBlobs from './components/PulsingBlobs'
import siteMetadata from '@/data/siteMetadata'
import MasonryArticleList from './components/MasonryArticleList'
import Link from '@/components/Link'
import { MdArrowForwardIos } from 'react-icons/md'
import TextButton from '@/components/TextButton'
import { IcDualUnderline } from 'public/static/icons/Underline'

async function Page() {
  const sortedArticles = sortPosts(allArticles)
  const articles = allCoreContent(sortedArticles)

  return (
    <SectionContainer>
      <div className="space-y-5 pt-6 pb-8">
        <PulsingBlobs />
        <div className="inline-block">
          <p className="typo-body1 text-grey-100 dark:text-white-80 sm:text-lg">
            {siteMetadata.description}
          </p>
          <IcDualUnderline className="text-greyOpacity-40 dark:text-greyOpacity-80 w-full" />
        </div>
        <MasonryArticleList articles={articles} />
      </div>
      <div className="flex justify-end">
        <TextButton asChild className="typo-body1 px-2" endIcon={<MdArrowForwardIos />}>
          <Link href="/articles" aria-label="All articles">
            모든 아티클
          </Link>
        </TextButton>
      </div>
    </SectionContainer>
  )
}

export default Page
