"use server";

import { revalidateTag } from "next/cache";
import { getRegistryItem, toRegistryManifest } from "@/lib/registry";
import { installRequestSchema } from "@/lib/validations";

export async function createInstallIntent(input: unknown) {
  const parsed = installRequestSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Invalid registry item." } as const;
  }

  const item = getRegistryItem(parsed.data.slug);

  if (!item) {
    return { ok: false, error: "Registry item not found." } as const;
  }

  revalidateTag("registry-installs", "max");

  return {
    ok: true,
    command: item.installCommand,
    manifest: await toRegistryManifest(item),
  } as const;
}
