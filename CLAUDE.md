## 🧠 MASTER PROMPT — PASTE THIS INTO CLAUDE CODE

```
You are an elite full-stack developer and award-winning UI/UX designer. Build a complete, production-ready, Awwwards-winning website for "Milestone Academy" — a premium accounting & finance courses platform.

This website must be jaw-dropping, magazine-quality, and "WOW"-inducing. Every pixel must be intentional. Every animation must feel premium. Every section must convert visitors into students. The design must be editorial-luxury meets high-tech fintech — think Bloomberg Terminal meets Apple.com meets Stripe.com. Build with immense pride, craft, and obsession over detail.

---

## 🛠 TECH STACK — USE EXACTLY THESE

Framework: Next.js 14+ (App Router, TypeScript)
Styling: Tailwind CSS v3 + CSS custom properties
Animations: GSAP 3 (ScrollTrigger, SplitText, Flip, DrawSVG plugins)
Smooth Scroll: Lenis (https://lenis.darkroom.engineering/) — silky-smooth scroll across all pages
3D Elements: @splinetool/react-spline — Spline 3D scenes embedded as hero and section accents
Component Library: shadcn/ui (radix-ui primitives) for accessible base components
Icons: Lucide React + React Icons
Fonts: 
  - Display: "Instrument Serif" (Google Fonts) — for headings, hero text, editorial pull-quotes
  - Sans: "Neue Haas Grotesk Display" via "Haas Grot" fallback: "Syne" (Google Fonts) — for body, nav, labels
  - Mono: "JetBrains Mono" — for numbers, stats, code-style accents
3D/Canvas: Three.js (for animated number counters and background mesh)
State: Zustand (for nav state, modal state)
Forms: React Hook Form + Zod validation

Install these packages:
npm install gsap @studio-freight/lenis @splinetool/react-spline framer-motion lucide-react react-icons zustand react-hook-form zod @hookform/resolvers clsx tailwind-merge class-variance-authority @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-tooltip next-themes

---

## 🎨 DESIGN SYSTEM — IMPLEMENT IN globals.css AND tailwind.config.ts

### Color Palette (Light Theme with Green Soul):
:root {
  /* Backgrounds */
  --bg-primary: #F7F9F4;          /* Off-white with subtle green tint */
  --bg-secondary: #EDEFEA;        /* Light sage surface */
  --bg-card: #FFFFFF;             /* Pure white cards */
  --bg-dark: #0D1A0E;             /* Deep forest dark (for dark sections) */
  --bg-dark-card: #162018;        /* Dark card backgrounds */

  /* Green Spectrum */
  --green-50: #F0F7F0;
  --green-100: #D4EDD4;
  --green-200: #A8D8A8;
  --green-300: #6DBF6D;
  --green-400: #3DA83D;
  --green-500: #22C55E;           /* Primary brand green (Tailwind green-500) */
  --green-600: #16A34A;           /* Deeper action green */
  --green-700: #15803D;
  --green-800: #166534;
  --green-900: #0D4A26;

  /* Accent */
  --accent-gold: #D4AF37;         /* Premium gold for badges, stars */
  --accent-mint: #A8F5C2;         /* Soft mint glow */
  --accent-neon: #39FF14;         /* Neon green for data/numbers (use sparingly) */

  /* Typography */
  --text-primary: #0D1A0E;        /* Near black with green soul */
  --text-secondary: #3D5A3E;      /* Muted forest green */
  --text-muted: #7A9B7C;          /* Soft sage text */
  --text-inverse: #F7F9F4;        /* Light text on dark bg */

  /* Borders & Lines */
  --border-light: #D4E8D4;        /* Subtle green-tinted border */
  --border-medium: #A8C8A8;

  /* Shadows */
  --shadow-green: 0 4px 40px rgba(34, 197, 94, 0.12);
  --shadow-card: 0 2px 20px rgba(13, 26, 14, 0.08);
  --shadow-lift: 0 20px 60px rgba(13, 26, 14, 0.15);

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #F7F9F4 0%, #E8F5E9 50%, #F0FFF4 100%);
  --gradient-green: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  --gradient-dark: linear-gradient(180deg, #0D1A0E 0%, #162018 100%);
  --gradient-glow: radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%);

  /* Spacing */
  --section-padding: 120px 0;
  --container-max: 1280px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 40px;
  --radius-pill: 100px;
}

### Typography Scale:
- Hero headline: 96px / Instrument Serif / font-weight 400 (italic variant for accent words)
- Section headline: 64px / Instrument Serif
- Sub-headline: 40px / Syne Bold
- Body large: 20px / Syne Regular
- Body: 16px / Syne Regular
- Label/Caption: 12px / JetBrains Mono / letter-spacing: 0.15em / uppercase
- Number/Stat: 72px / JetBrains Mono Bold

---

## 🏗 WEBSITE ARCHITECTURE

### Pages:
1. `/` — Home (Main landing page — 10 sections)
2. `/courses` — All Courses listing page
3. `/courses/[slug]` — Individual course detail page
4. `/about` — About Milestone Academy
5. `/contact` — Contact / Enroll Now

### Global Components:
- `<Navbar />` — Glassmorphic sticky nav
- `<Footer />` — Rich dark footer
- `<CustomCursor />` — Custom magnetic cursor
- `<PageTransition />` — GSAP-powered page transition overlay
- `<LenisProvider />` — Smooth scroll wrapper
- `<LoadingScreen />` — Animated intro loader

---

## 📄 PAGE 1: HOME PAGE — ALL 10 SECTIONS IN DETAIL

---

### SECTION 0: LOADING SCREEN

Component: `<LoadingScreen />`

Visual:
- Full-screen overlay: background var(--bg-dark)
- Center: Milestone "M" logo mark (SVG) draws itself using GSAP DrawSVG
- Below logo: Text "MILESTONE ACADEMY" types letter by letter using GSAP SplitText
- Bottom: thin green progress bar (--green-500) fills left to right (0% → 100%)
- Progress numbers count from 00 to 100 in JetBrains Mono
- Duration: 2.4 seconds
- Exit animation: The whole screen splits in two halves (top and bottom panels) and slide away off screen (like a stage curtain), revealing the hero behind

GSAP Code Approach:
```js
const tl = gsap.timeline();
tl.from(".logo-svg path", { drawSVG: "0%", duration: 1, stagger: 0.1, ease: "power2.inOut" })
  .to(".progress-bar", { width: "100%", duration: 1.5, ease: "power1.inOut" }, 0)
  .to(".counter", { textContent: 100, duration: 1.5, snap: { textContent: 1 }, ease: "power1.inOut" }, 0)
  .to([".panel-top", ".panel-bottom"], { yPercent: (i) => i === 0 ? -100 : 100, duration: 0.8, ease: "power3.inOut", onComplete: () => setLoaded(true) });
