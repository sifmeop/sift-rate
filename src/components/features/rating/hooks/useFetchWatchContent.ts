import { addToast } from '@heroui/toast'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useFetchWatchContent = () => {
  const [isFetching, setIsFetching] = useState(false)

  const router = useRouter()

  const fetchWatchContent = async (title: string, releaseDate?: string) => {
    setIsFetching(true)

    try {
      const response = await axios.get<{
        url: string | null
      }>('/api/watch', {
        params: {
          title,
          year: releaseDate ? dayjs(releaseDate).format('YYYY') : ''
        }
      })

      const watchUrl = response.data?.url

      if (watchUrl) {
        const id = watchUrl.split('/').filter(Boolean).at(-1)

        if (id) {
          router.push(`/watch/${id}`)
        }
      }
    } catch (error) {
      addToast({
        title: 'Ошибка',
        description: 'Не удалось получить ссылку на просмотр',
        color: 'danger'
      })

      console.error(
        `Error fetching watch link for ${title}: ${JSON.stringify(error)}`
      )
    } finally {
      setIsFetching(false)
    }
  }

  return {
    isFetching,
    fetchWatchContent
  }
}
