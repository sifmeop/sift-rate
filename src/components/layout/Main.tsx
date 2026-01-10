export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px relative pt-[calc(65px+20px+env(safe-area-inset-top))] pb-[calc(77px+20px+env(safe-area-inset-bottom))] md:pb-4'>
      {children}
    </main>
  )
}
