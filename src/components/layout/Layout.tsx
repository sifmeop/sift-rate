import { auth } from '~/server/auth'
import { Header } from './Header'
import { Main } from './Main'
import { MobileNav } from './MobileNav'
import { SeasonalEffect } from './SeasonalEffect'

export const Layout = async ({ children }: React.PropsWithChildren) => {
  const session = await auth()
  const user = session?.user

  const content = user ? (
    <>
      <SeasonalEffect />
      <Header email={user.email} />
      <Main>{children}</Main>
      <MobileNav />
    </>
  ) : (
    <>{children}</>
  )

  return <div>{content}</div>
}
