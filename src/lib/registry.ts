export type RegistryItem = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  dependencies: Record<string, string>;
  files: Array<{ path: string; type: string }>;
  previewUrl?: string;
  installCommand: string;
};

export const registryCatalog: RegistryItem[] = [
  {
    slug: "button",
    name: "Button",
    description: "A flexible control with premium states and accessible defaults.",
    category: "primitives",
    tags: ["forms", "cta", "interactive"],
    version: "1.0.0",
    dependencies: {
      "class-variance-authority": "^0.7.1",
      "tailwind-merge": "^3.4.0",
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/ui/button.tsx", type: "component" }],
    previewUrl: "/registry/button",
    installCommand: "pnpm dlx myui add button",
  },
  {
    slug: "dashboard-shell",
    name: "Dashboard Shell",
    description: "A composable app shell for SaaS dashboards and team experiences.",
    category: "dashboard",
    tags: ["layout", "navigation", "teams"],
    version: "1.0.0",
    dependencies: {
      "lucide-react": "^0.563.0",
    },
    files: [{ path: "src/components/site/dashboard-shell.tsx", type: "component" }],
    previewUrl: "/dashboard",
    installCommand: "pnpm dlx myui add dashboard-shell",
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
  return `pnpm dlx myui add ${slug}`;
}
