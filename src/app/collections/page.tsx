import { FolderKanban } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const collections = [
  { name: "Launch kit", count: 12, description: "Hero, pricing, FAQ, CTA, and docs blocks." },
  { name: "Dashboard core", count: 18, description: "Shell, widgets, tables, filters, activity, and settings." },
  { name: "AI product surfaces", count: 9, description: "Chat, command palette, prompt composer, and generation history." },
];

export const metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <PageShell>
      <SectionHeading eyebrow="Collections" title="Curated component systems for teams." />
      <section className="grid gap-4 md:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.name} className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <FolderKanban className="size-5" />
                </span>
                <Badge variant="secondary" className="rounded-full">{collection.count} items</Badge>
              </div>
              <CardTitle>{collection.name}</CardTitle>
              <CardDescription className="leading-6">{collection.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-6 text-sm text-muted-foreground">Shared with workspace maintainers.</CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
