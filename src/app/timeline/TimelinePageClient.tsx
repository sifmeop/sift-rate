'use client'

import { PageTitle } from '~/components/ui/page-title'
import { TimelineProvider } from '~/contexts/TimelineProvider'
import { TimelinePage } from '~/screens/timeline'

export function TimelinePageClient() {
  return (
    <TimelineProvider>
      <PageTitle>Лента активности</PageTitle>
      <TimelinePage />
    </TimelineProvider>
  )
}
