import type { Metadata } from 'next'
import { RatePage } from '~/screens/rate'

export const metadata: Metadata = {
  title: 'Sift Rate — Добавить отзыв',
  description:
    'Добавить отзыв о фильме, сериале, игре, книге, песне или альбоме'
}

export default async function Rate() {
  return <RatePage />
}