```

---

### SECTION 1: HERO SECTION

Component: `<HeroSection />`

Layout: Full viewport (100vh minimum), two-column grid (55% text / 45% 3D)

Background:
- var(--gradient-hero) as base
- Subtle noise texture overlay (SVG filter or CSS grain) at 3% opacity
- Animated floating particles: 20 tiny green dots (3px) that drift slowly using GSAP random motion
- Large radial glow: var(--gradient-glow) centered on the 3D element side

Left Column — Content:
```
[LABEL]  ── in JetBrains Mono 12px uppercase green-600, with a 1px green line before it
"INDIA'S PREMIER ACCOUNTING ACADEMY"

[HEADLINE] — Instrument Serif 96px, line-height 1.05
"Master the
Language of
*Business*"
(*Business* = italic, green-500 colored, slightly larger)

[SUBHEADLINE] — Syne 20px, text-secondary, max-width 480px, margin-top 24px
"From Tally to Taxation, GST to Financial Reporting — 
Milestone Academy transforms ambitious professionals 
into certified financial experts trusted by 1,200+ companies."

[CTA BUTTONS] — margin-top 48px, flex gap-16px
  Primary CTA: "Explore Courses →"
    - Background: var(--gradient-green)
    - Text: white, Syne SemiBold 16px
    - Padding: 18px 36px
    - Border-radius: var(--radius-pill)
    - Hover: scale(1.04), box-shadow var(--shadow-green), translateY(-2px)
    - Magnetic hover effect (cursor proximity repulsion using mouse tracking)
    - Ripple animation on click (CSS radial gradient expanding ring)

  Secondary CTA: "Watch Demo ▶"
    - Background: transparent
    - Border: 1.5px solid var(--border-medium)
    - Text: text-primary, Syne SemiBold 16px
    - Padding: 18px 36px
    - Border-radius: var(--radius-pill)
    - Hover: border-color green-500, text green-600, background green-50
    - Play icon pulse animation (rings expanding from icon)

[SOCIAL PROOF ROW] — margin-top 56px, flex align-center gap-32px
  Left: Avatar stack (5 student face circles, 40px, -8px overlap, border white 2px)
  Text: "4,800+ Students Enrolled"  (Syne SemiBold 14px, text-primary)
  Divider: 1px vertical line (border-light, height 24px)
  Rating: ★★★★★ (gold stars) "4.9/5 Rating" (Syne 14px, text-secondary)
