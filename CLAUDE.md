# MILESTONE ACADEMY — MASTER CLAUDE.md
## Awwwards-Winning Website — Full Project Memory
## Last Updated: Always read this before every session.

---

## 🎯 PROJECT OVERVIEW

- **Brand:** Milestone Academy
- **Brand Story:** Milestone started as a premier trading academy. Now expanded to include professional accounting & finance courses under the same brand. NOT a sister brand — ONE unified academy.
- **Website Goal:** A jaw-dropping, Awwwards-winning, WOW-level website for accounting courses, with trading courses also highlighted as part of the same academy.
- **Live Reference:** https://milestone-trading-academy.vercel.app/
- **Stack Status:** [Update this as you build — e.g., "Hero done, Stats in progress"]

---

## 🏗 BUILD STATUS TRACKER

```
- [ ] Phase 1: Foundation (packages, globals, Lenis, data)
- [ ] Phase 2: Global Shell (LoadingScreen, Cursor, Navbar, Footer)
- [ ] Phase 3: Hero + Marquee + Stats
- [ ] Phase 4: Courses + WhyUs + Curriculum
- [ ] Phase 5: Testimonials + Placement + CTA + Trading Section
- [ ] Phase 6: Pages (/courses, /about, /contact, /course/[slug])
- [ ] Phase 7: Admin Panel (Full CMS)
- [ ] Phase 8: Polish, Responsive, SEO, Deploy
```

---

## 🛠 TECH STACK — USE EXACTLY THESE

```
Framework:        Next.js 14+ (App Router, TypeScript strict mode)
Styling:          Tailwind CSS v3 + CSS custom properties in globals.css
Animations:       GSAP 3 (ScrollTrigger, SplitText, Flip, DrawSVG)
Smooth Scroll:    Lenis (@studio-freight/lenis) — connect to GSAP RAF
3D Elements:      @splinetool/react-spline — Spline scenes in hero
Components:       shadcn/ui (radix-ui primitives)
Icons:            Lucide React + React Icons
Fonts:            Instrument Serif (Google) + Syne (Google) + JetBrains Mono (Google)
State:            Zustand (nav, modal, admin UI state)
Forms:            React Hook Form + Zod
Backend/DB:       Supabase (PostgreSQL + Auth + Storage + Realtime)
Admin Auth:       Supabase Auth with RLS (Row Level Security)
ORM:              Supabase JS client (no extra ORM needed)
Image Storage:    Supabase Storage for logo, course images, avatars
Email:            Resend (for enrollment inquiry notifications)
```

### Install Command:
```bash
npm install gsap @studio-freight/lenis @splinetool/react-spline \
  framer-motion lucide-react react-icons zustand react-hook-form zod \
  @hookform/resolvers clsx tailwind-merge class-variance-authority \
  @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs \
  @radix-ui/react-tooltip @radix-ui/react-select @radix-ui/react-switch \
  @radix-ui/react-alert-dialog @radix-ui/react-dropdown-menu \
  split-type next-themes @supabase/supabase-js @supabase/auth-helpers-nextjs \
  resend react-hot-toast react-quill date-fns recharts
```

---

## 🎨 DESIGN SYSTEM

### Color Palette — CSS Variables in globals.css:
```css
:root {
  /* === BACKGROUNDS === */
  --bg-primary:    #F7F9F4;   /* Off-white with green tint — main page bg */
  --bg-secondary:  #EDEFEA;   /* Subtle sage — alternate sections */
  --bg-card:       #FFFFFF;   /* Pure white cards */
  --bg-dark:       #0A1A0B;   /* Deep forest dark — dark sections */
  --bg-dark-card:  #132015;   /* Dark card bg */
  --bg-dark-glass: rgba(255,255,255,0.05); /* Glassmorphic on dark */

  /* === GREEN SPECTRUM === */
  --green-50:   #F0F7F0;
  --green-100:  #D4EDD4;
  --green-200:  #A8D8A8;
  --green-300:  #6DBF6D;
  --green-400:  #3DA83D;
  --green-500:  #2D9E44;   /* Primary brand green — matches logo */
  --green-600:  #237A35;   /* Deeper action green */
  --green-700:  #1A5C28;
  --green-800:  #124019;
  --green-900:  #0A2810;

  /* === ACCENT === */
  --accent-gold:  #D4AF37;  /* Premium gold for badges */
  --accent-mint:  #A8F5C2;  /* Soft mint for marquee/data text */
  --accent-neon:  #39FF14;  /* Neon green — use on counters/stats sparingly */

  /* === TYPOGRAPHY === */
  --text-primary:   #0A1A0B;  /* Near-black with green soul */
  --text-secondary: #3A5C3C;  /* Muted forest green */
  --text-muted:     #7A9B7C;  /* Soft sage text */
  --text-inverse:   #F7F9F4;  /* Light text on dark bg */

  /* === BORDERS === */
  --border-light:  #D4E8D4;
  --border-medium: #A8C8A8;

  /* === SHADOWS === */
  --shadow-green: 0 4px 40px rgba(45, 158, 68, 0.15);
  --shadow-card:  0 2px 20px rgba(10, 26, 11, 0.08);
  --shadow-lift:  0 20px 60px rgba(10, 26, 11, 0.18);

  /* === GRADIENTS === */
  --gradient-hero:  linear-gradient(135deg, #F7F9F4 0%, #E8F5E9 50%, #F0FFF4 100%);
  --gradient-green: linear-gradient(135deg, #2D9E44 0%, #237A35 100%);
  --gradient-dark:  linear-gradient(180deg, #0A1A0B 0%, #132015 100%);
  --gradient-glow:  radial-gradient(ellipse at center, rgba(45,158,68,0.15) 0%, transparent 70%);

  /* === SPACING === */
  --section-pad: 120px 0;
  --container:   1280px;

  /* === BORDER RADIUS === */
  --r-sm:   8px;
  --r-md:   16px;
  --r-lg:   24px;
  --r-xl:   40px;
  --r-pill: 100px;
}
```

