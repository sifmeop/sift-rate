import { TimelinePage } from '~/screens/timeline'

interface ITimelineProps {
  searchParams: Promise<{
    year: string
    month: string
  }>
}

export default async function Timeline({ searchParams }: ITimelineProps) {
  const { year = new Date().getFullYear() + '' } = await searchParams

  return (
    // <Suspense key={year} fallback={<LoadingSpinner />}>
    <TimelinePage year={year} />
    // </Suspense>
  )
}
