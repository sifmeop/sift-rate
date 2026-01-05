import type { ContentType } from 'generated/prisma'
import type { ISelectedTargetItem } from '../types/target.types'

const TITLE_MAP: Record<ContentType, string> = {
  MOVIE: 'Выберите фильм',
  TV: 'Выберите сериал',
  SONG: 'Выберите песню',
  ALBUM: 'Выберите альбом',
  GAME: 'Выберите игру',
  BOOK: 'Выберите книгу'
}

export const getRateTitle = (
  selectedType: ContentType | null,
  selectedTargetItem: ISelectedTargetItem | null
) => {
  return selectedTargetItem
    ? 'Ваша оценка'
    : selectedType
      ? TITLE_MAP[selectedType]
      : 'Выберите категорию'
}
