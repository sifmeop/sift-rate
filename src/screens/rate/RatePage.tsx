'use client'

import { Button } from '@heroui/button'
import { FaArrowLeft } from 'react-icons/fa'
import { Step1SelectCategory } from './components/Step1SelectCategory'
import { Step2SelectTarget } from './components/Step2SelectTarget'
import { Step3SubmitRating } from './components/Step3SubmitRating'
import { useRateFlow } from './hooks/useRateFlow'
import { getRateTitle } from './utils/getRateTitle'

export const RatePage = () => {
  const {
    selectedType,
    setSelectedType,
    selectedTargetItem,
    setSelectedTargetItem,
    handleBack,
    reset
  } = useRateFlow()

  const title = getRateTitle(selectedType, selectedTargetItem)

  return (
    <div className='mx-auto max-w-2xl'>
      {!selectedType ? (
        <Step1SelectCategory setSelectedType={setSelectedType} />
      ) : (
        <div className='flex flex-col gap-3'>
          <Button
            variant='light'
            startContent={<FaArrowLeft />}
            onPress={handleBack}
            className='w-fit'>
            Назад
          </Button>
          <h1 className='mb-8 text-3xl font-bold'>{title}</h1>
          {!selectedTargetItem ? (
            <Step2SelectTarget
              selectedType={selectedType}
              setSelectedTargetItem={setSelectedTargetItem}
            />
          ) : (
            <Step3SubmitRating
              selectedTargetItem={selectedTargetItem}
              reset={reset}
            />
          )}
        </div>
      )}
    </div>
  )
}
