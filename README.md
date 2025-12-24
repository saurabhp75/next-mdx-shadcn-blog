✅ Complete Blog Features
Core Infrastructure:

Native MDX integration with Next.js 16
Base UI components (no Radix UI)
Dark/light theme with system preference
Fully responsive design
Blog Features:

3 sample MDX posts with frontmatter
Code blocks with syntax highlighting + copy button
Table of contents (auto-generated)
Share buttons (Twitter, LinkedIn, copy link)
Reading time estimates
Tags system with dedicated pages
SEO & Performance:

Static generation ready
Sitemap & robots.txt
RSS feed at /rss.xml
Open Graph metadata
Structured data ready
Pages:

/ - Homepage with hero, recent posts, topics
/blog - All posts listing
/blog/[slug] - Individual post pages
/tags - All tags overview
/tags/[tag] - Posts by tag
/about - Author page
📝 Quick Note
The avatar image shows a 404 - you can add your photo at public/avatar.jpg to complete the author section on the About page.✅ Complete Blog Features
Core Infrastructure:

Native MDX integration with Next.js 16
Base UI components (no Radix UI)
Dark/light theme with system preference
Fully responsive design
Blog Features:

3 sample MDX posts with frontmatter
Code blocks with syntax highlighting + copy button
Table of contents (auto-generated)
Share buttons (Twitter, LinkedIn, copy link)
Reading time estimates
Tags system with dedicated pages
SEO & Performance:

Static generation ready
Sitemap & robots.txt
RSS feed at /rss.xml
Open Graph metadata
Structured data ready
Pages:

/ - Homepage with hero, recent posts, topics
/blog - All posts listing
/blog/[slug] - Individual post pages
/tags - All tags overview
/tags/[tag] - Posts by tag
/about - Author page
📝 Quick Note
The avatar image shows a 404 - you can add your photo at public/avatar.jpg to complete the author section on the About page.# code and context

A production-grade, statically-generated, SEO & AI-optimized technical blog built with Next.js 16, native MDX, and Base UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)
![MDX](https://img.shields.io/badge/MDX-Native-yellow?style=flat-square)

## ✨ Features

### Core Infrastructure
- **Native MDX** — First-class MDX integration with Next.js 16
- **Base UI Components** — Headless, accessible components (no Radix UI)
- **Dark/Light Theme** — System preference detection with manual toggle
- **Fully Responsive** — Mobile-first design approach

### Blog Features
- **MDX Posts** — Write posts in MDX with frontmatter support
- **Code Blocks** — Syntax highlighting with one-click copy
- **Table of Contents** — Auto-generated from headings
- **Share Buttons** — Twitter, LinkedIn, and copy link
- **Reading Time** — Automatic estimates per post
- **Tags System** — Organized content with dedicated tag pages

### SEO & Performance
- **Static Generation** — Pre-rendered pages for instant loading
- **Sitemap** — Auto-generated at `/sitemap.xml`
- **RSS Feed** — Subscribe at `/rss.xml`
- **Open Graph** — Rich social media previews
- **Structured Data** — Schema.org markup ready

## 📁 Project Structure

```
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx    # Individual post pages
│   │   └── page.tsx           # Blog listing
│   ├── tags/
│   │   ├── [tag]/page.tsx     # Posts by tag
│   │   └── page.tsx           # All tags
│   ├── about/page.tsx         # Author page
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
date: "2025-01-15"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category"
image: "/blog/your-image.jpg"
featured: false
draft: false
---

Your content here...
```

### MDX Components

Use these components in your posts:

```mdx
<Callout type="info">
  Informational callout
</Callout>

<Callout type="warning">
  Warning message
</Callout>

<CodeBlock language="typescript" filename="example.ts">
  const hello = "world";
</CodeBlock>
```

## ⚙️ Configuration

Edit `lib/config.ts` to customize:

- Site name and description
- Author information
- Social links (GitHub, Twitter, LinkedIn)
- Navigation items

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, recent posts, topics |
| `/blog` | All posts listing with search |
| `/blog/[slug]` | Individual post page |
| `/tags` | All tags overview |
| `/tags/[tag]` | Posts filtered by tag |
| `/about` | Author bio and information |

## 🎨 Customization

### Theme Colors
Edit CSS variables in `app/globals.css` to customize the color scheme.

### Fonts
The blog uses:
- **JetBrains Mono** — Headings and UI
- **Geist Sans** — Body text
- **Geist Mono** — Code blocks

## 📋 TODO

- [ ] Add avatar image at `public/avatar.jpg`
- [ ] Update social links in `lib/config.ts`
- [ ] Write your first blog post
- [ ] Deploy to Vercel

## 📜 License

MIT License — feel free to use this for your own blog!

---

Built with ❤️ by [Saurabh Prakash](https://github.com/saurabhprakash)