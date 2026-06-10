import { NextResponse, type NextRequest } from 'next/server'
import { getJson } from 'serpapi'
import { env } from '~/env'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const title = searchParams.get('title')
  const year = searchParams.get('year')

  if (!title) {
    return NextResponse.json({ error: 'missing params' }, { status: 400 })
  }

  try {
    const response = (await getJson({
      engine: 'google_light',
      q: `site:kinopoisk.ru "${title}"${year ? ` ${year}` : ''}`,
      location: 'Moscow, Moscow, Russia',
      google_domain: 'google.com',
      hl: 'ru',
      gl: 'ru',
      api_key: `${env.SERPAPI_API_KEY}`
    })) as { organic_results: { link: string }[] }

    let url = response.organic_results[0]?.link

    if (url) {
      url = url.replace('.ru', '.vip')
    }

    return NextResponse.json({ url })
  } catch (error) {
    console.error(`Error searching for "${title}"`, error)
    return NextResponse.json({ error: 'search failed' }, { status: 500 })
  }
}
