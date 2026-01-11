import {
  BookOpenIcon,
  CrownIcon,
  Disc3Icon,
  FilmIcon,
  Gamepad2Icon,
  LayoutGridIcon,
  MusicIcon,
  TvIcon
} from 'lucide-react'

const ALL_META = {
  title: 'Все',
  titlePlural: 'Все',
  icon: LayoutGridIcon,
  bg: 'bg-slate-500/10',
  text: 'text-slate-500'
}

const MOVIE_META = {
  title: 'Фильм',
  titlePlural: 'Фильмы',
  icon: FilmIcon,
  bg: 'bg-red-500/10',
  text: 'text-red-500'
}

const TV_META = {
  title: 'Сериал',
  titlePlural: 'Сериалы',
  icon: TvIcon,
  bg: 'bg-blue-500/10',
  text: 'text-blue-500'
}

const SONG_META = {
  title: 'Песня',
  titlePlural: 'Песни',
  icon: MusicIcon,
  bg: 'bg-purple-500/10',
  text: 'text-purple-500'
}

const ALBUM_META = {
  title: 'Альбом',
  titlePlural: 'Альбомы',
  icon: Disc3Icon,
  bg: 'bg-indigo-500/10',
  text: 'text-indigo-500'
}

const GAME_META = {
  title: 'Игра',
  titlePlural: 'Игры',
  icon: Gamepad2Icon,
  bg: 'bg-green-500/10',
  text: 'text-green-500'
}

const BOOK_META = {
  title: 'Книга',
  titlePlural: 'Книги',
  icon: BookOpenIcon,
  bg: 'bg-amber-500/10',
  text: 'text-amber-500'
}

const BEST_META = {
  title: 'Лучший',
  titlePlural: 'Лучшие',
  icon: CrownIcon,
  bg: 'bg-yellow-500/20',
  text: 'text-yellow-500'
}

export const BADGE_META = {
  BEST: BEST_META,
  MOVIE: MOVIE_META,
  TV: TV_META,
  SONG: SONG_META,
  ALBUM: ALBUM_META,
  GAME: GAME_META,
  BOOK: BOOK_META
}

export const BADGE_TAB_META = {
  ALL: ALL_META,
  MOVIE: MOVIE_META,
  TV: TV_META,
  SONG: SONG_META,
  ALBUM: ALBUM_META,
  GAME: GAME_META,
  BOOK: BOOK_META
}
