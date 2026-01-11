export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px pt-[calc(65px+16px+env(safe-area-inset-top))] pb-[calc(69px+16px+env(safe-area-inset-bottom))]'>
      {children}
    </main>
  )
}
