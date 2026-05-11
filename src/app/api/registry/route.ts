import { NextResponse } from "next/server";
import { getRegistryCategories, getRegistryTags, registryCatalog, searchRegistry } from "@/lib/registry";
import { registrySearchSchema } from "@/lib/validations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = registrySearchSchema.safeParse({
    q: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? undefined,
    tag: searchParams.get("tag") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registry query", issues: parsed.error.flatten() }, { status: 400 });
  }

  const filtered = searchRegistry(parsed.data.q).filter((item) => {
    const matchesCategory = parsed.data.category ? item.category === parsed.data.category : true;
    const matchesTag = parsed.data.tag ? item.tags.includes(parsed.data.tag) : true;
    return matchesCategory && matchesTag;
  });

  return NextResponse.json({
    registry: filtered,
    total: registryCatalog.length,
    categories: getRegistryCategories(),
    tags: getRegistryTags(),
    generatedAt: new Date().toISOString(),
  });
}
