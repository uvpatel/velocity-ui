import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { docs } from "@/lib/platform";

export const metadata = {
  title: "Docs",
  description: "Velocity UI documentation for setup, registry, CLI, auth, and database architecture.",
};

export default function DocsIndexPage() {
  return (
    <PageShell>
      <SectionHeading eyebrow="Docs" title="Build, publish, and operate Velocity UI." />
      <section className="grid gap-4 md:grid-cols-2">
        {Object.entries(docs).map(([slug, doc]) => (
          <Link key={slug} href={`/docs/${slug}`}>
            <Card className="glass-panel h-full border-white/10 bg-white/5 transition hover:bg-white/10">
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription className="leading-6">{doc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
