import { Input } from '@heroui/input'
import { SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRatingList } from '~/contexts/RatingListProvider'
import { useDebounce } from '~/hooks/useDebounce'

export const RatingListSearch = () => {
  const { state, setSearch } = useRatingList()

  const [value, setValue] = useState(state.search)
  const prevValue = useRef('')
  const debounceValue = useDebounce(value, 156)

  useEffect(() => {
    if (prevValue.current.length === 0 && debounceValue.length === 0) return

    setSearch(debounceValue)
  }, [debounceValue, setSearch])

  const onValueChange = (v: string) => {
    prevValue.current = value
    setValue(v)
  }

  return (
    <Input
      type='search'
      isClearable
      placeholder='Поиск'
      startContent={<SearchIcon />}
      value={value}
      onValueChange={onValueChange}
      onClear={() => onValueChange('')}
    />
  )
}
