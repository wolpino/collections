#!/usr/bin/env node
/**
 * Regenerate content/photographs.json from public/photographs/* folders.
 *
 * Usage:
 *   npm run sync:photographs
 *   npm run sync:photographs -- --folder idaho
 *   npm run sync:photographs -- -f chicago -f idaho
 *   node scripts/sync-photographs.mjs idaho
 *
 * - One group per subdirectory (e.g. idaho/, chicago/)
 * - Preserves `notes` and custom `title` on items that keep the same id
 * - With --folder, only those groups are rescanned; other groups in JSON are kept
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PHOTOS_DIR = path.join(ROOT, "public", "photographs");
const OUTPUT = path.join(ROOT, "content", "photographs.json");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|svg)$/i;

function printHelp() {
  console.log(`Usage: npm run sync:photographs [-- --folder <name> ...]

Regenerate content/photographs.json from public/photographs/ subfolders.

Options:
  -f, --folder <name>   Scan only this subfolder (repeatable)
  -h, --help            Show this help

Examples:
  npm run sync:photographs
  npm run sync:photographs -- --folder idaho
  npm run sync:photographs -- -f chicago -f idaho
  node scripts/sync-photographs.mjs yosemite
`);
}

function parseArgs(argv) {
  const folders = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
    if (arg === "--folder" || arg === "-f") {
      const next = argv[++i];
      if (!next || next.startsWith("-")) {
        console.error(`Missing folder name after ${arg}`);
        process.exit(1);
      }
      folders.push(next);
      continue;
    }
    if (arg.startsWith("-")) {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    }
    folders.push(arg);
  }

  return [...new Set(folders.map((f) => f.trim()).filter(Boolean))];
}

function slug(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function filenameTitle(file) {
  return file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

function readDimensions(filePath) {
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    const width = Number(out.match(/pixelWidth: (\d+)/)?.[1]);
    const height = Number(out.match(/pixelHeight: (\d+)/)?.[1]);
    if (width && height) return { width, height };
  } catch {
    /* sips unavailable or failed */
  }
  return { width: 1200, height: 800 };
}

function loadExistingGroups() {
  if (!fs.existsSync(OUTPUT)) return [];

  try {
    return JSON.parse(fs.readFileSync(OUTPUT, "utf8"));
  } catch (err) {
    console.warn("Could not read existing JSON:", err.message);
    return [];
  }
}

function overridesFromGroups(groups) {
  const byId = new Map();
  for (const group of groups) {
    for (const item of group.items ?? []) {
      const overrides = {};
      if (item.notes != null && item.notes !== "") overrides.notes = item.notes;
      if (item.title != null) overrides.title = item.title;
      if (Object.keys(overrides).length) byId.set(item.id, overrides);
    }
  }
  return byId;
}

function buildItem(dir, file, overrides) {
  const id = `${dir}-${slug(file)}`;
  const src = `/photographs/${dir}/${file}`;
  const fullPath = path.join(PHOTOS_DIR, dir, file);
  const { width, height } = readDimensions(fullPath);
  const autoTitle = filenameTitle(file);

  return {
    id,
    title: overrides?.title ?? autoTitle,
    src,
    alt: `${titleCase(dir)} — ${file.replace(/\.[^.]+$/, "")}`,
    width,
    height,
    ...(overrides?.notes ? { notes: overrides.notes } : {}),
  };
}

function listAllDirs() {
  return fs
    .readdirSync(PHOTOS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function resolveDirsToScan(selectedFolders) {
  const available = listAllDirs();

  if (selectedFolders.length === 0) {
    return available;
  }

  const missing = selectedFolders.filter((f) => !available.includes(f));
  if (missing.length > 0) {
    console.error(`Unknown folder(s): ${missing.join(", ")}`);
    console.error(`Available: ${available.join(", ") || "(none)"}`);
    process.exit(1);
  }

  return selectedFolders.sort();
}

function scanGroup(dir, overrides) {
  const dirPath = path.join(PHOTOS_DIR, dir);
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return null;
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => IMAGE_EXT.test(f))
    .sort();

  const items = files.map((file) => {
    const id = `${dir}-${slug(file)}`;
    return buildItem(dir, file, overrides.get(id));
  });

  if (items.length === 0) return null;
  return { id: dir, title: titleCase(dir), items };
}

function scanGroups(overrides, dirsToScan) {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.error(`Missing directory: ${PHOTOS_DIR}`);
    process.exit(1);
  }

  const groups = [];
  for (const dir of dirsToScan) {
    const group = scanGroup(dir, overrides);
    if (group) groups.push(group);
  }
  return groups;
}

function mergeGroups(existingGroups, scannedGroups, partialUpdate) {
  if (!partialUpdate) return scannedGroups;

  const byId = new Map(existingGroups.map((g) => [g.id, g]));
  for (const group of scannedGroups) {
    byId.set(group.id, group);
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

function main() {
  const selectedFolders = parseArgs(process.argv.slice(2));
  const partialUpdate = selectedFolders.length > 0;
  const dirsToScan = resolveDirsToScan(selectedFolders);

  const existingGroups = loadExistingGroups();
  const overrides = overridesFromGroups(existingGroups);
  const scannedGroups = scanGroups(overrides, dirsToScan);
  const groups = mergeGroups(existingGroups, scannedGroups, partialUpdate);

  fs.writeFileSync(OUTPUT, `${JSON.stringify(groups, null, 2)}\n`);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  console.log(`Wrote ${OUTPUT}`);
  if (partialUpdate) {
    console.log(`Updated: ${dirsToScan.join(", ")}`);
  }
  for (const g of groups) {
    const marker = dirsToScan.includes(g.id) ? "*" : " ";
    console.log(`${marker} ${g.title}: ${g.items.length} photo(s)`);
  }
  console.log(`Total: ${total} photo(s) in ${groups.length} group(s)`);
}

main();
