import type { Metadata } from 'next'
import { buildSeoMetadata } from '~/lib/seo'
import { Home } from '~/screens/home'

export const generateMetadata = (): Metadata =>
  buildSeoMetadata({
    title: 'Главная',
    description:
      'Просматривайте свежие личные оценки и отзывы о фильмах, сериалах, играх, книгах, песнях и альбомах.',
    pathname: '/',
    keywords: [
      'главная страница',
      'свежие отзывы',
      'свежие оценки',
      'оценки медиа',
      'отзывы о медиа'
    ]
  })

export default function HomePage() {
  return <Home />
}
