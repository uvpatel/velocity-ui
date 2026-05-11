import {
  Activity,
  Bell,
  Bot,
  Boxes,
  Code2,
  CreditCard,
  Database,
  FileText,
  FolderHeart,
  Gauge,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export const productStats = [
  { label: "Registry installs", value: "98.4k", delta: "+21.8%" },
  { label: "Published components", value: "426", delta: "+34" },
  { label: "Active teams", value: "1,284", delta: "+12.4%" },
  { label: "API uptime", value: "99.99%", delta: "SLO met" },
];

export const platformFeatures = [
  {
    title: "Registry manifests",
    description: "Versioned component metadata with files, dependencies, docs, previews, and CLI install commands.",
    icon: Boxes,
  },
  {
    title: "SaaS workspace",
    description: "Teams, billing, API keys, audit logs, notifications, saved components, and moderation workflows.",
    icon: LayoutDashboard,
  },
  {
    title: "Secure foundation",
    description: "Better Auth, role-aware access, Drizzle schema constraints, and server-side authorization checks.",
    icon: ShieldCheck,
  },
  {
    title: "Developer workflow",
    description: "Typed config, env validation, seed scripts, CI, Docker, and a shadcn-style CLI starter.",
    icon: Code2,
  },
];

export const dashboardModules = [
  { title: "Saved components", value: "384", description: "Favorites and private collections", icon: FolderHeart },
  { title: "Notifications", value: "18", description: "Security, billing, and registry updates", icon: Bell },
  { title: "API keys", value: "6", description: "Scoped keys for registry automation", icon: KeyRound },
  { title: "Team members", value: "24", description: "Owners, maintainers, and viewers", icon: Users },
  { title: "Billing", value: "Pro", description: "Subscription and usage controls", icon: CreditCard },
  { title: "Activity logs", value: "1.2k", description: "Auditable product events", icon: Activity },
];

export const componentCategories = [
  {
    title: "Primitives",
    description: "Buttons, inputs, cards, dialogs, drawers, tabs, tables, skeletons, and empty states.",
    icon: Zap,
  },
  {
    title: "Application shells",
    description: "Sidebars, navbars, command menus, dashboard widgets, data grids, and settings layouts.",
    icon: Gauge,
  },
  {
    title: "AI interfaces",
    description: "Chat surfaces, prompt composers, streaming output, tool call cards, and generation history.",
    icon: Bot,
  },
  {
    title: "Content systems",
    description: "MDX layouts, markdown renderers, changelog feeds, blog cards, and syntax-highlighted docs.",
    icon: FileText,
  },
];

export const docsNav = [
  { title: "Getting started", href: "/docs/getting-started" },
  { title: "Registry architecture", href: "/docs/registry" },
  { title: "CLI", href: "/docs/cli" },
  { title: "Authentication", href: "/docs/authentication" },
  { title: "Database", href: "/docs/database" },
];

export const changelog = [
  {
    version: "0.4.0",
    date: "2026-05-11",
    title: "Registry platform foundation",
    items: ["Next.js 16 routing surface", "Better Auth and Drizzle architecture", "CLI starter and registry manifests"],
  },
  {
    version: "0.3.0",
    date: "2026-04-22",
    title: "Dashboard systems",
    items: ["Workspace analytics", "API key management UI", "Moderation queue patterns"],
  },
  {
    version: "0.2.0",
    date: "2026-03-18",
    title: "Component library expansion",
    items: ["Application shell blocks", "Docs MDX templates", "Premium loading and empty states"],
  },
];

export const aiGeneratorPresets = [
  { title: "SaaS settings panel", prompt: "Generate a responsive settings panel with tabs, billing status, and API key controls." },
  { title: "AI chat console", prompt: "Create an AI chat interface with message parts, tool calls, and streaming states." },
  { title: "Registry card grid", prompt: "Design a registry explorer grid with filters, tags, analytics, and install actions." },
];

export const docs = {
  "getting-started": {
    title: "Getting started",
    description: "Install Velocity UI, configure environment variables, and run the platform locally.",
    sections: [
      "Install dependencies with pnpm and keep Node.js on a Next.js 16 compatible runtime.",
      "Copy .env.example, configure Better Auth secrets, and set DATABASE_URL to a Neon PostgreSQL connection string.",
      "Run Drizzle migrations, seed the registry catalog, and start the App Router dev server.",
      "Open the dashboard, verify auth routes, and call the registry API from the CLI starter.",
    ],
  },
  registry: {
    title: "Registry architecture",
    description: "Velocity UI components are distributed as typed manifests with versioned source files.",
    sections: [
      "Each registry item declares dependencies, tags, files, preview URLs, and an install command.",
      "Route handlers expose catalog, item, and install endpoints for the web app and CLI.",
      "Component versions store immutable manifests for rollback, auditability, and changelog generation.",
      "Analytics events can be recorded on downloads, likes, comments, and install requests.",
    ],
  },
  cli: {
    title: "CLI",
    description: "The CLI detects project capabilities, resolves registry manifests, and writes component files.",
    sections: [
      "Detect Next.js App Router, Tailwind CSS v4, package manager, and tsconfig aliases.",
      "Fetch registry manifests through /api/registry/:slug and resolve npm dependencies.",
      "Write component files through deterministic paths and support idempotent updates.",
      "Sync velocity.config.json so teams can pin registries and component destinations.",
    ],
  },
  authentication: {
    title: "Authentication",
    description: "Better Auth powers email/password, OAuth, sessions, verification, and role-aware access.",
    sections: [
      "Use the Better Auth route handler for session, email/password, Google, and GitHub flows.",
      "Keep proxy redirects as a UX guard and re-check authorization inside Server Components.",
      "Persist roles on users and route admin-only workflows through requireAdmin.",
      "Store linked OAuth accounts and verification tokens through Drizzle-backed tables.",
    ],
  },
  database: {
    title: "Database",
    description: "Drizzle and Neon provide typed relational data for the registry, SaaS, and auth systems.",
    sections: [
      "Tables are normalized around users, teams, registry items, versions, tags, collections, and analytics.",
      "Foreign keys use cascade or set-null rules based on data ownership and audit needs.",
      "Indexes cover common lookup paths for slugs, users, registry state, tags, and activity entities.",
      "Schema changes should flow through drizzle-kit migrations and reviewed seed scripts.",
    ],
  },
} as const;

export const posts = {
  launch: {
    title: "Launching Velocity UI",
    description: "Why registry-first product infrastructure changes how teams ship UI systems.",
    body: [
      "Modern component platforms need more than a pretty preview grid. They need manifests, versioning, install flows, docs, analytics, and durable ownership models.",
      "Velocity UI treats the registry as product infrastructure. Components can be browsed by humans, installed by CLIs, audited by admins, and extended by teams without forking the platform.",
      "The result is a full-stack foundation that can grow from an open-source library into a commercial developer platform.",
    ],
  },
  "design-systems-as-products": {
    title: "Design systems as products",
    description: "A practical operating model for registries, component quality, and team adoption.",
    body: [
      "A design system becomes durable when teams can discover the right primitive, understand its constraints, and install it without bespoke coordination.",
      "Registry metadata creates a shared contract between docs, previews, APIs, and command-line workflows.",
      "Treating every component as a product surface raises quality across accessibility, responsive behavior, motion, and supportability.",
    ],
  },
} as const;

export const adminQueue = [
  { name: "ai-command-palette", author: "Core Team", status: "Review", risk: "Needs keyboard audit" },
  { name: "billing-matrix", author: "Studio", status: "Pending", risk: "Pricing copy requires approval" },
  { name: "kanban-board", author: "Community", status: "Flagged", risk: "Large client bundle" },
];

export const testimonials = [
  {
    quote: "Velocity UI gives us the missing layer between a design system and a real developer platform.",
    author: "Maya Chen",
    role: "Design Systems Lead",
  },
  {
    quote: "The registry contract is clean enough for OSS, but the dashboard feels ready for a paid product.",
    author: "Andre Silva",
    role: "Frontend Platform Engineer",
  },
  {
    quote: "Our team can publish, review, install, and track components without custom internal tooling.",
    author: "Nora Patel",
    role: "VP Engineering",
  },
];

export const stack = [
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "Better Auth",
  "Drizzle ORM",
  "Neon PostgreSQL",
  "Zod",
  "Zustand",
  "MDX",
  "Framer Motion",
];

export const systemIcons = {
  Database,
  GitBranch,
  MessageSquare,
  Sparkles,
};
