# MILESTONE FIN ACADEMY — MASTER CLAUDE.md (v2)
## Updated: Spline Hero · Level Diplomas · Faculty · News & Media · Full Admin CMS
## Place this file at: milestone-academy/CLAUDE.md

---

## 🎯 PROJECT OVERVIEW

- **Brand:** Milestone Fin Academy — ONE unified brand (not two separate institutes)
- **Story:** Started as a trading academy. Expanded to professional accounting & finance diplomas.
- **Website Goal:** Awwwards-winning, WOW-level. Every visitor says "WOW."
- **Live Ref:** https://milestone-trading-academy.vercel.app/

---

## 🏗 BUILD STATUS TRACKER

```
- [ ] Phase 1: Foundation (packages, globals, Lenis, Supabase, data)
- [ ] Phase 2: Global Shell (LoadingScreen, Cursor, Navbar, Footer)
- [ ] Phase 3: Hero Section — Spline 3D (REPLACE old Three.js completely)
- [ ] Phase 4: Marquee + Stats + Level-Based Courses (Timeline layout)
- [ ] Phase 5: Faculty Section + Trading Section
- [ ] Phase 6: News & Media Section + Testimonials + Placement + CTA
- [ ] Phase 7: All Public Pages (/courses, /trading, /news, /about, /contact)
- [ ] Phase 8: Admin Panel — Full CMS (courses+faculty+news+testimonials)
- [ ] Phase 9: Polish, Responsive, SEO, Deploy
```

---

## 🛠 TECH STACK

```
Framework:      Next.js 14+ (App Router, TypeScript strict)
Styling:        Tailwind CSS v3 + CSS custom properties in globals.css
Animations:     GSAP 3 (ScrollTrigger, SplitText, DrawSVG, Flip)
Smooth Scroll:  Lenis (@studio-freight/lenis) — connected to GSAP RAF
3D Hero:        @splinetool/react-spline — PRIMARY (Spline design tool)
Components:     shadcn/ui (radix-ui primitives)
Icons:          Lucide React
Fonts:          Instrument Serif + Syne + JetBrains Mono (Google Fonts)
State:          Zustand
Forms:          React Hook Form + Zod
Backend/DB:     Supabase (PostgreSQL + Auth + Storage + Realtime)
Admin Auth:     Supabase Auth with Next.js middleware route protection
File Uploads:   react-dropzone (drag-and-drop for images/videos)
Rich Text:      react-quill (admin post editor)
Video Player:   react-player (YouTube/Vimeo/upload playback)
Email:          Resend
Toasts:         react-hot-toast
Charts:         recharts (admin dashboard)
```

### Install:
```bash
npm install gsap @studio-freight/lenis @splinetool/react-spline \
  lucide-react zustand react-hook-form zod @hookform/resolvers \
  clsx tailwind-merge class-variance-authority \
  @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs \
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-switch \
  @radix-ui/react-alert-dialog @radix-ui/react-dropdown-menu \
  split-type next-themes @supabase/supabase-js @supabase/auth-helpers-nextjs \
  resend react-hot-toast react-quill date-fns recharts \
  react-dropzone react-player

npx shadcn@latest init
npx shadcn@latest add button card badge tabs accordion dialog tooltip \
  select switch alert-dialog dropdown-menu table form input textarea label
```

---

## 🎨 DESIGN SYSTEM — globals.css

```css
:root {
  --bg-primary:    #F7F9F4;
  --bg-secondary:  #EDEFEA;
  --bg-card:       #FFFFFF;
  --bg-dark:       #0A1A0B;
  --bg-dark-card:  #132015;
  --bg-dark-glass: rgba(255,255,255,0.05);

  --green-50:   #F0F7F0;
  --green-100:  #D4EDD4;
  --green-200:  #A8D8A8;
  --green-300:  #6DBF6D;
  --green-400:  #3DA83D;
  --green-500:  #2D9E44;
  --green-600:  #237A35;
  --green-700:  #1A5C28;
  --green-800:  #124019;
  --green-900:  #0A2810;

  --accent-gold: #D4AF37;
  --accent-mint: #A8F5C2;

  --text-primary:   #0A1A0B;
  --text-secondary: #3A5C3C;
  --text-muted:     #7A9B7C;
  --text-inverse:   #F7F9F4;

  --border-light:  #D4E8D4;
  --border-medium: #A8C8A8;

  --shadow-green: 0 4px 40px rgba(45, 158, 68, 0.15);
  --shadow-card:  0 2px 20px rgba(10, 26, 11, 0.08);
  --shadow-lift:  0 20px 60px rgba(10, 26, 11, 0.18);

  --gradient-hero:  linear-gradient(135deg, #F7F9F4 0%, #E8F5E9 50%, #F0FFF4 100%);
  --gradient-green: linear-gradient(135deg, #2D9E44 0%, #237A35 100%);
  --gradient-dark:  linear-gradient(180deg, #0A1A0B 0%, #132015 100%);
  --gradient-glow:  radial-gradient(ellipse at center, rgba(45,158,68,0.18) 0%, transparent 70%);

  --r-sm: 8px; --r-md: 16px; --r-lg: 24px; --r-xl: 40px; --r-pill: 100px;
}
```

### Fonts:
```
Instrument Serif (400, 400 italic) — headlines, editorial text
Syne (400, 500, 600, 700) — nav, body, labels
JetBrains Mono (400, 600, 700) — numbers, stats, codes, badges
```

---

## 🖼 LOGO RULES

Files in `/public/logos/`:
- `milestone-logo-dark.png` — white wordmark (for dark backgrounds)
- `milestone-logo-light.png` — dark wordmark (for light backgrounds)

```
Loading screen (dark):   → milestone-logo-dark.png
Navbar (light/frosted):  → milestone-logo-light.png
Hero section (light bg): → milestone-logo-light.png
Footer (dark):           → milestone-logo-dark.png
Admin sidebar (dark):    → milestone-logo-dark.png
```

Logo component: `components/global/Logo.tsx`
Props: `variant: "dark" | "light"`, `width: number`
Use Next.js `<Image>` with `priority` for navbar + loading screen.

---

## 🎲 HERO SECTION — FULL SPLINE REBUILD

### ⚠️ SCRAP THE CURRENT HERO COMPLETELY. Build this new Spline version.

### The Problem with Current Hero:
The uploaded screenshot shows a flat dark hexagon + two green dots. It looks like a basic CSS shape, not Awwwards quality. We need immersive, premium, real 3D.

