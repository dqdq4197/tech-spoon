import '@/css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { IBM_Plex_Sans_KR } from 'next/font/google'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'next-themes'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { ReactNode } from 'react'

const space_grotesk = IBM_Plex_Sans_KR({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

interface Props {
  children: ReactNode
}

function RootLayout(props: Props) {
  const { children } = props

  return (
    <html lang={siteMetadata.language} className={space_grotesk.variable} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <meta name="naver-site-verification" content="5b3850ace6a78d2a7affca5bd04e3307392ba9c7" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
        <VercelAnalytics />
        <SpeedInsights />
        <ThemeProvider attribute="class">
          <Navbar />
          <main className="mb-auto">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
