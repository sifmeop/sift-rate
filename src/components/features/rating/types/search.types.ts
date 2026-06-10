import type { ContentType } from '~/generated/prisma'

export interface ISearchResult {
  items: ITargetItem[]
  page: number
  totalPages: number
}

export interface ITargetItem {
  id: string
  title: string
  description: string
  cover?: string
  releaseDate?: string
}

export interface IMovieTargetItem {
  id: number
  title: string
  poster_path?: string
  genre_ids: number[]
  release_date?: string
}

export interface ITvTargetItem {
  id: number
  name: string
  poster_path?: string
  genre_ids: number[]
  first_air_date?: string
}

export interface ISongTargetItem {
  id: string
  title: string
  'first-release-date': string
  'artist-credit': { name: string }[]
  releases: {
    id: string
  }[]
}

export interface IAlbumTargetItem {
  id: string
  title: string
  'primary-type': string
  'first-release-date': string
  'artist-credit': { name: string }[]
  releases: {
    id: string
  }[]
}

export interface IGameTargetItem {
  name: string
  released?: string
  background_image: string
  id: number
  genres?: { name: string }[]
}

export interface IBookTargetItem {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    publishedDate: string
    categories?: string[]
    imageLinks?: {
      thumbnail: string
    }
  }
}

export interface ISelectedTargetItem {
  externalId: string
  type: ContentType
  title: string
  coverUrl?: string
  description: string
}

export interface IDetailedItem {
  badges: string[]
  title: string
  description: string | null
  coverUrl: string | null
  type: ContentType
}

export interface IMovieDetail {
  genres: { id: number; name: string }[]
  title: string
  poster_path?: string
  overview: string
}

export interface ITvDetail {
  genres: { id: number; name: string }[]
  name: string
  poster_path?: string
  overview: string
}

export interface ISongDetail {
  title: string
  contributors: { name: string }[]
  album: {
    cover_medium: string
  }
}

export interface IAlbumDetail {
  title: string
  contributors: { name: string }[]
  cover: string
}

export interface IGameDetail {
  name: string
  description_raw: string
  background_image: string
  genres: { name: string }[]
}

export interface IBookDetail {
  id: string
  volumeInfo: {
    title: string
    description: string
    categories: string[]
    imageLinks: {
      thumbnail?: string
    }
  }
}
