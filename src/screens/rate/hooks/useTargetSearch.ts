import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SearchService } from '~/components/features/rating'
import type { ContentType } from '~/generated/prisma'

const searchService = new SearchService()

export const useTargetSearch = (selectedType: ContentType) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isFetching, isError } = useQuery({
    queryKey: ['search', selectedType, appliedSearchTerm, currentPage],
    queryFn: () =>
      searchService.search(selectedType, appliedSearchTerm.trim(), currentPage),
    enabled: Boolean(appliedSearchTerm.trim())
  })

  const clearSearch = () => {
    setSearchTerm('')
    setAppliedSearchTerm('')
    setCurrentPage(1)
  }

  const onChangePage = (page: number) => {
    setCurrentPage(page)
  }

  const handleChangeSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

  const handleSearch = () => {
    setCurrentPage(1)
    setAppliedSearchTerm(searchTerm)
  }

  return {
    searchTerm,
    changeSearchTerm: handleChangeSearchTerm,
    result: data,
    isLoading: isFetching,
    handleSearch,
    clearSearch,
    currentPage,
    onChangePage,
    isError
  }
}
