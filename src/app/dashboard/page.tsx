import Link from "next/link";
import { ArrowRight, BarChart3, Bell, ClipboardList, FolderKanban, LayoutGrid, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { MetricGrid } from "@/components/site/metric-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardModules, productStats } from "@/lib/platform";

const widgets = [
  { label: "Active users", value: "12.4k", delta: "+18.4%" },
  { label: "Registry installs", value: "48.2k", delta: "+11.2%" },
  { label: "Teams", value: "342", delta: "+7.8%" },
  { label: "Revenue", value: "$84k", delta: "+24.1%" },
];

const shortcuts = [
  { title: "Manage components", href: "/registry", icon: LayoutGrid },
  { title: "Review approvals", href: "/admin", icon: ShieldCheck },
  { title: "Team billing", href: "/settings/billing", icon: FolderKanban },
];

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge className="rounded-full px-3 py-1.5">Dashboard</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">Welcome back, builder.</h1>
          <p className="max-w-2xl text-muted-foreground">
            Monitor registry growth, moderation, subscriptions, and team activity from a single server-rendered surface.
          </p>
        </div>

        <Button asChild>
          <Link href="/registry">
            Browse registry
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>

      <MetricGrid metrics={[...widgets, ...productStats].slice(0, 4)} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardModules.map((module) => (
          <Card key={module.title} className="glass-panel border-white/10 bg-white/5">
            <CardContent className="flex items-start gap-4 px-6 py-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <module.icon className="size-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{module.title}</CardTitle>
                  <Badge variant="secondary" className="rounded-full">{module.value}</Badge>
                </div>
                <CardDescription className="mt-2 leading-6">{module.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="glass-panel border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Live registry and team events across your organization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            {[
              ["button", "Published v1.0.0", "2 minutes ago"],
              ["billing-matrix", "Added to Pro collection", "18 minutes ago"],
              ["settings", "OAuth connection updated", "1 hour ago"],
            ].map(([name, action, time]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/70 px-4 py-3">
                <div>
                  <div className="font-medium text-foreground">{name}</div>
                  <div className="text-sm text-muted-foreground">{action}</div>
                </div>
                <div className="text-sm text-muted-foreground">{time}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {shortcuts.map((shortcut) => (
            <Card key={shortcut.title} className="glass-panel border-white/10 bg-white/5">
              <CardContent className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <shortcut.icon className="size-5" />
                  </span>
                  <div>
                    <div className="font-medium">{shortcut.title}</div>
                    <div className="text-sm text-muted-foreground">Open the workflow</div>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}

          <Card className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Platform health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground"><Bell className="size-4" /> Notifications queue healthy</div>
              <div className="flex items-center gap-2 text-foreground"><Users className="size-4" /> Team invitations active</div>
              <div className="flex items-center gap-2 text-foreground"><Sparkles className="size-4" /> Registry sync ready</div>
              <div className="flex items-center gap-2 text-foreground"><BarChart3 className="size-4" /> Analytics ingestion stable</div>
              <div className="flex items-center gap-2 text-foreground"><ClipboardList className="size-4" /> Audit logging enabled</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
