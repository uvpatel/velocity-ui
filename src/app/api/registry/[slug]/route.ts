import { NextResponse } from "next/server";
import { buildInstallCommand, getRegistryItem, toRegistryManifest } from "@/lib/registry";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const item = getRegistryItem(slug);

  if (!item) {
    return NextResponse.json({ error: "Registry item not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...item,
    installCommand: buildInstallCommand(item.slug),
    manifest: toRegistryManifest(item),
  });
}
