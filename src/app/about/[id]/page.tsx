import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '@/app/seo'
import { resolveAuthors } from '@/utils'
import type { Author } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'About' })

interface Props {
  params: Promise<{ id: Author['id'] }>
}

async function Page(props: Props) {
  const { params } = props
  const { id } = await params
  const author = resolveAuthors([id])[0]
  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}

export default Page
