import type { ContentType } from 'generated/prisma'

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
  id: number
  title: string
  genre_id: number
  artist: {
    name: string
  }
  album: {
    cover_medium: string
  }
  record_type: string
}

export interface IAlbumTargetItem {
  id: number
  title: string
  genre_id: number
  cover: string
  artist: {
    name: string
  }
  record_type: string
}

export interface IGameTargetItem {
  name: string
  released: string
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
  releaseDate?: string
  description: string
}
