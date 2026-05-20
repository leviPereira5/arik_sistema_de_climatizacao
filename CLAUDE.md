# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arik Sistemas de Climatização — demonstrative marketing website for a Portuguese HVAC subscription startup. Academic project (Universidade Lusófona). No real payments, no real form submissions, no backend.

## Commands

```bash
npm run dev       # dev server on port 3000
npm run build     # production build
npm run lint      # ESLint check
```

The Next.js project is scaffolded at the repo root (not in a subdirectory).

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS with custom CSS variables (never hardcode colours — always use `var(--green-primary)` etc.)
- Framer Motion for all animations
- Lucide React for icons
- React Hook Form for both forms (contratar modal + contacto section)
- `next/font` for Fraunces (headings) + DM Sans (body) — defined once in `app/layout.tsx`

## Architecture

Single-page app. `app/page.tsx` assembles all section components in order. Each section is a standalone component in `/components` — no shared state between them.

`lib/simulador.ts` contains pure recommendation logic (`calcularPlano`) with no UI dependencies. This function is the only item in `/lib`.

**State is always local.** No Context, no Zustand, no global store. The simulator wizard, contratar modal, and contact form each manage their own `useState`.

## Colour variables (defined in `app/globals.css`)

```css
--green-primary: #3B6D11
--green-light:   #EAF3DE
--green-mid:     #639922
--amber-accent:  #BA7517
--bg-warm:       #F7F5EE
--text-dark:     #1A1A18
--text-muted:    #5F5E5A
```

## Key behaviours

- **Forms never send data.** Simulate submission with `setTimeout(1500)` → success toast → form reset.
- **Payments are illustrative.** Always show `⚠️ Demonstração académica` disclaimer near pricing.
- **Scroll navigation** uses anchor IDs (`#hero`, `#planos`, etc.) with `scroll-behavior: smooth` on `html`.
- **Active nav link** is tracked via `IntersectionObserver` on each section — not by route.
- **Animated counters** (ParaEmpresas section) use `useEffect` + `requestAnimationFrame`, triggered once when the element enters the viewport.

## Language

All UI text is **European Portuguese** (pt-PT), not Brazilian.
