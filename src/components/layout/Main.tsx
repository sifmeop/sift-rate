export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className='app-container z-px pt-safe-or-30 pb-safe-or-24 md:pb-safe-or-4 relative'>
      {children}
    </main>
  )
}
