#!/usr/bin/env node
import { createClient } from "@sanity/client";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { pathToFileURL, fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const projectId = process.env.SANITY_PROJECT_ID || "upolphdd";
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2026-07-20";
const token = process.env.SANITY_AUTH_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!token && !dryRun) {
  console.error("Missing SANITY_AUTH_TOKEN. Run with --dry-run to preview without writing.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function loadWebsiteArtworkData() {
  const sourcePath = path.join(rootDir, "src", "lib", "paintings.ts");
  const source = await fs.readFile(sourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      verbatimModuleSyntax: false,
    },
    fileName: sourcePath,
  }).outputText;

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "mylie-sanity-import-"));
  const tempModulePath = path.join(tempDir, "paintings.mjs");
  await fs.writeFile(tempModulePath, transpiled, "utf8");

  try {
    const module = await import(`${pathToFileURL(tempModulePath).href}?t=${Date.now()}`);
    if (!Array.isArray(module.paintings) || !Array.isArray(module.collections)) {
      throw new Error("src/lib/paintings.ts must export paintings and collections arrays.");
    }
    return { artworks: module.paintings, collections: module.collections };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function parsePrice(price) {
  if (!price || price === "TBD") return undefined;
  const numeric = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : undefined;
}
function parseDimensions(size) {
  const match = String(size || "").match(/([0-9.]+)\s*x\s*([0-9.]+)(?:\s*x\s*([0-9.]+))?/i);
  if (!match) return { unit: "inches", estimated: true };
  return {
    width: Number(match[1]),
    height: Number(match[2]),
    depth: match[3] ? Number(match[3]) : undefined,
    unit: "inches",
    estimated: false,
  };
}
function orientationFromDimensions(dimensions) {
  if (!dimensions.width || !dimensions.height) return undefined;
  const ratio = dimensions.width / dimensions.height;
  if (ratio > 1.8) return "panoramic";
  if (ratio > 1.08) return "landscape";
  if (ratio < 0.92) return "portrait";
  return "square";
}
function blockText(text) {
  return [{ _type: "block", style: "normal", children: [{ _type: "span", text: text || "" }] }];
}
async function uploadImage(filename, title) {
  if (!filename) return undefined;
  const filePath = path.join(rootDir, "public", "images", filename);
  const buffer = await fs.readFile(filePath);
  const asset = await client.assets.upload("image", buffer, { filename, title });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: `${title} by Mylie Jane Derrick`,
  };
}

async function fileExists(filename) {
  if (!filename) return false;
  try {
    await fs.access(path.join(rootDir, "public", "images", filename));
    return true;
  } catch {
    return false;
  }
}

async function validateArtworks(artworks, collections) {
  const slugCounts = new Map();
  const missingImageFiles = [];
  const recordsMissingRequiredFields = [];
  const estimatedDimensions = [];
  const collectionRelationships = new Map(collections.map((collection) => [collection.id, 0]));

  for (const artwork of artworks) {
    slugCounts.set(artwork.slug, (slugCounts.get(artwork.slug) || 0) + 1);

    const missingRequired = [];
    if (!artwork.title) missingRequired.push("title");
    if (!artwork.slug) missingRequired.push("slug");
    if (!artwork.imageFilename) missingRequired.push("primaryImage");
    if (!artwork.status) missingRequired.push("status");
    if (!artwork.collection) missingRequired.push("collection");
    if (artwork.status === "available" && parsePrice(artwork.price) === undefined) {
      missingRequired.push("available price or inquiry-only decision");
    }
    if (missingRequired.length > 0) {
      recordsMissingRequiredFields.push({
        slug: artwork.slug || "(missing slug)",
        missing: missingRequired,
      });
    }

    if (artwork.imageFilename && !(await fileExists(artwork.imageFilename))) {
      missingImageFiles.push(artwork.imageFilename);
    }
    if (artwork.secondaryImageFilename && !(await fileExists(artwork.secondaryImageFilename))) {
      missingImageFiles.push(artwork.secondaryImageFilename);
    }

    const dimensions = parseDimensions(artwork.size);
    if (dimensions.estimated) estimatedDimensions.push(artwork.slug);

    if (artwork.collection) {
      collectionRelationships.set(
        artwork.collection,
        (collectionRelationships.get(artwork.collection) || 0) + 1,
      );
    }
  }

  const duplicateSlugs = [...slugCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([slug, count]) => ({ slug, count }));

  return {
    duplicateSlugs,
    missingImageFiles,
    recordsMissingRequiredFields,
    estimatedDimensions,
    collectionRelationships,
  };
}

