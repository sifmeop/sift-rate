import { Button } from '@heroui/button'
import { redirect } from 'next/navigation'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { ROUTES } from '~/constants/routes'
import { auth, signIn } from '~/server/auth'

export const Home = async () => {
  const session = await auth()

  if (session?.user) {
    return redirect(ROUTES.REVIEWS)
  }

  const createSignIn = (provider: 'google' | 'github') => async () => {
    'use server'
    await signIn(provider, { redirectTo: ROUTES.REVIEWS })
  }

  const signInGoogle = createSignIn('google')
  const signInGithub = createSignIn('github')

  return (
    <div className='flex h-dvh flex-col items-center justify-center gap-3'>
      <form action={signInGoogle}>
        <Button
          type='submit'
          variant='bordered'
          className='text-lg font-semibold'
          size='lg'
          startContent={<FaGoogle className='size-5' />}>
          Продолжить с Google
        </Button>
      </form>
      <form action={signInGithub}>
        <Button
          type='submit'
          variant='bordered'
          className='text-lg font-semibold'
          size='lg'
          startContent={<FaGithub className='size-5' />}>
          Продолжить с GitHub
        </Button>
      </form>
    </div>
  )
}
