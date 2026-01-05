import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/toast'
import { domAnimation, LazyMotion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { Layout } from '~/components/layout'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <LazyMotion features={domAnimation}>
          <ToastProvider placement='top-center' />
          <Layout>{children}</Layout>
        </LazyMotion>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
