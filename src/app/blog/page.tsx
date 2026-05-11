import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "@/lib/platform";

export const metadata = {
  title: "Blog",
  description: "Velocity UI product and engineering essays.",
};

export default function BlogIndexPage() {
  return (
    <PageShell>
      <SectionHeading eyebrow="Blog" title="Notes on building component platforms." />
      <section className="grid gap-4 md:grid-cols-2">
        {Object.entries(posts).map(([slug, post]) => (
          <Link key={slug} href={`/blog/${slug}`}>
            <Card className="glass-panel h-full border-white/10 bg-white/5 transition hover:bg-white/10">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="leading-6">{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
