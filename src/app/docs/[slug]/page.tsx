import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/site/page-shell";
import { docs, docsNav } from "@/lib/platform";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = docs[slug as keyof typeof docs];

  if (!doc) {
    notFound();
  }

  return (
    <PageShell className="max-w-5xl">
      <div className="flex flex-wrap gap-2">
        {docsNav.map((item) => (
          <Link key={item.href} href={item.href as Route} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground">
            {item.title}
          </Link>
        ))}
      </div>
      <Card className="glass-panel border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>{doc.title}</CardTitle>
          <CardDescription>{doc.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-6 text-sm text-muted-foreground">
          {doc.sections.map((section, index) => (
            <div key={section} className="rounded-2xl border border-white/10 bg-background/60 px-4 py-3">
              {index + 1}. {section}
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