### Typography:
```
Display/Headline:  "Instrument Serif" — editorial serif for hero, section heads
Body/UI:           "Syne" — modern geometric sans for nav, body, labels
Mono/Numbers:      "JetBrains Mono" — for stats, prices, code-style accents

Scale:
  Hero headline:    96px / Instrument Serif / weight 400 (italic for accent word)
  Section headline: 64px / Instrument Serif
  Sub-headline:     40px / Syne Bold
  Body large:       20px / Syne Regular
  Body:             16px / Syne Regular
  Label:            12px / JetBrains Mono / letter-spacing 0.15em / UPPERCASE
  Stat number:      72px / JetBrains Mono Bold
  Price:            28px / JetBrains Mono SemiBold
```

---

## 🖼 LOGO USAGE — RULES FOR THE AGENT

Two logo files are available in `/public/logos/`:
- `milestone-logo-dark.png` — White wordmark on dark background
- `milestone-logo-light.png` — Black wordmark on white/light background

The logo has:
- Square icon with green bar chart (candlestick-style bars — 2 green vertical bars)
- "Milestone" wordmark — bold sans-serif
- The "il" in "Milestone" uses the two green bars as the letters

### Agent Logo Selection Rules:
```
Dark section (bg-dark, bg-dark-card):     → use milestone-logo-dark.png  (white version)
Light section (bg-primary, bg-card):      → use milestone-logo-light.png (dark version)
Navbar (transparent → scrolled frosted):  → use milestone-logo-light.png (dark text shows on light)
Footer:                                   → use milestone-logo-dark.png  (white version)
Loading screen:                           → use milestone-logo-dark.png  (on dark bg)
OG image / meta:                          → use milestone-logo-light.png
```

### Logo Implementation in Next.js:
```tsx
// components/global/Logo.tsx
import Image from "next/image";
type LogoVariant = "dark" | "light";

export function Logo({ variant = "light", width = 180, className = "" }: {
  variant?: LogoVariant; width?: number; className?: string;
}) {
  return (
    <Image
      src={variant === "dark" ? "/logos/milestone-logo-dark.png" : "/logos/milestone-logo-light.png"}
      alt="Milestone Academy"
      width={width}
      height={Math.round(width * 0.22)}
      className={className}
      priority
    />
  );
}
```

---

## 🎲 3D HERO ANIMATION — SPLINE SPECIFICATION

### What to Build (reference: uploaded screenshot shows dark 3D scene with hexagonal/cube shapes):

The hero's right-side 3D element must be an **abstract 3D accounting-themed scene**. Options for Spline scene (Claude Code should implement whichever is achievable with @splinetool/react-spline):

