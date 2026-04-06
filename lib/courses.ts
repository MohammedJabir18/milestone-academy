export interface CourseModule {
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: "green" | "gold" | "blue" | "red" | string;
  duration: string;
  price: number | null;
  originalPrice: number | null;
  emi: string | null;
  level: string;
  category: "accounting" | "taxation" | "advanced" | "trading" | string;
  icon: string;
  gradient: string;
  rating: number;
  reviews: number;
  enrolled: number;
  topics: string[];
  highlights: string[];
  description: string;
  whoIsItFor: string;
  modules: CourseModule[];
  sort_order?: number;
  image_url?: string | null;
}

export const COURSES: Course[] = [
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
    price: null,
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

// Alias for backward compatibility with existing component imports
export const courses = COURSES;
