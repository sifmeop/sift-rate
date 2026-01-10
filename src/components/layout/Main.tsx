export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px relative pt-22 pb-26 md:pb-4'>
      {children}
    </main>
  )
}
