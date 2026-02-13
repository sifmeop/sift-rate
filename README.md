# Sift-Rate

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![tRPC](https://img.shields.io/badge/tRPC-11-2596BE)
![License](https://img.shields.io/badge/License-MIT-green)

**Personal media rating tracker** — a unified platform to rate and review movies, TV series, games, books, songs, and albums. Keep your entertainment journey organized in one place.

<p align="center">
  <img src="public/images/screenshots/desktop.png" alt="Sift-Rate Desktop" width="800"/>
</p>

## About

Sift-Rate is a full-stack web application designed for tracking personal ratings across multiple content types. It integrates with external APIs to search and fetch metadata, allowing users to rate content on a 1-10 scale with optional text reviews.

### Key Features

- **Multi-content Support** — Rate movies, TV shows, games, books, songs, and albums
- **External API Integration** — Automatic metadata fetching from TMDB, RAWG, Deezer, and Google Books
- **Timeline View** — Visualize your rating history by year and month
- **Advanced Filtering** — Search, sort, and filter reviews by type, rating, and date
- **PWA Ready** — Installable as a Progressive Web App with iOS optimizations
- **OAuth Authentication** — Sign in with Google or GitHub
- **Responsive Design** — Mobile-first approach with dedicated mobile navigation

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19 with Server Components
- **Component Library:** HeroUI (buttons, modals, tabs, inputs, pagination)
- **Styling:** Tailwind CSS 4, Framer Motion
- **State Management:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React, React Icons

### Backend
- **API Layer:** tRPC 11 with SuperJSON
- **Authentication:** NextAuth.js 5 (Auth.js)
- **Database:** PostgreSQL
- **ORM:** Prisma 7

### External APIs
- **TMDB** — Movies and TV series metadata
- **RAWG** — Video games database
- **Deezer** — Music tracks and albums
- **Google Books** — Book information

### Development Tools
- **Language:** TypeScript 5.8 (strict mode)
- **Linting:** ESLint 9 with Next.js config
- **Formatting:** Prettier with Tailwind plugin
- **Package Manager:** Yarn

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (tRPC, auth, Deezer proxy)
│   ├── reviews/           # Reviews pages with dynamic routes
│   ├── rate/              # Rating creation flow
│   ├── timeline/          # Timeline visualization
│   ├── layout.tsx         # Root layout with providers
│   ├── manifest.ts        # PWA manifest
│   └── providers.tsx      # Client-side providers
├── components/
│   ├── features/          # Feature-specific components
│   │   └── rating/        # Rating cards, lists, filters
│   ├── layout/            # Header, Main, MobileNav, SeasonalEffect
│   └── ui/                # Reusable UI primitives
├── screens/               # Page-level components
│   ├── home/              # Landing/auth page
│   ├── rate/              # Multi-step rating flow
│   ├── reviews/           # Reviews list page
│   ├── review-detail/     # Individual review page
│   └── timeline/          # Timeline visualization
├── server/
│   ├── api/               # tRPC router and procedures
│   ├── auth/              # NextAuth configuration
│   └── db.ts              # Prisma client instance
├── contexts/              # React Context providers
├── constants/             # App constants and routes
├── hooks/                 # Custom React hooks
├── trpc/                  # tRPC client setup
└── utils/                 # Utility functions and validators
```

### Key Architectural Decisions

- **Server Components First** — Leverages React Server Components for data fetching and layout
- **tRPC for Type Safety** — End-to-end type safety between client and server
- **Feature-based Organization** — Components grouped by feature for better scalability
- **Centralized Search Service** — Single service class handles all external API integrations

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.22+
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sift-rate.git
   cd sift-rate
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials (see [Environment Variables](#environment-variables))

4. **Initialize the database**
   ```bash
   yarn db:push
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/siftrate"

# Authentication (NextAuth.js)
AUTH_SECRET="your-auth-secret-key"

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# GitHub OAuth
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# External APIs (Client-side)
NEXT_PUBLIC_MOVIE_DB_API_KEY="your-tmdb-api-key"
NEXT_PUBLIC_RAWG_API_KEY="your-rawg-api-key"
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Random string for encrypting session tokens |
| `AUTH_GOOGLE_ID` | Google OAuth 2.0 Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth 2.0 Client Secret |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `NEXT_PUBLIC_MOVIE_DB_API_KEY` | [TMDB API](https://www.themoviedb.org/settings/api) Bearer token |
| `NEXT_PUBLIC_RAWG_API_KEY` | [RAWG API](https://rawg.io/apidocs) key |

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn preview` | Build and start production preview |
| `yarn check` | Run linting and type checking |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues |
| `yarn typecheck` | Run TypeScript type checking |
| `yarn format:check` | Check code formatting |
| `yarn format:write` | Format code with Prettier |
| `yarn db:generate` | Generate Prisma client |
| `yarn db:push` | Push schema to database |
| `yarn db:migrate` | Deploy database migrations |
| `yarn db:reset` | Reset database (destructive) |
| `yarn db:studio` | Open Prisma Studio GUI |

## Features in Detail

### Multi-Content Rating System

Rate six different content types with a unified interface:
- **Movies** — Search TMDB for films with genres, posters, and release dates
- **TV Series** — Browse TV shows from TMDB with episode information
- **Games** — Discover video games via RAWG with platform details
- **Books** — Search Google Books with author and publication info
- **Songs** — Find individual tracks via Deezer
- **Albums** — Search full albums with artist information

### Three-Step Rating Flow

1. **Select Category** — Choose content type (movie, TV, game, etc.)
2. **Search & Select** — Find your target with paginated search results
3. **Submit Rating** — Rate 1-10 with optional text review

### Timeline Visualization

- Year-by-year breakdown of your ratings
- Monthly statistics with total count and "best" (10-rated) items
- Visual progress indicators

### Review Detail Pages

- View all reviews for a specific item across users
- See rating breakdown and average scores
- Dynamic routes: `/reviews/[category]/[id]`

### PWA Capabilities

- Installable on mobile devices
- iOS-optimized status bar and safe areas
- Standalone display mode
- App icons and splash screens

## API Integrations

| API | Purpose | Endpoints Used |
|-----|---------|----------------|
| [TMDB](https://www.themoviedb.org/) | Movies & TV metadata | `/search/movie`, `/search/tv`, `/movie/{id}`, `/tv/{id}` |
| [RAWG](https://rawg.io/) | Video games database | `/games`, `/games/{id}` |
| [Deezer](https://developers.deezer.com/) | Music tracks & albums | `/search/track`, `/search/album`, `/track/{id}`, `/album/{id}` |
| [Google Books](https://developers.google.com/books) | Book information | `/volumes` |

## Development Guidelines

### Code Style

- TypeScript strict mode enabled
- `noUncheckedIndexedAccess` for safer array access
- Path aliases via `~/` pointing to `src/`
- Prettier with Tailwind class sorting

### Project Conventions

- Server Components by default, `'use client'` only when necessary
- Feature-based component organization
- Centralized constants in `src/constants/`
- Zod schemas for all API input validation
- Russian localization for user-facing text

### Adding New Content Types

1. Add enum value to `ContentType` in Prisma schema
2. Implement search methods in `SearchService`
3. Add genre mappings if applicable
4. Update category selector UI

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in project settings
3. Deploy with default Next.js preset

### Environment Setup

Ensure all environment variables are set in your deployment platform. For production:
- Set `NODE_ENV=production`
- Use a secure `AUTH_SECRET` (generate with `openssl rand -base64 32`)
- Configure OAuth callback URLs for your production domain

### Database

Use any PostgreSQL provider:
- [Neon](https://neon.tech/) — Serverless PostgreSQL
- [Supabase](https://supabase.com/) — PostgreSQL with extras
- [Railway](https://railway.app/) — Simple deployment
- [PlanetScale](https://planetscale.com/) — (MySQL alternative)

## License

This project is licensed under the MIT License.

## Author

**Eugene** — Frontend Developer

---

<p align="center">
  Built with Next.js, tRPC, and Prisma
</p>
