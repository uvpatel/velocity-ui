import { Check } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  { name: "Open Source", price: "$0", description: "Registry, docs, CLI starter, and core dashboard shell.", cta: "Start free" },
  { name: "Pro", price: "$29", description: "Team workspaces, analytics, billing surfaces, and premium blocks.", cta: "Choose Pro" },
  { name: "Enterprise", price: "Custom", description: "SSO, approvals, advanced audit logs, and private registry support.", cta: "Talk to sales" },
];

const features = ["Unlimited public components", "Versioned registry manifests", "CLI install workflow", "Role-aware dashboard", "API keys and audit logs"];

export const metadata = {
  title: "Pricing",
  description: "Velocity UI pricing plans for open-source users, teams, and enterprise registries.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Pricing"
        title="Open-source core, commercial-grade expansion."
        description="Start with the full registry foundation, then layer team collaboration, moderation, billing, and private registry workflows as your product grows."
      />
      <section className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="glass-panel border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="leading-6">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pb-6">
              <div className="text-4xl font-semibold">{plan.price}</div>
              <Button className="w-full" variant={plan.name === "Pro" ? "default" : "outline"}>
                {plan.cta}
              </Button>
              <div className="space-y-3 text-sm text-muted-foreground">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}
