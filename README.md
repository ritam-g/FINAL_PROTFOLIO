# FINAL_PROTFOLIO

A modern, responsive developer portfolio built with Next.js (App Router) and TypeScript. It provides a hero section, about, experience, projects, skills, and contact sections — plus a place to host a downloadable resume (public/resume.pdf).

## Features
- Fully TypeScript-based Next.js app (App Router)
- Tailwind CSS for styling
- Smooth animations with Framer Motion and GSAP
- Simple contact/email integration (Resend package included)
- Componentized layout with shared UI primitives and section components
- Resume file served from public/

## Tech stack
- Language(s): TypeScript, JavaScript
- Framework / runtime: Next.js (App Router)
- Notable libraries:
  - React 18
  - Tailwind CSS
  - Framer Motion
  - GSAP
  - Resend (email sending)
  - lucide-react (icons)
  - tailwind-merge / clsx (class utilities)

## Quick start — run locally
1. Clone the repo
   git clone https://github.com/ritam-g/FINAL_PROTFOLIO.git
2. Install dependencies
   npm install
3. Create environment file
   cp .env.local.example .env.local
   (Edit .env.local with any required keys — see `.env.local.example`.)
4. Start development server
   npm run dev
5. Open http://localhost:3000

Available npm scripts (from package.json)
- npm run dev — start Next.js dev server
- npm run build — build for production
- npm run start — start production server (after build)
- npm run lint — run Next.js/ESLint checks

## Environment / configuration
- See .env.local.example at project root. Copy it to `.env.local` and fill any required secrets (for example, Resend API key or other keys used by the contact endpoint).
- Resume: place a `resume.pdf` file in the `public/` directory. The project references `/resume.pdf` (see `public/README.md`).

## Project structure (top-level)
