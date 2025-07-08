'use client'

import { useScrolled } from '@/hooks'
import headerNavLinks from '@/data/headerNavLinks'
import { cn } from '@/utils'
import Link from '@/components/Link'
import Stack from '@/components/Stack'
import SearchButton from '@/app/components/Navbar/SearchButton'
import ThemeSwitch from '@/app/components/Navbar/ThemeSwitch'
import MobileNav from '@/app/components/Navbar/MobileNav'

const Header = () => {
  const isScrolled = useScrolled()

  return (
    <nav
      className={cn(
        'fixed z-30 flex h-[3.75rem] w-full justify-center border-b border-transparent bg-white/5 backdrop-blur-md dark:bg-gray-950/5',
        { 'border-gray-950/5 dark:border-white/10': isScrolled }
      )}
    >
      <Stack className="w-5xl flex-row justify-between px-6">
        <Link href="/" aria-label="Tech Spoon" className="flex items-center">
          <span className="typo-h2">Tech Spoon</span>
        </Link>
        <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
          <div className="hidden items-center gap-x-4 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-brand-100 dark:hover:text-brand-95 typo-body1 dark:text-white-100 text-grey-100 m-1"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </Stack>
    </nav>
  )
}

export default Header
