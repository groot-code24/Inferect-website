# Inferect — Marketing Website

The public marketing site for **Inferect**, the intelligence layer for AI inference. Built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 14** (App Router, Server Components by default)
- **TypeScript**, strict mode
- **Tailwind CSS** with a token-based theme system (`app/globals.css` + `tailwind.config.ts`)
- **Framer Motion** for scroll reveals, hover states, and the animated routing diagrams
- **Radix UI** primitives (`Accordion`, `Tabs`) wrapped in `components/ui`
- **next-themes** for the Dark / Lab mode switcher (persisted to `localStorage`, respects system preference on first visit)
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | Run ESLint                            |
| `npm run typecheck` | Run `tsc --noEmit`                    |

## Project structure

```
app/                  Routes, layout, global styles, sitemap/robots
components/
  layout/             Navbar, footer, theme provider/toggle
  sections/           One file per homepage section (hero, pricing, faq, ...)
  ui/                 Reusable primitives (button, card, code block, charts, ...)
animations/           Shared Framer Motion variants
hooks/                Scroll, mouse-position, reduced-motion hooks
lib/                  Utilities (`cn`, number formatting)
content/              Typed copy/data for each section — edit here, not in components
types/                Shared TypeScript interfaces
config/               Site metadata and navigation config
```

## Theming

Two themes are defined as CSS custom properties in `app/globals.css`:

- `:root` — **Dark mode** (default): near-black background, electric blue / purple / cyan accents.
- `[data-theme="lab"]` — **Lab mode**: off-white "research paper" aesthetic.

Toggle in the navbar (`components/layout/theme-toggle.tsx`) or programmatically via `next-themes`' `useTheme()`.

## Content

All copy lives in `content/*.ts` as typed arrays — pricing tiers, FAQ, testimonials, benchmark rows, feature cards, etc. Update those files to change site content without touching component logic.

## Notes on scope

This repository implements the full page structure, motion system, and theme architecture from the design brief with production-quality patterns (typed content, composable UI primitives, accessible interactive components, SEO metadata). A few brief items were intentionally simplified to keep the codebase lean and dependency-light:

- Charts are hand-built SVG/Framer Motion components (`components/ui/mini-charts.tsx`) rather than a charting library, since the dashboard is illustrative, not wired to real data.
- Smooth-scroll is handled via native CSS (`scroll-behavior: smooth`) rather than Lenis, to avoid an extra runtime dependency for a marketing page; swap in Lenis in `app/layout.tsx` if you want inertia scrolling.
- shadcn/ui components are hand-rolled on top of the same Radix primitives shadcn uses, styled to the site's tokens, so there's no separate CLI-generated component set to maintain.

## Deployment

Any Next.js host works (Vercel, Netlify, self-hosted Node). No environment variables are required for the marketing site itself.
