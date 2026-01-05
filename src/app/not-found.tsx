import { redirect } from 'next/navigation'
import { ROUTES } from '~/constants/routes'

export default function NotFound() {
  return redirect(ROUTES.HOME)
}
