'use client'

import { PageTitle } from '~/components/ui/page-title'
import { TimelineProvider } from '~/contexts/TimelineProvider'
import { TimelinePage } from '~/screens/timeline'

export default function Timeline() {
  return (
    <TimelineProvider>
      <PageTitle>Лента активности</PageTitle>
      <TimelinePage />
    </TimelineProvider>
  )
}
