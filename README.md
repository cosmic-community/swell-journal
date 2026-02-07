# 🏄 Swell Journal — Surf Travel Blog

![Swell Journal](https://imgix.cosmicjs.com/187028e0-0404-11f1-ac33-41545c854ef6-photo-1502933691298-84fc14542831-1770455105528.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A minimal, modern surf travel blog powered by [Cosmic](https://www.cosmicjs.com) and built with Next.js 16, Tailwind CSS, and TypeScript. Server-rendered, mobile-responsive, and designed for beautiful long-form reading.

## Features

- 🏠 Hero section with featured post highlight
- 📱 Responsive mobile navigation with slide-out drawer
- 🏷️ Category-based filtering (Destinations, Gear Reviews, Surf Culture)
- ✍️ Author profile pages with bios and post listings
- 📖 Beautiful markdown rendering via `@tailwindcss/typography`
- ⚡ Fully server-rendered — no client-side data fetching
- 🎨 Ocean-inspired design with navy, sand, and teal accents
- 📍 Location badges on destination posts
- 🔗 Linked content relationships (posts → authors, posts → categories)

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6986ff50e27f5e466302ac9c&clone_repository=6987012ae27f5e466302acc2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a complete content model for: Surf travel blog with posts, authors, and categories
>
> Use the install_content_model action to create ALL object types AND demo content in one step. Include:
> 1. All necessary object types with appropriate metafields
> 2. 2-3 demo objects for each type with realistic content
> 3. Unsplash image URLs for thumbnails and file metafields (use real URLs like https://images.unsplash.com/photo-...)
>
> Remember to create types that are referenced by others FIRST (e.g., categories and authors before blog posts)."

### Code Generation Prompt

> "Next.js minimal, modern, tailwind css, responsive, mobile nav"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router and Server Components
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [@tailwindcss/typography](https://tailwindcss.github.io/typography/) — Beautiful prose styling

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- A [Cosmic](https://www.cosmicjs.com) account with the surf blog content model

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env.local` file:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'chasing-swells-in-mentawai' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses three Cosmic object types:

| Type | Fields | Purpose |
|------|--------|---------|
| **Posts** | content (markdown), featured_image (file), author (object), category (object), location (text) | Blog articles |
| **Authors** | name (text), bio (textarea), avatar (file) | Writer profiles |
| **Categories** | name (text), description (textarea) | Content taxonomy |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Import into [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
<!-- README_END -->