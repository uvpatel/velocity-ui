import { PageShell } from "@/components/site/page-shell";
import { RegistryCard } from "@/components/site/registry-card";
import { SectionHeading } from "@/components/site/section-heading";
import { registryCatalog } from "@/lib/registry";

export const metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Favorites"
        title="Saved components for your next build."
        description="A focused workspace for components your team uses repeatedly across apps, docs, and prototypes."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {registryCatalog.slice(0, 3).map((item) => (
          <RegistryCard key={item.slug} item={item} />
        ))}
      </section>
    </PageShell>
  );
}
