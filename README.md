# CollegeFinder — College Discovery Platform

A production-grade Next.js app to search, compare, and predict college admissions in India.

## Features

- **College Listing + Search** — filters, infinite scroll, sort options
- **College Detail Page** — overview, courses, placements, reviews
- **Compare Colleges** — side-by-side comparison of 2–3 colleges
- **Admission Predictor** — rank/exam → High/Medium/Low chance colleges

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (compare state, persisted)
- Lucide React (icons)

## Setup

```bash
# 1. Create Next.js project
npx create-next-app@latest college-discovery --typescript --tailwind --eslint --app --src-dir
cd college-discovery

# 2. Install dependencies
npm install zustand lucide-react clsx

# 3. Copy all files from this zip into the project (replace defaults)

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar, Footer, CompareBar)
│   ├── page.tsx                # Home / landing page
│   ├── globals.css
│   ├── colleges/
│   │   ├── page.tsx            # College listing with filters
│   │   └── [id]/page.tsx       # College detail page
│   ├── compare/page.tsx        # Side-by-side comparison
│   └── predictor/page.tsx      # Admission predictor
├── components/
│   ├── ui/                     # Reusable UI primitives
│   ├── layout/                 # Navbar, Footer
│   ├── colleges/               # College-specific components
│   ├── compare/                # CompareTable
│   └── predictor/              # PredictorForm
├── data/colleges.ts            # Mock college data (8 colleges)
├── hooks/                      # useColleges, useInfiniteScroll, useCompare
├── store/compareStore.ts       # Zustand store
├── types/college.ts            # TypeScript types
└── lib/utils.ts                # cn(), formatCurrency()
```

## Notes

- Compare state persists via localStorage (Zustand persist middleware)
- Infinite scroll uses IntersectionObserver — no extra library needed
- College detail pages are statically pre-rendered via `generateStaticParams`
- Predictor logic uses historical cutoff multipliers (indicative only)