```

Right Column — 3D / Visual:
- Embed `<Spline scene="https://prod.spline.design/YOUR_SCENE/scene.splinecode" />`
- Use a Spline scene showing: a rotating 3D book/ledger with glowing green data lines, or a 3D bar chart with animated growth, or abstract 3D geometric shape in green palette
- Fallback if Spline unavailable: CSS 3D card stack with floating accounting icons (calculator, charts, certificates) using GSAP floating animation
- Floating badge cards (glassmorphic, blur 12px):
  Card 1 (top-right): "📊 GST Certification" — Syne 13px — animate: float up-down 3s ease infinite
  Card 2 (bottom-left): "🏆 Tally Expert Program" — animate: float delayed 1.5s
  Card 3 (top-left, smaller): "✅ Industry Recognized" — animate: float delayed 0.8s

Entrance Animations (triggered on load, after loading screen):
```js
// Staggered reveal
gsap.from(".hero-label", { y: 30, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.2 });
gsap.from(".hero-headline .line", { y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power4.out", delay: 0.4 });
gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 0.8, delay: 0.85, ease: "power3.out" });
gsap.from(".hero-cta", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, delay: 1, ease: "power3.out" });
gsap.from(".social-proof", { y: 20, opacity: 0, duration: 0.6, delay: 1.3 });
gsap.from(".hero-3d", { x: 80, opacity: 0, duration: 1.2, delay: 0.6, ease: "power4.out" });
```

Scroll-triggered parallax on hero:
```js
gsap.to(".hero-headline", { yPercent: -25, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }});
gsap.to(".hero-3d", { yPercent: 15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 }});
```

---

### SECTION 2: MARQUEE / TICKER STRIP

Component: `<MarqueeBand />`

Visual:
- Full-width band: background var(--bg-dark), height 60px
- Infinite horizontal marquee (CSS animation + JS for pause on hover)
- Content repeats seamlessly:
  `📊 GST Expert  ✦  Tally Prime Certified  ✦  Income Tax Specialist  ✦  Financial Accounting  ✦  Payroll Management  ✦  Audit & Compliance  ✦  Cost Accounting  ✦  Balance Sheet Mastery  ✦  MCA Filing  ✦  SAP Finance  ✦`
- Text: JetBrains Mono 13px, color: --accent-mint (soft mint green)
- Separators: green-600 diamonds ✦
- Speed: 35s per loop (CSS animation: marquee 35s linear infinite)
- On hover entire band: animation-play-state: paused + subtle brightness increase

---

### SECTION 3: NUMBERS / STATS SECTION

Component: `<StatsSection />`

Layout: Full-width, dark background (var(--bg-dark)), padding 80px 0
Grid: 4 columns on desktop, 2 on tablet, 1 on mobile

Background effects:
- Subtle green grid lines (1px, 5% opacity) creating graph-paper feel
- Radial green glow behind each stat

4 Stat Cards (dark glassmorphic cards: bg rgba(255,255,255,0.04), border 1px rgba(255,255,255,0.08), backdrop-blur 10px, border-radius 24px, padding 48px 32px):

Card 1:
  Number: "4,800+"  (JetBrains Mono 72px, --green-400)
  Label: "Students Enrolled"  (Syne 16px, text-inverse/60%)
  Icon: graduation cap SVG (top-right corner, 24px, green-600)
  Description: "Across Kerala & beyond"  (JetBrains Mono 12px, text-muted)

Card 2:
  Number: "96%"
  Label: "Placement Rate"
  Icon: briefcase SVG
  Description: "Within 3 months of completion"

Card 3:
  Number: "12+"
  Label: "Expert Courses"
  Icon: book-open SVG
  Description: "From basics to advanced"

Card 4:
  Number: "1,200+"
  Label: "Hiring Companies"
  Icon: building-2 SVG
  Description: "Trust our certifications"

Animations:
- ScrollTrigger: when section enters viewport, numbers count up from 0 using GSAP:
```js
gsap.from(".stat-number", {
  textContent: 0,
  duration: 2,
  ease: "power2.out",
  snap: { textContent: 1 },
  scrollTrigger: { trigger: ".stats-section", start: "top 75%" }
});
```
- Cards: stagger fade-up on scroll (y: 60 → 0, opacity 0 → 1, stagger 0.15s)
- Hover on card: translateY(-8px), shadow var(--shadow-green), border-color green-500/30
- Green glow pulse animation (CSS @keyframes: box-shadow scales from 0 to 20px green glow and back, 3s infinite, each card with different delay)

---

### SECTION 4: COURSES SECTION

Component: `<CoursesSection />`

Header:
```
[LABEL] "OUR PROGRAMS"  (JetBrains Mono 12px, green-600, uppercase)
[HEADLINE] "Every Course, a
Career Upgrade"  (Instrument Serif 64px, text-primary)
[SUBTEXT] "Meticulously designed curricula by CAs, CPAs, and industry veterans."
[FILTER TABS] — pill-shaped tab buttons: All | Accounting | Taxation | Compliance | Advanced
  Active tab: bg green-500, text white
  Inactive: bg green-50, text-secondary, hover: bg green-100
