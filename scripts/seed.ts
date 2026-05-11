import { registryCatalog } from "../src/lib/registry";
import { categories, registryItems, users } from "../src/db/schema";
import { database } from "../src/lib/db";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log(`DATABASE_URL is not set. Dry-run seed for ${registryCatalog.length} registry items.`);

    for (const item of registryCatalog) {
      console.log(`- ${item.slug} (${item.version})`);
    }

    return;
  }

  const [owner] = await database
    .insert(users)
    .values({
      name: "Velocity Maintainer",
      email: "maintainer@velocity-ui.com",
      emailVerified: true,
      role: "admin",
      onboardingComplete: true,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        name: "Velocity Maintainer",
        role: "admin",
        onboardingComplete: true,
      },
    })
    .returning();

  for (const item of registryCatalog) {
    const [category] = await database
      .insert(categories)
      .values({
        name: item.category,
        slug: item.category,
        description: `${item.category} components for Velocity UI.`,
      })
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: item.category,
        },
      })
      .returning();

    await database
      .insert(registryItems)
      .values({
        ownerId: owner.id,
        categoryId: category.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        sourcePath: item.files[0]?.path ?? "src/components",
        previewUrl: item.previewUrl,
        installCommand: item.installCommand,
        registryPath: `/api/registry/${item.slug}/manifest`,
        state: item.status === "stable" ? "published" : "review",
        version: item.version,
        dependencies: item.dependencies,
        files: item.files,
        downloads: item.analytics.downloads,
        likesCount: item.analytics.likes,
      })
      .onConflictDoUpdate({
        target: registryItems.slug,
        set: {
          description: item.description,
          version: item.version,
          installCommand: item.installCommand,
          dependencies: item.dependencies,
          files: item.files,
        },
      });

    console.log(`Seeded ${item.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
