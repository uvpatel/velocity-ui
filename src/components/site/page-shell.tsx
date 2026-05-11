import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-pattern opacity-35 mask-[linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_36%),radial-gradient(circle_at_right,rgba(20,184,166,0.12),transparent_28%)]" />
      <SiteHeader />
      <div className={cn("mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:px-10 lg:px-12", className)}>
        {children}
      </div>
    </main>
  );
}
