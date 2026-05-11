"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Command,
  Database,
  Globe2,
  LockKeyhole,
  Sparkles,
  Star,
  Triangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Registry-native architecture",
    description: "Publish, version, and distribute components through a shadcn-style manifest pipeline.",
    icon: Code2,
  },
  {
    title: "Better Auth + roles",
    description: "Email/password, GitHub, Google, onboarding, and admin-aware route protection.",
    icon: LockKeyhole,
  },
  {
    title: "Neon + Drizzle",
    description: "Typed data access, transaction support, and a schema ready for multi-tenant SaaS.",
    icon: Database,
  },
  {
    title: "CLI + install flow",
    description: "Ship `npx myui add button` style commands with dependency detection and registry sync.",
    icon: Command,
  },
];

const stats = [
  { value: "120+", label: "registry-ready surfaces" },
  { value: "99.9%", label: "server-first UX target" },
  { value: "1", label: "command to add components" },
  { value: "0", label: "runtime surprises" },
];

const registryItems = [
  "hero-bento",
  "billing-matrix",
  "ai-command-palette",
  "registry-card",
  "dashboard-shell",
  "docs-mdx-layout",
];

const checks = [
  "Server Components by default",
  "Dark mode first",
  "Monorepo-ready structure",
  "Accessible interactions",
  "Vercel deployment path",
  "CLI-compatible registry JSON",
];

const pricing = [
  { name: "Starter", price: "$0", copy: "Open-source template, registry, docs, and dashboard shell." },
  { name: "Pro", price: "$29", copy: "Advanced analytics, multi-team support, billing, and premium blocks." },
  { name: "Enterprise", price: "Custom", copy: "SSO, audit logs, approvals, and dedicated registry workflows." },
];

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40 mask-[linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-136 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_right,rgba(20,184,166,0.14),transparent_24%)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-6 md:px-10 lg:px-12">
        <header className="glass-panel sticky top-4 z-20 flex items-center justify-between rounded-3xl px-4 py-3">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Triangle className="size-4 fill-current" />
            </span>
            Velocity UI
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link href="#registry">Registry</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#pricing">Pricing</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <Badge className="gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
                <Sparkles className="size-3.5" />
                SaaS registry + component marketplace
              </Badge>

              <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Build a component ecosystem, not just a template.
              </h1>

              <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                Velocity UI combines a shadcn-style registry, Better Auth, Drizzle, MDX docs, a polished SaaS dashboard,
                and a CLI install flow into one open-source platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/sign-up">
                  Start building
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#registry">Explore registry</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <Card key={item.label} className="glass-panel border-white/10 bg-white/5">
                  <CardContent className="px-5 py-5">
                    <div className="text-3xl font-semibold tracking-tight text-foreground">{item.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[2rem] bg-linear-to-br from-sky-400/20 via-cyan-300/10 to-transparent blur-3xl" />
            <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-slate-950/90 text-slate-50 shadow-2xl shadow-slate-950/40">
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Globe2 className="size-4 text-cyan-300" />
                  Registry install preview
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Generate install commands, resolve dependencies, and copy code in one pass.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 py-6">
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-sm text-slate-200">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-400">
                    <span className="size-2 rounded-full bg-red-400" />
                    <span className="size-2 rounded-full bg-amber-300" />
                    <span className="size-2 rounded-full bg-emerald-400" />
                    npx myui add button
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap leading-6 text-slate-300">
{`Resolving registry item: button
Detected Next.js App Router + Tailwind v4
Installing dependencies: class-variance-authority, lucide-react
Writing component to src/components/ui/button.tsx
Sync complete`}
                  </pre>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {checks.map((check) => (
                    <div key={check} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      <Check className="mt-0.5 size-4 text-cyan-300" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <Card className="h-full glass-panel border-white/10 bg-white/5">
                <CardHeader>
                  <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-6">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </section>

        <section id="registry" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <Badge variant="outline" className="rounded-full px-3 py-1.5">
              Registry surface
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A component marketplace that feels like infrastructure.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Organize components by category, tag, status, and version. Publish manifests, preview demos, and let the CLI pull typed registry entries directly into user projects.
            </p>

            <div className="flex flex-wrap gap-2">
              {registryItems.map((item) => (
                <Badge key={item} variant="secondary" className="rounded-full px-3 py-1.5 text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="h-full glass-panel border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      {plan.name}
                      <span className="text-lg font-semibold text-foreground">{plan.price}</span>
                    </CardTitle>
                    <CardDescription className="text-sm leading-6">{plan.copy}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <Button variant="outline" className="w-full rounded-2xl" asChild>
                      <Link href="/dashboard">View plan</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-panel border-white/10 bg-white/5 lg:col-span-2">
            <CardHeader>
              <CardTitle>Dashboard preview</CardTitle>
              <CardDescription>
                Saved components, audit logs, team workspaces, API keys, and approvals in one cohesive shell.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {[
                ["Favorites", "2,381"],
                ["Downloads", "98.4k"],
                ["Reviews", "4.9/5"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-background/60 p-4">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className="mt-2 text-2xl font-semibold">{value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Everything typed</CardTitle>
              <CardDescription>
                Next.js 16, TypeScript, Tailwind v4, Better Auth, Drizzle, Neon, and MDX as a single production stack.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <Star className="size-4 text-amber-400" />
                Open-source registry workflow
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Star className="size-4 text-amber-400" />
                CLI + app + docs ecosystem
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Star className="size-4 text-amber-400" />
                Responsive, accessible, and dark-first
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="pricing" className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <Badge variant="outline" className="rounded-full px-3 py-1.5">
              Pricing
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">Monetization-ready from the start.</h2>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Build an open-source core, then layer premium templates, team collaboration, moderation, analytics, and marketplace workflows on top.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pricing.map((plan) => (
              <Card key={plan.name} className="glass-panel border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.copy}</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-4 text-3xl font-semibold">{plan.price}</div>
                  <Button className="w-full" variant={plan.name === "Pro" ? "default" : "outline"} asChild>
                    <Link href="/dashboard">Choose {plan.name.toLowerCase()}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-3 rounded-full px-3 py-1.5">Ready to ship</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">A clean foundation for docs, registry, CLI, and SaaS growth.</h2>
            </div>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Open the app
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {[
              "App Router",
              "Server Components",
              "Edge-ready APIs",
              "Registry JSON",
              "MDX docs",
              "Vercel-friendly",
            ].map((label) => (
              <Badge key={label} variant="secondary" className="rounded-full px-3 py-1.5">
                {label}
              </Badge>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}