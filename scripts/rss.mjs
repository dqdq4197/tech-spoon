import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import { sortPosts } from 'pliny/utils/contentlayer.js'

import siteMetadata from '../data/siteMetadata.js'
import { allArticles, allAuthors } from '../.contentlayer/generated/index.mjs'
import tagData from '../src/app/tag-data.json' with { type: 'json' }

const OUTPUT_DIR = process.env.EXPORT ? 'out' : 'public'
const RSS_FILENAME = 'feed.xml'

const isPublished = (article) => article.draft !== true

const hasTag = (article, targetTag) => {
  if (!article.tags || article.tags.length === 0) return false
  return article.tags.map((t) => slug(t)).includes(targetTag)
}

function getAnonymousAuthor() {
  const anonymous = allAuthors.find((a) => a.slug === 'default' || a.slug === 'anonymous')
  return anonymous || allAuthors[0]
}

function resolveAuthors(authors) {
  if (!authors || authors.length === 0) {
    return [getAnonymousAuthor()]
  }

  return authors.map((authorId) => {
    const author = allAuthors.find((a) => a.slug === authorId || a.name === authorId)

    if (!author) {
      return getAnonymousAuthor()
    }

    return author
  })
}

const getPublishedPosts = (articles) => {
  return sortPosts(articles.filter(isPublished))
}

const writeFile = (filePath, content) => {
  const dir = path.dirname(filePath)
  mkdirSync(dir, { recursive: true })
  writeFileSync(filePath, content)
}

const buildRssItem = (config, article) => {
  const link = `${config.siteUrl}/articles/${article.slug}`
  const author = resolveAuthors(article.authors)[0]
  const pubDate = new Date(article.date).toUTCString()
  const summary = article.summary ? `<description>${escape(article.summary)}</description>` : ''
  const categories = article.tags?.map((tag) => `<category>${tag}</category>`).join('') || ''

  return `
    <item>
      <guid>${link}</guid>
      <title>${escape(article.title)}</title>
      <link>${link}</link>
      ${summary}
      <pubDate>${pubDate}</pubDate>
      <author>${author.email} (${author.name})</author>
      ${categories}
    </item>
  `
}

const buildRssXml = (config, articles, pageUrl) => {
  const lastBuildDate = new Date(articles[0].date).toUTCString()
  const atomLink = `${config.siteUrl}/${pageUrl}`
  const items = articles.map((article) => buildRssItem(config, article)).join('')

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escape(config.title)}</title>
        <link>${config.siteUrl}/articles</link>
        <description>${escape(config.description)}</description>
        <language>${config.language}</language>
        <managingEditor>${config.email} (${config.author})</managingEditor>
        <webMaster>${config.email} (${config.author})</webMaster>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${atomLink}" rel="self" type="application/rss+xml"/>
        ${items}
      </channel>
    </rss>
  `
}

const processFeed = (articles, relativePath) => {
  if (!articles.length) return

  const rssXml = buildRssXml(siteMetadata, articles, relativePath)
  const fullPath = path.join(OUTPUT_DIR, relativePath)

  writeFile(fullPath, rssXml)
}

export default function generateRSS() {
  const publishedPosts = getPublishedPosts(allArticles)

  if (!publishedPosts.length) {
    console.log('No published posts found.')
    return
  }

  // Generate Main RSS Feed
  processFeed(publishedPosts, RSS_FILENAME)

  // Generate Tag RSS Feeds
  Object.keys(tagData).forEach((tag) => {
    const taggedPosts = publishedPosts.filter((article) => hasTag(article, tag))

    if (taggedPosts.length > 0) {
      const tagPath = path.join('tags', tag, RSS_FILENAME)
      processFeed(taggedPosts, tagPath)
    }
  })

  console.log(`RSS feed generated at ${OUTPUT_DIR}/${RSS_FILENAME}`)
}
