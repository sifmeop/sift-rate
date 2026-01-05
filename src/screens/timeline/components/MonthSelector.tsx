import { Button } from '@heroui/button'
import type { ITimeline } from '~/components/features/rating'
import { capitalize } from '~/utils/capitalize'

interface IMonthSelectorProps {
  timeline: ITimeline
  selectedYear: number
  selectedMonth: number
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>
}

export const MonthSelector = ({
  timeline,
  selectedYear,
  selectedMonth,
  setSelectedMonth
}: IMonthSelectorProps) => {
  const months = timeline[selectedYear]?.months ?? {}
  const monthsMap = Object.keys(months)

  return (
    <div
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }}
      className='hidden gap-3 md:grid'>
      {monthsMap.map((month) => {
        const { total, best } = months[+month]!
        const date = new Date(selectedYear, +month - 1, 1)
        const monthName = new Intl.DateTimeFormat('ru-RU', {
          month: 'long'
        }).format(date)
        const isDisabled = total === 0
        const isSelected = +month === selectedMonth

        return (
          <Button
            key={month}
            variant={isDisabled ? 'solid' : isSelected ? 'flat' : 'bordered'}
            color={isSelected ? 'secondary' : 'default'}
            size='lg'
            className='justify-between font-bold'
            tabIndex={isDisabled ? -1 : undefined}
            onPress={() => setSelectedMonth(+month)}
            isDisabled={isDisabled}>
            <p>{capitalize(monthName)}</p>
            <div className='flex gap-0.75 text-white'>
              <span>{total}</span>|<span className='text-yellow'>{best}</span>
            </div>
          </Button>
        )
      })}
    </div>
  )
}
