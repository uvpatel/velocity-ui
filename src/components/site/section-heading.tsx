import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, action, className }: SectionHeadingProps) {
  return (
    <section className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-3">
        {eyebrow ? (
          <Badge variant="outline" className="rounded-full px-3 py-1.5">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {description ? <p className="max-w-2xl text-pretty text-muted-foreground sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  );
}
