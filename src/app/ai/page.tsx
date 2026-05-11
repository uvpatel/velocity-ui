import { Bot, WandSparkles } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiGeneratorPresets } from "@/lib/platform";

export const metadata = {
  title: "AI Component Generator",
  description: "Generate and refine Velocity UI components from product-aware prompts.",
};

export default function AiGeneratorPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="AI generator"
        title="Prompt, preview, and promote components into the registry."
        description="A production-oriented AI surface for generating component drafts with registry metadata, dependency awareness, and review workflows."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <Card className="glass-panel border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="size-5" />
              Generator console
            </CardTitle>
            <CardDescription>Draft components using structured prompts and promote reviewed outputs into registry manifests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="min-h-36 rounded-xl border border-white/10 bg-background/70 p-4 text-sm text-muted-foreground">
              Describe a component, target route, dependencies, accessibility requirements, and preferred interaction model.
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">RSC-aware</Badge>
              <Badge variant="secondary" className="rounded-full">Tailwind v4</Badge>
              <Badge variant="secondary" className="rounded-full">shadcn/ui</Badge>
              <Badge variant="secondary" className="rounded-full">Manifest output</Badge>
            </div>
            <Button>
              <WandSparkles className="size-4" />
              Generate draft
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {aiGeneratorPresets.map((preset) => (
            <Card key={preset.title} className="glass-panel border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">{preset.title}</CardTitle>
                <CardDescription className="leading-6">{preset.prompt}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
