import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { BarChart3, Boxes, FolderHeart, Settings, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Overview", href: "/dashboard", icon: BarChart3 },
  { title: "Registry", href: "/registry", icon: Boxes },
  { title: "Favorites", href: "/favorites", icon: FolderHeart },
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Admin", href: "/admin", icon: ShieldCheck },
];

type DashboardShellProps = {
  children: ReactNode;
  className?: string;
};

export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div className={cn("grid min-h-screen bg-background text-foreground lg:grid-cols-[17rem_1fr]", className)}>
      <aside className="hidden border-r border-border/60 bg-card/40 p-4 lg:block">
        <Link href="/" className="mb-6 flex items-center gap-3 rounded-xl px-3 py-2 font-semibold">
          <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.6)]" />
          Velocity UI
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="min-w-0">{children}</section>
    </div>
  );
}
