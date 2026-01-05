import type { ContentType } from 'generated/prisma'
import { useState } from 'react'
import type { ISelectedTargetItem } from '../types/target.types'

export const useRateFlow = () => {
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)
  const [selectedTargetItem, setSelectedTargetItem] =
    useState<ISelectedTargetItem | null>(null)

  const handleBack = () => {
    if (selectedTargetItem) {
      setSelectedTargetItem(null)
      return
    }

    setSelectedType(null)
  }

  const reset = () => {
    setSelectedType(null)
    setSelectedTargetItem(null)
  }

  return {
    selectedType,
    setSelectedType,
    selectedTargetItem,
    setSelectedTargetItem,
    handleBack,
    reset
  }
}
