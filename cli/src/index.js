#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const REGISTRY_BASE_URL = process.env.REGISTRY_BASE_URL ?? "https://velocity-ui.com";

function printHelp() {
  console.log(`Velocity UI CLI

Usage:
  npx velocity-ui add <component>
  npx velocity-ui sync
  npx velocity-ui init

Environment:
  REGISTRY_BASE_URL  Override registry origin for local development
`);
}

function detectProject(cwd) {
  const packageJsonPath = join(cwd, "package.json");
  const packageJson = existsSync(packageJsonPath) ? JSON.parse(readFileSync(packageJsonPath, "utf8")) : {};
  const dependencies = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };

  return {
    packageManager: existsSync(join(cwd, "pnpm-lock.yaml")) ? "pnpm" : existsSync(join(cwd, "bun.lock")) ? "bun" : "npm",
    hasNext: Boolean(dependencies.next),
    hasTailwindV4: Boolean(dependencies.tailwindcss?.startsWith("^4") || dependencies.tailwindcss?.startsWith("4")),
    hasSrcDir: existsSync(join(cwd, "src")),
  };
}

async function fetchManifest(slug) {
  const response = await fetch(`${REGISTRY_BASE_URL}/api/registry/${slug}/manifest`);

  if (!response.ok) {
    throw new Error(`Registry item "${slug}" was not found.`);
  }

  return response.json();
}

function writeConfig(cwd) {
  const target = join(cwd, "velocity.config.json");

  if (existsSync(target)) {
    console.log("velocity.config.json already exists");
    return;
  }

  writeFileSync(
    target,
    JSON.stringify(
      {
        $schema: "https://velocity-ui.com/schema/config.json",
        registry: REGISTRY_BASE_URL,
        aliases: {
          components: "src/components",
          ui: "src/components/ui",
          lib: "src/lib",
        },
      },
      null,
      2,
    ),
  );
  console.log("Created velocity.config.json");
}

async function addComponent(slug) {
  const cwd = process.cwd();
  const project = detectProject(cwd);
  const manifest = await fetchManifest(slug);

  if (!project.hasNext) {
    console.warn("Next.js was not detected. Continuing because registry files are framework-readable.");
  }

  if (!project.hasTailwindV4) {
    console.warn("Tailwind CSS v4 was not detected. Verify styling tokens after install.");
  }

  for (const file of manifest.files ?? []) {
    const targetPath = resolve(cwd, file.target ?? file.path);
    const relativeTarget = targetPath.slice(resolve(cwd).length);

    if (!targetPath.startsWith(resolve(cwd)) || relativeTarget.includes("..")) {
      throw new Error(`Refusing to write outside the current workspace: ${file.target ?? file.path}`);
    }

    if (!file.content) {
      console.warn(`Skipping ${file.target ?? file.path}; registry did not provide inline source content.`);
      continue;
    }

    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, file.content, { flag: "wx" });
    console.log(`Created ${file.target ?? file.path}`);
  }

  console.log(`Resolved dependencies: ${Object.keys(manifest.dependencies ?? {}).join(", ") || "none"}`);
  console.log(`Use ${project.packageManager} to install any dependencies listed above.`);
}

async function main() {
  const [, , command, slug] = process.argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    writeConfig(process.cwd());
    return;
  }

  if (command === "sync") {
    const response = await fetch(`${REGISTRY_BASE_URL}/api/registry`);
    const catalog = await response.json();
    console.log(`Registry contains ${catalog.registry?.length ?? 0} components`);
    return;
  }

  if (command === "add" && slug) {
    await addComponent(slug);
    return;
  }

  printHelp();
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