### New Hero Architecture:
```
Layout: FULL BLEED — Spline fills entire right portion of screen
        Content overlaid as HTML layer (z-10) on left
        No two-column grid constraint — the 3D bleeds edge-to-edge

Background: var(--gradient-hero) as base
Spline: absolute, right 0, top 0, width 65%, height 100%
Left-to-right gradient fade: overlays the Spline on the left edge
  (linear-gradient: bg-primary at 40% → transparent at 70%)
  This blends Spline seamlessly into the content area
```

### Spline Scene — What to Build/Find:
```
Go to https://app.spline.design/community and search:
  Keywords: "finance" / "data" / "abstract green" / "crystal" / "sphere gradient"

IDEAL SCENE CHARACTERISTICS:
  ✓ Dark atmospheric environment (#0A1A0B base)
  ✓ Abstract 3D geometry — NOT a plain box/hexagon
    Best options: floating polyhedra, abstract curved surfaces, 
    data visualization shapes, crystal formations, sphere clusters
  ✓ Green accent lighting: rim light, glow halos in #2D9E44
  ✓ Animated: slow rotation, particle trails, pulsing glow
  ✓ Mouse interactivity: follow-cursor or orbit built into Spline
  ✓ Premium material: metallic, glass, or iridescent surface

TO USE IN CODE:
  1. Find/create a Spline scene at spline.design
  2. Click "Export" → "Viewer" → copy the scene URL
  3. Use: <Spline scene="https://prod.spline.design/{ID}/scene.splinecode" />
  4. If no URL available at build time, use placeholder URL + comment:
     // TODO: Replace SPLINE_SCENE_URL with actual published Milestone scene

IMPORTANT: Add error boundary + Suspense around Spline.
If Spline fails to load → show HeroFallback (CSS animated scene, see below).
```

### HeroFallback — CSS-Only Premium Alternative:
```tsx
// components/sections/HeroFallback.tsx
// Renders when Spline fails or on slow connections

// Visual elements (pure CSS, zero JavaScript):
// 1. Background: dark gradient overlay on right 65% (--bg-dark to transparent)
// 2. Large pulsing orb: 500px circle, radial gradient green/50 transparent
//    animation: pulse 4s ease-in-out infinite (opacity 0.3 → 0.8)
// 3. Rotating outer ring: 450px, border 1px green-500/20, rotate 30s linear
// 4. Counter-rotating inner ring: 300px, border 1px green-500/30, rotate -20s linear
// 5. Orbiting dot: 14px green circle on ring circumference, orbit CSS animation
// 6. Grid pattern: CSS bg-image grid lines (green 5% opacity, 60px spacing)
// 7. Three floating data chips (staggered CSS animation delays):
//    "₹30,000 Average Salary Hike" / "96% Placement" / "4,800+ Students"
//    Style: frosted glass pill, white bg/80, backdrop-blur, JetBrains Mono

// This fallback must still look IMPRESSIVE — better than current Three.js
```

### Hero HTML Content (overlaid on Spline, z-10):
```
Container: max-w-[1280px] mx-auto px-6, absolute z-10
           left-aligned content, max-width 520px on left

[PILL BADGE] (mb-6):
  bg var(--green-500)/12, border 1px var(--green-500)/25
  rounded-full, px-5 py-2, inline-flex gap-2 items-center
  "✦ India's Premier Accounting Academy"
  Syne 12px, text-[var(--green-600)], letter-spacing 0.05em
  Entrance: scale 0→1, spring ease, delay 0.25s

[HEADLINE] (Instrument Serif, clamp(58px, 7.5vw, 96px), line-height 1.0):
  "Master the"    → text-[var(--text-primary)]
  "Language of"   → text-[var(--text-primary)]
  "Business."     → text-[var(--green-500)], italic
                     text-decoration: underline 3px solid var(--green-500)/25

  Each line: wrapped in overflow:hidden div
  GSAP: y:"110%" → 0, stagger 0.12s, duration 0.9s, power4.out
  class="gsap-heading"

[SUBTEXT] (mt-6, Syne 18px, text-secondary, max-w-[440px], leading-[1.65]):
  "From Tally to Taxation, GST to Financial Analytics —
  Milestone Fin Academy turns ambition into expertise,
  one certified professional at a time."
  Entrance: y:30 → 0, opacity 0→1, delay 0.85s

[CTA ROW] (mt-10, flex gap-4):
  Primary: "Explore Programs →"
    bg var(--gradient-green), white, Syne SemiBold 15px
    px-9 py-4, rounded-full, class="magnetic"
    Hover: translateY(-2px), shadow-[var(--shadow-green)], scale(1.03)
    Click ripple: expanding ring animation

  Secondary: "Watch Demo ▶"
    border 1.5px var(--border-medium), bg transparent
    Syne SemiBold 15px, px-9 py-4, rounded-full, class="magnetic"
    Play icon: 2 expanding ring CSS pulse (opacity 1→0, scale 1→2.5, 2s loop)
    Hover: border var(--green-400), text var(--green-600), bg var(--green-50)

[SOCIAL PROOF ROW] (mt-8, flex items-center gap-6):
  5 colored-initial avatar circles (38px, -10px overlap, border-2 white)
  "4,800+ Students Enrolled" Syne SemiBold 13px
  │ 1px vertical line h-5
  "★★★★★ 4.9/5 Rating" (gold stars, Syne 13px)

[SCROLL INDICATOR] (absolute bottom-8 left-6):
  "SCROLL" JetBrains Mono 10px, text-muted, tracking-[0.3em], vertical text
  Thin 40px line below, animated: GSAP y oscillation (0↔12px, 1.5s loop)

[FLOATING BADGE CARDS] (absolute z-20, overlaid on Spline area):
  3 frosted glass cards floating in the Spline area:
  
  Card style: bg white/88, backdrop-blur-md, border border-[var(--border-light)]
    rounded-2xl, px-5 py-3, flex items-center gap-3
    box-shadow: var(--shadow-card)
  
  Icon circle: 36px, bg var(--green-50), rounded-full, centered icon 16px green-600
  Text: Syne SemiBold 13px, text-primary
  
  Card 1 (top-right of 3D area): BarChart3 icon | "GST Certification"
    GSAP float: y 0→-14px→0, 3.2s ease-in-out infinite, yoyo
  
  Card 2 (middle area): CheckCircle icon | "Industry Recognized"
    GSAP float: delay 1.1s, 3.8s duration
  
  Card 3 (bottom area): Trophy icon | "Tally Expert Program"
    GSAP float: delay 0.7s, 4.2s duration
  
  All cards entrance: scale 0→1, opacity 0→1, spring ease, stagger 0.9/1.2/1.5s
```

