import type { PlinyConfig } from 'pliny/config'

const siteMetadata = {
  title: 'Tech Spoon',
  author: 'heesu',
  description: '크게 한 스푼 담은, 소화 잘 되는 기술 이야기',
  language: 'ko',
  siteUrl: 'https://www.tech-spoon.me',
  siteRepo: 'https://github.com/dqdq4197/tech-spoon',
  socialBanner: `/static/images/brand/banner.png`,
  email: 'dqdq4197@gmail.com',
  github: 'https://github.com/dqdq4197',
  locale: 'ko',
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: 'G-CVRHJZP241',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
} satisfies Partial<PlinyConfig>

export default siteMetadata