```

Course Cards Grid: 3 columns desktop, 2 tablet, 1 mobile
Gap: 24px

Each Course Card (the crown jewel of the website):
Structure: white bg, border-radius 20px, border 1px border-light, overflow hidden, position relative

Card Top (card image area, height 200px):
- Background: gradient unique per course (e.g., green-to-mint, dark-green-to-lime)
- Course icon: large (64px) centered, white, using Lucide icon
- Top-right corner: badge pill "BESTSELLER" or "NEW" or "ADVANCED" (Syne 10px bold, gold bg)
- Bottom overlay: course category chip (JetBrains Mono 11px, white/70%)

Card Body (padding 28px):
- Course Title: Syne SemiBold 20px, text-primary, margin-bottom 8px
- Description: Syne 14px, text-secondary, 2 lines max with CSS line-clamp
- [Divider line: 1px border-light, margin 16px 0]
- Meta row (flex, space-between):
  Duration: 📅 "3 Months" (Syne 13px, text-secondary)
  Level: 🎓 "Beginner → Pro" (Syne 13px, text-secondary)
- Rating: ⭐ 4.9 (30 reviews) (Syne 13px)
- [Space: 20px]
- Price row:
  Old Price: ₹12,000 (strikethrough, text-muted, 14px)
  New Price: "₹7,499" (Syne Bold 24px, green-600)
  "EMI from ₹625/mo" (JetBrains Mono 11px, text-muted)
- CTA Button: "Enroll Now →" (full-width, green-500 bg, white text, 14px Syne SemiBold, border-radius pill, padding 14px, hover: green-600, scale 1.02)

Card Hover State (transform-style: preserve-3d, perspective 1000px):
- GSAP 3D tilt effect (tracks mouse x/y, rotates card max ±8deg on both axes)
- Box-shadow deepens: var(--shadow-lift)
- Top image area: scale(1.05) with overflow:hidden clipping
- CTA button: translateY(-2px), slight glow
- Border color: green-400

```js
// 3D Tilt on each card
cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotateY: x * 16, rotateX: -y * 16, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  });
});
```

ScrollTrigger entrance: cards stagger from y:80, opacity:0 with 0.1s stagger

### 12 ACCOUNTING COURSES TO INCLUDE:

1. **Tally Prime Complete Mastery** 
   - Badge: BESTSELLER | Icon: BarChart3 | Level: Beginner → Expert
   - Duration: 3 Months | Price: ₹7,499 | Rating: 4.9
   - Description: "From basic vouchers to advanced inventory management — become the Tally expert every company is searching for."
   - Gradient: linear-gradient(135deg, #16A34A, #22C55E)
   - Topics: Voucher Entry, Bank Reconciliation, GST in Tally, Payroll, Inventory, Reports

2. **GST Filing & Compliance Expert**
   - Badge: HOT | Icon: FileText | Level: Intermediate
   - Duration: 6 Weeks | Price: ₹5,999
   - Description: "Navigate India's GST labyrinth with confidence. File GSTR-1, GSTR-3B, handle ITC claims, and crush audits."
   - Gradient: linear-gradient(135deg, #0D4A26, #16A34A)

3. **Income Tax & ITR Filing Pro**
   - Badge: NEW | Icon: Receipt | Level: Beginner
   - Duration: 8 Weeks | Price: ₹4,999
   - Description: "Master income tax computation, deductions under 80C-80U, and file ITR forms 1 through 7 with zero errors."
   - Gradient: linear-gradient(135deg, #166534, #22C55E)

4. **Financial Accounting & Reporting**
   - Badge: — | Icon: BookOpen | Level: Intermediate
   - Duration: 4 Months | Price: ₹9,999
   - Description: "Build and read Profit & Loss, Balance Sheet, Cash Flow Statements like a seasoned finance professional."
   - Gradient: linear-gradient(135deg, #15803D, #4ADE80)

5. **Payroll & HR Compliance**
   - Badge: — | Icon: Users | Level: Beginner
   - Duration: 4 Weeks | Price: ₹3,499
   - Description: "Process salaries, PF, ESI, TDS deductions, generate pay slips, and stay 100% compliant with labour laws."
   - Gradient: linear-gradient(135deg, #052E16, #166534)

6. **Cost Accounting & Management**
   - Badge: ADVANCED | Icon: TrendingUp | Level: Advanced
   - Duration: 3 Months | Price: ₹8,999
   - Description: "Job costing, process costing, marginal costing — the analytical framework that drives C-suite decisions."
   - Gradient: linear-gradient(135deg, #0D4A26, #15803D)

7. **Audit & Internal Control Mastery**
   - Badge: PROFESSIONAL | Icon: ShieldCheck | Level: Advanced
   - Duration: 6 Weeks | Price: ₹6,499
   - Description: "Design audit programs, execute internal audits, identify control gaps, and present board-ready audit reports."
   - Gradient: linear-gradient(135deg, #14532D, #22C55E)

8. **SAP FICO for Finance Professionals**
   - Badge: ENTERPRISE | Icon: Cpu | Level: Advanced
   - Duration: 5 Months | Price: ₹14,999
   - Description: "The most in-demand ERP skill in corporate finance. Configure GL, AP, AR, Asset Accounting in SAP."
   - Gradient: linear-gradient(135deg, #052E16, #0D4A26)

9. **MCA & ROC Filing Compliance**
   - Badge: — | Icon: Landmark | Level: Intermediate
   - Duration: 4 Weeks | Price: ₹3,999
   - Description: "Annual returns, AOC-4, MGT-7, DIN management — handle all MCA21 portal filings with precision."
   - Gradient: linear-gradient(135deg, #166534, #16A34A)

10. **Banking & Finance Operations**
    - Badge: NEW | Icon: Banknote | Level: Beginner
    - Duration: 3 Months | Price: ₹6,999
    - Description: "Credit appraisal, MSME lending, NPA management, KYC/AML compliance for banking sector careers."
    - Gradient: linear-gradient(135deg, #0D4A26, #22C55E)

11. **QuickBooks & Zoho Books**
    - Badge: — | Icon: Monitor | Level: Beginner
    - Duration: 3 Weeks | Price: ₹2,999
    - Description: "Cloud accounting for freelancers, startups, and SMEs. Master both platforms and offer a premium service."
    - Gradient: linear-gradient(135deg, #15803D, #22C55E)

12. **CA Foundation Accelerator**
    - Badge: POPULAR | Icon: Award | Level: Beginner
    - Duration: 6 Months | Price: ₹11,999
    - Description: "Bridge between graduation and CA exams. Accounting principles, law basics, quantitative aptitude, economics."
    - Gradient: linear-gradient(135deg, #052E16, #16A34A)

View All Courses Button (centered below grid):
- Outline style: border 1.5px green-500, text green-600, bg transparent
- Hover: bg green-500, text white, scale(1.03)
- Border-radius pill, padding 16px 48px, Syne SemiBold 16px
- Arrow icon that slides right on hover (GSAP translateX)

---

### SECTION 5: "WHY MILESTONE ACADEMY?" — USP SECTION

Component: `<WhyUsSection />`

Layout: Split layout — left side dark (var(--bg-dark)), right side light (var(--bg-primary))

Left Side (dark, padding 80px 60px):
```
[LABEL] "WHY CHOOSE US"  (JetBrains Mono, mint green)
[HEADLINE] "Not just a course.
A career transformation."  (Instrument Serif 52px, text-inverse)
[BODY] "We don't teach theory — we build practitioners. 
Every module is built around real company workflows, 
live software, and actual GST portals."  (Syne 18px, text-inverse/70%)
[DECORATION] Large outlined "M" letterform as background element (stroke only, 400px, 5% opacity)
```

Right Side (light): 6 USP cards in 2-column grid (each 3 cards per column)

USP Cards (minimal card: no border, just left accent line in green-500 3px width, padding 24px, bg transparent):
1. 🏛 "CA & CPA Certified Faculty" — "Learn from practicing chartered accountants, not just lecturers."
2. 🖥 "Live Software Practice" — "Hands-on practice with Tally Prime, SAP, GST portal — no simulations."
3. 🏆 "Industry-Recognized Certificates" — "Certificates valued by 1,200+ companies across India."
4. 📞 "Lifetime Doubt Support" — "WhatsApp access to mentors even after course completion."
5. 💼 "100% Placement Assistance" — "Resume building, interview prep, and direct company referrals."
6. 📱 "Hybrid Learning" — "Attend in-person at our Kerala centers or join live online from anywhere."

Each card entrance: ScrollTrigger, slide in from alternating sides (odd: from left, even: from right)
Hover: left accent bar extends to full card height, card bg becomes green-50, subtle translateX(4px)

---

### SECTION 6: CURRICULUM DEEP DIVE (TABBED)

Component: `<CurriculumSection />`

Background: var(--bg-secondary) with subtle diagonal stripe pattern (CSS)

Header:
```
"What You'll Learn —
Broken Down, Module by Module"  (Instrument Serif 52px)
```

Tab Navigation (horizontal, sticky within section):
Tabs: [Tally Prime] [GST Mastery] [Income Tax] [Financial Accounting] [SAP FICO]
- Active: bg green-500, text white, border-radius pill
- Hover: bg green-100
- Tab switch: GSAP content cross-fade (opacity 0→1, y:10→0, duration 0.4s)
- Underline indicator slides between tabs (GSAP x position)

Each Tab Content: 2-column layout
Left — Module List (accordion style, @radix-ui/react-accordion):
- Module 1: "Fundamentals & Setup" ► (expands to show 5 sub-topics)
  Topics: Installing Tally, Company Creation, Ledger Setup, Groups, Opening Balances
- Module 2: "Voucher Transactions" ►
  Topics: Payment, Receipt, Journal, Contra, Sales, Purchase vouchers
- Module 3: "GST in Tally" ►
- Module 4: "Inventory Management" ►
- Module 5: "Payroll Processing" ►
- Module 6: "Reports & MIS" ►
- Module 7: "Advanced Features" ►
- Module 8: "Live Project" ►

Accordion animation: smooth height transition, rotate chevron icon (GSAP rotation)
Active module: left border green-500, bg green-50, text green-700

Right — Course Highlights Card (sticky while scrolling module list):
```
[CARD: white, shadow-lift, border-radius 24px, padding 40px]
  Certificate Preview (mockup image: green bordered cert with "Milestone Academy" letterhead)
  ─────────────────────
  🕐 Duration: 3 Months
  📺 Sessions: 48 Live Classes
  🎥 Recordings: Lifetime Access
  📋 Assignments: 12 Practice Sets
  🔬 Live Projects: 3 Company Scenarios
  👩‍🏫 Mentor: CA Rashida Nair (photo, name, credentials)
  ─────────────────────
  Price: ₹7,499
  [ENROLL NOW →] (green CTA full width)
  [Download Syllabus PDF] (outline button full width)
