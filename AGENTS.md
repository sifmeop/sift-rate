# AGENTS.md

## Project Overview

Sift-Rate is a full-stack personal media rating app based on the T3 Stack.
Users can search, rate, review, and organize movies, TV series, games, songs,
albums, and books.

The project uses:

- Next.js 15 App Router and React 19
- TypeScript in strict mode
- tRPC 11 with SuperJSON
- Prisma 7 with PostgreSQL
- Auth.js / NextAuth.js 5
- TanStack Query
- HeroUI, Tailwind CSS 4, and Framer Motion
- Bun package manager

## Repository Structure

- `src/app/` - Next.js App Router routes, layouts, metadata, API route handlers,
  sitemap, robots, and manifest.
- `src/screens/` - Page-level screen composition for app routes.
- `src/components/ui/` - Reusable UI primitives with no feature-specific domain
  logic.
- `src/components/features/` - Feature-specific components, hooks, services,
  types, and utilities.
- `src/components/layout/` - Shared application layout, navigation, header, and
  shell components.
- `src/server/` - Server-only code: tRPC routers, auth configuration, and Prisma
  access.
- `src/trpc/` - tRPC client, server helpers, and React Query integration.
- `src/contexts/` - React context providers.
- `src/constants/` - Shared constants and route definitions.
- `src/hooks/` - Generic reusable React hooks.
- `src/utils/` - Generic utility functions and validators.
- `prisma/` - Prisma schema and database model definitions.
- `generated/prisma/` - Generated Prisma client output. Do not edit manually.
- `public/` - Static assets.

## Architecture Rules

- One file equals one responsibility.
- Components must not contain business logic, utilities, data transformations, or
  API calls.
- Move hooks, helper functions, transformations, side effects, and service logic
  into dedicated files.
- Any violation of separation of responsibility is an architecture error. Refactor
  it before continuing work.
- Prefer Server Components. Add `'use client'` only when a component needs browser
  APIs, local state, effects, event handlers, or client-only libraries.
- Keep tRPC routers and procedures inside `src/server/api`.
- Keep server-only logic inside `src/server` and avoid importing it from Client
  Components.
- Keep page-level orchestration in `src/screens`; keep route files in `src/app`
  thin.
- Put reusable UI primitives in `src/components/ui`.
- Put feature-specific UI and feature helpers in `src/components/features`.
- Use existing HeroUI components and local UI primitives before introducing a new
  pattern.
- Use `~/` imports for `src/*`.
- Use `~/generated/prisma` for generated Prisma client imports.

## Code Style

- Use TypeScript for application code.
- Use arrow functions where possible.
- Prefer named exports with `export const`.
- Avoid `default` exports unless required by Next.js file conventions or a
  third-party API.
- Next.js-required defaults are allowed for files such as `page.tsx`,
  `layout.tsx`, `not-found.tsx`, config files, metadata handlers, and route
  handlers when the framework requires them.
- Prefer type-only imports when importing only types.
- Keep components small and focused.
- Do not add inline comments unless they explain non-obvious behavior.
- Follow the existing Prettier setup:
  - 2 spaces
  - no semicolons
  - single quotes
  - no trailing commas
  - Tailwind class sorting via `prettier-plugin-tailwindcss`

## Validation Commands

Use Bun for package scripts.

- `bun dev` - start the development server.
- `bun build` - create a production build.
- `bun start` - start the production server.
- `bun preview` - build and start a production preview.
- `bun check` - run linting and TypeScript checks.
- `bun lint` - run ESLint.
- `bun lint:fix` - run ESLint with fixes.
- `bun typecheck` - run TypeScript with `--noEmit`.
- `bun format:check` - check formatting.
- `bun format:write` - format code.
- `bun doctor` - run React Doctor.
- `bun db:generate` - generate Prisma client.
- `bun db:push` - push Prisma schema to the database.
- `bun db:migrate` - deploy Prisma migrations.
- `bun db:studio` - open Prisma Studio.
- `bun db:reset` - reset the database. This is destructive; ask first.

For code changes, run the most focused validation first, then broader checks when
appropriate. For documentation-only changes, no build or test run is required.

## Safety Boundaries

- Do not commit secrets, API keys, tokens, or `.env` files.
- Do not manually edit generated files under `generated/prisma`.
- Ask before adding dependencies.
- Ask before changing core project configuration such as `next.config.js`,
  `tsconfig.json`, `eslint.config.js`, `tailwind.config.js`, Prisma config, or
  package manager settings.
- Ask before running destructive database commands, especially `bun db:reset`.
- Do not remove tests, validation, or user data without explicit approval.
- Do not rewrite unrelated code while working on a focused task.

## External Integrations

The app integrates with external metadata APIs:

- TMDB for movies and TV series.
- RAWG for games.
- Deezer for songs and albums.
- Google Books for books.

Keep API-specific request logic out of components. Use services, server routes,
tRPC procedures, or dedicated hooks depending on the existing feature pattern.
