'use client'

import { TimelineProvider } from '~/contexts/TimelineProvider'
import { TimelinePage } from '~/screens/timeline'

export default function Timeline() {
  return (
    <TimelineProvider>
      <TimelinePage />
    </TimelineProvider>
  )
}
