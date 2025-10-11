import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps extends Metadata {
  title: string
  image?: string
}

export function genPageMetadata(props: PageSEOProps): Metadata {
  const { title, description, image, ...metaDataProps } = props

  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'ko',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...metaDataProps,
  }
}
