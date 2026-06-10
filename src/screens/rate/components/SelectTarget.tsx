import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Pagination } from '@heroui/pagination'
import { SearchIcon } from 'lucide-react'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { ErrorMessage } from '~/components/ui/query'
import { Show } from '~/components/ui/show'
import { type ContentType } from '~/generated/prisma'
import { useTargetSearch } from '../hooks/useTargetSearch'
import { SearchTargetItem } from './SelectTargetItem'

interface ISelectTargetProps {
  category: ContentType
}

export const SelectTarget = ({ category }: ISelectTargetProps) => {
  const {
    searchTerm,
    changeSearchTerm,
    clearSearch,
    result,
    isLoading,
    handleSearch,
    currentPage,
    onChangePage,
    isError
  } = useTargetSearch(category)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <Input
          isClearable
          autoComplete='off'
          placeholder='Введите название...'
          value={searchTerm}
          onValueChange={changeSearchTerm}
          size='lg'
          onKeyDown={async (e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          onClear={clearSearch}
          isDisabled={isLoading}
        />
        <Button
          isIconOnly
          size='lg'
          variant='flat'
          onPress={() => handleSearch()}
          isDisabled={isLoading || searchTerm.trim().length === 0}>
          <SearchIcon />
        </Button>
      </div>
      <Show when={isLoading}>
        <LoadingSpinner />
      </Show>
      {isError && <ErrorMessage message='Не удалось получить данные' />}
      {!isLoading && result?.items.length === 0 && (
        <p className='text-muted-foreground text-center text-base'>
          Ничего не найдено
        </p>
      )}
      {!isLoading && result && result.items.length > 0 && (
        <div className='z-px flex flex-col gap-3'>
          {result.items.map((result) => (
            <SearchTargetItem
              key={result.id}
              category={category}
              data={result}
            />
          ))}
        </div>
      )}
      {!isLoading && result && result.totalPages > 1 && (
        <Pagination
          showControls
          classNames={{
            base: 'sticky bottom-23 lg:bottom-2 m-0',
            wrapper: 'mx-auto'
          }}
          page={currentPage}
          onChange={onChangePage}
          total={Math.min(result.totalPages, 5)}
        />
      )}
    </div>
  )
}
