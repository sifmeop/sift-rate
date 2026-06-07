import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { IPlayer } from './usePlayers'

interface IResponse {
  data: {
    name: string
    id_tmdb: string
    last_episode?: number
  }
}

export const useVideoData = (
  id: string,
  player: IPlayer | null,
  isLoadedIframe: boolean
) => {
  return useQuery({
    queryKey: ['video-data', id],
    queryFn: async () => {
      if (!player) {
        throw new Error('Player is not selected')
      }

      const url = new URL(player.iframeUrl)
      const token = url.searchParams.get('token')

      if (!token) {
        throw new Error('Token is not found')
      }

      const { data } = await axios.get<IResponse>(
        `https://api.apbugall.org/?token=${token}&kp=${id}`
      )
      return {
        title: data.data.name,
        tmdbId: data.data.id_tmdb,
        isTv: !!data.data.last_episode
      }
    },
    enabled: !!player && isLoadedIframe
  })
}
