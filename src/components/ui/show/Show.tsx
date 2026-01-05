interface IShowProps extends React.PropsWithChildren {
  when: boolean
}

export const Show = ({ children, when }: IShowProps) => {
  if (!when) return null

  return <>{children}</>
}
