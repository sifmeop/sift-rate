'use client'

import { cn } from '@heroui/theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '~/constants/navLinks'

export const MobileNav = () => {
  const pathname = usePathname()

  return (
    <div className='border-border bg-background-primary/95 fixed right-0 bottom-0 left-0 z-50 border-t pt-1 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden'>
      <nav
        style={{
          gridTemplateColumns: `repeat(${NAV_LINKS.length}, 1fr)`
        }}
        className='app-container grid h-16 items-center'>
        {NAV_LINKS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex h-full flex-col items-center justify-center gap-1 rounded-lg px-4 py-2 transition-colors duration-300',
                isActive
                  ? 'text-secondary'
                  : 'text-muted-foreground hover:text-white'
              )}>
              <Icon className='size-4.5' />
              <span className='text-sm font-semibold'>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
