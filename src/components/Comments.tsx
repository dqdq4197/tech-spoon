'use client'

import Giscus, { type Theme } from '@giscus/react'
import { useTheme } from 'next-themes'

const COMMENTS_ID = 'comments-container'

// https://giscus.app/
const GISCUS_REPO = 'dqdq4197/tech-spoon'
const GISCUS_REPO_ID = 'R_kgDOO90MHA'
const GISCUS_CATEGORY = 'Comments'
const GISCUS_CATEGORY_ID = 'DIC_kwDOO90MHM4Csjks'

interface Props {
  slug: string
}

function Comments(props: Props) {
  const { slug } = props
  const { resolvedTheme } = useTheme()

  const giscusTheme: Theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  return (
    <Giscus
      id={COMMENTS_ID}
      repo={GISCUS_REPO}
      repoId={GISCUS_REPO_ID}
      category={GISCUS_CATEGORY}
      categoryId={GISCUS_CATEGORY_ID}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      lang="ko"
      loading="lazy"
      term={slug}
      theme={giscusTheme}
    />
  )
}

export default Comments
