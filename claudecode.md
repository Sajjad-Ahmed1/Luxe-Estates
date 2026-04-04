# claudecode.md — Project Skill & Master Roadmap

---

## System Role

You are a **Senior Real Estate Platform Developer and UI/UX Expert** with deep knowledge of video-centric web experiences, luxury brand aesthetics, and modern frontend architecture.

---

## Project Goal

Build a **luxury real estate platform** that is **video-centric** — where property videos are the primary medium for showcasing listings, replacing static image galleries as the dominant visual experience.

---

## Asset Logic

> **Priority Rule:** All UI components MUST prioritize the video assets already present in the project. Never use placeholder images or external stock media when a local video asset exists.

### Discovered Video Assets

| File | Assigned Property ID | Suggested Role |
|------|----------------------|----------------|
| `vidu-video-3230724334416434.mp4` | `property-001` | Hero / Featured Listing |
| `vidu-video-3230770904399032.mp4` | `property-002` | Listing Card Preview |
| `vidu-video-3230781312404581.mp4` | `property-003` | Listing Card Preview |

### Asset Directory Target

All videos live at:
```
/src/assets/videos/
```
Vite bundles them at build time. Import via `VideoAssetMap` — never use raw filenames in components.

### Data Mapping Convention

Each video maps to a property entry in `/src/data/properties.json` via the `videoSrc` field:

```json
{
  "id": "property-001",
  "title": "Luxury Villa — Palm Waterfront",
  "price": "$4,200,000",
  "location": "Dubai, UAE",
  "beds": 5,
  "baths": 6,
  "sqft": 7200,
  "videoSrc": "/assets/videos/vidu-video-3230724334416434.mp4",
  "thumbnail": "/assets/thumbnails/property-001.jpg",
  "tags": ["Featured", "Waterfront", "Pool"]
}
```

---

## Tech Stack

- **Framework:** React 18 (Vite 5)
- **Styling:** Tailwind CSS v3 — custom token `primary-gold: #C9A84C` in `tailwind.config.js`
- **Routing:** React Router v6
- **State:** React Context API (lightweight, no Redux needed)
- **Video:** Native HTML5 `<video>` with custom React wrapper component; `.mp4` bundled via Vite `assetsInclude`
- **Animations:** Framer Motion for page transitions and card reveals
- **Icons:** lucide-react
- **Maps:** react-leaflet + leaflet v1.9
- **PDF:** jsPDF v4 (client-side brochure generation)
- **SEO:** react-helmet-async

---

## Design Standards

### Visual Style
- **UI Aesthetic:** Glassmorphism layered over dark/cinematic backgrounds
  - Cards: `backdrop-blur`, semi-transparent backgrounds (`bg-white/10`), subtle borders (`border-white/20`)
  - Color palette: deep navy, charcoal, gold accents (`#C9A84C`)
  - Typography: `Inter` or `Playfair Display` for headings

### Interaction Patterns

#### Hover-to-Play Video Previews
- Property cards show a static thumbnail by default
- On `mouseenter`: video fades in and begins playing muted, auto-looped
- On `mouseleave`: video pauses and fades back to thumbnail
- Implementation: CSS `opacity` transition + React `useRef` on `<video>`

#### Page Transitions
- Listing grid → Detail page: shared element transition using Framer Motion `layoutId`
- Smooth scroll on detail page between sections (Overview, Media, Location, Contact)

#### Filter & Search UX
- Sticky filter bar with animated dropdowns
- Results update without full page reload (client-side filtering)

---

## Development Workflow

### Phase 1 — File Analysis & Data Mapping
- [x] Move all `.mp4` files from root → `/assets/videos/`
- [x] Create `/src/data/properties.json` and map each video to a property object
- [x] Build a `VideoAssetMap` utility (`/src/utils/assetMap.js`) for clean imports
- [ ] Generate thumbnail frames (or use video `poster` attribute as fallback)

### Phase 2 — Video-First UI Components
- [x] `VideoCard` component — Hover-to-Play card with Glassmorphism overlay
- [x] `HeroSection` — Full-viewport video background with overlay text
- [x] `PropertyGrid` — Responsive masonry/grid layout of `VideoCard`s
- [x] `PropertyDetailPage` — Fullscreen video player + property details sidebar

### Phase 2.5 — Navigation & Routing
- [x] `Navbar` — Scroll-aware transparent → blur dark, gold logo, nav links, CTA
- [x] React Router v6 — `BrowserRouter` + `AnimatePresence` page transitions
- [x] Routes: `/` → `HomePage`, `/property/:id` → `PropertyDetailPage`
- [x] `VideoCard` — Wrapped in `<Link>` for card-click navigation

### Phase 3 — Full Feature Expansion (Complete)
- [x] `SearchBar` — City / Price / Beds / Type real-time filters in `HomePage`
- [x] `WhyUs` — Trust signals section (Cinematography, Agents, Legal)
- [x] `Footer` — 3-column: brand+socials, quick links, newsletter
- [x] `ImageGallery` — 3-col grid + full-screen lightbox with keyboard navigation
- [x] `PropertyMap` — react-leaflet map with gold marker + nearby place badges
- [x] Download Brochure — jsPDF client-side PDF in `PropertyDetailPage`
- [x] `AgentsPage` — `/agents` route, agent cards with rating + contact
- [x] `Testimonials` — Auto-rotating carousel with manual dot navigation
- [x] `WishlistContext` + `WishlistPage` — heart toggle on cards, persisted to localStorage
- [x] Booking form — validation, 1.5s spinner, success card with agent name
- [x] `MortgageCalculator` — real-time amortization, slider + dropdowns
- [x] `CompareContext` + `ComparePage` — max-2 comparison table with amenity checkmarks
- [x] `RecentlyViewedContext` — tracks last 5 visits, shown on detail page
- [x] `ScrollToTop` — fixed gold button, visible after 400px scroll
- [x] `react-helmet-async` SEO — dynamic title/og:title/og:image per page
- [x] `CardSkeleton` — shimmer skeleton, shown 1s on homepage load

### Routes
| Path | Component |
|------|-----------|
| `/` | `HomePage` |
| `/property/:id` | `PropertyDetailPage` |
| `/agents` | `AgentsPage` |
| `/wishlist` | `WishlistPage` |
| `/compare` | `ComparePage` |

---

## Instruction for Claude

When working on this project:
1. Always check this file first to understand the current phase and conventions.
2. Never introduce a new dependency without noting it in the Tech Stack section.
3. All new components go in `/src/components/`, pages in `/src/pages/`.
4. Reference video assets by their `property ID`, not by raw filename.
5. Mark completed Phase tasks with `[x]` in this file after each implementation step.
