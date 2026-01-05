import { Button } from '@heroui/button'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ITimeline } from '~/components/features/rating'

interface IYearSelectorProps {
  timeline: ITimeline
  selectedYear: number
}

export const YearSelector = ({
  timeline,
  selectedYear
}: IYearSelectorProps) => {
  const router = useRouter()

  const [direction, setDirection] = useState<1 | -1>(1)

  const years = Object.keys(timeline).map(Number)
  const yearData = timeline[selectedYear]
  const total = yearData?.total ?? 0
  const best = yearData?.best ?? 0

  const isDisabledPrev = selectedYear === years[0]!
  const isDisabledNext =
    selectedYear === years[years.length - 1]! ||
    selectedYear === new Date().getFullYear()

  const handleSelectPrevYear = () => {
    if (isDisabledPrev) return

    let prevYear = years[years.indexOf(selectedYear) - 1]

    prevYear ??= selectedYear - 1

    setDirection(-1)
    router.replace(`?year=${prevYear}`)
  }

  const handleSelectNextYear = () => {
    if (isDisabledNext) return

    let nextYear = years[years.indexOf(selectedYear) + 1]

    nextYear ??= selectedYear + 1

    setDirection(1)
    router.replace(`?year=${nextYear}`)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 52 : -52,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 52 : -52,
      opacity: 0
    })
  }

  return (
    <div className='flex flex-wrap justify-between gap-2'>
      <div className='flex items-center gap-3'>
        <Button
          isIconOnly
          variant='flat'
          onPress={handleSelectPrevYear}
          isDisabled={isDisabledPrev}>
          <ArrowLeft />
        </Button>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <m.h2
            key={selectedYear}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className='from-secondary w-30 bg-linear-to-r to-pink-500 bg-clip-text text-center text-5xl font-bold text-transparent'>
            {selectedYear}
          </m.h2>
        </AnimatePresence>
        <Button
          isIconOnly
          variant='flat'
          onPress={handleSelectNextYear}
          isDisabled={isDisabledNext}>
          <ArrowRight />
        </Button>
      </div>
      <div className='flex gap-6'>
        <div className='flex flex-col items-center'>
          <NumberFlow value={total} className='text-2xl font-bold' />
          <span className='text-muted-foreground text-xs'>оценок</span>
        </div>
        <div className='flex flex-col items-center'>
          <NumberFlow value={best} className='text-yellow text-2xl font-bold' />
          <span className='text-muted-foreground text-xs'>лучших</span>
        </div>
      </div>
    </div>
  )
}
