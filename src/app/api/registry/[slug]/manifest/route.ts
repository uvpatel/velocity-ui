import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getRegistryItem, toRegistryManifest } from "@/lib/registry";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) {
    return NextResponse.json({ error: "Registry item not found" }, { status: 404 });
  }

  const manifest = await toRegistryManifest(item);
  const root = process.cwd();

  const files = await Promise.all(
    manifest.files.map(async (file) => {
      const sourcePath = resolve(root, file.path);

      if (!sourcePath.startsWith(root)) {
        return file;
      }

      const content = await readFile(sourcePath, "utf8").catch(() => undefined);
      return content ? { ...file, content } : file;
    }),
  );

  return NextResponse.json({ ...manifest, files });
}
