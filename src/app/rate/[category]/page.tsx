import { notFound } from 'next/navigation'
import { use } from 'react'
import z from 'zod'
import { PageTitle } from '~/components/ui/page-title'
import { ContentType } from '~/generated/prisma'
import { RateCategoryPage } from '~/screens/rate'
import { getRateTitle } from '~/screens/rate/utils/getRateTitle'

interface IRateCategoryProps {
  params: Promise<{
    category: string
  }>
}

export default function RateCategory({ params }: IRateCategoryProps) {
  const { category } = use(params)

  const validated = z.nativeEnum(ContentType).safeParse(category.toUpperCase())

  if (!validated.success) {
    notFound()
  }

  const title = getRateTitle(validated.data)

  return (
    <>
      <PageTitle hrefOnBack='/rate'>{title}</PageTitle>
      <RateCategoryPage category={validated.data} />
    </>
  )
}
