import type { ContentType } from 'generated/prisma'

export const getItemCountText = (count: number, type: ContentType) => {
  const forms: Record<ContentType, string[]> = {
    MOVIE: ['фильм', 'фильма', 'фильмов'],
    TV: ['сериал', 'сериала', 'сериалов'],
    SONG: ['песня', 'песен', 'песен'],
    ALBUM: ['альбом', 'альбома', 'альбомов'],
    GAME: ['игра', 'игры', 'игр'],
    BOOK: ['книга', 'книги', 'книг']
  }

  const form = (n: number, [one, two, five]: string[]) => {
    n = Math.abs(n) % 100
    const n1 = n % 10
    if (n > 10 && n < 20) return five
    if (n1 > 1 && n1 < 5) return two
    if (n1 === 1) return one
    return five
  }

  return form(count, forms[type])
}
