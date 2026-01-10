import dayjs from 'dayjs'
import type { IRatingCardData, ITimeline } from '~/components/features/rating'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { db } from '~/server/db'
import {
  createReviewSchema,
  deleteReviewSchema,
  updateReviewSchema,
  validateDates
} from '~/utils/validators'

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createReviewSchema)
    .mutation(async ({ ctx, input }) => {
      let itemReview = await ctx.db.itemReview.findFirst({
        where: {
          externalId: input.externalId
        }
      })

      itemReview ??= await ctx.db.itemReview.create({
        data: {
          externalId: input.externalId,
          title: input.title,
          coverUrl: input.coverUrl
        }
      })

      return await ctx.db.review.create({
        data: {
          rating: input.rating,
          review: input.review.length === 0 ? null : input.review,
          type: input.type,
          userId: ctx.session.user.id,
          itemReviewId: itemReview.id
        }
      })
    }),
  update: protectedProcedure
    .input(updateReviewSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.update({
        where: {
          id: input.id
        },
        data: {
          rating: input.rating,
          review: input.review.length === 0 ? null : input.review,
          userId: ctx.session.user.id
        }
      })
    }),
  delete: protectedProcedure
    .input(deleteReviewSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.review.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
    }),
  getReviews: protectedProcedure.query(async ({ ctx }) => {
    const reviews = await ctx.db.review.findMany({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        itemReview: {
          select: {
            title: true,
            coverUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return reviews as IRatingCardData[]
  }),
  getReviewsByDate: protectedProcedure
    .input(validateDates)
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.db.review.findMany({
        where: {
          userId: ctx.session.user.id,
          createdAt: {
            gte: input?.from,
            lte: input?.to
          }
        },
        include: {
          itemReview: {
            select: {
              title: true,
              coverUrl: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      return reviews as IRatingCardData[]
    }),
  getTimelineStats: protectedProcedure.query(async ({ ctx }) => {
    const reviews = await db.review.findMany({
      where: {
        userId: ctx.session.user.id
      },
      select: {
        rating: true,
        createdAt: true
      }
    })

    const stats = reviews.reduce<ITimeline>((acc, { rating, createdAt }) => {
      const year = createdAt.getFullYear()
      const month = dayjs(createdAt).get('month')
      const isBest = rating === 10

      acc[year] ??= {
        total: 0,
        best: 0,
        months: {
          0: { total: 0, best: 0 },
          1: { total: 0, best: 0 },
          2: { total: 0, best: 0 },
          3: { total: 0, best: 0 },
          4: { total: 0, best: 0 },
          5: { total: 0, best: 0 },
          6: { total: 0, best: 0 },
          7: { total: 0, best: 0 },
          8: { total: 0, best: 0 },
          9: { total: 0, best: 0 },
          10: { total: 0, best: 0 },
          11: { total: 0, best: 0 }
        }
      }

      acc[year].total++
      acc[year].months[month]!.total++

      if (isBest) {
        acc[year].best++
        acc[year].months[month]!.best++
      }

      return acc
    }, {})

    return Object.keys(stats).length > 0 ? stats : null
  })
})
