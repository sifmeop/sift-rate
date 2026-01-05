import { Select, SelectItem } from '@heroui/select'
import type { SharedSelection } from '@heroui/system'
import type { ITimeline } from '~/components/features/rating'
import { capitalize } from '~/utils/capitalize'

interface IMonthSelectorMobileProps {
  timeline: ITimeline
  selectedYear: number
  selectedMonth: number
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>
}

export const MonthSelectorMobile = ({
  timeline,
  selectedYear,
  selectedMonth,
  setSelectedMonth
}: IMonthSelectorMobileProps) => {
  const months = timeline[selectedYear]?.months ?? {}
  const monthsMap = Object.keys(months)

  const selectedKeys = new Set([selectedMonth + ''])
  const disabledKeys = new Set(
    monthsMap.filter((month) => months[+month]!.total === 0)
  )

  const onSelectionChange = (keys: SharedSelection) => {
    if (keys.anchorKey) {
      setSelectedMonth(+keys.anchorKey)
    }
  }

  return (
    <Select
      fullWidth
      aria-label='Select month'
      selectedKeys={selectedKeys}
      disabledKeys={disabledKeys}
      onSelectionChange={onSelectionChange}
      className='block md:hidden'>
      {monthsMap.map((month) => {
        const { total, best } = months[+month]!
        const date = new Date(selectedYear, +month - 1, 1)
        const monthName = new Intl.DateTimeFormat('ru-RU', {
          month: 'long'
        }).format(date)

        return (
          <SelectItem
            key={month}
            textValue={capitalize(monthName)}
            endContent={
              <div className='flex gap-1'>
                <span>{total}</span>|<span className='text-yellow'>{best}</span>
              </div>
            }>
            <p>{capitalize(monthName)}</p>
          </SelectItem>
        )
      })}
    </Select>
  )
}
