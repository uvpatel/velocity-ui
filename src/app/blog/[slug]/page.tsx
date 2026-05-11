import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const posts = {
  launch: {
    title: "Launching Velocity UI",
    description: "Why a registry-first SaaS template changes how teams ship component systems.",
    body: ["Registry manifests make install flows reproducible.", "Server Components keep the app shell fast.", "Auth and billing should live close to the product."],
  },
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:px-10 lg:px-12">
      <Card className="glass-panel border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6 text-sm leading-7 text-muted-foreground">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
