import type { ContentType } from 'generated/prisma'
import {
  BookOpenIcon,
  Disc3Icon,
  FilmIcon,
  Gamepad2Icon,
  MusicIcon,
  TvIcon,
  type LucideIcon
} from 'lucide-react'

interface ICategoryItem {
  category: ContentType
  title: string
  icon: LucideIcon
}

const CATEGORIES: ICategoryItem[] = [
  {
    category: 'MOVIE',
    title: 'Фильм',
    icon: FilmIcon
  },
  {
    category: 'TV',
    title: 'Сериал',
    icon: TvIcon
  },
  {
    category: 'SONG',
    title: 'Песня',
    icon: MusicIcon
  },
  {
    category: 'ALBUM',
    title: 'Альбом',
    icon: Disc3Icon
  },
  {
    category: 'GAME',
    title: 'Игра',
    icon: Gamepad2Icon
  },
  {
    category: 'BOOK',
    title: 'Книга',
    icon: BookOpenIcon
  }
]

interface IStep1SelectCategoryProps {
  setSelectedType: React.Dispatch<React.SetStateAction<ContentType | null>>
}

export const Step1SelectCategory = ({
  setSelectedType
}: IStep1SelectCategoryProps) => {
  return (
    <>
      <h1 className='mb-8 text-3xl font-bold'>Добавить оценку</h1>
      <p className='text-muted-foreground mb-4'>Выберите категорию</p>
      <div className='grid grid-cols-2 gap-3'>
        {CATEGORIES.map(({ category, title, icon: Icon }) => (
          <button
            key={category}
            onClick={() => setSelectedType(category)}
            className='bg-card-background border-border hover:border-secondary hover:bg-secondary/5 group z-px relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-6 transition-all'>
            <div className='bg-muted text-muted-foreground group-hover:text-secondary grid size-14 place-items-center rounded-full transition-colors'>
              <Icon className='size-7' />
            </div>
            <span className='font-medium'>{title}</span>
          </button>
        ))}
      </div>
    </>
  )
}
