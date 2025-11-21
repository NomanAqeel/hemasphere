# HemaSphere Web

A Next.js-based dashboard for blood bank operations: inventory, requests, donors, appointments, and analytics.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript 5
- Tailwind CSS v4
- Icons: `lucide-react`
- Radix UI primitives: `@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, `@radix-ui/react-slot`, `@radix-ui/react-separator`

## Prerequisites
- Node.js 18+ (recommended 20)
- npm (lockfile present: `package-lock.json`)

## Quick Start
```bash
npm ci
npm run dev
# open http://localhost:3000
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – run built app
- `npm run lint` – lint with ESLint

## Project Structure
```
src/
  app/
    dashboard/
      analytics/
        page.tsx
      appointments/
      donors/
      emergency/
      inventory/
        manage/
      requests/
      users/
      layout.tsx
      page.tsx
    login/
    signup/
    globals.css
    layout.tsx
  components/
    layout/ (AppShell, AppHeader, AppSidebar)
    ui/ (Card, Badge, StatCard, Alert, Toolbar, Tabs, Progress, StatusPill,
         Input, Button, Modal, sidebar, sheet, tooltip, separator, skeleton)
  hooks/ (use-mobile)
  lib/ (utils)
public/media (logos, images)
```

## UI Components
- `Card` – rounded panel container
- `Badge` – status pill with variants: success, warning, danger, info, neutral
- `StatCard` – metric tile with label, value, delta, accent color
- `Toolbar`, `Tabs`, `Alert`, `Progress`, `StatusPill`, `Input`, `Button`, `Modal`
- Sidebar system provided by `components/ui/sidebar`

## Analytics & Reports
Implemented with inline SVG (no chart library):
- Donation Trends – dual line chart (Donations vs Unique Donors)
- Blood Type Distribution – donut chart using stroke-dash segments
- Blood Usage by Category – stacked bar chart (Emergency, Routine, Surgery)
- Demand Forecasting – actual vs predicted (dotted) line chart
- Time Period dropdown – selectable: Last 7 days, 30 days, 3 months, 6 months, last year

## Styling & Theming
- Tailwind CSS utility classes throughout
- Theme tokens in `src/app/globals.css` for colors, radius, and chart palette
- Light/dark support via `dark:` class variants

## Deployment
```bash
npm run build
npm start
```
- Any platform supporting Node.js can host the build (Vercel, Netlify, custom servers).

## Contributing
- Keep components simple, typed, and consistent with existing patterns
- Prefer inline SVG for charts to avoid dependencies; introduce a chart library only if interactivity is needed
- Run `npm run lint` before committing
- Avoid committing secrets; use environment variables for configuration

## Developer Guide
See `DEVELOPER_GUIDE.md` for architecture, conventions, and extension patterns.
