export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px z-px relative pt-[calc(65px+10px+env(safe-area-inset-top))] pb-[calc(69px+16px+env(safe-area-inset-bottom))] md:pt-25 md:pb-5'>
      {children}
    </main>
  )
}