---

## 📚 COURSES — 4-LEVEL DIPLOMA SYSTEM

### ⚠️ These are the ONLY courses. No invented courses. Based on PDF curriculum.

### Diploma Level Names:
```
Level 1: Diploma in Accounting & Business Systems          (DABS)
Level 2: Diploma in UAE Taxation & Compliance              (DUTC)
Level 3: Postgraduate Diploma in Accounting & Financial Analytics (PGDAFA)
Level 4: Executive Master Diploma in Accounting & Taxation (EMDAT)
```

### Course Data — lib/courses.ts (TypeScript):
```typescript
export interface Module { title: string; topics: string[]; }

export interface Course {
  id: string;
  slug: string;
  level: 1 | 2 | 3 | 4;
  level_label: string;
  diploma_code: "DABS" | "DUTC" | "PGDAFA" | "EMDAT";
  title: string;
  short_title: string;
  tagline: string;
  badge: string;
  badge_color: "green" | "gold" | "dark";
  duration: string;
  price: number | null;               // null = contact for pricing
  original_price: number | null;
  emi: string | null;
  skill_level: string;
  category: "accounting" | "taxation" | "advanced";
  icon: string;                       // Lucide icon name
  gradient: string;
  rating: number;
  review_count: number;
  enrolled_count: number;
  image_url: string | null;           // Admin-uploaded banner image
  gallery_images: string[];           // Admin-uploaded gallery
  topics: string[];
  highlights: string[];
  who_is_it_for: string;
  modules: Module[];
  is_published: boolean;
  sort_order: number;
}

export const COURSES: Course[] = [
  {
    id: "dabs", slug: "diploma-accounting-business-systems",
    level: 1, level_label: "Level 1", diploma_code: "DABS",
    title: "Diploma in Accounting & Business Systems",
    short_title: "Accounting & Business Systems",
    tagline: "Your gateway into professional accounting",
    badge: "STARTER", badge_color: "green", duration: "3 Months",
    price: 30000, original_price: 38000, emi: "₹10,000/month",
    skill_level: "Beginner", category: "accounting", icon: "BookOpen",
    gradient: "linear-gradient(135deg, #2D9E44 0%, #4ADE80 100%)",
    rating: 4.8, review_count: 142, enrolled_count: 1240,
    image_url: null, gallery_images: [],
    topics: ["Manual Accounting", "Tally Prime", "MS Word", "MS Excel", "MS PowerPoint", "Trading Fundamentals"],
    highlights: ["Hands-on Tally Prime with real company data", "Manual bookkeeping from scratch", "MS Office for finance professionals", "Trading fundamentals included", "Industry certificate on completion"],
    who_is_it_for: "Freshers, students, and career-changers entering the accounting profession",
    modules: [
      { title: "Manual Accounting Fundamentals", topics: ["Accounting concepts & principles", "Double-entry bookkeeping", "Trial balance preparation", "Journal & ledger maintenance", "Financial statements overview"] },
      { title: "Tally Prime Core", topics: ["Company setup & configuration", "Voucher entry types", "Bank reconciliation", "Inventory management basics", "MIS reports generation"] },
      { title: "MS Office for Finance", topics: ["Excel: formulas, functions, formatting", "Word: business letters & reports", "PowerPoint: finance presentations"] },
      { title: "Trading Introduction", topics: ["Stock market overview", "Reading price charts", "Trading terminology glossary"] }
    ],
    is_published: true, sort_order: 1
  },
  {
    id: "dutc", slug: "diploma-uae-taxation-compliance",
    level: 2, level_label: "Level 2", diploma_code: "DUTC",
    title: "Diploma in UAE Taxation & Compliance",
    short_title: "UAE Taxation & Compliance",
    tagline: "Unlock Gulf market opportunities",
    badge: "GULF READY", badge_color: "gold", duration: "2 Months",
    price: 37000, original_price: 46000, emi: "₹18,500/month",
    skill_level: "Intermediate", category: "taxation", icon: "FileText",
    gradient: "linear-gradient(135deg, #1A5C28 0%, #2D9E44 100%)",
    rating: 4.9, review_count: 98, enrolled_count: 876,
    image_url: null, gallery_images: [],
    topics: ["Manual Accounting", "Tally Prime", "Zoho Books", "UAE VAT & Filing", "UAE Corporate Tax & Filing", "Trading"],
    highlights: ["Live UAE VAT return filing on FTA portal", "UAE Corporate Tax — registration to filing", "Zoho Books cloud accounting mastery", "India + UAE dual taxation expertise", "High-demand Gulf job market skills"],
    who_is_it_for: "Accounting professionals targeting UAE/Gulf job market, expats, and finance teams of India-UAE businesses",
    modules: [
      { title: "UAE Business Accounting", topics: ["UAE accounting standards overview", "Multi-currency accounting entries", "Tally Prime for UAE companies"] },
      { title: "Zoho Books Mastery", topics: ["Cloud accounting setup", "Invoicing & payment management", "Bank feeds & reconciliation", "Financial reports in Zoho"] },
      { title: "UAE VAT Complete", topics: ["VAT registration process", "Tax invoice requirements", "VAT return filing on FTA portal", "Input tax credit reconciliation", "VAT refund procedure"] },
      { title: "UAE Corporate Tax", topics: ["CT registration on EmaraTax", "Taxable income computation", "Corporate Tax return filing", "Free zone CT exemptions", "Transfer pricing basics"] },
      { title: "Trading in UAE Context", topics: ["UAE financial market overview", "Trading concepts for UAE investors"] }
    ],
    is_published: true, sort_order: 2
  },
  {
    id: "pgdafa", slug: "postgraduate-diploma-accounting-financial-analytics",
    level: 3, level_label: "Level 3", diploma_code: "PGDAFA",
    title: "Postgraduate Diploma in Accounting & Financial Analytics",
    short_title: "Accounting & Financial Analytics",
    tagline: "Complete accounting + analytics mastery",
    badge: "BESTSELLER", badge_color: "green", duration: "5 Months",
    price: 45000, original_price: 58000, emi: "₹9,000/month",
    skill_level: "Intermediate → Advanced", category: "accounting", icon: "TrendingUp",
    gradient: "linear-gradient(135deg, #0A2810 0%, #2D9E44 100%)",
    rating: 4.9, review_count: 215, enrolled_count: 1820,
    image_url: null, gallery_images: [],
    topics: ["Manual Accounting", "Tally Prime", "GST & Filing", "MS Excel Advanced", "MS PowerPoint", "Zoho Books", "Power BI", "Trading"],
    highlights: ["Live GST filing — GSTR-1, GSTR-3B hands-on", "Power BI finance dashboards from scratch", "Advanced Excel: pivot tables, VLOOKUP, macros", "Zoho Books + Tally dual expertise", "Most popular program — 1,820+ alumni enrolled"],
    who_is_it_for: "Professionals seeking complete accounting mastery and targeting corporate finance roles",
    modules: [
      { title: "Advanced Manual Accounting", topics: ["Complete accounting cycle", "Financial statement preparation", "Ratio analysis & interpretation", "Bank & credit reconciliation"] },
      { title: "Tally Prime Advanced", topics: ["Payroll processing in Tally", "TDS & TCS management", "GST in Tally — all returns", "Multi-branch company setup", "Advanced inventory management"] },
      { title: "Indian GST Mastery", topics: ["GST registration & amendments", "HSN/SAC code classification", "GSTR-1 preparation & filing", "GSTR-3B filing & ITC claim", "Annual return GSTR-9", "E-invoicing & E-way bill"] },
      { title: "Advanced Excel for Finance", topics: ["VLOOKUP, HLOOKUP, INDEX/MATCH", "Pivot tables & pivot charts", "Financial formulas & functions", "Macro recording & VBA basics", "Financial modeling templates"] },
      { title: "Zoho Books Advanced", topics: ["Complete cloud accounting workflow", "Automation & recurring transactions", "Multi-user access management", "Comprehensive financial reports"] },
      { title: "Power BI for Finance", topics: ["Data import & transformation", "DAX formula writing", "Building interactive dashboards", "Executive finance reports", "Publishing & sharing reports"] },
      { title: "Trading Fundamentals", topics: ["Technical analysis basics", "Candlestick chart reading", "Risk & money management"] }
    ],
    is_published: true, sort_order: 3
  },
  {
    id: "emdat", slug: "executive-master-diploma-accounting-taxation",
    level: 4, level_label: "Level 4", diploma_code: "EMDAT",
    title: "Executive Master Diploma in Accounting & Taxation",
    short_title: "Executive Accounting & Taxation",
    tagline: "The pinnacle of financial education",
    badge: "ULTIMATE", badge_color: "dark", duration: "7 Months",
    price: null, original_price: null, emi: null,
    skill_level: "All Levels → Expert", category: "advanced", icon: "Award",
    gradient: "linear-gradient(135deg, #0A1A0B 0%, #1A5C28 50%, #2D9E44 100%)",
    rating: 5.0, review_count: 67, enrolled_count: 520,
    image_url: null, gallery_images: [],
    topics: ["Manual Accounting", "Tally Prime", "GST & Filing", "UAE VAT & Filing", "UAE Corporate Tax & Filing", "Advanced Excel", "Power BI", "Zoho Books", "QuickBooks", "MS Word", "Trading Complete"],
    highlights: ["Complete curriculum — all 4 levels combined", "India + UAE dual taxation mastery", "QuickBooks + Zoho + Tally triple proficiency", "Power BI advanced analytics suite", "Priority placement — direct HR referrals", "1-on-1 dedicated mentor sessions"],
    who_is_it_for: "Ambitious professionals targeting CFO, Finance Manager, or senior consulting roles across India and UAE",
    modules: [
      { title: "Complete Manual Accounting Mastery", topics: ["Advanced bookkeeping techniques", "IFRS & IndAS comparative overview", "Internal audit trail management"] },
      { title: "Tally Prime Expert Level", topics: ["All Tally features & customization", "Advanced reporting & data export", "Tally integration with other tools"] },
      { title: "Indian GST — End to End", topics: ["All GSTR forms mastered", "E-invoicing mandatory compliance", "E-way bill generation & management", "GST audit readiness & documentation"] },
      { title: "UAE Taxation Complete", topics: ["UAE VAT: registration to annual filing", "UAE Corporate Tax: full filing workflow", "FTA portal complete mastery", "Penalty avoidance strategies"] },
      { title: "Advanced Analytics Suite", topics: ["Excel financial modeling", "Power Query & Power Pivot", "Advanced DAX functions", "C-suite executive dashboards"] },
      { title: "Triple Software Mastery", topics: ["Zoho Books: advanced features & automation", "QuickBooks Desktop & QuickBooks Online", "Cross-platform accounting workflows"] },
      { title: "Complete Trading Program", topics: ["Full technical analysis curriculum", "Options & derivatives fundamentals", "Portfolio management strategies", "Investment analysis & valuation"] }
    ],
    is_published: true, sort_order: 4
  }
];
```

