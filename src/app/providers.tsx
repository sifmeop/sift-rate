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
          <ToastProvider
            placement='top-center'
            toastProps={{
              classNames: {
                base: 'top-[calc(65px+env(safe-area-inset-top))] md:top-20'
              }
            }}
          />
          <Layout>{children}</Layout>
        </LazyMotion>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
