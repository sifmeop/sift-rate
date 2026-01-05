import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'
import { reviewRouter } from './routers/review'

export const appRouter = createTRPCRouter({
  review: reviewRouter
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