---

## 🎨 COURSES SECTION — LEVEL TIMELINE LAYOUT

### Design Concept: "Career Progression Journey"
```
The 4 diploma levels are shown as a visual progression path — a timeline —
so visitors immediately understand this is a journey from Level 1 to Level 4.
Every level feels like an achievement, not just a product.

HOMEPAGE: Timeline/Ladder Layout (vertical, editorial)
/COURSES PAGE: Grid Layout (2×2, scannable, detailed)
```

### Homepage CoursesSection — Timeline Design:
```
Section header (text-center, mb-20):
  Label: "DIPLOMA PROGRAMS" (JetBrains Mono 11px, green-600, uppercase, tracking-widest)
  Headline: "Four Levels. One Complete Career." (Instrument Serif, class="gsap-heading")
  Sub: "Start where you are. Graduate where you want to be."

  Filter Pills (flex justify-center gap-3, mt-8):
  "All Programs" | "Accounting" | "Taxation" | "Advanced"
  Active: bg green-500 white text | Inactive: bg green-50 text-secondary

TIMELINE CONTAINER (relative, max-w-[900px], mx-auto):

LEFT RAIL (position absolute, left 30px, top 0, bottom 0):
  Thin vertical line (width 2px, bg var(--green-500)/15, full height)
  GSAP DrawSVG: line draws from top to bottom as user scrolls

For EACH LEVEL:

[NODE] (position absolute left 0, 60px circle, z-10):
  bg var(--gradient-green) for levels 1-3
  bg linear-gradient(135deg, var(--bg-dark), var(--green-700)) for level 4 (gold border)
  center: level number, JetBrains Mono 22px bold, white
  Glow shadow: 0 0 20px rgba(45,158,68,0.4) on hover
  GSAP entrance: scale 0 → 1 spring bounce when scroll reaches that node

[CONNECTOR LABEL] between nodes:
  small dashed horizontal line + "↓" icon + "Next Level"
  JetBrains Mono 10px, text-muted, ml-20

[COURSE CARD] (ml-[88px], bg white, rounded-2xl, border border-[var(--border-light)]):
  Horizontal layout — image LEFT, content RIGHT
  No min-height constraint — content drives height

  LEFT: Image area (w-[220px], shrink-0, rounded-l-2xl, overflow-hidden)
    If image_url: Next.js Image, object-cover, h-full
    If null: gradient from course.gradient, flex-center Lucide icon (56px white)
    
    Level badge overlay (top-left, absolute, m-3):
      bg var(--bg-dark)/80 backdrop-blur, rounded-full, px-3 py-1
      "Level 1 · DABS" JetBrains Mono 10px white

  RIGHT: Content (flex-1, p-7)
    Diploma code chip: "DABS" bg var(--green-50) border var(--green-200) 
      text-[var(--green-700)] JetBrains Mono 11px rounded-full px-3 py-1
    
    Title: Syne SemiBold 18px, text-primary, mt-3, leading-tight
    Tagline: Syne 13px, text-secondary, mt-1

    Topics (flex wrap gap-2, mt-4):
      Show first 5 topics as small pills
      bg var(--green-50), text-[var(--green-700)], JetBrains Mono 10px, rounded-full px-2.5 py-0.5
      If more: "+N more" pill in text-muted

    Bottom row (flex space-between items-center mt-5 pt-4 border-t border-[var(--border-light)]):
      Duration: "📅 3 Months" Syne 12px text-secondary
      Price:
        If price > 0: "₹{price.toLocaleString('en-IN')}" JetBrains Mono SemiBold 22px green-600
        If null: "Contact for Pricing" Syne SemiBold 15px green-600
      "Enroll →" pill button: bg var(--gradient-green), white, Syne 12px, px-4 py-2, rounded-full

  CARD HOVER:
    translateY(-5px), box-shadow var(--shadow-lift)
    Left image: scale(1.06) inside overflow-hidden
    "Enroll →" button: translateX(3px)
    Transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)

  SCROLL ENTRANCE:
    Card slides from right: x:70 → 0, opacity 0→1
    Each card triggers when 75% in viewport
    GSAP ScrollTrigger, stagger 0.2s between levels
```

