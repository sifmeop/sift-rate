import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  devIndicators: false,
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
        port: '',
        pathname: '/images/cover/**'
      },
      {
        protocol: 'https',
        hostname: 'api.deezer.com',
        port: '',
        pathname: '/album/**'
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/media/**'
      },
      {
        protocol: 'https',
        hostname: 'corsproxy.io',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default config
