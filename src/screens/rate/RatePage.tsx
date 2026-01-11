'use client'

import { Button } from '@heroui/button'
import { FaArrowLeft } from 'react-icons/fa'
import { PageTitle } from '~/components/ui/page-title'
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
    <div className='mx-auto flex max-w-2xl flex-col'>
      {!selectedType ? (
        <Step1SelectCategory setSelectedType={setSelectedType} />
      ) : (
        <>
          <Button
            variant='light'
            startContent={<FaArrowLeft />}
            onPress={handleBack}
            className='mb-4 w-fit'>
            Назад
          </Button>
          <PageTitle>{title}</PageTitle>
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
        </>
      )}
    </div>
  )
}
