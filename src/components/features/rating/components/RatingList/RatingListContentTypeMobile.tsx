import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import { cn } from '@heroui/theme'
import { BADGE_TAB_META } from '~/constants/badge'
import { useRatingList } from '~/contexts/RatingListProvider'
import type { TRatingListContentType } from '../../types/rating.types'

export const RatingListContentTypeMobile = () => {
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

  return (
    <Select
      fullWidth
      aria-label='Content type'
      startContent={<SelectedIcon size={20} className={selectedText} />}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      classNames={{
        base: 'inline-flex md:hidden',
        trigger: selectedBg
      }}>
      {Object.entries(BADGE_TAB_META).map(
        ([key, { titlePlural, icon: Icon, text, bg }]) => (
          <SelectItem
            key={key}
            startContent={<Icon size={20} className={cn(text)} />}
            classNames={{
              base: bg
            }}>
            {titlePlural}
          </SelectItem>
        )
      )}
    </Select>
  )
}
