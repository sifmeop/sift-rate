import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sift-Rate',
    short_name: 'Sift-Rate',
    description:
      'Все отзывы и оценки пользователя на фильмы, сериалы, игры, книги, песни и альбомы. Личная история впечатлений в одном месте.',
    start_url: '/',
    display: 'standalone',
    background_color: '#23152d',
    theme_color: '#000000',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/images/screenshots/mobile.png',
        sizes: '1080x1920',
        type: 'image/png'
      },
      {
        src: '/images/screenshots/desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide'
      }
    ]
  }
}
