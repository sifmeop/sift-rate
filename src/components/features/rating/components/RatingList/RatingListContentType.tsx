import { Tab, Tabs } from '@heroui/tabs'
import { cn } from '@heroui/theme'
import type { Key } from 'react'
import { BADGE_TAB_META } from '~/constants/badge'
import { useRatingList } from '~/contexts/RatingListProvider'
import type {
  IRatingCardData,
  TRatingListContentType
} from '../../types/rating.types'

interface IRatingListContentTypeProps {
  items: IRatingCardData[]
}

export const RatingListContentType = ({
  items
}: IRatingListContentTypeProps) => {
  const { state, setContentType } = useRatingList()

  const onSelectionChange = (key: Key) => {
    const contentType = key.toString() as TRatingListContentType
    setContentType(contentType)
  }

  const selectedContentTypeBg = BADGE_TAB_META[state.contentType].bg

  return (
    <Tabs
      fullWidth
      aria-label='Content type'
      color='primary'
      variant='bordered'
      selectedKey={state.contentType}
      onSelectionChange={onSelectionChange}
      classNames={{
        base: 'hidden md:inline-flex',
        cursor: selectedContentTypeBg
      }}>
      {Object.entries(BADGE_TAB_META).map(([key, { icon: Icon, text }]) => {
        const tabItems =
          key === 'ALL'
            ? items.length
            : items.filter((item) => item.itemReview.type === key).length
        const formattedCount = new Intl.NumberFormat('ru-RU').format(tabItems)

        return (
          <Tab
            key={key}
            title={
              <div className={cn('flex items-center gap-2', text)}>
                <Icon size={16} />
                <span>{formattedCount}</span>
              </div>
            }
          />
        )
      })}
    </Tabs>
  )
}
