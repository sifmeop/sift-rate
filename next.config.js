import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  devIndicators: false,
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'api.deezer.com'
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io'
      },
      {
        protocol: 'https',
        hostname: 'corsproxy.io'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com'
      }
    ]
  }
}

export default config
