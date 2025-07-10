import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allArticles } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allArticles)
  const posts = allCoreContent(sortedPosts)
  console.log('Posts:', posts)

  return <Main posts={posts} />
}
