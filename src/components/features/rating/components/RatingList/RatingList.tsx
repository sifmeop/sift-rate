'use client'

import { RatingListProvider } from '~/contexts/RatingListProvider'
import type { IRatingCardData } from '../../types/rating.types'
import { RatingItems } from './RatingItems'
import { RatingListFilter } from './RatingListFilter'
import { RatingListSearch } from './RatingListSearch'
import { RatingListSort } from './RatingListSort'
import { RatingListTabs } from './RatingListTabs'

interface IRatingListProps {
  items: IRatingCardData[]
}

export const RatingList = ({ items }: IRatingListProps) => {
  return (
    <RatingListProvider>
      <div className='flex flex-col gap-3'>
        <div className='grid gap-3 md:grid-cols-[200px_1fr]'>
          <RatingListTabs />
          <RatingListSearch />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <RatingListSort />
          <RatingListFilter items={items} />
        </div>
        <RatingItems items={items} />
      </div>
    </RatingListProvider>
  )
}
