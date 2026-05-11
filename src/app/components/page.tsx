import { FeatureGrid } from "@/components/site/feature-grid";
import { PageShell } from "@/components/site/page-shell";
import { RegistryCard } from "@/components/site/registry-card";
import { SectionHeading } from "@/components/site/section-heading";
import { componentCategories } from "@/lib/platform";
import { registryCatalog } from "@/lib/registry";

export const metadata = {
  title: "Components",
  description: "Reusable Velocity UI primitives, blocks, dashboards, AI interfaces, and content systems.",
};

export default function ComponentsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Components"
        title="Premium interface building blocks for real products."
        description="Velocity UI ships accessible primitives and higher-order SaaS surfaces designed for registries, dashboards, docs, AI tools, and billing workflows."
      />
      <FeatureGrid features={componentCategories} />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {registryCatalog.map((item) => (
          <RegistryCard key={item.slug} item={item} />
        ))}
      </section>
    </PageShell>
  );
}
