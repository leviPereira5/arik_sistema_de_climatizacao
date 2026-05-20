# Arik Website — Implementation Plan

**Spec:** `2026-05-20-arik-website-design.md`  
**Approach:** Build section by section, top to bottom, each fully working before moving on.

---

## Phase 1 — Project Setup

**Step 1.1 — Scaffold Next.js**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
npm install framer-motion lucide-react react-hook-form
```

**Step 1.2 — `app/globals.css`**
- Define all 8 CSS variables (`--green-primary`, etc.)
- Add `html { scroll-behavior: smooth }`
- Add `:focus-visible` ring styles

**Step 1.3 — `app/layout.tsx`**
- Load Fraunces + DM Sans via `next/font/google`
- Apply fonts as CSS variables (`--font-fraunces`, `--font-dm-sans`)
- Set metadata: title "Arik — Sistemas de Climatização", description, lang="pt"

**Step 1.4 — `app/page.tsx` skeleton**
- Import and render all 10 components (empty stubs) in order
- Add `id` anchors to each section wrapper

---

## Phase 2 — Shared Logic

**Step 2.1 — `lib/simulador.ts`**
- Define all 5 TypeScript types
- Implement `calcularPlano()` with the exact logic from the spec
- No imports, no side effects — pure function

---

## Phase 3 — Navbar

**Step 3.1 — Static structure**
- Logo, nav links, CTA button
- CSS: `position: fixed`, blur background, z-index

**Step 3.2 — Scroll shadow**
- `useEffect` + `window.addEventListener('scroll')` → toggle `isScrolled` state
- Add `shadow-sm` class when scrolled

**Step 3.3 — Active link**
- `IntersectionObserver` on each section ID
- Update `activeSection` state; highlight matching nav link

**Step 3.4 — Mobile drawer**
- Hamburger button with `aria-label`
- `AnimatePresence` drawer sliding from right
- Close on link click or overlay click

---

## Phase 4 — Hero

**Step 4.1 — Layout**
- Two-column split at `lg:`, stacked on mobile
- Left: pill tag, headline, subtitle, 2 CTAs, trust badges
- Right: floating card with organic SVG background

**Step 4.2 — Floating card**
- SVG shapes in `#EAF3DE` as decorative background
- Card showing plan info + green "Ativo" badge

**Step 4.3 — Entrance animations**
- `motion.div` with `staggerChildren` on the left column
- Each child: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`

---

## Phase 5 — ComoFunciona

**Step 5.1 — Step cards**
- Map over 4 steps data array
- Each: large decorative number, Lucide icon, title, description

**Step 5.2 — Connector**
- Dotted horizontal line on desktop (`hidden lg:block`)
- Hidden on mobile (vertical stack is self-explanatory)

**Step 5.3 — Scroll reveal**
- `whileInView={{ opacity: 1, y: 0 }}` + `once: true` on each step card
- Stagger delay: `i * 0.1s`

---

## Phase 6 — Plans & Modal

**Step 6.1 — `lib/planosData.ts`** (inline data, not a new lib file — export const array)
- Define plan objects for both Particulares and Empresas tabs
- Include: name, price, equipment, idealFor, features (with `included: boolean`)

**Step 6.2 — Tab toggle**
- `activeTab: 'particulares' | 'empresas'` state
- Toggle renders different plan set

**Step 6.3 — Plan cards**
- Map over active plans
- "Mais popular" badge on Confort card
- `whileHover: { scale: 1.02 }` on each card
- Mobile: `overflow-x-auto snap-x snap-mandatory` with each card `snap-center`

**Step 6.4 — `PlanosModal.tsx`**
- Portal-style modal with overlay
- React Hook Form: Nome, Email, Telefone, Morada, Mensagem
- Submit: `isSubmitting` state → `setTimeout(1500)` → `isSuccess` → toast → close
- Disclaimer text visible in modal

---

## Phase 7 — Simulador

**Step 7.1 — Wizard shell**
- Progress bar: `width: ${step * 25}%` with CSS transition
- `AnimatePresence mode="wait"` wrapping the active step

**Step 7.2 — Step components**
- Each step: title + 3 option buttons (large, full-width on mobile)
- On option click: save to `respostas`, advance `step`

**Step 7.3 — Transitions**
- Each step: `initial={{ x: 100, opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}` → `exit={{ x: -100, opacity: 0 }}`

**Step 7.4 — Result card**
- Call `calcularPlano()` with collected answers
- Render matching plan info + "Contratar agora" button (opens PlanosModal)
- "Recomeçar" button resets wizard

---

## Phase 8 — ParaEmpresas

**Step 8.1 — Split layout + use-case cards**
- Left: headline, subtitle, partner benefits list, CTA
- Right: 3 use-case cards with emoji + title + description

**Step 8.2 — Animated counters**
- `IntersectionObserver` ref on the stats container
- On first intersection: `useEffect` triggers `requestAnimationFrame` loop for each counter
- Each counter counts from 0 to target value over ~1.5s with easing

---

## Phase 9 — SobreNos

- Left: company story paragraphs + location
- Right: Missão / Visão / Valores cards
- Team avatars: 5 cards, initials in coloured circle, name, role
- Academic disclaimer note at bottom
- `whileInView` reveal on all cards

---

## Phase 10 — Contacto

**Step 10.1 — Layout**
- Dark green background (`#27500A`)
- Two columns on desktop: form (left) + info sidebar (right)

**Step 10.2 — Form**
- React Hook Form: Nome, Email, Telefone, Tipo, Plano, Mensagem, Checkbox
- Required field validation with inline error messages
- Submit: `isSubmitting` → `setTimeout(1500)` → toast → `reset()`

**Step 10.3 — Info sidebar**
- Address, phone, email, hours (all illustrative)
- Slightly lighter background than `#27500A`

---

## Phase 11 — Footer

- Logo + tagline
- Two-column links + social icons (`aria-label` on each icon)
- Legal text + academic disclaimer

---

## Phase 12 — Global Polish

**Step 12.1 — Back to top button**
- In `app/page.tsx`: `useEffect` tracks `scrollY > 300` → renders fixed button
- `AnimatePresence` for fade in/out
- `aria-label="Voltar ao topo"`

**Step 12.2 — Enterprise CTA wiring**
- "Falar com a equipa" button: `scrollTo('#contacto')` + pre-select "Não sei ainda" in plan dropdown (pass via URL hash param or simple scroll only)

**Step 12.3 — Responsiveness audit**
- Test all breakpoints: 375px, 640px, 768px, 1024px, 1280px
- Verify plan card scroll snap on mobile
- Verify simulator full-width on mobile

**Step 12.4 — Accessibility audit**
- All icon buttons have `aria-label`
- All decorative SVGs have `aria-hidden="true"`
- Tab through entire page checking focus rings
- Check colour contrast for muted text on warm background

---

## Build Order Summary

```
Phase 1  Setup & scaffold
Phase 2  simulador.ts logic
Phase 3  Navbar (incl. mobile)
Phase 4  Hero
Phase 5  ComoFunciona
Phase 6  Planos + PlanosModal
Phase 7  Simulador wizard
Phase 8  ParaEmpresas
Phase 9  SobreNos
Phase 10 Contacto
Phase 11 Footer
Phase 12 Polish
```

Each phase: build → `npm run dev` visual check → fix → next phase.
