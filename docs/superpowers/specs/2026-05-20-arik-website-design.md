# Arik Sistemas de Climatização — Website Design Spec

**Date:** 2026-05-20  
**Type:** Demonstrative academic website  
**Context:** Licenciatura de Gestão de Empresas — Universidade Lusófona 2025/2026

---

## 1. Overview

A single-page marketing website for Arik — a Portuguese HVAC subscription startup based in Vila Nova de Famalicão. The company offers air conditioning and heat pump systems on a monthly subscription model (installation + maintenance + repair included, no upfront investment).

The site is for academic/demonstrative purposes. No real payments, no real data storage, no backend.

---

## 2. Stack & Setup

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
npm install framer-motion lucide-react react-hook-form
```

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Fonts:** `next/font` — Fraunces (headings) + DM Sans (body)

---

## 3. Colour Palette

Defined as CSS variables in `app/globals.css`. Never hardcode colours outside these variables.

```css
--green-primary: #3B6D11   /* CTAs, buttons */
--green-light:   #EAF3DE   /* soft backgrounds */
--green-mid:     #639922   /* accents */
--amber-accent:  #BA7517   /* secondary highlights */
--bg-warm:       #F7F5EE   /* general warm background */
--text-dark:     #1A1A18   /* body text */
--text-muted:    #5F5E5A   /* secondary text */
--card-bg:       #FFFFFF
--border:        rgba(0,0,0,0.08)
```

Typography: Fraunces (serif, weight 300–700) for headings; DM Sans (weight 300–500) for body.

---

## 4. Page Structure

SPA with smooth-scroll anchors. `app/page.tsx` assembles all sections:

```
#hero → #como-funciona → #planos → #simulador → #empresas → #sobre → #contacto
```

File structure:
```
app/
  layout.tsx        — fonts, metadata, globals
  page.tsx          — section assembly
  globals.css       — CSS variables, Tailwind base
components/
  Navbar.tsx
  Hero.tsx
  ComoFunciona.tsx
  Planos.tsx
  PlanosModal.tsx
  Simulador.tsx
  ParaEmpresas.tsx
  SobreNos.tsx
  Contacto.tsx
  Footer.tsx
lib/
  simulador.ts      — pure recommendation logic
```

---

## 5. Component Specifications

### Navbar
- Fixed, frosted glass: `rgba(247,245,238,0.92)` + `backdrop-filter: blur(12px)`
- Logo: "Arik" in Fraunces + small subtitle "Sistemas de Climatização"
- Nav links: Como Funciona · Planos · Simulador · Empresas · Sobre Nós · Contacto
- CTA right: "Pedir Simulação" (green pill button)
- Scroll shadow: CSS class toggle via `useScroll`
- Active link: tracked via `IntersectionObserver` on each section
- Mobile: hamburger → animated lateral drawer (Framer Motion `AnimatePresence`)
- State: `isScrolled: boolean`, `isMenuOpen: boolean`

### Hero (`#hero`)
- Full height (100vh), two-column split
- Left: pill tag → headline (Fraunces 72px weight 300) → subtitle → 2 CTAs → trust badges
- Right: animated floating card showing "Plano Arik Confort" with organic SVG background shapes in `#EAF3DE`
- Animation: `staggerChildren` fade + slide-up (tag → headline → subtitle → CTAs)
- CTAs: "Descobrir os planos" (scroll to `#planos`) + "Como funciona →" (scroll to `#como-funciona`)
- Trust badges: ✓ Instalação incluída · ✓ Manutenção incluída · ✓ Sem investimento inicial

### ComoFunciona (`#como-funciona`)
- White background, 4 steps horizontal (desktop) / vertical (mobile)
- Each step: large decorative number, Lucide icon, title, description
- Visual connector between steps (dotted line or arrow)
- Steps: 01 Simulação online · 02 Visita técnica · 03 Instalação · 04 Subscrição ativa
- Reveal animation: `whileInView` + `once: true`

### Planos (`#planos`)
- Toggle: [ Particulares ] / [ Empresas ] — state `activeTab`
- 3 cards in grid; "Confort" card highlighted as "Mais popular"
- On "Contratar este plano →": open `PlanosModal` with selected plan
- Card hover: `whileHover: { scale: 1.02 }` + soft shadow transition
- Mobile: horizontal scroll snap (1 card visible at a time)

**Particulares plans:**
| Plan | Price | Equipment | Ideal for |
|---|---|---|---|
| Essential | 29€/mês | Mono-split 12.000 BTU (GREE Clivia+) | T0, T1 |
| Confort ⭐ | 49€/mês | Multi-split 21.000 BTU (GREE FM21) | T2, T3 |
| Premium | 79€/mês | Multi-split 28.000 BTU (GREE FM28) | T4+, moradias |

**Empresas plans:**
| Plan | Price | Ideal for |
|---|---|---|
| Essential Business | 39€/mês | Barbeiros, salões |
| Business | 69€/mês | Restaurantes, pastelarias |
| Enterprise | Contacto | Múltiplas unidades |

### PlanosModal
- Triggered by Planos; receives selected plan as prop
- Form fields: Nome, Email, Telefone, Morada, Mensagem
- Submit: `setTimeout(1500)` → success toast "Pedido recebido! Entraremos em contacto em 48h." → modal closes
- Disclaimer: "⚠️ Esta é uma demonstração académica. Nenhum pagamento será processado."
- State: `isSubmitting`, `isSuccess`

