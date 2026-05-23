import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export type RegistryItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  status: "stable" | "beta" | "experimental";
  dependencies: Record<string, string>;
  devDependencies?: Record<string, string>;
  files: Array<{ path: string; type: string }>;
  cssVars?: Record<string, string>;
  docsPath: string;
  previewUrl?: string;
  installCommand: string;
  analytics: {
    downloads: number;
    likes: number;
  };
};

export type RegistryManifestFile = RegistryItem["files"][number] & {
  content?: string;
};

export const registryCatalog: RegistryItem[] = [
  {
    slug: "button",
    name: "Button",
    description: "A flexible control with premium states and accessible defaults.",
    category: "primitives",
    tags: ["forms", "cta", "interactive"],
    version: "1.0.0",
    status: "stable",
    dependencies: {
      "class-variance-authority": "^0.7.1",
      "tailwind-merge": "^3.4.0",
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/ui/button.tsx", type: "component" }],
    cssVars: {
      "--radius": "0.625rem",
      "--primary": "oklch(0.98 0.01 240)",
    },
    docsPath: "/docs/registry",
    previewUrl: "/registry/button",
    installCommand: "pnpm dlx velocity-ui add button",
    analytics: {
      downloads: 48200,
      likes: 3100,
    },
  },
  {
    slug: "dashboard-shell",
    name: "Dashboard Shell",
    description: "A composable app shell for SaaS dashboards and team experiences.",
    category: "dashboard",
    tags: ["layout", "navigation", "teams"],
    version: "1.0.0",
    status: "stable",
    dependencies: {
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/site/dashboard-shell.tsx", type: "component" }],
    docsPath: "/docs/registry",
    previewUrl: "/dashboard",
    installCommand: "pnpm dlx velocity-ui add dashboard-shell",
    analytics: {
      downloads: 28900,
      likes: 1900,
    },
  },
  {
    slug: "ai-command-palette",
    name: "AI Command Palette",
    description: "A command interface for prompts, tool calls, shortcuts, and generated component history.",
    category: "ai",
    tags: ["command", "ai", "productivity"],
    version: "0.8.0",
    status: "beta",
    dependencies: {
      "lucide-react": "^0.563.0",
      zustand: "^5.0.8",
    },
    files: [{ path: "src/components/velocity/ai-command-palette.tsx", type: "component" }],
    docsPath: "/docs/cli",
    previewUrl: "/ai",
    installCommand: "pnpm dlx velocity-ui add ai-command-palette",
    analytics: {
      downloads: 14200,
      likes: 860,
    },
  },
  {
    slug: "billing-matrix",
    name: "Billing Matrix",
    description: "A responsive pricing and entitlement surface for SaaS billing and plan comparison.",
    category: "commerce",
    tags: ["billing", "pricing", "subscriptions"],
    version: "0.9.0",
    status: "beta",
    dependencies: {
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/velocity/billing-matrix.tsx", type: "component" }],
    docsPath: "/docs/getting-started",
    previewUrl: "/pricing",
    installCommand: "pnpm dlx velocity-ui add billing-matrix",
    analytics: {
      downloads: 19600,
      likes: 1200,
    },
  },
  {
    slug: "kanban-board",
    name: "Kanban Board",
    description: "A keyboard-accessible project board with lanes, cards, activity, and empty states.",
    category: "workflows",
    tags: ["kanban", "dashboard", "collaboration"],
    version: "0.6.0",
    status: "experimental",
    dependencies: {
      "framer-motion": "^12.35.1",
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/velocity/kanban-board.tsx", type: "component" }],
    docsPath: "/docs/registry",
    previewUrl: "/components",
    installCommand: "pnpm dlx velocity-ui add kanban-board",
    analytics: {
      downloads: 7200,
      likes: 510,
    },
  },
];

export function getRegistryItem(slug: string) {
  return registryCatalog.find((item) => item.slug === slug);
}

export function searchRegistry(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return registryCatalog;
  }

  return registryCatalog.filter((item) => {
    const haystack = [item.name, item.description, item.category, item.tags.join(" ")].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}

export function buildInstallCommand(slug: string) {
  return `velocity-ui add ${slug}`;
}

export function getRegistryCategories() {
  return Array.from(new Set(registryCatalog.map((item) => item.category))).sort();
}

export function getRegistryTags() {
  return Array.from(new Set(registryCatalog.flatMap((item) => item.tags))).sort();
}

async function hydrateRegistryFiles(item: RegistryItem): Promise<RegistryManifestFile[]> {
  const workspaceRoot = resolve(process.cwd());

  return Promise.all(
    item.files.map(async (file) => {
      const absolutePath = resolve(workspaceRoot, file.path);

      if (!absolutePath.startsWith(workspaceRoot) || !existsSync(absolutePath)) {
        return file;
      }

      const content = await readFile(absolutePath, "utf8");
      return { ...file, content };
    }),
  );
}

export async function toRegistryManifest(item: RegistryItem) {
  const files = await hydrateRegistryFiles(item);

  return {
    $schema: "https://velocity-ui.com/schema/registry-item.json",
    name: item.slug,
    title: item.name,
    description: item.description,
    type: "registry:component",
    version: item.version,
    status: item.status,
    registryDependencies: [],
    dependencies: item.dependencies,
    devDependencies: item.devDependencies ?? {},
    files: files.map((file) => ({
      path: file.path,
      type: file.type,
      target: file.path,
      content: file.content,
    })),
    cssVars: item.cssVars ?? {},
    meta: {
      category: item.category,
      tags: item.tags,
      docs: item.docsPath,
      preview: item.previewUrl,
    },
  };
}
