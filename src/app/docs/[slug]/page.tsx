import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const docs = {
  "getting-started": {
    title: "Getting started",
    description: "Set up Velocity UI, connect auth, and publish your first registry item.",
    sections: ["Install dependencies with pnpm", "Copy .env.example", "Run database migrations", "Open the dashboard"],
  },
  registry: {
    title: "Registry architecture",
    description: "Understand manifests, versioning, dependencies, and install flows.",
    sections: ["Manifest schema", "CLI install flow", "Publishing workflow", "Preview rendering"],
  },
} as const;

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
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:px-10 lg:px-12">
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
    </main>
  );
}