```

---

### SECTION 7: TESTIMONIALS SECTION

Component: `<TestimonialsSection />`

Background: var(--bg-dark)) — dark section for contrast
Overflow: hidden (for horizontal scroll effect)

Header:
```
[LABEL] "STUDENT STORIES" (JetBrains Mono, mint)
[HEADLINE] "Real People.
Real Results." (Instrument Serif 52px, text-inverse)
```

Layout: Horizontal infinite scroll marquee (two rows, opposite direction speeds)
Row 1: scrolls left (speed 40s)
Row 2: scrolls right (speed 50s)
Pause on hover (both rows)

Testimonial Cards (glassmorphic: bg rgba(255,255,255,0.06), border 1px rgba(255,255,255,0.1), blur 8px, border-radius 20px, padding 32px, width 360px, flex-shrink 0):

```
[QUOTE MARK] Large decorative " in green-500/30, Instrument Serif 120px
[REVIEW TEXT] Syne 15px, text-inverse/80%, line-height 1.6, font-style italic
[RATING] ★★★★★ (gold, 16px) — margin-top 16px
[DIVIDER] thin line border-light/20
[STUDENT INFO] flex, gap 12px:
  [AVATAR] 44px circle (colored initial placeholder or real photo)
  [Name] Syne SemiBold 15px, text-inverse
  [Role] JetBrains Mono 12px, text-muted — e.g. "GST Executive, Deloitte Kerala"
  [Course] pill chip: "Tally Prime" — bg green-500/20, text green-300, 11px
```

12 Testimonials:
1. Aisha Rahman — "I went from not knowing what a ledger was to filing GST returns for 8 clients in just 3 months. Milestone's Tally course is the most practical training I've ever attended." — GST Consultant, Kozhikode | Tally Prime

2. Arjun Menon — "The SAP FICO program placed me in Infosys BPM within a month of completion. The faculty's industry experience is unparalleled — they taught us exactly what multinationals expect." — SAP FICO Analyst, Infosys | SAP FICO

3. Fathima Zubair — "As a housewife returning to work, I was terrified. Milestone's income tax course rebuilt my confidence. I now run my own ITR filing practice from home." — Freelance Tax Consultant | Income Tax

4. Mohammed Riyas — "The Cost Accounting program changed how I think about business. My company's CFO noticed the difference immediately and fast-tracked my promotion." — Management Accountant, Kerala Pvt Ltd | Cost Accounting

5. Sneha Pillai — "Every class felt like sitting with a CA at their office, not inside a classroom. The real-world scenarios made everything click." — Finance Executive, HDFC | Financial Accounting

6. Vishnu K — "I cleared CA Foundation in my first attempt using Milestone's accelerator program. The structured approach and mentor support was everything." — CA Student | CA Foundation

7. Divya Thomas — "Payroll compliance used to terrify me. Now I handle 200+ employee payroll for a manufacturing company. The course paid for itself in Week 1." — HR & Payroll Manager | Payroll

8. Nabil Haris — "Tally Prime + GST together in one program? That's what the market actually needs. Got hired before I even finished the course!" — Accounts Executive, Startup | Tally + GST

9. Ananya Krishnan — "The lifetime doubt support is REAL. I WhatsApped at 11pm about an ITC mismatch and got a detailed reply by 7am. That's beyond any institute I've seen." — CA Firm Associate | GST

10. Santhosh Kumar — "From a factory floor to a finance desk — Milestone made that jump possible for me. The banking operations course was my turning point." — Banking Operations, Federal Bank | Banking

11. Lakshmi Nair — "I've done three courses here and each one opened a new door. The certificates are genuinely recognized — HR executives mention Milestone by name." — Senior Accountant, MNC | Multiple Courses

12. Asif Ali — "The placement team is insanely committed. They helped me polish my LinkedIn, prep for 4 interview rounds, and connected me directly to the hiring manager." — Finance Analyst, IT Firm | Placement

---

### SECTION 8: PLACEMENT & COMPANIES SECTION

Component: `<PlacementSection />`

Background: var(--bg-primary), section padding 100px 0

Left Side (content):
```
[LABEL] "PLACEMENT RECORD"
[HEADLINE] "Your Dream Job,
Our Promise."  (Instrument Serif 52px)
[BODY] "Our placement team works tirelessly to connect Milestone-certified 
professionals with companies that know our graduates deliver."

