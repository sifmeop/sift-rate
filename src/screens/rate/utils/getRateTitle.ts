import type { ContentType } from '~/generated/prisma'

const TITLE_MAP: Record<ContentType, string> = {
  MOVIE: 'Фильм',
  TV: 'Сериал',
  SONG: 'Песня',
  ALBUM: 'Альбом',
  GAME: 'Игра',
  BOOK: 'Книга'
}

export const getRateTitle = (selectedType: ContentType) =>
  TITLE_MAP[selectedType]
