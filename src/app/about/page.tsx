import { type Author, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({ title: 'About' })

function Page() {
  const author = allAuthors.find((p) => p.slug === 'heesu') as Author
  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}

export default Page
