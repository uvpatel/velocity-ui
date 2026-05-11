import type { RegistryItem } from "@/lib/registry";

export type RegistryManifest = ReturnType<typeof import("@/lib/registry").toRegistryManifest>;

export type RegistryCatalogResponse = {
  registry: RegistryItem[];
  total: number;
  categories: string[];
  tags: string[];
  generatedAt: string;
};