### Course Detail Page — /courses/[slug]:
```
HERO BANNER (full-width, h-[320px], relative, overflow-hidden):
  If image_url: Next.js Image, object-cover, object-center, w-full h-full
  If null: background: course.gradient
  
  Dark overlay: linear-gradient(135deg, rgba(10,26,11,0.92) 40%, rgba(10,26,11,0.5) 100%)
  
  Overlay content (absolute z-10, bottom-0, left-0, px-8 py-8, max-w-[1280px] w-full mx-auto):
    Breadcrumb: "Programs → DABS" (JetBrains Mono 11px, text-inverse/60%)
    Level badge: "Level 1" (green pill)
    Diploma code: "DABS" (JetBrains Mono 18px bold, text-[var(--accent-mint)])
    Title: Instrument Serif 48px, text-inverse, leading-tight
    Meta row: Duration | Skill Level | Rating | Enrolled count

GALLERY (if gallery_images.length > 0):
  Horizontal scroll strip: 4 thumbnail images, 160px wide, 100px tall, rounded-xl
  Click → opens full lightbox modal

REST OF PAGE: Curriculum accordion, faculty cards, sticky enroll sidebar, CTA
```

### Course Image Upload in Admin:
```
/admin/courses/[id] — Image Upload Section:

BANNER IMAGE UPLOAD:
  react-dropzone zone (dashed border, 300px height, full-width)
  Text: "Drop course banner image here, or click to browse"
  Accepts: image/jpeg, image/png, image/webp | Max: 5MB
  After drop: shows image preview + "Upload" button
  On upload: POST to /api/upload with formData
    → upload to Supabase Storage: "courses/{course_id}/banner.jpg"
    → get public URL → update course.image_url in DB
  Replace image: shows existing image with "Replace" button overlay
  Delete: × button → removes from Storage + sets image_url to null

GALLERY IMAGES (optional, up to 5):
  Small dropzone: "Add gallery images (up to 5)"
  After upload: horizontal strip of thumbnails, each with × to remove
  Upload to: "courses/{course_id}/gallery/img_{n}.jpg"
  Update course.gallery_images array in DB
```

---

## 👨‍🏫 FACULTY SECTION

### Initial Faculty Members:
```
1. Name: Shaiha KS
   Role: Lead Accounting Instructor
   Specialization: Financial Accounting & Tally Prime
   Email: shaishaaaa1000@gmail.com (PRIVATE — admin only)
   Phone: 7994510515 (PRIVATE — admin only)
   Teaches: DABS, PGDAFA

2. Name: Muhammed Uways
   Role: Taxation Specialist  
   Specialization: UAE VAT, Corporate Tax & GST
   Email: uways.oo@gmail.com (PRIVATE)
   Phone: 9633866973 (PRIVATE)
   Teaches: DUTC, EMDAT

3. Name: Jinsiya
   Role: Financial Analytics Instructor
   Specialization: Power BI, Advanced Excel & Financial Reporting
   Email: jinsyaboobacker@gmail.com (PRIVATE)
   Phone: 9744969154 (PRIVATE)
   Teaches: PGDAFA, EMDAT
```

