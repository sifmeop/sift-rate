import axios from 'axios'
import dayjs from 'dayjs'
import { ContentType } from 'generated/prisma'
import { env } from '~/env'
import type {
  IAlbumDetail,
  IAlbumTargetItem,
  IBookDetail,
  IBookTargetItem,
  IDetailedItem,
  IGameDetail,
  IGameTargetItem,
  IMovieDetail,
  IMovieTargetItem,
  ISearchResult,
  ISongDetail,
  ISongTargetItem,
  ITargetItem,
  ITvTargetItem
} from '../types/search.types'

const LIMIT_PER_PAGE = 20
const getPages = (total: number, limit = LIMIT_PER_PAGE) =>
  Math.ceil(total / limit)

export class SearchService {
  async search(
    category: ContentType,
    query: string,
    page: number
  ): Promise<ISearchResult> {
    switch (category) {
      case 'MOVIE':
        return this.searchMovies(query, page)
      case 'TV':
        return this.searchTv(query, page)
      case 'SONG':
        return this.searchSongs(query, page)
      case 'ALBUM':
        return this.searchAlbums(query, page)
      case 'GAME':
        return this.searchGames(query, page)
      case 'BOOK':
        return this.searchBooks(query, page)
    }
  }

  async searchById(category: ContentType, id: string): Promise<IDetailedItem> {
    switch (category) {
      case 'MOVIE':
        return this.searchMovieById(id)
      case 'TV':
        return this.searchTvById(id)
      case 'SONG':
        return this.searchSongById(id)
      case 'ALBUM':
        return this.searchAlbumById(id)
      case 'GAME':
        return this.searchGameById(id)
      case 'BOOK':
        return this.searchBookById(id)
    }
  }

  private async searchMovies(
    query: string,
    page: number
  ): Promise<ISearchResult> {
    const { data } = await axios.get<{
      results: IMovieTargetItem[]
      page: number
      total_pages: number
      total_results: number
    }>(`https://api.themoviedb.org/3/search/movie`, {
      headers: {
        Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
      },
      params: {
        query: encodeURIComponent(query),
        language: 'ru-RU',
        page,
        include_adult: true
      }
    })

    if (data.total_results === 0) {
      return {
        items: [],
        page,
        totalPages: 1,
        totalResults: 0
      }
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

    return {
      items: result,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    }
  }

  private async searchTv(query: string, page: number): Promise<ISearchResult> {
    const { data } = await axios.get<{
      results: ITvTargetItem[]
      page: number
      total_pages: number
      total_results: number
    }>(`https://api.themoviedb.org/3/search/tv`, {
      headers: {
        Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
      },
      params: {
        query: encodeURIComponent(query),
        language: 'ru-RU',
        page,
        include_adult: true
      }
    })

    if (data.total_results === 0) {
      return {
        items: [],
        page,
        totalPages: 1,
        totalResults: 0
      }
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

    return {
      items: result,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results
    }
  }

  private async searchSongs(
    query: string,
    page: number
  ): Promise<ISearchResult> {
    const { data } = await axios.get<{
      data: ISongTargetItem[]
      total: number
    }>('/api/deezer/search/song', {
      params: {
        q: query,
        limit: LIMIT_PER_PAGE,
        index: (page - 1) * LIMIT_PER_PAGE
      }
    })

    if (data.total === 0) {
      return {
        items: [],
        page,
        totalPages: 1,
        totalResults: 0
      }
    }

    const songs = data.data.filter((album) => album.type === 'track')

    const transformedData: ITargetItem[] = songs.map((track) => ({
      id: String(track.id),
      title: track.title,
      description: track.artist.name,
      cover: track.album.cover_medium
    }))

    return {
      items: transformedData,
      page: page + 1,
      totalPages: getPages(data.total),
      totalResults: data.total
    }
  }

  private async searchAlbums(
    query: string,
    page: number
  ): Promise<ISearchResult> {
    const { data } = await axios.get<{
      data: IAlbumTargetItem[]
      total: number
    }>('/api/deezer/search/album', {
      params: {
        q: query,
        limit: LIMIT_PER_PAGE,
        index: (page - 1) * LIMIT_PER_PAGE
      }
    })

    if (data.total === 0) {
      return {
        items: [],
        page,
        totalPages: 1,
        totalResults: 0
      }
    }

    const albums = data.data.filter((album) => album.record_type === 'album')

    const transformedData: ITargetItem[] = albums.map((album) => ({
      id: String(album.id),
      title: album.title,
      description: album.artist.name,
      cover: album.cover
    }))

    return {
      items: transformedData,
      page: page + 1,
      totalPages: getPages(data.total),
      totalResults: data.total
    }
  }

  private async searchGames(
    query: string,
    page: number
  ): Promise<ISearchResult> {
    const { data } = await axios.get<{
      results: IGameTargetItem[]
      count: number
    }>('https://api.rawg.io/api/games?search', {
      params: {
        search: encodeURIComponent(query),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        key: env.NEXT_PUBLIC_RAWG_API_KEY,
        page
      }
    })

    if (data.count === 0) {
      return {
        items: [],
        page,
        totalPages: 1,
        totalResults: 0
      }
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

    return {
      items: transformedData,
      page: page + 1,
      totalPages: getPages(data.count),
      totalResults: data.count
    }
  }

  private async searchBooks(
    query: string,
    page: number
  ): Promise<ISearchResult> {
    const { data } = await axios.get<{
      items?: IBookTargetItem[]
      totalItems: number
    }>('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: encodeURIComponent(query),
        maxResults: LIMIT_PER_PAGE,
        startIndex: (page - 1) * LIMIT_PER_PAGE
      }
    })

    if (!data.items || data.totalItems === 0) {
      return {
        items: [],
        page,
        totalPages: 0,
        totalResults: 0
      }
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
        cover: book.volumeInfo.imageLinks?.thumbnail ?? undefined
      }
    })

