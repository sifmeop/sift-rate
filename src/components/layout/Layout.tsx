import { auth } from '~/server/auth'
import { Header } from './Header'
import { Main } from './Main'
import { MobileNav } from './MobileNav'

export const Layout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth()
  const user = session?.user

  const content = user ? (
    <>
      <Header email={user.email} />
      <MobileNav />
      <Main>{children}</Main>
    </>
  ) : (
    <>{children}</>
  )

  return <div className='dark min-h-dvh'>{content}</div>
}
