#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const DEFAULT_REGISTRY_BASE_URL = process.env.REGISTRY_BASE_URL ?? "https://velocity-ui.com";
const CONFIG_FILE = "velocity.config.json";

function printHelp() {
  console.log(`Velocity UI CLI

Usage:
  velocity-ui add <component-or-url>
  velocity-ui init
  velocity-ui registry build
  velocity-ui sync

Environment:
  REGISTRY_BASE_URL  Override registry origin for local development
`);
}

function detectProject(cwd) {
  const packageJsonPath = join(cwd, "package.json");
  const packageJson = existsSync(packageJsonPath) ? JSON.parse(readFileSync(packageJsonPath, "utf8")) : {};
  const dependencies = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };

  return {
    packageManager: existsSync(join(cwd, "pnpm-lock.yaml"))
      ? "pnpm"
      : existsSync(join(cwd, "bun.lock"))
        ? "bun"
        : "npm",
    hasNext: Boolean(dependencies.next),
    hasTailwindV4: Boolean(
      dependencies.tailwindcss?.startsWith("^4") || dependencies.tailwindcss?.startsWith("4"),
    ),
    hasSrcDir: existsSync(join(cwd, "src")),
  };
}

function readLocalConfig(cwd) {
  const configPath = join(cwd, CONFIG_FILE);

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch {
    return null;
  }
}

function createRegistryBaseUrl(config) {
  return config?.registry ?? DEFAULT_REGISTRY_BASE_URL;
}

function resolveRegistryUrl(identifier, registryBaseUrl) {
  if (/^https?:\/\//i.test(identifier)) {
    return identifier;
  }

  if (identifier.startsWith("/")) {
    return `${registryBaseUrl}${identifier}`;
  }

  return `${registryBaseUrl}/api/registry/${identifier}`;
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Registry request failed with status ${response.status} for ${url}`);
  }

  return response.json();
}

async function fetchManifest(identifier, registryBaseUrl) {
  const attempts = [
    resolveRegistryUrl(identifier, registryBaseUrl),
    resolveRegistryUrl(`${identifier}/manifest`, registryBaseUrl),
  ];

  let lastError;

  for (const url of attempts) {
    try {
      return await fetchJson(url);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Registry item "${identifier}" was not found. ${lastError?.message ?? ""}`.trim());
}

function ensureWithinWorkspace(cwd, targetPath) {
  const absoluteCwd = resolve(cwd);
  const absoluteTarget = resolve(cwd, targetPath);
  const distance = relative(absoluteCwd, absoluteTarget);

  if (distance.startsWith("..") || isAbsolute(distance)) {
    throw new Error(`Refusing to write outside the current workspace: ${targetPath}`);
  }

  return absoluteTarget;
}

function writeConfig(cwd, registryBaseUrl) {
  const target = join(cwd, CONFIG_FILE);

  if (existsSync(target)) {
    console.log(`${CONFIG_FILE} already exists`);
    return;
  }

  writeFileSync(
    target,
    JSON.stringify(
      {
        $schema: "https://velocity-ui.com/schema/config.json",
        registry: registryBaseUrl,
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

  console.log(`Created ${CONFIG_FILE}`);
}

function installDependencies(packageManager, dependencies = {}, devDependencies = {}) {
  const commands = [];

  const dependencyEntries = Object.entries(dependencies);
  if (dependencyEntries.length) {
    commands.push({
      command: packageManager,
      args:
        packageManager === "npm"
          ? ["install", "--save", ...dependencyEntries.map(([name, version]) => `${name}@${version}`)]
          : ["add", ...dependencyEntries.map(([name, version]) => `${name}@${version}`)],
    });
  }

  const devDependencyEntries = Object.entries(devDependencies);
  if (devDependencyEntries.length) {
    commands.push({
      command: packageManager,
      args:
        packageManager === "npm"
          ? ["install", "--save-dev", ...devDependencyEntries.map(([name, version]) => `${name}@${version}`)]
          : ["add", "-D", ...devDependencyEntries.map(([name, version]) => `${name}@${version}`)],
    });
  }

  for (const step of commands) {
    const result = spawnSync(step.command, step.args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    if (result.status !== 0) {
      throw new Error(`Failed to install dependencies with ${packageManager}.`);
    }
  }
}

async function addComponent(identifier, registryBaseUrl) {
  const cwd = process.cwd();
  const project = detectProject(cwd);
  const manifest = await fetchManifest(identifier, registryBaseUrl);

  if (!project.hasNext) {
    console.warn("Next.js was not detected. Continuing because registry files are framework-readable.");
  }

  if (!project.hasTailwindV4) {
    console.warn("Tailwind CSS v4 was not detected. Verify styling tokens after install.");
  }

  for (const file of manifest.files ?? []) {
    const targetPath = ensureWithinWorkspace(cwd, file.target ?? file.path);

    if (existsSync(targetPath)) {
      console.warn(`Skipping existing file ${file.target ?? file.path}`);
      continue;
    }

    if (!file.content) {
      console.warn(`Skipping ${file.target ?? file.path}; registry did not provide inline source content.`);
      continue;
    }

    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, file.content, { flag: "wx" });
    console.log(`Created ${file.target ?? file.path}`);
  }

  const dependencies = manifest.dependencies ?? {};
  const devDependencies = manifest.devDependencies ?? {};
  const dependencyCount = Object.keys(dependencies).length + Object.keys(devDependencies).length;

  console.log(`Resolved ${dependencyCount} dependency${dependencyCount === 1 ? "" : "ies"}.`);
  installDependencies(project.packageManager, dependencies, devDependencies);
}

async function buildRegistryIndex(registryBaseUrl) {
  const cwd = process.cwd();
  const payload = await fetchJson(`${registryBaseUrl}/api/registry`);
  const target = join(cwd, "public", "registry", "index.json");

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Wrote registry index to ${target}`);
}

async function main() {
  const [, , command, ...args] = process.argv;
  const [firstArg, secondArg] = args;
  const config = readLocalConfig(process.cwd());
  const registryBaseUrl = createRegistryBaseUrl(config);

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "init") {
    writeConfig(process.cwd(), registryBaseUrl);
    return;
  }

  if (command === "registry" && firstArg === "build") {
    await buildRegistryIndex(registryBaseUrl);
    return;
  }

  if (command === "sync") {
    const catalog = await fetchJson(`${registryBaseUrl}/api/registry`);
    console.log(`Registry contains ${catalog.registry?.length ?? 0} components`);
    return;
  }

  if (command === "add" && firstArg) {
    await addComponent(firstArg, registryBaseUrl);
    return;
  }

  if (command === "add" && secondArg) {
    await addComponent(secondArg, registryBaseUrl);
    return;
  }

  printHelp();
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});