async function printDryRunSummary(artworks, collections) {
  const validation = await validateArtworks(artworks, collections);

  console.log(`Project: ${projectId}, dataset: ${dataset}`);
  console.log("Source of truth: src/lib/paintings.ts exports");
  console.log(`Collections: ${collections.length}`);
  console.log(`Artworks: ${artworks.length}`);
  console.log(`Primary images: ${artworks.filter((artwork) => artwork.imageFilename).length}`);
  console.log(
    `Hover images: ${artworks.filter((artwork) => artwork.secondaryImageFilename).length}`,
  );
  console.log(`Missing image files: ${validation.missingImageFiles.length}`);
  if (validation.missingImageFiles.length > 0) {
    console.log(`Missing image file names: ${validation.missingImageFiles.join(", ")}`);
  }
  console.log(`Duplicate slugs: ${validation.duplicateSlugs.length}`);
  if (validation.duplicateSlugs.length > 0) {
    console.log(`Duplicate slug details: ${JSON.stringify(validation.duplicateSlugs)}`);
  }
  console.log(`Records with estimated dimensions: ${validation.estimatedDimensions.length}`);
  if (validation.estimatedDimensions.length > 0) {
    console.log(`Estimated dimension slugs: ${validation.estimatedDimensions.join(", ")}`);
  }
  console.log(`Records missing required fields: ${validation.recordsMissingRequiredFields.length}`);
  if (validation.recordsMissingRequiredFields.length > 0) {
    console.log(
      `Missing required field details: ${JSON.stringify(validation.recordsMissingRequiredFields)}`,
    );
  }
  console.log("Collection relationships:");
  for (const [collectionId, count] of validation.collectionRelationships.entries()) {
    console.log(`- ${collectionId}: ${count}`);
  }
}

async function main() {
  const { artworks, collections } = await loadWebsiteArtworkData();
  await printDryRunSummary(artworks, collections);
  if (dryRun) {
    console.log("Dry run only. No Sanity documents or assets were created.");
    return;
  }
  for (const [index, collection] of collections.entries()) {
    await client.createOrReplace({
      _id: `collection-${collection.id}`,
      _type: "collection",
      title: collection.title,
      slug: { _type: "slug", current: collection.id },
      shortDescription: collection.description,
      displayOrder: index,
    });
  }
  for (const [index, artwork] of artworks.entries()) {
    const dimensions = parseDimensions(artwork.size);
    const primaryImage = await uploadImage(artwork.imageFilename, artwork.title);
    const hoverImage = artwork.secondaryImageFilename
      ? await uploadImage(artwork.secondaryImageFilename, `${artwork.title} hover image`)
      : undefined;
    const price = artwork.status === "available" ? parsePrice(artwork.price) : undefined;
    await client.createOrReplace({
      _id: `artwork-${artwork.slug}`,
      _type: "artwork",
      title: artwork.title,
      slug: { _type: "slug", current: artwork.slug },
      year: typeof artwork.year === "number" ? artwork.year : undefined,
      primaryImage,
      hoverImage,
      description: blockText(artwork.description),
      medium: artwork.medium,
      dimensions,
      orientation: orientationFromDimensions(dimensions),
      status: artwork.status,
      price,
      currency: "USD",
      saleMethod: artwork.status === "available" ? "inquiry" : "none",
      soldNote: artwork.status === "sold" ? "Sold" : undefined,
      collections: [{ _type: "reference", _ref: `collection-${artwork.collection}` }],
      featured: Boolean(artwork.featured),
      displayOrder: index,
    });
    console.log(`Imported ${artwork.title}`);
  }
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
