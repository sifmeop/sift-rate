'use client'

import { Button } from '@heroui/button'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '~/constants/navLinks'
import { ROUTES } from '~/constants/routes'
import { Show } from '../ui/show'

interface IHeaderProps {
  email: string | null | undefined
}

export const Header = ({ email }: IHeaderProps) => {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({
      redirectTo: ROUTES.HOME
    })
  }

  return (
    <header className='border-b-border bg-background-primary/60 pt-safe-or-4 fixed top-0 z-50 w-full border-b pb-4 backdrop-blur-xl'>
      <div className='app-container flex h-full items-center justify-center gap-4 md:justify-between'>
        <Link
          href={ROUTES.REVIEWS}
          className='flex shrink-0 items-center gap-2'>
          <div className='bg-secondary-400 flex size-8 items-center justify-center rounded-lg'>
            <span className='text-primary-foreground text-lg font-bold'>S</span>
          </div>
          <span className='font-display text-foreground font-roboto-slab text-xl font-bold'>
            Sift-Rate
          </span>
        </Link>
        <nav className='hidden w-full items-center gap-2 md:flex'>
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Button
                key={href}
                as={Link}
                href={href}
                variant={isActive ? 'flat' : 'light'}
                color={isActive ? 'secondary' : 'default'}
                startContent={<Icon className='size-4.5' />}>
                <span className='text-sm font-semibold'>{label}</span>
              </Button>
            )
          })}
        </nav>
        <div className='absolute right-4 flex items-center gap-2 md:static'>
          <Show when={!!email}>
            <div className='hidden items-center gap-2 md:flex'>
              <UserIcon className='size-5' />
              <span className='text-sm'>{email}</span>
            </div>
          </Show>
          <Button
            isIconOnly
            type='submit'
            variant='flat'
            onPress={handleSignOut}>
            <LogOutIcon className='size-5' />
          </Button>
        </div>
      </div>
    </header>
  )
}