### FacultySection — Homepage Design:
```
Component: <FacultySection />
Background: var(--bg-secondary)

Header:
  Label: "MEET YOUR MENTORS"
  Headline: "Learn from Those<br>Who Do It Daily."
  Sub: "Practicing accountants and tax experts — not just teachers."

3-column grid (max-w-[1100px] mx-auto, gap-8):

Faculty Card (bg white, rounded-3xl, overflow-hidden, border):

  PHOTO AREA (h-[280px], relative, overflow-hidden):
    If photo_url: Next.js Image, object-cover, object-top
    If no photo:
      bg: linear gradient (green-900 → green-700)
      Background initial: faculty.name[0], Instrument Serif 200px, white/8%, centered
      Foreground initial: faculty.name[0], Instrument Serif 80px, white, centered
    
    Bottom overlay gradient: to top, rgba(10,26,11,0.85) → transparent (50% height)
    
    Absolute bottom content (p-5):
      Specialization chip: bg var(--green-500)/20 backdrop-blur
        JetBrains Mono 10px, text-[var(--accent-mint)], rounded-full, px-3 py-1

  CARD BODY (p-7):
    Name: Syne SemiBold 22px, text-primary
    Role: Syne 13px, text-[var(--green-600)], mt-1

    Thin divider, my-4

    Bio: Syne 13px, text-secondary, leading-relaxed, line-clamp-3

    Courses taught (flex wrap gap-2, mt-4):
      Each diploma code as pill:
      "DABS" / "DUTC" / "PGDAFA" / "EMDAT"
      bg var(--green-50), border var(--green-200), text-[var(--green-700)]
      JetBrains Mono 10px, rounded-full px-3 py-1

    "Connect" button (mt-5):
      Outline, green-500, Syne 13px, px-5 py-2, rounded-full
      Links to /contact (NOT revealing private phone/email)
      Hover: bg green-500, white text

  HOVER: translateY(-8px), shadow-lift, photo scale(1.05)
  ENTRANCE: stagger x:0 y:60 opacity 0→1, 0.15s stagger, ScrollTrigger
```

### Faculty Admin (/admin/faculty):
```
LIST: Table with photo thumb | Name | Role | Courses | Active toggle | Actions

ADD/EDIT FORM (/admin/faculty/new, /admin/faculty/[id]):

PHOTO UPLOAD (react-dropzone):
  Drop zone: circular preview (200px circle) when photo selected
  Accepts: JPEG/PNG/WebP, max 5MB
  Upload to: Supabase Storage "faculty/{faculty_id}/photo.jpg"
  Existing: show current photo with "Replace" overlay on hover
  Remove: × button → delete from Storage, set photo_url null

FIELDS:
  Name* | Role* | Specialization
  Email (PRIVATE — show lock icon, tooltip "Not shown to public")
  Phone (PRIVATE — same treatment)
  Bio (textarea, 4 rows)
  Courses Taught: multi-select: [DABS] [DUTC] [PGDAFA] [EMDAT]
  Status (Active / Inactive switch)
  Sort Order (number)

PRIVACY BANNER in form:
  Yellow info box: "🔒 Email and phone are stored securely and NEVER
  displayed on the public website. Only visible to admin."

SAVE / CANCEL / DELETE
```

### Faculty — Supabase + Privacy:
```sql
CREATE TABLE faculty (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialization TEXT,
  email TEXT,           -- PRIVATE
  phone TEXT,           -- PRIVATE
  bio TEXT,
  courses TEXT[],
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Public view: EXCLUDES email and phone
CREATE VIEW public_faculty AS
  SELECT id, name, role, specialization, bio, courses, photo_url,
         is_active, sort_order, created_at
  FROM faculty
  WHERE is_active = true
  ORDER BY sort_order;
```

In `lib/supabase/faculty.ts`:
```typescript
// PUBLIC fetch — uses the VIEW, never exposes email/phone
export async function getPublicFaculty() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("public_faculty").select("*");
  return data;
}

// ADMIN fetch — uses table directly (server-side only, never in client components)
export async function getAllFaculty() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.from("faculty").select("*").order("sort_order");
  return data; // includes email + phone — admin use only
}
```

---

## 📰 NEWS & MEDIA SECTION — "Milestone Moments"

### Concept:
```
A dynamic, editorial media wall where Milestone Fin Academy posts:
- Academic announcements and news
- Student success stories and placement updates
- Campus moments and event photos
- Video testimonials and lecture snippets
- Batch start notifications

DESIGN PHILOSOPHY: VISUALS FIRST — images and videos dominate.
Text is minimal — caption-style. This is a visual feed, not a blog.

Feel: Instagram-meets-editorial magazine. Masonry layout.
      Dark accents, green highlights, premium spacing.
```

### NewsSection — Homepage Teaser (latest 3 posts):
```
Component: <NewsSection />
Background: var(--bg-primary)

Header:
  Label: "MILESTONE MOMENTS"
  Headline: "From Our Academy,<br>to Your Screen."
  Right side: "See All Updates →" link to /news

3-column masonry grid (desktop), 2-col (tablet), 1-col (mobile):
Cards have ORGANIC heights — not uniform.

NEWS CARD — Image Post (most common):
  Container: rounded-2xl, overflow-hidden, relative, cursor-pointer
  
  IMAGE: Next.js Image, object-cover
    Portrait photos: aspect-[4/5]
    Landscape: aspect-[16/9]  
    Admin can control aspect ratio on upload
  
  OVERLAY: absolute inset-0
    Bottom gradient: linear-gradient(to top, rgba(10,26,11,0.92) 0%, transparent 55%)
  
  OVERLAY CONTENT (absolute bottom-0 left-0 right-0, p-5):
    Category chip: bg var(--green-500), JetBrains Mono 10px, white, px-3 py-1, rounded-full, mb-3
      "ANNOUNCEMENT" / "STUDENT WIN" / "PLACEMENT" / "CAMPUS" / "EVENT"
    Title: Syne SemiBold 15px, white, leading-snug, max 2 lines
    Date: JetBrains Mono 11px, white/50%, mt-2

  HOVER:
    Image: scale(1.08) (inside overflow-hidden)
    Overlay: darkens (opacity 0→1 of extra dark layer)
    "Read More →" button: slides up from bottom (GSAP y:20→0, opacity 0→1)
    Card: translateY(-4px), shadow-lift
    Transition: all 0.4s ease

NEWS CARD — Video Post:
  Same as image but:
  Thumbnail image (from YouTube or uploaded)
  Play button overlay (center): 64px circle, white bg/90, green play icon
    Hover: scale(1.1), glow shadow
  Small video duration badge: top-right, dark pill "3:42"
  On click: opens VideoModal (react-player in dark overlay modal)

VideoModal:
  Fixed overlay: bg-[rgba(0,0,0,0.92)] z-50
  Centered: max-w-[900px] 16:9 container
  react-player: width 100%, height 100%
    supports: YouTube URL, Vimeo URL, direct .mp4 URL
  Close: × button top-right (or click outside overlay)
  ESC key closes modal
  GSAP: modal scales 0.9→1, opacity 0→1 on open; reverse on close

ENTRANCE ANIMATIONS:
  Cards: y:60→0, opacity 0→1, stagger 0.1s, ScrollTrigger start "top 80%"
```

