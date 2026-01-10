'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'

type TSeason = 'winter' | 'spring' | 'summer' | 'autumn'

export const SeasonalEffect = () => {
  const [season, setSeason] = useState<TSeason | null>(null)
  const [seasonImages, setSeasonImages] = useState<CanvasImageSource[]>([])

  useEffect(() => {
    const month = dayjs().get('month')

    if (month >= 0 && month <= 2) setSeason('winter')
    if (month >= 3 && month <= 5) setSeason('spring')
    if (month >= 6 && month <= 8) setSeason('summer')
    if (month >= 9 && month <= 11) setSeason('autumn')
  }, [])

  useEffect(() => {
    if (!season) return

    const loadImages = async () => {
      const urls = [season]

      const loadedImages = await Promise.allSettled(
        urls.map(async (url) => {
          return new Promise<CanvasImageSource>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = `/images/season-effects/${url}.png`
          })
        })
      )

      const filteredImages = loadedImages
        .filter((image) => image.status === 'fulfilled')
        .map((image) => image.value)

      if (filteredImages.length === 0) return

      setSeasonImages(filteredImages)
    }

    void loadImages()
  }, [season])

  if (!season || seasonImages.length === 0) return null

  return (
    <Snowfall
      snowflakeCount={100}
      radius={[5, 20]}
      images={seasonImages}
      style={{
        position: 'fixed',
        width: '100dvw',
        height: '100dvh',
        pointerEvents: 'none'
      }}
    />
  )
}