[ACHIEVEMENT PILLS] (flex, wrap, gap 12px):
  🏢 "100% Placement Assistance"
  📄 "Resume Building"
  🎤 "Mock Interviews"
  🔗 "Direct HR Connections"
  📊 "Salary Negotiation Coaching"
  
Each pill: bg green-50, border 1px green-200, text green-700, border-radius pill, padding 10px 18px, Syne 13px
Hover: bg green-500, text white, scale 1.05, border-color green-500
```

Right Side (hiring companies marquee):
```
[SECTION LABEL] "Hiring Our Graduates"  (Syne SemiBold 16px, text-secondary)

[COMPANY LOGO GRID] — 3 rows of logos, each row is infinite horizontal marquee
Row 1 → (leftward): Deloitte | EY | KPMG | PWC | Grant Thornton | BDO
Row 2 ← (rightward): Infosys BPM | Wipro | TCS | Accenture | Capgemini | Cognizant
Row 3 → (leftward): Federal Bank | SBI | HDFC | Axis Bank | Yes Bank | ICICI

Logo treatment: grayscale by default, full color on hover, opacity 0.6 → 1 on hover
Logos: 140px wide, height 48px, object-contain
```

Center: Large circular graphic (CSS) with "96%" in the center in JetBrains Mono 64px green-500, surrounded by an SVG animated circle progress ring that draws from 0 to 96% on scroll entry

---

### SECTION 9: CTA / CONTACT SECTION

Component: `<CtaSection />`

Layout: Full-width, dark background (var(--bg-dark)), overflow hidden
Position: relative, with large decorative elements

Background:
- Animated gradient mesh (CSS @keyframes shifting green/dark)
- Large blurred green circle glow (400px, radial, green-500/10) top-left
- Large blurred green circle glow bottom-right

Content (centered, max-width 800px, text-center):
```
[LABEL] "START YOUR JOURNEY"  (JetBrains Mono, mint, 12px)
[HEADLINE] "Ready to Become a
Certified Finance Expert?"  (Instrument Serif 72px, text-inverse, line-height 1.1)
[BODY] "Join 4,800+ students who chose Milestone Academy — 
and never looked back. Courses starting every month."
(Syne 18px, text-inverse/70%, max-width 560px, mx-auto)

[FORM BOX] (glassmorphic card: bg rgba(255,255,255,0.06), border 1px rgba(255,255,255,0.12), border-radius 24px, padding 48px)
  Grid: 2 columns
  [Name Field] placeholder "Your Full Name"
  [Phone Field] placeholder "+91 XXXXX XXXXX"
  [Email Field] (full width) placeholder "your@email.com"
  [Course Interest Dropdown] (full width) 
    Options: All 12 courses listed
  [Message Field] (full width, 3 rows) placeholder "Any questions? Let us know..."
  
  Field styling:
    bg: rgba(255,255,255,0.06), border: 1px solid rgba(255,255,255,0.12)
    border-radius: 12px, padding: 14px 18px
    text: text-inverse, placeholder: text-inverse/40%
    focus: border-color green-500, box-shadow 0 0 0 3px rgba(34,197,94,0.15), outline none
    Transition: all 0.25s ease
    
  [SUBMIT BUTTON] (full width, height 54px):
    "Book Free Counselling Session →"
    bg: var(--gradient-green)
    text: white, Syne SemiBold 16px
    border-radius: 12px
    hover: translateY(-2px), box-shadow var(--shadow-green), scale(1.01)
    loading state: spinner animation inside button
    success state: "✓ We'll Call You Within 2 Hours!" with green checkmark animation

[ALTERNATIVE CONTACT] (below form, mt-32px, text-center)
  "Or reach us directly:"
  📞 +91 98765 43210 (clickable tel: link)
  📧 admissions@milestone.academy
  📍 Calicut | Malappuram | Thrissur | Online
```

---

### SECTION 10: TEASE — MILESTONE TRADING ACADEMY SECTION

Component: `<TradingTeaseSection />`

Purpose: Introduce the sister brand without distracting from the accounting focus

Background: var(--bg-secondary), section padding 80px 0
Design: Centered, editorial feel

```
[LABEL] "OUR SISTER BRAND"  (JetBrains Mono, green-600, 12px)
[HEADLINE] "Also Explore:
Milestone Trading Academy"  (Instrument Serif 48px)
[BODY] "Where our journey began. Professional stock market trading, 
technical analysis, and investment mastery programs —
trusted by 10,000+ traders across India."
(Syne 18px, text-secondary, max-width 600px, mx-auto, text-center)