### /news Full Page:
```
Header: Full-width dark banner
  "Milestone Moments" Instrument Serif 56px white
  "Stay updated with everything happening at Milestone Fin Academy"

STICKY FILTER BAR (top 72px — below navbar, bg-primary/95 backdrop-blur):
  "All" | "Announcements" | "Student Wins" | "Placements" | "Campus" | "Events" | "Videos"
  Active: green-500 bg, white text
  Click: filter posts (GSAP Flip for smooth card reflow)

SEARCH INPUT (right side of filter bar):
  Lucide Search icon, placeholder "Search updates..."
  Searches titles and excerpts (client-side filter)

MASONRY GRID: CSS columns (3 desktop, 2 tablet, 1 mobile)
  break-inside: avoid on each card

LOAD MORE button (centered, mt-12):
  "Load More Updates ↓"
  Outline, green-500, Syne SemiBold 15px, px-8 py-3, rounded-full
  On click: fetch next 9 from Supabase (offset pagination)
  New cards: GSAP stagger entrance

Individual Post /news/[slug]:
  Full-width header image (h-[420px], object-cover)
  Dark gradient overlay with title, date, category badge
  Body: max-w-[720px] mx-auto, Syne 17px text-secondary, leading-relaxed
  Image gallery (if multiple images): horizontal scroll strip or lightbox grid
  Video embed (if video post): full-width 16:9 react-player
  Related posts row (3 cards below)
  Back button: "← All Updates" link
```

### News — Supabase Table:
```sql
CREATE TABLE news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  type TEXT DEFAULT 'image',           -- 'image' | 'video' | 'text'
  category TEXT DEFAULT 'announcement',
    -- 'announcement' | 'student_win' | 'placement' | 'campus' | 'event' | 'video'
  cover_image_url TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  video_type TEXT,                     -- 'youtube' | 'vimeo' | 'upload'
  video_thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_news_pub ON news_posts(is_published, published_at DESC);
CREATE INDEX idx_news_cat ON news_posts(category);
```

### News Admin (/admin/news):
```
LIST VIEW (table):
  Thumbnail (60px) | Title | Type icon (📷/🎥/📝) | Category | Status | Date | Actions
  Featured posts: ★ star indicator in row
  Filter tabs: All | Published | Drafts | Featured

ADD/EDIT POST FORM — 3-Step Flow:

STEP 1 — POST TYPE (big visual card selector):
  📷 "Image Post" | 🎥 "Video Post" | 📝 "Text + Image"
  Active card: border-2 green-500, bg-green-50, checkmark
  Large icons (64px), title, short description

STEP 2 — MEDIA UPLOAD:

  IF IMAGE TYPE:
    Cover Image (required):
      react-dropzone zone (full-width, 280px height, dashed border)
      Drag here or click → file picker
      Accepts: JPEG/PNG/WebP, max 10MB
      Preview: full-width after upload with aspect-ratio maintain
      Upload to Supabase: "news/{post_id}/cover.{ext}"
      Public URL saved to cover_image_url
    
    Gallery Images (optional, max 8):
      Smaller dropzone: "Add more images (up to 8)"
      Horizontal thumbnail strip: 100px × 80px each
      Drag to reorder (or manual reorder arrows)
      Each: × to remove
      Upload to: "news/{post_id}/gallery/{n}.{ext}"

  IF VIDEO TYPE:
    Tab switcher: "YouTube/Vimeo URL" | "Upload Video"
    
    URL Tab:
      Input: paste YouTube or Vimeo URL
      Preview: auto-generates embed preview (16:9)
      Auto-thumbnail: fetch YouTube thumbnail via oembed API
      
    Upload Tab:
      react-dropzone: accepts .mp4 .webm, max 200MB
      Upload progress bar (determinate)
      Upload to: "news/{post_id}/video.mp4"
      Custom Thumbnail: separate small dropzone below
    
    Thumbnail Upload (for both tabs):
      "Set custom thumbnail" small dropzone
      Preview: 16:9 ratio preview

  IF TEXT TYPE:
    Cover Image: optional, same dropzone as IMAGE type

STEP 3 — CONTENT:
  Title* (large text input, 48px text, "Your post title...")
  Slug (auto from title, JetBrains Mono, editable)
  Excerpt (textarea, max 160 chars, char counter)
  Category* (select dropdown with icons)
  Content Body: react-quill rich text editor
    Full-width, min-height 300px
    Toolbar: H1, H2, H3 | Bold, Italic | Bullet, Numbered | Link | Image | Quote | HR
    Styled to match site design

PUBLISHING PANEL (right sidebar, sticky):
  Status: Draft / Published (large toggle)
  Featured: toggle (pin to top)
  Publish Date: date + time picker (for scheduling)
  Preview: "Preview Post ↗" (new tab, even draft)
  Save button: "Save Post" (large green)
  Delete button (only on existing posts): red outline, AlertDialog confirm

MEDIA MANAGEMENT:
  /admin/media page: grid of all uploaded files
  Each file: thumbnail, filename, size, upload date, × to delete
  Storage usage bar: "Using X MB of Y GB"
```

---

## 🗄 COMPLETE SUPABASE SCHEMA

