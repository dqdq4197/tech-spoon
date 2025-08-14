import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '@/app/seo'
import { resolveAuthors } from '@/utils'

export const metadata = genPageMetadata({ title: 'About' })

function Page() {
  const author = resolveAuthors(['Heesu Choi'])[0]
  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}

export default Page
