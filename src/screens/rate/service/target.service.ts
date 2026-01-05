import dayjs from 'dayjs'
import type { ContentType } from 'generated/prisma'
import { env } from '~/env'
import type {
  IAlbumTargetItem,
  IBookTargetItem,
  IGameTargetItem,
  IMovieTargetItem,
  ISongTargetItem,
  ITargetItem,
  ITvTargetItem
} from '../types/target.types'

export class SearchService {
  async search(category: ContentType, query: string): Promise<ITargetItem[]> {
    switch (category) {
      case 'MOVIE':
        return this.searchMovies(query)
      case 'TV':
        return this.searchTv(query)
      case 'SONG':
        return this.searchSongs(query)
      case 'ALBUM':
        return this.searchAlbums(query)
      case 'GAME':
        return this.searchGames(query)
      case 'BOOK':
        return this.searchBooks(query)
    }
  }

  private async searchMovies(query: string): Promise<ITargetItem[]> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ru-RU`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
        }
      }
    )

    if (!response.ok) throw new Error('Error searching movies')

    const data = (await response.json()) as {
      results: IMovieTargetItem[]
    }

    const result: ITargetItem[] = data.results.map((item) => {
      const title = item.title
      const genres = item.genre_ids
        .map((id) => this.getMovieGenreName(id))
        .join(' • ')
      const releaseDate = item.release_date
      const cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
        : undefined

      let description = ''

      if (genres.length > 0) {
        description += genres
      }

      if (releaseDate) {
        description += ` • ${dayjs(releaseDate).format('YYYY')}`
      }

      return {
        id: String(item.id),
        title,
        description,
        cover,
        releaseDate
      }
    })

    return result
  }

  private async searchTv(query: string): Promise<ITargetItem[]> {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=ru-RU`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
        }
      }
    )

    if (!response.ok) throw new Error('Error searching movies')

    const data = (await response.json()) as {
      results: ITvTargetItem[]
    }

    const result: ITargetItem[] = data.results.map((item) => {
      const title = item.name
      const genres = item.genre_ids
        .map((id) => this.getTvGenreName(id))
        .join(' • ')
      const releaseDate = item.first_air_date
      const cover = item.poster_path
        ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
        : undefined

      let description = ''

      if (genres.length > 0) {
        description += genres
      }

      if (releaseDate) {
        description += ` • ${dayjs(releaseDate).format('YYYY')}`
      }

      return {
        id: String(item.id),
        title,
        description,
        cover,
        releaseDate
      }
    })

    return result
  }

  private async searchSongs(query: string): Promise<ITargetItem[]> {
    const songsResponse = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(
        `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=30`
      )}`
    )

    if (!songsResponse.ok) throw new Error('Error searching songs')

    const songsData = (await songsResponse.json()) as {
      data: ISongTargetItem[]
    }

    const transformedData: ITargetItem[] = songsData.data.map((track) => ({
      id: String(track.id),
      title: track.title,
      description: track.artist.name,
      cover: track.album.cover_medium
    }))

    const sortedData = [...transformedData].sort(
      (a, b) =>
        this.getRelevanceScoreMusic(b, query) -
        this.getRelevanceScoreMusic(a, query)
    )

    return sortedData
  }

  private async searchAlbums(query: string): Promise<ITargetItem[]> {
    const albumsResponse = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(
        `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}&limit=20`
      )}`
    )

    if (!albumsResponse.ok) throw new Error('Error searching albums')

    const albumsData = (await albumsResponse.json()) as {
      data: IAlbumTargetItem[]
    }

    const albums = albumsData.data.filter(
      (album) => album.record_type === 'album'
    )

    const transformedData: ITargetItem[] = albums.map((album) => ({
      id: String(album.id),
      title: album.title,
      description: album.artist.name,
      cover: album.cover
    }))

    const sortedData = [...transformedData].sort(
      (a, b) =>
        this.getRelevanceScoreMusic(b, query) -
        this.getRelevanceScoreMusic(a, query)
    )

    return sortedData
  }

  private async searchGames(query: string): Promise<ITargetItem[]> {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${encodeURIComponent(query)}&key=${env.NEXT_PUBLIC_RAWG_API_KEYL}`
    )

    if (!response.ok) throw new Error('Error searching games')

    const data = (await response.json()) as {
      results: IGameTargetItem[]
    }

    const transformedData: ITargetItem[] = data.results.map((game) => {
      let description = ''

      if (game.genres && game.genres.length > 0) {
        description +=
          game.genres.map((genre) => genre.name).join(' • ') + ' • '
      }

      description += dayjs(game.released).format('YYYY')

      return {
        id: String(game.id),
        title: game.name,
        description,
        cover: game.background_image
      }
    })

    return transformedData
  }

  private async searchBooks(query: string): Promise<ITargetItem[]> {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    )

    if (!response.ok) throw new Error('Error searching games')

    const data = (await response.json()) as {
      items: IBookTargetItem[]
    }

    const transformedData: ITargetItem[] = data.items.map((book) => {
      let description = ''
      const authors = book.volumeInfo.authors

      if (authors && authors.length > 0) {
        description += authors.join(' • ') + ' • '
      }

      description += dayjs(book.volumeInfo.publishedDate).format('YYYY')

      return {
        id: book.id,
        title: book.volumeInfo.title,
        description,
        cover: book.volumeInfo.imageLinks?.thumbnail
          ? `https://corsproxy.io/?${book.volumeInfo.imageLinks?.thumbnail}`
          : undefined
      }
    })

    return transformedData
  }

  private getRelevanceScoreMusic(item: ITargetItem, query: string) {
    const queryLower = query.toLowerCase()
    const titleLower = item.title.toLowerCase()
    const authorLower = item.description.toLowerCase()

    let score = 0

    if (titleLower === queryLower) score += 1000

    if (authorLower === queryLower) score += 800

    if (titleLower.startsWith(queryLower)) score += 500

    if (authorLower.startsWith(queryLower)) score += 400

    if (titleLower.includes(queryLower)) score += 300

    if (authorLower.includes(queryLower)) score += 200

    const queryWords = queryLower.split(/\s+/)
    const titleWords = titleLower.split(/\s+/)
    const authorWords = authorLower.split(/\s+/)

    for (const qWord of queryWords) {
      if (titleWords.includes(qWord)) score += 50
      if (authorWords.includes(qWord)) score += 30
    }

    return score
  }

  private getMovieGenreName(id: number) {
    return {
      28: 'Боевик',
      12: 'Приключения',
      16: 'Анимация',
      35: 'Комедия',
      80: 'Криминал',
      99: 'Документальный фильм',
      18: 'Драма',
      10751: 'Семейный',
      14: 'Фэнтези',
      36: 'Исторический',
      27: 'Ужасы',
      10402: 'Музыка',
      9648: 'Мистика',
      10749: 'Мелодрама',
      878: 'Научная фантастика',
      10770: 'Телевизионный фильм',
      53: 'Триллер',
      10752: 'Военный',
      37: 'Вестерн'
    }[id]
  }

  private getTvGenreName(id: number) {
    return {
      10759: 'Боевик и приключения',
      16: 'Анимация',
      35: 'Комедия',
      80: 'Криминал',
      99: 'Документальный фильм',
      18: 'Драма',
      10751: 'Семейный',
      10762: 'Детский',
      9648: 'Мистика',
      10763: 'Новости',
      10764: 'Реалити-шоу',
      10765: 'Фантастика и фэнтези',
      10766: 'Мыльная опера',
      10767: 'Ток-шоу',
      10768: 'Военный и политика',
      37: 'Вестерн'
    }[id]
  }
}