```sql
-- COURSES
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  level INTEGER,
  level_label TEXT,
  diploma_code TEXT,
  title TEXT NOT NULL,
  short_title TEXT,
  tagline TEXT,
  description TEXT,
  badge TEXT,
  badge_color TEXT DEFAULT 'green',
  duration TEXT,
  price INTEGER,
  original_price INTEGER,
  emi TEXT,
  skill_level TEXT,
  category TEXT,
  icon TEXT,
  gradient TEXT,
  rating DECIMAL(2,1) DEFAULT 4.8,
  review_count INTEGER DEFAULT 0,
  enrolled_count INTEGER DEFAULT 0,
  image_url TEXT,
  gallery_images TEXT[],
  topics TEXT[],
  highlights TEXT[],
  who_is_it_for TEXT,
  modules JSONB,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FACULTY
CREATE TABLE faculty (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  specialization TEXT,
  email TEXT,
  phone TEXT,
  bio TEXT,
  courses TEXT[],
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE VIEW public_faculty AS
  SELECT id, name, role, specialization, bio, courses, photo_url, is_active, sort_order
  FROM faculty WHERE is_active = true ORDER BY sort_order;

-- NEWS POSTS
CREATE TABLE news_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  type TEXT DEFAULT 'image',
  category TEXT DEFAULT 'announcement',
  cover_image_url TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  video_type TEXT,
  video_thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TESTIMONIALS
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  course_diploma_code TEXT,
  review_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  display_location TEXT DEFAULT 'top-banner',
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENROLLMENTS
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  course_diploma_code TEXT,
  course_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE CONTENT
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📄 PAGE ARCHITECTURE

```
/ (Home) — Section order:
  LoadingScreen → Navbar → NotificationBanner → HeroSection (SPLINE)
  → MarqueeBand → StatsSection → CoursesSection (timeline)
  → FacultySection → TradingSection → NewsSection (teaser)
  → TestimonialsSection → PlacementSection → CtaSection → Footer

/courses          Full 4-diploma grid with filters
/courses/[slug]   Course detail: banner image, curriculum, faculty, enroll sidebar
/trading          Trading courses page
/news             Masonry news grid (filterable, load-more)
/news/[slug]      Full news post
/about            Academy story, stats, timeline
/contact          Contact form + map + info

/admin/login
/admin            Dashboard (charts, stats, activity)
/admin/courses    Courses CMS + image upload
/admin/faculty    Faculty CMS + photo upload (PRIVATE contact fields)
/admin/news       News & Media CMS + media upload
/admin/testimonials
/admin/notifications
/admin/enrollments
/admin/trading-courses
/admin/about
/admin/contact-info
/admin/media      All uploaded files library
```

---

## 📁 FILE STRUCTURE

```
milestone-academy/
├── CLAUDE.md
├── .env.local
├── middleware.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── courses/page.tsx
│   ├── courses/[slug]/page.tsx
│   ├── trading/page.tsx
│   ├── news/page.tsx
│   ├── news/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── api/contact/route.ts
│   ├── api/upload/route.ts
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx (Dashboard)
│       ├── login/page.tsx
│       ├── courses/page.tsx
│       ├── courses/new/page.tsx
│       ├── courses/[id]/page.tsx
│       ├── faculty/page.tsx
│       ├── faculty/new/page.tsx
│       ├── faculty/[id]/page.tsx
│       ├── news/page.tsx
│       ├── news/new/page.tsx
│       ├── news/[id]/page.tsx
│       ├── testimonials/page.tsx
│       ├── notifications/page.tsx
│       ├── enrollments/page.tsx
│       ├── trading-courses/page.tsx
│       ├── about/page.tsx
│       ├── contact-info/page.tsx
│       └── media/page.tsx
├── components/
│   ├── global/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── PageTransition.tsx
│   │   └── NotificationBanner.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx         (Spline version)
│   │   ├── HeroFallback.tsx        (CSS-only fallback)
│   │   ├── MarqueeBand.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CoursesSection.tsx      (timeline layout)
│   │   ├── FacultySection.tsx
│   │   ├── TradingSection.tsx
│   │   ├── NewsSection.tsx         (homepage teaser)
│   │   ├── TestimonialsSection.tsx
│   │   ├── PlacementSection.tsx
│   │   └── CtaSection.tsx
│   ├── news/
│   │   ├── NewsCard.tsx            (image/video/text variants)
│   │   ├── NewsGrid.tsx            (masonry layout)
│   │   ├── VideoModal.tsx          (react-player lightbox)
│   │   └── NewsFilters.tsx
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopBar.tsx
│   │   ├── ImageUploader.tsx       (react-dropzone, reusable)
│   │   ├── VideoUploader.tsx
│   │   ├── CourseForm.tsx
│   │   ├── FacultyForm.tsx
│   │   ├── NewsPostForm.tsx
│   │   ├── RichTextEditor.tsx      (react-quill wrapper)
│   │   ├── DataTable.tsx
│   │   └── StatsCard.tsx
│   └── ui/
│       ├── CourseCard.tsx          (horizontal timeline card)
│       ├── LevelBadge.tsx          (Level 1/2/3/4)
│       ├── FacultyCard.tsx
│       ├── StatCard.tsx
│       ├── TestimonialCard.tsx
│       └── Button.tsx
├── lib/
│   ├── courses.ts                  (4 diploma programs data)
│   ├── faculty.ts                  (3 faculty seed data)
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── courses.ts
│   │   ├── faculty.ts              (public view only — no phone/email)
│   │   ├── news.ts
│   │   ├── testimonials.ts
│   │   ├── notifications.ts
│   │   ├── enrollments.ts
│   │   └── content.ts
│   ├── storage.ts                  (Supabase Storage upload/getUrl/delete)
│   └── resend.ts
├── providers/LenisProvider.tsx
├── hooks/
│   ├── useGsapAnimations.ts
│   └── useScrollProgress.ts
├── styles/globals.css
├── public/logos/
│   ├── milestone-logo-dark.png
│   └── milestone-logo-light.png
└── tailwind.config.ts
```

---

## ✅ CODING RULES

```
1. TypeScript strict — no any types, ever
2. Faculty phone/email: NEVER in public API routes or client components
3. Public faculty: use public_faculty VIEW only in public-facing pages
4. Admin: all /admin/* routes protected via middleware.ts
5. All images: Next.js <Image> with sizes prop, lazy loading
6. File uploads: validate type + size BEFORE upload
7. Supabase Storage: public bucket for media, use getPublicUrl()
8. react-dropzone: show progress bar + error state + success preview
9. Video URLs: sanitize YouTube/Vimeo before storing
10. GSAP: register all plugins in lib/gsap.ts — import from there
11. Lenis: disabled on mobile (ontouchstart check)
12. CustomCursor: hidden on touch devices (pointer: coarse)
13. Spline: wrapped in Suspense + ErrorBoundary (can fail)
14. react-player: wrapped in ErrorBoundary
15. All async sections: show skeleton while loading
16. Components: max 200 lines — split if larger
17. Animations: GSAP only (no Framer Motion for page-level animations)
```

---

## 🔧 ENVIRONMENT VARIABLES

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=admin@milestone.academy
NEXT_PUBLIC_SITE_URL=https://milestone-academy.vercel.app
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/REPLACE_WITH_REAL/scene.splinecode
```
