import { NextResponse } from 'next/server'
import { ROUTES } from '~/constants/routes'
import { auth } from '~/server/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const protectedRoutes = [ROUTES.REVIEWS, ROUTES.TIMELINE, ROUTES.RATE]
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !isLoggedIn) {
    const newUrl = new URL(ROUTES.HOME, nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'
}
