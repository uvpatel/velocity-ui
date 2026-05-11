import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileCode2, Heart, Package } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRegistryItem, registryCatalog, toRegistryManifest } from "@/lib/registry";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return registryCatalog.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  return {
    title: item ? item.name : "Registry item",
    description: item?.description,
  };
}

export default async function RegistryItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) {
    notFound();
  }

  const manifest = toRegistryManifest(item);

  return (
    <PageShell>
      <Button variant="ghost" size="sm" className="w-fit" asChild>
        <Link href="/registry">
          <ArrowLeft className="size-4" />
          Back to registry
        </Link>
      </Button>

      <SectionHeading eyebrow={item.category} title={item.name} description={item.description} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Install</CardTitle>
            <CardDescription>Use the CLI command or fetch the manifest directly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="rounded-xl border border-white/10 bg-black/60 p-4 font-mono text-sm text-slate-200">
              {item.installCommand}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-background/70 p-4">
                <Download className="mb-3 size-4 text-muted-foreground" />
                <div className="text-2xl font-semibold">{item.analytics.downloads.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/70 p-4">
                <Heart className="mb-3 size-4 text-muted-foreground" />
                <div className="text-2xl font-semibold">{item.analytics.likes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/70 p-4">
                <Package className="mb-3 size-4 text-muted-foreground" />
                <div className="text-2xl font-semibold">{item.version}</div>
                <div className="text-sm text-muted-foreground">Version</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Manifest</CardTitle>
            <CardDescription>CLI-compatible registry metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full">{item.status}</Badge>
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
            <pre className="max-h-[420px] overflow-auto rounded-xl border border-white/10 bg-black/60 p-4 text-xs leading-6 text-slate-300">
              {JSON.stringify(manifest, null, 2)}
            </pre>
            <Button variant="outline" asChild>
              <Link href={`/api/registry/${item.slug}/manifest`}>
                <FileCode2 className="size-4" />
                Open JSON manifest
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
