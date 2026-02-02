import fs from "fs";
import path from "path";

export async function add(url) {
  console.log("📦 Fetching component...");

  const res = await fetch(url);
  if (!res.ok) {
    console.error("❌ Failed to fetch registry");
    process.exit(1);
  }

  const data = await res.json();

  for (const file of data.files) {
    const fullPath = path.join(process.cwd(), file.path);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, file.content.trim());

    console.log("✔ Added", file.path);
  }

  console.log("✨ Done!");
}
