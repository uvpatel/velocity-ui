export const siteConfig = {
  name: "Velocity UI",
  description: "An open-source UI library, component registry, and SaaS platform for modern product teams.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://velocity-ui.com",
  links: {
    github: "https://github.com/velocity-ui/velocity-ui",
    docs: "/docs/getting-started",
    registry: "/registry",
  },
  nav: [
    { title: "Components", href: "/components" },
    { title: "Registry", href: "/registry" },
    { title: "Docs", href: "/docs/getting-started" },
    { title: "Pricing", href: "/pricing" },
    { title: "Changelog", href: "/changelog" },
  ],
} as const;
