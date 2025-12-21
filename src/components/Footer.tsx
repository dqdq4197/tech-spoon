import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Stack from './Stack'
import { MdOutlineRssFeed } from 'react-icons/md'

function Footer() {
  return (
    <footer className="mt-16 mb-8 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
        <SocialIcon kind="github" href={siteMetadata.github} size={6} />
      </div>
      <Stack
        className="mb-2 flex flex-row space-x-2 text-sm text-gray-500 dark:text-gray-400"
        divider={<span>{` • `}</span>}
      >
        <Link href={siteMetadata.github}>{siteMetadata.author}</Link>
        <span>{`© ${new Date().getFullYear()}`}</span>
        <Link href="/">{siteMetadata.title}</Link>
        <Stack as={Link} target="_blank" href="/feed.xml" className="flex-row items-center gap-1">
          <MdOutlineRssFeed />
          <span>rss</span>
        </Stack>
      </Stack>
    </footer>
  )
}

export default Footer
