import type { LucideIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => (
        <Card key={feature.title} className="glass-panel h-full border-white/10 bg-white/5">
          <CardHeader>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <feature.icon className="size-5" />
            </div>
            <CardTitle className="text-base">{feature.title}</CardTitle>
            <CardDescription className="leading-6">{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
}
