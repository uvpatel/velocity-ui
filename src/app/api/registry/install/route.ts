import { NextResponse } from "next/server";
import { buildInstallCommand, getRegistryItem } from "@/lib/registry";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { slug?: string } | null;

  if (!body?.slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const item = getRegistryItem(body.slug);

  if (!item) {
    return NextResponse.json({ error: "Registry item not found" }, { status: 404 });
  }

  return NextResponse.json({
    slug: item.slug,
    command: buildInstallCommand(item.slug),
    dependencies: item.dependencies,
  });
}
