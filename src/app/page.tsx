import { sortPosts, allCoreContent, CoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, Blog } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  console.log('Posts:', posts)

  return <Main posts={posts} />
}
