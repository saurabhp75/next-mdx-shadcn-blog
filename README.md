# code and context

A technical blog built with Next.js 16 (App Router), MDX, Tailwind v4, and shadcn-style components (using Base UI primitives).

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)
![MDX](https://img.shields.io/badge/MDX-Native-yellow?style=flat-square)

## ✨ Features

### Core Infrastructure

- **MDX** — Content authored as `.mdx` files in `content/blog/`
- **Base UI Components** — Headless, accessible primitives (no Radix UI)
- **Dark/Light Theme** — System preference detection with manual toggle
- **Fully Responsive** — Mobile-first design approach

### Blog Features

- **MDX Posts** — File-based posts with YAML frontmatter
- **Code Blocks** — Shiki-powered highlighting + copy button
- **Table of Contents** — Built from rendered headings
- **Share Buttons** — Twitter/X, LinkedIn, Facebook, and copy link
- **Reading Time** — Automatic estimates per post
- **Tags System** — Organized content with dedicated tag pages

### SEO & Performance

- **Static Generation** — `generateStaticParams()` for blog slugs
- **Sitemap** — Auto-generated at `/sitemap.xml`
- **RSS Feed** — Subscribe at `/rss.xml`
- **Open Graph** — Rich social media previews
- **Structured Data** — JSON-LD for blog posts

## 🏗️ Architecture Overview

### Rendering Flow (Blog Posts)

1. **Content source**: `.mdx` files in `content/blog/`.
1. **Frontmatter + indexing**: `lib/blog.ts` reads the filesystem, parses YAML frontmatter via `gray-matter`, and computes reading time from the MDX body.
1. **Routing**: `app/blog/[slug]/page.tsx`:

    - generates static params from the set of filenames
    - loads the post by slug
    - compiles MDX to React via `lib/mdx.tsx`
    - renders the result inside a `<article className="prose ...">` container

1. **Client enhancements**:

    - Table of contents (`components/blog/table-of-contents.tsx`) scans headings and tracks scroll position
    - Code copy button (`components/mdx/code-block.tsx`)
    - Share buttons (`components/blog/share-buttons.tsx`)

### Where MDX Is Compiled

Blog pages compile MDX on the server using `next-mdx-remote/rsc` (`compileMDX`) in `lib/mdx.tsx`. This is the “real” MDX pipeline used for blog content.

Note: `@next/mdx` is enabled in `next.config.mjs` (page extensions include `md`/`mdx`), but the remark/rehype plugin arrays there are empty. Your plugin configuration lives in `lib/mdx.tsx`.

## 🧩 MDX Plugins (What’s Enabled)

Configured in `lib/mdx.tsx`:

| Plugin | Phase | What it does |
| --- | --- | --- |
| `remark-gfm` | remark | GitHub-flavored markdown (tables, task lists, strikethrough, autolinks) |
| `rehype-slug` | rehype | Adds `id` attributes to headings (needed for anchors + TOC) |
| `rehype-autolink-headings` | rehype | Wraps headings in anchor links for easy deep-linking |
| `rehype-pretty-code` + `shiki` | rehype | Syntax highlighting + metadata (`data-language`, themes) used by the custom `CodeBlock` UI |

## 🖼️ Images in MDX

- MDX `img` renders through `components/mdx/mdx-image.tsx` using `next/image`.
- External image hosts must be allow-listed in `next.config.mjs` under `images.remotePatterns`.
- Captions: the MDX image renderer shows the `alt` text under the image. Use `![](url)` for no caption.

## 📁 Project Structure

```text
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx    # Individual post pages
│   │   └── page.tsx           # Blog listing
│   ├── tags/
│   │   ├── [tag]/page.tsx     # Posts by tag
│   │   └── page.tsx           # All tags
│   ├── about/page.tsx         # Author page
│   ├── privacy/page.tsx       # Privacy page
│   ├── rss.xml/route.ts       # RSS feed
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── blog/                  # Blog-specific components
│   ├── layout/                # Header, Footer, ThemeToggle
│   ├── mdx/                   # MDX components (CodeBlock, Callout, etc.)
│   └── ui/                    # Base UI components
├── content/
│   └── blog/                  # MDX blog posts
├── lib/
│   ├── blog.ts                # Blog utilities
│   ├── config.ts              # Site configuration
│   ├── mdx.tsx                 # MDX compiler + plugin pipeline
│   ├── seo.ts                  # Metadata + JSON-LD helpers
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/code-and-context.git
cd code-and-context

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📝 Writing Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2025-01-15" # ISO date string recommended
updated: "2025-01-26" # optional
author: "Saurabh Prakash" # optional (defaults if omitted)
tags: ["tag1", "tag2"]
category: "Category"
image: "/blog/your-image.jpg"
published: true # set false to hide from listings
---

Your content here...
```

### MDX Components

The MDX renderer supports custom components like `Callout`.

```mdx
<Callout type="info">Informational callout</Callout>
<Callout type="warning">Warning message</Callout>
```

For code blocks, use fenced markdown; highlighting + copy UI is applied automatically:

```ts
const hello = "world";
```

## ⚙️ Configuration

Edit `lib/config.ts` to customize:

- Site name and description
- Author information
- Social links (GitHub, Twitter, LinkedIn)
- Navigation items

### Site URL

Set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, Open Graph, RSS, JSON-LD):

```bash
cp .env.example .env.local
```

## 📄 Pages

| Route | Description |
| --- | --- |
| `/` | Homepage with hero, recent posts, topics |
| `/blog` | All posts listing |
| `/blog/[slug]` | Individual post page |
| `/tags` | All tags overview |
| `/tags/[tag]` | Posts filtered by tag |
| `/about` | Author bio and information |
| `/privacy` | Privacy page |

## 🎨 Customization

### Theme Colors

Edit CSS variables in `app/globals.css` to customize the color scheme.

### Fonts

The blog is currently configured to use **JetBrains Mono** via `next/font` in `app/layout.tsx`.

## 📋 TODO

- [ ] Add avatar image at `public/avatar.jpg`
- [ ] Add Open Graph image at `public/og-image.png` (or update `siteConfig.ogImage`)
- [ ] Update social links in `lib/config.ts`
- [ ] Write your first blog post
- [ ] Deploy to Vercel

---

Built by [Saurabh Prakash](https://github.com/saurabhp75)
