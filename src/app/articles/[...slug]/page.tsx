import '@/css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allArticles } from 'contentlayer/generated'
import type { Article } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { resolveAuthors } from '@/utils'
import { getCldOgImageUrl } from 'next-cloudinary'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata(props: Props): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allArticles.find((article) => article.slug === slug)

  if (!post) {
    return
  }

  const { title, summary: description, authors, images, date, lastmod } = post
  const authorDetails = resolveAuthors(authors || [])
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const authorNames = authorDetails.map((author) => author.name)

  const imageUrls = images?.map((image) => getCldOgImageUrl({ src: image })) || [
    siteMetadata.socialBanner,
  ]
  const ogImages = imageUrls.map((image) => ({ url: image }))

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteMetadata.title,
      locale: 'ko',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authorNames.length > 0 ? authorNames : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrls,
    },
  }
}

export const generateStaticParams = async () => {
  return allArticles.map((article) => ({
    slug: article.slug.split('/').map(decodeURI),
  }))
}

async function Page(props: Props) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allArticles))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)

  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allArticles.find((p) => p.slug === slug) as Article
  const authorDetails = resolveAuthors(post?.authors || [])
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}

export default Page
