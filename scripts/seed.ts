import { registryCatalog } from "../src/lib/registry";

async function main() {
  console.log(`Seeding ${registryCatalog.length} registry items and core SaaS references.`);

  for (const item of registryCatalog) {
    console.log(`- ${item.slug} (${item.version})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
