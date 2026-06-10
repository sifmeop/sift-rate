import { notFound } from 'next/navigation'
import { use } from 'react'
import z from 'zod'
import { PageTitle } from '~/components/ui/page-title'
import { ContentType } from '~/generated/prisma'
import { RateTargetItemPage } from '~/screens/rate'

interface IRateTargetItemProps {
  params: Promise<{
    category: string
    id: string
  }>
}

export default function RateTargetItem({ params }: IRateTargetItemProps) {
  const { category, id } = use(params)

  const validated = z.nativeEnum(ContentType).safeParse(category.toUpperCase())

  if (!validated.success) {
    notFound()
  }

  return (
    <>
      <PageTitle hrefOnBack={`/rate/${category}`}>Оценка</PageTitle>
      <RateTargetItemPage id={id} category={validated.data} />
    </>
  )
}