**Option A — Preferred: Floating 3D Financial Dashboard**
- Dark background scene (#0A1A0B)
- Central element: A smooth 3D geometric shape (hexagonal prism or rounded cube, dark charcoal color, metallic surface material)
- Floating around it: 3 small glowing green bar chart icons, animated orbit paths
- Green laser-thin lines connecting the shapes (like the screenshot's colored lines)
- Subtle particle system: tiny glowing dots floating upward
- Lighting: Green rim light from below-left, subtle white fill from top

**Option B — Fallback CSS/Three.js implementation** (if Spline unavailable):
```tsx
// Build a Three.js scene with:
// - Rotating dark hexagonal prism (Three.js CylinderGeometry, 6 sides)
// - Green wireframe overlay pulsing opacity 0.3 → 0.8
// - 3 orbiting small spheres on elliptical paths (green-400, emissive)
// - Floating green particles (200 points, random positions, slow drift up)
// - Thin colored laser lines (LineSegments) — green, with one blue and one red accent
// - Point light: green (#2D9E44) from left, ambient white low intensity
// - Responsive: resize handler, devicePixelRatio support
// - Render loop with requestAnimationFrame
```

**Floating Badge Cards** (overlaid on top of the 3D scene, absolute positioned):
```
Card 1 (top-right of 3D area):
  Icon: bar chart (Lucide BarChart3, 20px, green-500)
  Text: "GST Certification"
  Style: bg white/90, backdrop-blur 12px, border 1px border-light, 
         border-radius 12px, padding 12px 20px, box-shadow shadow-card
  Animation: float up-down 3s ease-in-out infinite

Card 2 (bottom-left of 3D area):
  Icon: trophy (Lucide Trophy, 20px, --accent-gold)
  Text: "Tally Expert Program"
  Style: same glassmorphic style
  Animation: float delayed 1.5s

Card 3 (center-left, smaller):
  Icon: check-circle (Lucide CheckCircle, 16px, green-500)
  Text: "Industry Recognized"
  Style: slightly smaller
  Animation: float delayed 0.8s
```

---

## 📦 COURSES — FROM CURRICULUM PDF (ONLY THESE 4 PACKAGES)

### ⚠️ IMPORTANT: Use ONLY these 4 packages. No invented courses.

```typescript
// lib/courses.ts

export const COURSES = [
  {
    id: "basic-package",
    slug: "basic-package",
    title: "Basic Package",
    tagline: "Your first step into professional accounting",
    badge: "STARTER",
    badgeColor: "green",
    duration: "3 Months",
    price: 30000,
    originalPrice: 38000,
    emi: "₹10,000/month",
    level: "Beginner",
    category: "accounting",
    icon: "BookOpen",
    gradient: "linear-gradient(135deg, #2D9E44, #4ADE80)",
    rating: 4.8,
    reviews: 142,
    enrolled: 1240,
    topics: [
      "Manual Accounting",
      "Tally Prime",
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Trading Fundamentals"
    ],
    highlights: [
      "Hands-on Tally Prime practice",
      "Real-world accounting entries",
      "MS Office for finance professionals",
      "Introduction to trading concepts",
      "Course completion certificate"
    ],
    description: "Build your accounting foundation from scratch. Master manual bookkeeping, Tally Prime, MS Office tools, and get an introduction to trading — everything a fresh accounting professional needs.",
    whoIsItFor: "Freshers, students, and career-changers entering the accounting profession",
    modules: [
      { title: "Manual Accounting Fundamentals", topics: ["Accounting concepts", "Double-entry system", "Trial balance", "Journal & ledger", "Financial statements"] },
      { title: "Tally Prime Mastery", topics: ["Company setup", "Voucher entries", "Bank reconciliation", "Inventory basics", "Reports & MIS"] },
      { title: "MS Office for Finance", topics: ["Excel formulas for accounts", "Word for business letters", "PowerPoint presentations"] },
      { title: "Trading Introduction", topics: ["Stock market basics", "Reading charts", "Trading terminology"] }
    ]
  },
  {
    id: "short-term-tax",
    slug: "short-term-tax-software-package",
    title: "Short-Term Tax & Software Package",
    tagline: "Master UAE & Indian taxation fast",
    badge: "FAST-TRACK",
    badgeColor: "gold",
    duration: "2 Months",
    price: 37000,
    originalPrice: 46000,
    emi: "₹18,500/month",
    level: "Intermediate",
    category: "taxation",
    icon: "FileText",
    gradient: "linear-gradient(135deg, #1A5C28, #2D9E44)",
    rating: 4.9,
    reviews: 98,
    enrolled: 876,
    topics: [
      "Manual Accounting",
      "Tally Prime",
      "Zoho Books",
      "UAE VAT & VAT Filing",
      "UAE Corporate Tax & Filing",
      "Trading"
    ],
    highlights: [
      "UAE VAT filing on FTA portal",
      "UAE Corporate Tax compliance",
      "Zoho Books cloud accounting",
      "Dual India & UAE expertise",
      "High-demand Gulf job skills"
    ],
    description: "Designed for professionals targeting Gulf/UAE markets. Master UAE VAT, Corporate Tax filing, Zoho Books, and Tally — become the go-to accounting expert for Indian businesses operating in the UAE.",
    whoIsItFor: "Accounting professionals targeting UAE/Gulf job market, expats, and finance teams of India-UAE businesses",
    modules: [
      { title: "Manual Accounting", topics: ["Fundamentals refresher", "UAE business accounting standards"] },
      { title: "Tally Prime for UAE", topics: ["UAE company setup", "Multi-currency entries", "VAT-enabled vouchers"] },
      { title: "Zoho Books", topics: ["Cloud accounting setup", "Invoicing & payments", "Bank feeds", "Reports"] },
      { title: "UAE VAT", topics: ["VAT registration", "Tax invoice requirements", "VAT return filing on FTA portal", "Input tax credit"] },
      { title: "UAE Corporate Tax", topics: ["CT registration", "Taxable income computation", "CT return filing", "Free zone exemptions"] },
      { title: "Trading", topics: ["UAE market overview", "Trading concepts"] }
    ]
  },
  {
    id: "intermediate-package",
    slug: "intermediate-package",
    title: "Intermediate Package",
    tagline: "Complete accounting + GST + analytics mastery",
    badge: "BESTSELLER",
    badgeColor: "green",
    duration: "5 Months",
    price: 45000,
    originalPrice: 58000,
    emi: "₹9,000/month",
    level: "Intermediate → Advanced",
    category: "accounting",
    icon: "TrendingUp",
    gradient: "linear-gradient(135deg, #0A2810, #2D9E44)",
    rating: 4.9,
    reviews: 215,
    enrolled: 1820,
    topics: [
      "Manual Accounting",
      "Tally Prime",
      "GST & Filing",
      "Microsoft Word",
      "Microsoft Excel (Advanced)",
      "Microsoft PowerPoint",
      "Zoho Books",
      "Power BI",
      "Trading"
    ],
    highlights: [
      "Live GST return filing (GSTR-1, GSTR-3B)",
      "Power BI dashboards for finance",
      "Advanced Excel (pivot tables, VLOOKUP, macros)",
      "Zoho Books + Tally dual expertise",
      "Most comprehensive package",
      "Placement assistance included"
    ],
    description: "The most comprehensive accounting program at Milestone. From manual bookkeeping to GST filing, from Tally to Zoho, from Excel to Power BI dashboards — graduate as a complete, job-ready finance professional.",
    whoIsItFor: "Professionals seeking complete accounting mastery, those targeting corporate finance roles, and anyone wanting a thorough skillset",
    modules: [
      { title: "Manual Accounting", topics: ["Complete accounting cycle", "Financial statements", "Ratio analysis"] },
      { title: "Tally Prime (Advanced)", topics: ["Advanced inventory", "Payroll", "TDS in Tally", "Multi-branch", "GST in Tally"] },
      { title: "GST Mastery", topics: ["GST registration", "HSN/SAC codes", "GSTR-1 filing", "GSTR-3B filing", "ITC reconciliation", "Annual return"] },
      { title: "MS Office Advanced", topics: ["Excel: VLOOKUP, HLOOKUP, pivot tables, macros, conditional formatting", "Word & PowerPoint for finance"] },
      { title: "Zoho Books", topics: ["Complete cloud accounting", "Automation workflows", "Financial reports"] },
      { title: "Power BI", topics: ["Data import & modeling", "DAX formulas", "Finance dashboards", "Interactive reports"] },
      { title: "Trading", topics: ["Technical analysis basics", "Chart reading", "Risk management"] }
    ]
  },
  {
    id: "comprehensive-package",
    slug: "comprehensive-package",
    title: "Comprehensive Package",
    tagline: "The ultimate accounting & finance mastery program",
    badge: "ULTIMATE",
    badgeColor: "gold",
    duration: "7 Months",
    price: null, // Price not listed — "Contact for pricing"
    originalPrice: null,
    emi: null,
    level: "All Levels → Expert",
    category: "advanced",
    icon: "Award",
    gradient: "linear-gradient(135deg, #0A1A0B, #1A5C28)",
    rating: 5.0,
    reviews: 67,
    enrolled: 520,
    topics: [
      "Manual Accounting",
      "Tally Prime",
      "GST & Filing",
      "UAE VAT & Filing",
      "UAE Corporate Tax & Filing",
      "Microsoft Excel (Advanced)",
      "Power BI",
      "Microsoft PowerPoint",
      "Zoho Books",
      "QuickBooks (QB)",
      "Microsoft Word",
      "Trading"
    ],
    highlights: [
      "Everything in all other packages",
      "UAE + India dual taxation expertise",
      "QuickBooks + Zoho + Tally triple proficiency",
      "Power BI advanced dashboards",
      "Maximum career opportunities",
      "Priority placement assistance",
      "Dedicated mentor support"
    ],
    description: "The pinnacle of accounting education. Master every tool, every tax system, every software used in modern finance — across India and UAE. This is the program for those who want to be the best.",
    whoIsItFor: "Ambitious professionals aiming for senior finance roles, those targeting India + UAE markets, aspiring CFOs and finance managers",
    modules: [
      { title: "Complete Manual Accounting", topics: ["Advanced bookkeeping", "IFRS & IndAS basics", "Audit trail"] },
      { title: "Tally Prime Expert", topics: ["All Tally features", "Customization", "Advanced reporting"] },
      { title: "Indian GST Complete", topics: ["All GSTR forms", "E-invoicing", "E-way bill", "GST audit"] },
      { title: "UAE Taxation Complete", topics: ["VAT registration to filing", "Corporate tax end-to-end", "FTA portal mastery"] },
      { title: "Advanced Excel + Power BI", topics: ["Financial modeling", "Power Query", "Advanced DAX", "Executive dashboards"] },
      { title: "Triple Software: Zoho + QB + Tally", topics: ["Zoho Books advanced", "QuickBooks Desktop & Online", "Cross-platform workflow"] },
      { title: "MS Office Complete", topics: ["Excel, Word, PowerPoint for finance professionals"] },
      { title: "Trading Complete", topics: ["Full trading course", "Portfolio management", "Investment analysis"] }
    ]
  }
];
```

---

## 🏦 TRADING SECTION — HOW TO PRESENT IT

### ⚠️ KEY BRAND TRUTH:
Milestone Academy is ONE brand. It started as a trading academy. It now also offers accounting courses. Trading courses are still very much available. This is an expansion, not a separate entity.

### Trading Highlight Section on Homepage:
```
Component: <TradingSection />
Position: After Courses Section, before Why Us

Design: Dark background (var(--bg-dark))
Layout: 2-column (left: content, right: visual)

Left Content:
  [LABEL] "ALSO AT MILESTONE" (JetBrains Mono, mint green)
  [HEADLINE] "Where It All
  Began — Trading." (Instrument Serif 52px, text-inverse)
  [BODY] (Syne 18px, text-inverse/70%)
  "Milestone began as a trading academy and has trained 
  10,000+ traders across India. Our trading programs — 
  stock market, technical analysis, options, and investment 
  strategies — continue to run alongside our accounting courses.
  One academy. Complete financial education."
  
  [PILL TAGS] (flex wrap, gap 12px)
  🚀 Stock Market  |  📊 Technical Analysis  |  💰 Options Trading
  📈 Fundamental Analysis  |  💼 Portfolio Management  |  ₿ Cryptocurrency
  
  [CTA] "Explore Trading Programs →" 
  (outline button, border green-400, text green-300, hover bg green-500)
  Links to: /trading — a dedicated page with trading course details

Right Content:
  Trading stats cards (dark glassmorphic):
  Card 1: "10,000+" | "Traders Trained"
  Card 2: "8+" | "Trading Programs"  
  Card 3: "Since 2019" | "Milestone's Legacy"
  
  + A subtle animated trading chart line (SVG path, green stroke, 
    draws itself on scroll using GSAP DrawSVG)
```

### /trading Page:
```
Full page dedicated to trading courses.
Navbar, Hero banner ("Master the Markets"), 
8 trading course cards (with price on request / contact for details),
Trading testimonials section,
CTA to contact/enroll,
Footer.

Trading courses to show (make these up with reasonable details):
1. Stock Market Foundation
2. Technical Analysis Pro
3. Options & Derivatives
4. Fundamental Analysis
5. Intraday & Swing Trading
6. Cryptocurrency & Blockchain
7. Forex & Commodity Trading
8. Investment Portfolio Management
```

---

## 🔐 ADMIN PANEL — COMPLETE CMS

### Overview:
A fully functional admin dashboard at `/admin` (protected by Supabase Auth).
Only admin users can access it. All data (courses, testimonials, leads, notifications) is stored in Supabase.

### Admin Authentication:
```
URL: /admin/login
Method: Supabase Auth (email + password)
Middleware: middleware.ts → protect all /admin/* routes
Admin email: set as environment variable ADMIN_EMAIL
On login: redirect to /admin/dashboard
On logout: redirect to /admin/login
Session: Supabase session (cookie-based via @supabase/auth-helpers-nextjs)
```

### Admin Dashboard Layout:
```
Component: AdminLayout (wraps all /admin/* pages)

Sidebar (fixed left, 260px width, bg var(--bg-dark), border-right 1px rgba(255,255,255,0.08)):
  Top: Milestone logo (dark version) + "Admin Panel" label
  
  Navigation sections:
  ── MAIN
     📊 Dashboard          → /admin
     
  ── CONTENT
     📚 Courses            → /admin/courses
     💬 Testimonials       → /admin/testimonials
     🔔 Notifications      → /admin/notifications
     
  ── LEADS & INQUIRIES
     📬 Enrollments        → /admin/enrollments
     
  ── ACADEMY INFO
     ℹ️ About Content      → /admin/about
     📞 Contact Info       → /admin/contact-info
     🎓 Faculty            → /admin/faculty
     
  ── TRADING
     📈 Trading Courses    → /admin/trading-courses
  
  Bottom: User email + Logout button

Top Bar (header, fixed, height 64px):
  Left: Page title + breadcrumb
  Right: Notifications bell (count badge) + Admin avatar
  
Main content area: scroll, padding 32px
```

### Dashboard Page (/admin):
```
Stats row (4 cards):
  Total Enrollments | Active Courses | Pending Inquiries | Total Reviews

Quick charts (recharts):
  Line chart: Enrollments over last 30 days
  Bar chart: Course popularity (enrollments per course)

Recent activity feed:
  Latest 10 enrollment inquiries (name, course, time)
  
Quick action buttons:
  "+ Add Course" | "+ Add Testimonial" | "View Inquiries"
```

### Courses Management (/admin/courses):
```
List view: Table of all 4 courses + any added ones
Columns: Title | Badge | Duration | Price | Status (Published/Draft) | Actions

Actions per course:
  ✏️ Edit → opens edit form
  👁 Preview → opens /courses/[slug] in new tab
  📌 Toggle Published/Draft
  🗑 Delete (with confirmation dialog)

Add/Edit Course Form (full-page form or slide-in drawer):
  Fields:
  - Title (text input)
  - Slug (auto-generated from title, editable)
  - Tagline (text input, 1 line)
  - Description (rich text editor — react-quill)
  - Badge text (text) + Badge color (select: green/gold/blue/red)
  - Duration (text: "3 Months", "7 Months", etc.)
  - Price (number — 0 for "contact for pricing")
  - Original Price (number — for strikethrough)
  - Level (select: Beginner / Intermediate / Advanced / All Levels)
  - Category (select: accounting / taxation / advanced / trading)
  - Rating (number 0-5)
  - Topics (tag input — add/remove topics)
  - Highlights (textarea — one per line)
  - Who Is It For (text)
  - Status (toggle: Published / Draft)
  - Sort Order (number — controls display order)
  
  Modules editor (add/remove/reorder modules):
    Module title + Topics list (add/remove topics per module)
  
  Save button → saves to Supabase courses table
  Cancel → back to list
```

### Testimonials Management (/admin/testimonials):
```
Table: Name | Role | Company | Course | Rating | Status | Actions

Add/Edit Testimonial Form:
  - Student Name
  - Role (text: "GST Executive")
  - Company (text: "Deloitte Kerala")
  - Course (select from courses list)
  - Review Text (textarea)
  - Rating (star selector 1-5)
  - Avatar (image upload to Supabase Storage, or initial color fallback)
  - Status (Published / Hidden)
  - Featured (toggle — featured testimonials appear in homepage)

Display: shows avatar, full review text, rating, dates
```

### Notifications Management (/admin/notifications):
```
Purpose: Create banner/popup notifications shown to website visitors
  (e.g., "New batch starting May 5th!" / "Limited seats for Comprehensive Package!")

Table: Message | Type | Status | Start Date | End Date | Actions

Add Notification Form:
  - Message (text input, 120 chars max)
  - Type (select: info / success / warning / promo)
  - Display Location (select: Top Banner / Hero Popup / All Pages)
  - Start Date (date picker)
  - End Date (date picker — auto-expires)
  - CTA Button Text (optional — e.g., "Enroll Now")
  - CTA Link (optional URL)
  - Status (Active / Inactive)

Website display: 
  Active notifications appear as a dismissable top banner 
  (JetBrains Mono 13px, green-500 bg, white text, "×" dismiss button)
  Stored in localStorage so dismissed notification doesn't reappear same session
```

### Enrollments / Inquiries (/admin/enrollments):
```
All contact form submissions and enrollment inquiries from the website.

Table: Name | Phone | Email | Course | Date | Status | Actions

Status options: New → Contacted → Enrolled → Not Interested

Actions:
  - Mark as Contacted
  - Change Status (dropdown)
  - View Full Details (modal with complete form data)
  - Delete

Filters: By course | By status | By date range

Export: Download as CSV button

Auto-send email notification to admin@milestone.academy on new inquiry (via Resend)
```

### About Content (/admin/about):
```
Editable sections for the /about page:
  - Hero headline & subtext (text inputs)
  - Story paragraphs (rich text editor)
  - Stats (editable key-value pairs: label + value)
  - Vision/Mission statements
  - Faculty list (name, title, credentials, photo upload)
  - Certifications/Awards (add/remove items)
  
Save → updates Supabase "content" table → /about page fetches fresh data
```

### Contact Info (/admin/contact-info):
```
Editable contact details shown in footer and contact page:
  - Phone number(s) (add multiple)
  - Email address(es)
  - Physical addresses (add multiple branches)
  - WhatsApp number
  - Social media links (Instagram, YouTube, LinkedIn, Facebook)
  - Office hours
  
These update in real-time via Supabase across the entire website.
```

### Admin UI Design:
```
Color scheme: Dark sidebar + light main content area
Sidebar bg: #0A1A0B
Main content bg: #F7F9F4 (same as site)
Cards: white, shadow-card
Tables: Clean, zebra striping, hover row highlight (green-50)
Buttons: Primary (green-500), Secondary (outline), Danger (red)
Typography: Syne throughout (consistent with main site)
Status badges: Pill chips (green=active, yellow=pending, red=inactive/draft)
Animations: Subtle — sidebar items fade in on load, table rows stagger
Forms: shadcn/ui form components
Toast notifications: react-hot-toast (green for success, red for error)
```

---

## 🗄 SUPABASE DATABASE SCHEMA

```sql
-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  badge TEXT,
  badge_color TEXT DEFAULT 'green',
  duration TEXT,
  price INTEGER, -- null = contact for pricing
  original_price INTEGER,
  level TEXT,
  category TEXT,
  icon TEXT,
  gradient TEXT,
  rating DECIMAL(2,1) DEFAULT 4.8,
  review_count INTEGER DEFAULT 0,
  enrolled_count INTEGER DEFAULT 0,
  topics TEXT[], -- array of topic strings
  highlights TEXT[],
  who_is_it_for TEXT,
  modules JSONB, -- [{title, topics:[]}]
  is_published BOOLEAN DEFAULT true,
  is_trading BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  course_id UUID REFERENCES courses(id),
  review_text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_url TEXT, -- Supabase Storage URL
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info/success/warning/promo
  display_location TEXT DEFAULT 'top-banner',
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments/Inquiries table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  course_id UUID REFERENCES courses(id),
  course_name TEXT, -- denormalized for easy display
  message TEXT,
  status TEXT DEFAULT 'new', -- new/contacted/enrolled/not_interested
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site content table (for editable about/contact content)
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL, -- 'about', 'contact', 'stats', etc.
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📄 COMPLETE PAGE ARCHITECTURE

```
/ (Home)
  LoadingScreen → Navbar → HeroSection → MarqueeBand → StatsSection
  → CoursesSection → TradingSection → WhyUsSection
  → TestimonialsSection → PlacementSection → CtaSection → Footer

/courses
  Navbar → CoursesBanner → FilterTabs → CourseGrid (4 accounting cards) → Footer

/courses/[slug]
  Navbar → CourseHero → CourseOverviewBar → CurriculumAccordion
  → InstructorSection → StickyEnrollSidebar → RelatedCourses → Footer

/trading
  Navbar → TradingHero → TradingCourseGrid (8 cards) 
  → TradingTestimonials → TradingCTA → Footer

/about
  Navbar → AboutHero → StorySection → Stats → Faculty → Certifications → Footer

/contact
  Navbar → ContactHero → ContactForm + Map + Info → Footer

/admin/login          — Auth page
/admin                — Dashboard
/admin/courses        — Courses CMS
/admin/courses/new    — Add course
/admin/courses/[id]   — Edit course
/admin/testimonials   — Testimonials CMS
/admin/notifications  — Notifications CMS
/admin/enrollments    — Leads/inquiries
/admin/about          — About content editor
/admin/contact-info   — Contact info editor
/admin/trading-courses — Trading courses CMS
```

---

## 🌐 HOMEPAGE SECTIONS — BRIEF REFERENCE

1. **LoadingScreen** — Dark overlay, SVG logo draws with GSAP DrawSVG, progress bar 0→100, curtain exit
2. **Navbar** — Glassmorphic sticky, transparent→frosted on scroll, Logo component, magnetic CTA
3. **HeroSection** — 55/45 split, headline "Master the Language of Business", Spline 3D, floating badge cards
4. **MarqueeBand** — Dark band, infinite ticker: all topics from all 4 courses
5. **StatsSection** — Dark section, 4 glassmorphic stat cards, GSAP count-up on scroll
6. **CoursesSection** — 4 course cards (from PDF data only), filter tabs, 3D tilt hover
7. **TradingSection** — Dark section: trading legacy story + stats + chart animation
8. **WhyUsSection** — Split dark/light, 6 USP cards with green accent bars
9. **TestimonialsSection** — Dark, dual-row infinite marquee, 12 student reviews
10. **PlacementSection** — Company logos marquee, 96% circle stat
11. **CtaSection** — Dark, contact form with Supabase submission + Resend email
12. **Footer** — Dark, 4-col, Logo (dark version), social links, all nav

---

## ✅ CODING RULES — ALWAYS FOLLOW

```
1. TypeScript strict mode — no `any` types ever
2. All components in proper folders (/sections, /global, /admin, /ui)
3. All animations: GSAP + ScrollTrigger only (no Framer Motion for page animations)
4. Framer Motion: only for admin panel micro-interactions if needed
5. Tailwind classes + CSS variables — zero inline styles
6. Next.js Image component for ALL images (logos, avatars, course images)
7. Mobile-first responsive (375px → 768px → 1024px → 1280px)
8. Keep components under 200 lines — split if larger
9. All Supabase calls in /lib/supabase/ folder
10. All environment variables in .env.local (never hardcode)
11. Error boundaries around 3D components (Spline can fail)
12. Loading states on all async data fetches
13. Toast notifications for all form submissions
14. Admin routes: always check auth in middleware.ts
```

---

## 🔧 ENVIRONMENT VARIABLES (.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
ADMIN_EMAIL=admin@milestone.academy
NEXT_PUBLIC_SITE_URL=https://milestone-academy.vercel.app
```

---

## 📁 FILE STRUCTURE

```
milestone-academy/
├── CLAUDE.md                          ← THIS FILE
├── .env.local
├── middleware.ts                      ← Admin route protection
├── app/
│   ├── layout.tsx                     ← LenisProvider + fonts + metadata
│   ├── page.tsx                       ← Home
│   ├── courses/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── trading/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── admin/
│       ├── layout.tsx                 ← AdminLayout (sidebar + topbar)
│       ├── page.tsx                   ← Dashboard
│       ├── login/page.tsx
│       ├── courses/
│       │   ├── page.tsx
│       │   ├── new/page.tsx
│       │   └── [id]/page.tsx
│       ├── testimonials/page.tsx
│       ├── notifications/page.tsx
│       ├── enrollments/page.tsx
│       ├── about/page.tsx
│       ├── contact-info/page.tsx
│       └── trading-courses/page.tsx
├── components/
│   ├── global/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx                   ← Smart logo component
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── PageTransition.tsx
│   │   └── NotificationBanner.tsx     ← Shows active notifications
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeBand.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── TradingSection.tsx         ← NEW — trading highlight
│   │   ├── WhyUsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PlacementSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Hero3D.tsx                 ← Spline or Three.js 3D scene
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopBar.tsx
│   │   ├── CourseForm.tsx
│   │   ├── TestimonialForm.tsx
│   │   ├── NotificationForm.tsx
│   │   ├── DataTable.tsx              ← Reusable admin table component
│   │   └── StatsCard.tsx
│   └── ui/
│       ├── CourseCard.tsx
│       ├── StatCard.tsx
│       ├── TestimonialCard.tsx
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── ModuleAccordion.tsx
├── lib/
│   ├── courses.ts                     ← Static course data (seed data)
│   ├── supabase/
│   │   ├── client.ts                  ← Browser Supabase client
│   │   ├── server.ts                  ← Server Supabase client
│   │   ├── courses.ts                 ← Course CRUD functions
│   │   ├── testimonials.ts            ← Testimonial CRUD
│   │   ├── notifications.ts           ← Notification CRUD
│   │   ├── enrollments.ts             ← Enrollment CRUD
│   │   └── content.ts                 ← Site content CRUD
│   └── resend.ts                      ← Email sending functions
├── providers/
│   └── LenisProvider.tsx
├── hooks/
│   ├── useGsapAnimations.ts
│   └── useScrollProgress.ts
├── styles/
│   └── globals.css
├── public/
│   ├── logos/
│   │   ├── milestone-logo-dark.png    ← Copy from uploaded assets
│   │   └── milestone-logo-light.png   ← Copy from uploaded assets
│   └── images/
└── tailwind.config.ts
```

---

## 🚀 DEPLOY TARGET

- Platform: Vercel
- Domain: milestone-academy.vercel.app (then custom domain)
- Database: Supabase (free tier sufficient to start)
- Images: Supabase Storage bucket "milestone-assets"
- Email: Resend (100 emails/day free)
