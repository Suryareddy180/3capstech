# 3CAPSTECH Software Pvt Ltd — Premium Website

## Problem Statement
Award-worthy official frontend for 3CAPSTECH: an immersive experience combining a
premium software-company site + a learning platform + interactive product experience.
References: Apple, Stripe, Linear, Vercel, Netflix, Coursera. Luxury, minimal, future-ready.

## Stack
- Frontend: React (CRA) + Tailwind + Framer Motion (custom particle canvas, magnetic buttons,
  3D tilt, animated cursor, scroll reveals, word reveals, tech orbit).
- Backend: FastAPI + MongoDB (contact, newsletter, enroll, stats).
- Light/Dark theme: system detection + manual toggle + localStorage persistence + smooth transition.

## Implemented (2026-08-07)
- Home: Hero (BUILD./LEARN./INNOVATE.), About timeline + values, Services expanding panels (8),
  Technology orbit, Learning teaser, Why Choose Us animated counters, Internships timeline,
  Testimonials auto-carousel, Contact form + Google Map + WhatsApp, animated footer + newsletter.
- /learning route = central Learning Hub: search, category filters, career tracks,
  Trending/Popular carousels, full course grid, premium course cards with Enroll; dark LMS dashboard preview.
- Brand: official 3CapsTech logo integrated (transparent PNG at /frontend/public/logo.png) in navbar + footer.
- Fully responsive 320px–4K, no horizontal overflow. All interactive elements have data-testid.
- E2E tested: backend 15/15 pytest pass; frontend 100% (theme persistence, filters, forms, enroll, reveals).

## Backlog / Next
- P1: Course preview modal/video (preview button currently decorative).
- P2: Mobile nav panel tagline polish; unique dedupe indexes on newsletter/enrollments; fetch timeout in api.js.
- P2: Real 3D globe (Three.js/Spline) in hero; Lottie micro-animations.

## Update (2026-08-07) — Branding + Content
- Favicon/app icon generated from logo's circuit-arrow mark (favicon.ico/png, apple-touch-icon) in /frontend/public.
- Social share image og-image.png (1200x630) + full Open Graph + Twitter card meta in index.html.
- Removed dated timelines: About "Growth Journey" replaced with Mission / Vision / Pillars (no dates); Internships connecting timeline line removed (now a clean step grid).
- Hid internal tech-stack references: Technology section reframed as "Capabilities" (generic terms); Service tags genericised (no React/Next/Flutter/AWS/K8s/MLOps); hero floating chips changed to Enterprise/AI Solutions/Cloud/Learning; LMS demo strings softened. (Public course catalog names retained, as that is what the platform teaches.)
