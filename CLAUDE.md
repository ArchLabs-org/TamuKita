# TamuKita — Project Intelligence

## Project Identity
TamuKita is a **SaaS platform** for creating digital wedding websites.
- This is a **product website**, NOT a wedding invitation website
- Visitors should feel like they are using premium software (think: Framer, Linear, Stripe)
- The aesthetic: warm, minimal, luxury, handcrafted

## Design System

### Colors
- **Brand**: Warm terracotta (`--brand-*`), HSL 22° hue family
- **Gold**: Accent color (`--gold-*`), HSL 38–48° hue family
- **Warm**: Background neutrals (`--warm-*`), HSL 36° hue family
- Background is cream (`hsl(36 33% 97%)`), NOT pure white

### Typography
- **Display/Serif**: `font-display` = Playfair Display — use for headings, quotes, hero text
- **Sans**: `font-sans` = Geist Sans — use for body, UI, labels
- Font sizes: `text-display-2xl` → `text-display-xs` (custom scale in tailwind.config)

### Spacing
- Sections use `py-16 md:py-24 lg:py-32` via `<Section>` component
- Container max-widths: sm=2xl, md=4xl, lg=6xl, xl=7xl

### Components
- `<Button variant="brand">` — primary CTA (terracotta)
- `<Button variant="gold">` — secondary premium CTA
- `<Button variant="brand-outline">` — outlined brand
- `<Card variant="default|elevated|outlined|ghost|brand|glass">`
- `<Section>` — wraps in Container automatically
- `<Container size="sm|md|lg|xl">` — max-width wrapper

### CSS Utilities
- `.text-gradient` — brand-to-gold gradient text
- `.glass` — frosted glass effect
- `.bg-noise` — subtle texture overlay
- `scrollbar-hide` — hide scrollbar

## Architecture

### File Structure
```
features/landing/     ← All landing page sections
components/ui/        ← shadcn primitives + custom variants
components/layout/    ← Section, Container
components/common/    ← Logo, shared
components/marketing/ ← Navbar, Footer
lib/utils.ts          ← cn(), formatCurrency(), slugify(), etc.
constants/            ← routes, plans, app config
types/                ← Database, Auth, Wedding types
```

### Landing Page Section Order
1. `HeroSection` — Split layout, iPhone mockup right side
2. `BrandLogosSection` — "Coming Soon" placeholder (muted)
3. `FeaturesSection` — 12 features in elegant grid
4. `TemplatePreviewSection` — Horizontal showcase, 6 themes
5. `HowItWorksSection` — 3-step process
6. `DashboardPreviewSection` — Fake Linear/Notion-style dashboard
7. `WhyDigitalSection` — vs paper invitation comparison
8. `FaqSection` — Accordion FAQ
9. `CtaSection` — Full-width brand gradient
10. `<MarketingFooter>` — in layout

## Copywriting Rules
- Language: Indonesian (Bahasa Indonesia)
- Tone: Warm, honest, simple, premium, minimal
- NEVER use: "Platform #1", "Trusted by millions", "Revolutionary", fake stats
- Use emotional, personal language
- Examples of good tone:
  - "Setiap pernikahan punya ceritanya sendiri."
  - "Buat website yang benar-benar mencerminkan kalian."
  - "Tamu yang bahagia dimulai dari pengalaman yang baik."

## Animation Guidelines
- Library: Framer Motion
- Pattern: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Always use `viewport={{ once: true }}`
- Stagger children with delay increments of 0.08–0.1s
- Easing: `[0.16, 1, 0.3, 1]` for hero elements (spring-like)
- Keep animations subtle — no bounce, no scale > 1.05

## Supabase
- Graceful degradation: app runs without env vars
- Client: `lib/supabase/client.ts` (browser)
- Server: `lib/supabase/server.ts` (RSC)
- Middleware: `lib/supabase/middleware.ts`

## Routes
```
/           → Marketing home
/login      → Auth
/register   → Auth
/dashboard  → Protected
/pricing    → Marketing
/templates  → Marketing
/demo       → Marketing
```

## What NOT to Do
- Don't redesign from scratch — read existing code first
- Don't break the design system — reuse colors/tokens
- Don't add new dependencies without reason
- Don't use hardcoded hex/rgb — use CSS custom properties
- Don't use `any` TypeScript type
- Don't create TODOs or placeholder comments in production code
