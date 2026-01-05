import { BookIcon, ClockIcon, StarIcon } from 'lucide-react'
import { ROUTES } from './routes'

export const NAV_LINKS = [
  {
    href: ROUTES.REVIEWS,
    label: 'Отзывы',
    icon: BookIcon
  },
  {
    href: ROUTES.TIMELINE,
    label: 'Таймлайн',
    icon: ClockIcon
  },
  {
    href: ROUTES.RATE,
    label: 'Оценить',
    icon: StarIcon
  }
] as const