### Simulador (`#simulador`)
- Background: `#EAF3DE`
- 4-step wizard with progress bar (25% → 50% → 75% → 100%)
- Step transitions: Framer Motion `AnimatePresence` with `x: ±100` slide
- State: `step: 1–4`, `respostas: { tipo, tamanho, divisoes, orcamento }`, `resultado: PlanoRecomendado | null`

**Questions:**
1. Tipo de espaço: Habitação / Alojamento local / Restauração & Comércio
2. Tamanho: <60m² / 60–100m² / >100m²
3. Divisões: 1 / 2–3 / 4+
4. Orçamento: ≤35€ / 35–60€ / >60€

**Result:** recommended plan card with price, features, "Contratar agora" button.

### ParaEmpresas (`#empresas`)
- Split layout: left text/arguments, right 3 use-case cards
- Use cases: Alojamento Local · Restauração & Cafés · Pequenos Negócios
- Partner benefits list with icons
- Animated counters (enter viewport → `requestAnimationFrame` count-up):
  - 82% dos portugueses sem ar condicionado
  - 37,9% dos alojamentos locais geridos por empresas
  - +66% crescimento do setor (2020–2024)
- CTA: "Tornar-me parceiro →"
- State: `countersStarted: boolean`

### SobreNos (`#sobre`)
- Background: `#F7F5EE`
- Left: company story text + location info
- Right: Missão / Visão / Valores (3 cards)
- Team: 5 avatar cards with initials circle + name + role
  - AF — Afonso Rodrigues · MZ — Manuel Mira · RC — Ricardo Russo · SP — Simão Rosa · TG — Tomás Gonçalves
- Academic note: Universidade Lusófona disclaimer

### Contacto (`#contacto`)
- Background: `#27500A` (dark green), light text
- 2-column form: Nome · Email · Telefone · Tipo de espaço · Plano de interesse · Mensagem · Checkbox consent
- Submit: `setTimeout(1500)` → success toast → form reset
- Disclaimer: "⚠️ Demonstração académica — nenhum dado será processado ou armazenado."
- Sidebar: address, phone, email, hours (all illustrative)
- State: `isSubmitting`, `isSuccess`

### Footer
- Logo + tagline: "Conforto térmico acessível para todos."
- Quick links + social icons (Instagram, LinkedIn, Facebook — all `href="#"`)
- Legal: © 2025 Arik Sistemas de Climatização, Lda. · NIF: 123 456 789 (ilustrativo)
- Academic disclaimer

---

## 6. lib/simulador.ts

```typescript
type TipoEspaco = 'habitacao' | 'alojamento' | 'comercio'
type Tamanho = 'pequeno' | 'medio' | 'grande'
type Divisoes = 'uma' | 'algumas' | 'muitas'
type Orcamento = 'baixo' | 'medio' | 'alto'
type PlanoRecomendado = 'Essential' | 'Confort' | 'Premium' | 'Essential Business' | 'Business'

export function calcularPlano(
  tipo: TipoEspaco,
  tamanho: Tamanho,
  divisoes: Divisoes,
  orcamento: Orcamento
): PlanoRecomendado {
  if (tipo !== 'habitacao') {
    if (orcamento === 'alto' || divisoes === 'muitas') return 'Business'
    return 'Essential Business'
  }
  if (tamanho === 'pequeno' || divisoes === 'uma' || orcamento === 'baixo') return 'Essential'
  if (tamanho === 'grande' || divisoes === 'muitas') return 'Premium'
  return 'Confort'
}
```

---

## 7. Animation Patterns

| Location | Pattern |
|---|---|
| Hero | `staggerChildren` — tag → headline → subtitle → CTAs (fade + slide-up) |
| All sections | `whileInView` + `once: true` |
| Plan cards | `whileHover: { scale: 1.02 }` |
| Simulator steps | `AnimatePresence` + `x: ±100` slide |
| Navbar shadow | `useScroll` → CSS class toggle |
| Counters | `useEffect` + `requestAnimationFrame` |
| Mobile menu | `AnimatePresence` drawer |

---

## 8. Responsive Breakpoints (Tailwind)

`sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px`

Mobile-first on all components. Key adaptations:
- Navbar: hamburger + drawer on mobile
- Hero: stacked vertically on mobile
- Plans: horizontal scroll snap on mobile
- Simulator: full-width on mobile

---

## 9. Accessibility

- `aria-label` on icon-only buttons (hamburger, close modal, social icons)
- `:focus-visible` rings on all interactive elements
- Colours meet WCAG AA contrast
- Decorative SVGs use `aria-hidden="true"`

---

## 10. Global UI Elements

**Back to top button:** Fixed, bottom-right corner. Appears after 300px scroll. `window.scrollTo({ top: 0, behavior: 'smooth' })` on click. Managed in `app/page.tsx` with a `useScroll`-driven visibility state.

**Enterprise plan CTA ("Falar com a equipa"):** Scrolls to `#contacto` and pre-selects "Não sei ainda" in the plan selector.

---

## 11. Constraints

- No payment gateway integration
- No form data sent anywhere
- Prices always marked "(ilustrativo)" or with visual disclaimer
- All text in European Portuguese (pt-PT)
