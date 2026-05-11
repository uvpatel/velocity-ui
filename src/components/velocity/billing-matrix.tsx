import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", price: "$0", features: ["Public registry", "CLI installs", "Docs templates"] },
  { name: "Pro", price: "$29", features: ["Team analytics", "Private collections", "Billing workflows"] },
  { name: "Enterprise", price: "Custom", features: ["SSO", "Approval queues", "Dedicated registry"] },
];

export function BillingMatrix() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <div key={plan.name} className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="text-sm text-muted-foreground">{plan.name}</div>
          <div className="mt-2 text-3xl font-semibold">{plan.price}</div>
          <div className="mt-5 space-y-3 text-sm">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                <Check className="size-4 text-emerald-500" />
                {feature}
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full" variant={plan.name === "Pro" ? "default" : "outline"}>
            Choose {plan.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