[PREVIEW CARD] (max-width 800px, mx-auto, mt-48px)
  Structure: Wide card with left image (screenshot/mockup of trading site) and right content
  Left: Mockup of https://milestone-trading-academy.vercel.app/ (use a browser-frame mockup component)
  Right:
    Quick stats: 10,000+ Traders | 15+ Trading Courses | Stock | Crypto | Forex
    "Explore Trading Programs →" button (outline, green-600, border green-400)
    Link: https://milestone-trading-academy.vercel.app/

Card hover: lift shadow, slight 3D tilt
```

---

## 🌐 FOOTER

Component: `<Footer />`

Background: var(--bg-dark), dark forest
Grid: 4 columns on desktop

Column 1 — Brand:
- Milestone Academy logo (SVG, white version)
- Tagline: "India's Most Practical Accounting Academy"
- Social icons: Instagram | YouTube | LinkedIn | WhatsApp
  Each icon: 38px circle, bg rgba(255,255,255,0.06), hover bg green-500, transition 0.3s
- "© 2025 Milestone Academy. All rights reserved."

Column 2 — Quick Links:
- Courses | About Us | Placements | Blog | Contact
- Each link: Syne 14px, text-inverse/60%, hover text green-400, translateX(4px) on hover

Column 3 — Programs:
- Tally Prime | GST Filing | Income Tax | SAP FICO | CA Foundation | All Courses
- Same hover treatment

Column 4 — Contact:
- 📍 1st Floor, Calicut Business Centre, Kozhikode — 673001
- 📞 +91 98765 43210
- 📧 admissions@milestone.academy
- ⏰ Mon–Sat: 9 AM – 7 PM

Bottom bar: thin top border (rgba(255,255,255,0.08)), flex space-between
Left: "Made with 💚 in Kerala, India"
Right: "Privacy Policy | Terms | Sitemap"

Footer entrance: ScrollTrigger, columns stagger from y:40, opacity 0

---

## 🖱 GLOBAL COMPONENTS — IMPLEMENT THESE UNIVERSALLY

### Custom Cursor (`<CustomCursor />`)
- Default: Small filled circle (10px, green-500, mix-blend-mode: difference)
- Outer ring: 36px circle, green-500/30, border 1.5px, follows with GSAP lerp (0.08 factor — buttery lag)
- On link/button hover: outer ring scales to 60px, inner dot disappears — cursor "expands to swallow" the element
- On text hover: outer ring morphs to a thin horizontal line (cursor becomes a text caret)
- On card hover: outer ring shows "DRAG" text inside it (for scroll sections)
```js
// Magnetic button effect
document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  });
});
```

### Lenis Smooth Scroll Setup (`<LenisProvider />`)
```js
// app/providers/LenisProvider.tsx
"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(); };
  }, []);
  return <>{children}</>;
}
```

### Navbar (`<Navbar />`)
Height: 72px, position fixed, top 0, full-width, z-index 1000
Initial state: transparent bg, white logo/links (for hero with light bg: use dark)
Scrolled state (after 80px scroll): 
  bg: rgba(247,249,244,0.92), backdrop-filter blur(16px) saturate(180%)
  border-bottom: 1px solid var(--border-light)
  box-shadow: var(--shadow-card)
  Transition: all 0.4s ease

Content: max-width container, flex space-between, align-center
Left: Logo (SVG mark + "Milestone Academy" wordmark in Syne SemiBold)
Center: Nav links (Syne Medium 14px, text-primary/80%)
  Home | Courses | About | Placements | Contact
  Active link: text green-600, underline dot below (3px circle, green-500, centered)
  Hover: text green-600, translateY(-1px)
Right: CTA button "Enroll Now →" (green-500 bg, white text, pill, padding 10px 24px)
        + phone number (JetBrains Mono 13px, text-secondary) "📞 +91 98765 43210"

Mobile hamburger: animated to X on click (GSAP line morphing)
Mobile menu: full-screen overlay, bg var(--bg-dark), nav links stagger in from right

### Page Transition (`<PageTransition />`)
- On link click: green panel slides in from right (GSAP), covering full screen
- URL changes, new page content loads
- Panel slides out to right, revealing new content
- Duration: 0.5s per phase, ease: power3.inOut

### GSAP Text Animations (apply to all section headlines):
```js
// Split headlines into lines, animate each line up
import SplitType from "split-type";
const headings = document.querySelectorAll(".gsap-heading");
headings.forEach(heading => {
  const split = new SplitType(heading, { types: "lines" });
  split.lines.forEach(line => {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });
  gsap.from(split.lines, {
    y: "100%",
    opacity: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: "power4.out",
    scrollTrigger: { trigger: heading, start: "top 85%" }
  });
});
```

---

## 📱 RESPONSIVE DESIGN

Breakpoints (Tailwind):
- sm: 640px — Stacks everything, single column
- md: 768px — 2 columns where appropriate
- lg: 1024px — Full layout
- xl: 1280px — Max-width container kicks in
- 2xl: 1536px — Comfortable breathing room

Mobile specifics:
- Hero: single column, 3D element hidden (performance), headline 52px
- Stats: 2x2 grid
- Course cards: single column, no 3D tilt
- Custom cursor: disabled on touch devices
- Smooth scroll (Lenis): disabled on mobile (browser native scroll)
- Hamburger menu with full-screen overlay

---

## ⚡ PERFORMANCE

- All GSAP animations: use `will-change: transform` on animated elements
- Images: Next.js `<Image />` with lazy loading and blur placeholder
- Spline: Load lazily with `<Suspense>` boundary
- Font loading: `display: swap` for all Google Fonts
- Course cards: virtualize if over 12 (use `react-window`)
- Critical CSS inlined, rest code-split per page
- Lighthouse target: 90+ on all metrics

---

## 🗂 FILE STRUCTURE

```
milestone-academy/
├── app/
│   ├── layout.tsx            (LenisProvider, CustomCursor, PageTransition, fonts)
│   ├── page.tsx              (HomePage — imports all sections)
│   ├── courses/
│   │   ├── page.tsx          (CoursesPage — all 12 courses grid)
│   │   └── [slug]/page.tsx   (CourseDetailPage)
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── global/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── PageTransition.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeBand.tsx
│   │   ├── StatsSection.tsx
│   │   ├── CoursesSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── CurriculumSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PlacementSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── TradingTeaseSection.tsx
│   └── ui/
│       ├── CourseCard.tsx
│       ├── StatCard.tsx
│       ├── TestimonialCard.tsx
│       ├── Button.tsx
│       └── Badge.tsx
├── lib/
│   ├── gsap.ts               (GSAP registration, plugin setup)
│   ├── lenis.ts              (Lenis instance)
│   └── courses.ts            (Course data — all 12 courses as typed objects)
├── providers/
│   └── LenisProvider.tsx
├── styles/
│   └── globals.css           (CSS variables, fonts, base styles)
├── public/
│   ├── fonts/
│   └── images/
└── tailwind.config.ts
```

---

## 🎯 CONTENT COPY — WEBSITE TEXT

### Meta / SEO:
Title: "Milestone Academy | India's Premier Accounting & Finance Courses"
Description: "Master Tally Prime, GST, Income Tax, SAP FICO and 8 more courses at Milestone Academy. Industry-recognized certificates, 100% placement assistance. Join 4,800+ students in Kerala."

### About Milestone Academy (for /about page):
```
THE MILESTONE STORY

