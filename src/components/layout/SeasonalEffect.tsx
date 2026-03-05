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

    if (month === 11 || month <= 1) setSeason('winter')
    else if (month >= 2 && month <= 4) setSeason('spring')
    else if (month >= 5 && month <= 7) setSeason('summer')
    else if (month >= 8 && month <= 10) setSeason('autumn')
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
