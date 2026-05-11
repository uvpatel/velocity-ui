import Link from "next/link";
import { ArrowRight, Github, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="glass-panel sticky top-4 z-30 mx-auto flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
      <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-tight">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Triangle className="size-4 fill-current" />
        </span>
        Velocity UI
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {siteConfig.nav.map((item) => (
          <Button key={item.href} variant="ghost" size="sm" asChild>
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={siteConfig.links.github} aria-label="Open Velocity UI on GitHub">
            <Github className="size-4" />
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/dashboard">
            Dashboard
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
