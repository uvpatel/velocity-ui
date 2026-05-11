import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { changelog } from "@/lib/platform";

export const metadata = {
  title: "Changelog",
  description: "Product updates for Velocity UI.",
};

export default function ChangelogPage() {
  return (
    <PageShell className="max-w-4xl">
      <SectionHeading eyebrow="Changelog" title="Product updates with enough context to ship confidently." />
      <section className="space-y-4">
        {changelog.map((entry) => (
          <Card key={entry.version} className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <div className="font-mono text-sm text-muted-foreground">{entry.date}</div>
              <CardTitle>{entry.version} - {entry.title}</CardTitle>
              <CardDescription>Released as part of the Velocity UI platform roadmap.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-muted-foreground">
              {entry.items.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-background/70 px-4 py-3">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
