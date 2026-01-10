import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Pagination } from '@heroui/pagination'
import type { ContentType } from 'generated/prisma'
import { ChevronRight, SearchIcon } from 'lucide-react'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { ReviewCover } from '~/components/ui/review-cover'
import { Show } from '~/components/ui/show'
import { useTargetSearch } from '../hooks/useTargetSearch'
import type { ISelectedTargetItem } from '../types/target.types'
import { getItemCountText } from '../utils/getItemCountText'

interface IStep2SelectTargetProps {
  selectedType: ContentType
  setSelectedTargetItem: React.Dispatch<
    React.SetStateAction<ISelectedTargetItem | null>
  >
}

export const Step2SelectTarget = ({
  selectedType,
  setSelectedTargetItem
}: IStep2SelectTargetProps) => {
  const {
    searchTerm,
    setSearchTerm,
    clearSearch,
    result,
    isLoading,
    searchTargets,
    selectTarget,
    currentPage,
    onChangePage,
    totalPages,
    totalResults
  } = useTargetSearch(selectedType, setSelectedTargetItem)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Input
          isClearable
          placeholder='Введите название...'
          value={searchTerm}
          onValueChange={setSearchTerm}
          size='lg'
          onKeyDown={async (e) => {
            if (e.key === 'Enter') await searchTargets()
          }}
          onClear={clearSearch}
          isDisabled={isLoading}
        />
        <Button
          isIconOnly
          size='lg'
          variant='flat'
          onPress={() => searchTargets()}
          isDisabled={isLoading || searchTerm.trim().length === 0}>
          <SearchIcon />
        </Button>
      </div>
      <Show when={isLoading}>
        <LoadingSpinner />
      </Show>
      {!isLoading && totalResults > 0 && (
        <p className='text-muted-foreground text-center text-base'>
          Всего: {totalResults} {getItemCountText(totalResults, selectedType)}
        </p>
      )}
      {!isLoading && result?.length === 0 && (
        <p className='text-muted-foreground text-center text-base'>
          Ничего не найдено
        </p>
      )}
      <div className='z-px flex flex-col gap-3'>
        {result?.map((result) => (
          <button
            key={result.id}
            className='bg-card-background border-border hover:border-secondary group flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all'
            onClick={() => selectTarget(result)}>
            <ReviewCover
              title={result.title}
              coverUrl={result.cover}
              type={selectedType}
            />
            <div className='flex-1 overflow-hidden text-left'>
              <h3 className='group-hover:text-secondary line-clamp-2 text-base font-semibold transition-colors'>
                {result.title}
              </h3>
              <p className='text-muted-foreground text-sm'>
                {result.description}
              </p>
            </div>
            <div className='relative size-5'>
              <ChevronRight className='text-muted-foreground group-hover:text-secondary size-full transition-colors' />
              <ChevronRight className='text-muted-foreground group-hover:text-secondary absolute top-0 left-0 size-full transition-all group-hover:translate-x-1.5' />
            </div>
          </button>
        ))}
      </div>
      {!isLoading && totalPages > 1 && (
        <Pagination
          showControls
          classNames={{
            base: 'sticky bottom-18 md:bottom-2',
            wrapper: 'mx-auto'
          }}
          page={currentPage}
          onChange={onChangePage}
          total={totalPages}
        />
      )}
    </div>
  )
}
