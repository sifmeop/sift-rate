import { Tab, Tabs } from '@heroui/tabs'
import { cn } from '@heroui/theme'
import type { Key } from 'react'
import { BADGE_TAB_META } from '~/constants/badge'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { TRatingListContentType } from '../../types/rating.types'

export const RatingListContentType = () => {
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
      {Object.entries(BADGE_TAB_META).map(
        ([key, { title, icon: Icon, text }]) => (
          <Tab
            key={key}
            title={
              <div className={cn('flex items-center gap-1', text)}>
                <Icon size={16} />
                <span>{title}</span>
              </div>
            }
          />
        )
      )}
    </Tabs>
  )
}
