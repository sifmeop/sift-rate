import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { EmptyState, ErrorMessage } from '~/components/ui/query'
import { RatingListProvider } from '~/contexts/RatingListProvider'
import type { IRatingCardData } from '../../types/rating.types'
import { RatingItems } from './RatingItems'
import { RatingListContentType } from './RatingListContentType'
import { RatingListContentTypeMobile } from './RatingListContentTypeMobile'
import { RatingListFilter } from './RatingListFilter'
import { RatingListSearch } from './RatingListSearch'
import { RatingListSort } from './RatingListSort'
import { RatingListTabs } from './RatingListTabs'

interface IRatingListProps {
  items?: IRatingCardData[]
  isLoading: boolean
  error: string | undefined
}

export const RatingList = ({ items, isLoading, error }: IRatingListProps) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!items || items.length === 0) {
    return <EmptyState />
  }

  return (
    <RatingListProvider>
      <div className='flex flex-col gap-3'>
        <div className='grid gap-3 md:grid-cols-[200px_1fr]'>
          <RatingListTabs items={items} />
          <RatingListSearch />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <RatingListSort />
          <RatingListFilter items={items} />
        </div>
        <RatingListContentType />
        <RatingListContentTypeMobile />
        <RatingItems items={items} />
      </div>
    </RatingListProvider>
  )
}
