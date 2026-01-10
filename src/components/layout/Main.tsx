export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px relative pt-20 pb-20 md:pb-4'>
      {children}
    </main>
  )
}
