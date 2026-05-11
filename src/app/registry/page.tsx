import { RegistryCard } from "@/components/site/registry-card";
import { PageShell } from "@/components/site/page-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { getRegistryCategories, getRegistryTags, registryCatalog } from "@/lib/registry";

export const metadata = {
  title: "Registry",
  description: "Explore Velocity UI registry components, manifests, dependencies, and install commands.",
};

export default function RegistryPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Registry"
        title="Installable components with production metadata."
        description="Browse versioned registry items with dependencies, docs, previews, tags, analytics, and CLI-ready manifests."
      />

      <section className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="glass-panel rounded-2xl border-white/10 bg-white/5 p-5">
          <h2 className="font-semibold">Filters</h2>
          <div className="mt-4 space-y-5">
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Categories</div>
              <div className="flex flex-wrap gap-2">
                {getRegistryCategories().map((category) => (
                  <Badge key={category} variant="outline" className="rounded-full">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 text-sm text-muted-foreground">Tags</div>
              <div className="flex flex-wrap gap-2">
                {getRegistryTags().map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {registryCatalog.map((item) => (
            <RegistryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
