import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/modal'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { VList } from 'virtua'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { EmptyState } from '~/components/ui/query'
import { api } from '~/trpc/react'
import { useAddRankingListItem } from '../hooks/useAddRankingListItem'
import type { RankingListWithItems, ReviewWithItem } from '../types'
import { AddRankingListItemRow } from './AddRankingListItemRow'

const applyReviewSearch = (items: ReviewWithItem[], search: string) => {
  if (search.trim().length === 0) return items

  return items.filter((item) =>
    item.itemReview.title.toLowerCase().includes(search.toLowerCase())
  )
}

interface IAddRankingListItemButtonProps {
  rankingList: RankingListWithItems
}

const AddRankingListItemButton = ({
  rankingList
}: IAddRankingListItemButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [search, setSearch] = useState('')
  const [activeItemReviewId, setActiveItemReviewId] = useState<string | null>(
    null
  )
  const { data: reviews, isLoading } = api.review.getReviews.useQuery(
    undefined,
    {
      enabled: isOpen
    }
  )
  const { handleAdd, isAdding } = useAddRankingListItem(() => {
    setSearch('')
    setActiveItemReviewId(null)
    onOpenChange()
  })

  const existingItemIds = useMemo(
    () => new Set(rankingList.items.map((item) => item.itemReviewId)),
    [rankingList.items]
  )

  const filteredReviews = useMemo(() => {
    const source = reviews ?? []
    return applyReviewSearch(source, search)
  }, [reviews, search])

  return (
    <>
      <Button
        color='primary'
        startContent={<PlusIcon size={16} />}
        onPress={onOpen}>
        Добавить объект
      </Button>
      <Modal
        placement='center'
        size='3xl'
        scrollBehavior='inside'
        isOpen={isOpen}
        onOpenChange={isAdding ? undefined : onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                <span className='font-roboto-slab text-xl font-bold'>
                  Добавить объект
                </span>
                <span className='text-muted-foreground text-sm font-normal'>
                  Выбери один из своих отзывов для списка «{rankingList.title}».
                </span>
              </ModalHeader>
              <ModalBody>
                <Input
                  type='search'
                  isClearable
                  placeholder='Поиск по названию'
                  startContent={<SearchIcon size={16} />}
                  value={search}
                  onValueChange={setSearch}
                  onClear={() => setSearch('')}
                />

                {isLoading ? (
                  <LoadingSpinner />
                ) : !reviews || reviews.length === 0 ? (
                  <div className='rounded-xl border border-dashed border-white/10 bg-white/3 p-6'>
                    <EmptyState message='Сначала создай хотя бы один отзыв' />
                  </div>
                ) : filteredReviews.length === 0 ? (
                  <div className='rounded-xl border border-dashed border-white/10 bg-white/3 p-6'>
                    <EmptyState message='Ничего не найдено' />
                  </div>
                ) : (
                  <VList data={filteredReviews} style={{ height: 500 }}>
                    {(review, idx) => {
                      const isAlreadyAdded = existingItemIds.has(
                        review.itemReviewId
                      )

                      const isLast = idx === filteredReviews.length - 1

                      return (
                        <AddRankingListItemRow
                          key={review.id}
                          review={review}
                          isAlreadyAdded={isAlreadyAdded}
                          isLoading={
                            isAdding &&
                            activeItemReviewId === review.itemReviewId
                          }
                          isLast={isLast}
                          onAdd={async (itemReviewId) => {
                            setActiveItemReviewId(itemReviewId)
                            await handleAdd({
                              rankingListId: rankingList.id,
                              itemReviewId
                            })
                            setActiveItemReviewId(null)
                          }}
                        />
                      )
                    }}
                  </VList>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color='default'
                  variant='light'
                  onPress={() => {
                    setSearch('')
                    onClose()
                  }}
                  isDisabled={isAdding}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddRankingListItemButton
