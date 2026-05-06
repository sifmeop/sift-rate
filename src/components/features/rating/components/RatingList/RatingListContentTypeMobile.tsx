import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import { cn } from '@heroui/theme'
import { BADGE_TAB_META } from '~/constants/badge'
import { useRatingList } from '~/contexts/RatingListProvider'
import type {
  IRatingCardData,
  TRatingListContentType
} from '../../types/rating.types'

interface IRatingListContentTypeMobileProps {
  items: IRatingCardData[]
}

export const RatingListContentTypeMobile = ({
  items
}: IRatingListContentTypeMobileProps) => {
  const { state, setContentType } = useRatingList()

  const onSelectionChange = (keys: SharedSelection) => {
    if (keys.anchorKey) {
      setContentType(keys.anchorKey as TRatingListContentType)
    }
  }

  const {
    icon: SelectedIcon,
    text: selectedText,
    bg: selectedBg
  } = BADGE_TAB_META[state.contentType]
  const selectedKeys = new Set([state.contentType])

  const tabCounts =
    state.contentType === 'ALL'
      ? items.length
      : items.filter((item) => item.itemReview.type === state.contentType)
          .length

  return (
    <Select
      fullWidth
      aria-label='Content type'
      startContent={<SelectedIcon size={20} className={selectedText} />}
      endContent={<span className='text-sm'>{tabCounts}</span>}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      classNames={{
        base: 'inline-flex lg:hidden',
        trigger: selectedBg
      }}>
      {Object.entries(BADGE_TAB_META).map(
        ([key, { titlePlural, icon: Icon, text, bg }]) => {
          const tabItems =
            key === 'ALL'
              ? items.length
              : items.filter((item) => item.itemReview.type === key).length
          const formattedCount = new Intl.NumberFormat('ru-RU').format(tabItems)

          return (
            <SelectItem
              key={key}
              startContent={<Icon size={20} className={cn(text)} />}
              classNames={{
                base: bg
              }}
              endContent={formattedCount}>
              {titlePlural}
            </SelectItem>
          )
        }
      )}
    </Select>
  )
}
