import { NextResponse } from "next/server";
import { buildInstallCommand, getRegistryItem, toRegistryManifest } from "@/lib/registry";
import { installRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = installRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid install request", issues: parsed.error.flatten() }, { status: 400 });
  }

  const item = getRegistryItem(parsed.data.slug);

  if (!item) {
    return NextResponse.json({ error: "Registry item not found" }, { status: 404 });
  }

  return NextResponse.json({
    slug: item.slug,
    command: buildInstallCommand(item.slug),
    dependencies: item.dependencies,
    manifest: await toRegistryManifest(item),
  });
}