    return {
      items: transformedData,
      page: page + 1,
      totalPages: getPages(data.totalItems),
      totalResults: data.totalItems
    }
  }

  private async searchMovieById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<IMovieDetail>(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
        },
        params: {
          language: 'ru-RU'
        }
      }
    )

    return {
      badges: data.genres
        .map((genre) => this.getMovieGenreName(genre.id))
        .filter(Boolean) as string[],
      title: data.title,
      description: data.overview,
      coverUrl: data.poster_path
        ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
        : null,
      type: ContentType.MOVIE
    }
  }

  private async searchTvById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<IMovieDetail>(
      `https://api.themoviedb.org/3/tv/${id}`,
      {
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`
        },
        params: {
          language: 'ru-RU'
        }
      }
    )

    return {
      badges: data.genres
        .map((genre) => this.getTvGenreName(genre.id))
        .filter(Boolean) as string[],
      title: data.title,
      description: data.overview,
      coverUrl: data.poster_path
        ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
        : null,
      type: ContentType.TV
    }
  }

  private async searchSongById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<ISongDetail>(
      '/api/deezer/search/song/id',
      {
        params: {
          id
        }
      }
    )

    return {
      badges: data.contributors.map((contributor) => contributor.name),
      coverUrl: data.album.cover_medium,
      description: null,
      title: data.title,
      type: ContentType.SONG
    }
  }

  private async searchAlbumById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<IAlbumDetail>(
      '/api/deezer/search/album/id',
      {
        params: {
          id
        }
      }
    )

    return {
      badges: data.contributors.map((contributor) => contributor.name),
      coverUrl: data.cover,
      description: null,
      title: data.title,
      type: ContentType.ALBUM
    }
  }

  private async searchGameById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<IGameDetail>(
      `https://api.rawg.io/api/games/${id}`,
      {
        params: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          key: env.NEXT_PUBLIC_RAWG_API_KEY
        }
      }
    )

    return {
      badges: data.genres.map((genre) => genre.name),
      coverUrl: data.background_image,
      title: data.name,
      type: ContentType.GAME,
      description: data.description_raw
    }
  }

  private async searchBookById(id: string): Promise<IDetailedItem> {
    const { data } = await axios.get<IBookDetail>(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    )

    return {
      badges: data.volumeInfo.categories,
      description: data.volumeInfo.description,
      coverUrl: data.volumeInfo.imageLinks?.thumbnail ?? null,
      title: data.volumeInfo.title,
      type: ContentType.BOOK
    }
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