Milestone began as a vision — to democratize financial education in India. 
Starting as Milestone Trading Academy, we've trained over 10,000 traders 
across the country. Our students demanded more. They wanted accounting. 
They wanted compliance. They wanted careers in corporate finance.

So we built Milestone Academy.

Not another coaching center. A career transformation engine.

Our faculty are practicing Chartered Accountants, SAP-certified consultants, 
and seasoned tax practitioners — professionals who work in the field every day 
and teach what the industry actually demands, not what textbooks say.

WHAT MAKES US DIFFERENT

01 — Industry-First Curriculum
Every course is built from job descriptions, not syllabi. We analyze what 
companies actually hire for, then reverse-engineer the curriculum.

02 — Live Software Environments  
No screenshots. No simulations. You practice on real Tally Prime, live GST 
portals, actual SAP training environments.

03 — Kerala's Most Recognized Accounting Certificate  
Walk into any accounting firm, CA office, or MNC in Kerala and mention 
Milestone Academy — they know our standards.

04 — A Community, Not Just a Course  
Join our exclusive WhatsApp group of 4,800+ Milestone alumni — share 
opportunities, get advice, and grow together.

THE NUMBERS SPEAK

10,000+ Total Students  |  4,800+ Accounting Students  
96% Placement Rate  |  1,200+ Hiring Partners  
12 Specialized Programs  |  5 Learning Centers + Online  
₹45,000 Average Salary Hike Post-Completion
```

---

## 🔧 FINAL CLAUDE CODE COMMANDS

After generating all files, run these in order:

```bash
# 1. Install all dependencies
npm install gsap @studio-freight/lenis @splinetool/react-spline framer-motion lucide-react react-icons zustand react-hook-form zod @hookform/resolvers clsx tailwind-merge class-variance-authority @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-tooltip split-type

# 2. Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card badge tabs accordion dialog tooltip

# 3. Run dev server
npm run dev

# 4. Build and check
npm run build
```

---

## ✅ QUALITY CHECKLIST — VERIFY BEFORE DEPLOY

- [ ] Loading screen plays once per session (sessionStorage flag)
- [ ] Lenis smooth scroll active on desktop, disabled on mobile
- [ ] All GSAP animations tied to ScrollTrigger with correct start/end
- [ ] Custom cursor hidden on touch devices
- [ ] All 12 course cards render with correct data
- [ ] Form validation works (Zod schema)
- [ ] Form submission shows loading → success state
- [ ] Marquee pauses on hover
- [ ] 3D tilt on cards disabled on mobile (performance)
- [ ] Navbar becomes opaque on scroll
- [ ] All CTAs link to correct pages/anchors
- [ ] Trading Academy tease section links to correct URL
- [ ] Responsive: test 320px, 768px, 1024px, 1440px breakpoints
- [ ] Fonts load correctly (no FOUT)
- [ ] Dark sections readable in bright light
- [ ] All green colors pass WCAG AA contrast ratio
- [ ] Page transitions work between routes
- [ ] Lighthouse: Performance 90+, Accessibility 95+

---

BUILD THIS. MAKE IT LEGENDARY. MAKE EVERY VISITOR SAY "WOW."
```

---

## 📌 QUICK REFERENCE — COLORS FOR TWEAKCN

Go to https://tweakcn.com/ and set:
- Primary: #22C55E
- Primary Foreground: #FFFFFF
- Background: #F7F9F4
- Foreground: #0D1A0E
- Card: #FFFFFF
- Muted: #EDEFEA
- Muted Foreground: #7A9B7C
- Border: #D4E8D4
- Ring: #22C55E

Export the CSS variables and paste into globals.css under :root

---

## 🔗 REFERENCE LINKS TO GIVE CLAUDE CODE

- Smooth Scroll: https://lenis.darkroom.engineering/
- GSAP Docs: https://gsap.com/docs/v3/
- 3D Elements: https://spline.design/
- UI Components: https://21st.dev/community/components
- shadcn/ui: https://ui.shadcn.com/
- Color Tool: https://tweakcn.com/
