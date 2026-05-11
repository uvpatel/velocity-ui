import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { registryCatalog } from "../src/lib/registry";

async function main() {
  const output = resolve(process.cwd(), "public/registry/index.json");
  await writeFile(output, JSON.stringify({ registry: registryCatalog, generatedAt: new Date().toISOString() }, null, 2), "utf8");
  console.log(`Wrote registry manifest to ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
