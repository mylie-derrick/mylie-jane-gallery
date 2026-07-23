import { toPlainText } from "@portabletext/react";

import {
  collections as fallbackCollections,
  getCollection as getFallbackCollection,
  getPainting as getFallbackPainting,
  paintings as fallbackPaintings,
  type CollectionId,
  type Painting,
  type PaintingCategory,
  type PaintingStatus,
} from "./paintings";
import { sanityClient } from "./sanityClient";
import { optimizedSanityImageUrl } from "./sanity.image";
import {
  allArtworksQuery,
  artworkBySlugQuery,
  availableArtworksQuery,
  collectionBySlugQuery,
  collectionsQuery,
  featuredArtworksQuery,
  siteSettingsQuery,
} from "./sanity.queries";
import type {
  SanityArtworkRecord,
  SanityArtworkStatus,
  SanityCollectionRecord,
  SiteSettings,
} from "./sanity.types";

const statusLabelByStatus: Record<SanityArtworkStatus, Painting["statusLabel"]> = {
  available: "Available",
  sold: "Sold",
  privateCollection: "Private Collection",
  notForSale: "Not for Sale",
  archived: "Archived",
};

const categoryByCollectionSlug: Record<string, PaintingCategory> = {
  "still-lifes": "Still Life",
  landscapes: "Landscape",
  "other-work": "Other Work",
};

const collectionBySlug: Record<string, CollectionId> = {
  "still-lifes": "still-lifes",
  landscapes: "landscapes",
  "other-work": "other-work",
};

function safePlainText(blocks: SanityArtworkRecord["description"]) {
  if (!blocks?.length) return "";
  try {
    return toPlainText(blocks);
  } catch {
    return "";
  }
}

function formatPrice(price?: number, currency = "USD") {
  if (typeof price !== "number") return "Inquire";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

function formatDimensions(dimensions: SanityArtworkRecord["dimensions"]) {
  if (!dimensions?.width || !dimensions.height) return "Size TBD";
  const suffix = dimensions.unit === "centimeters" ? "cm" : "";
  const base = `${dimensions.width} x ${dimensions.height}${dimensions.depth ? ` x ${dimensions.depth}` : ""}${suffix ? ` ${suffix}` : ""}`;
  return dimensions.estimated ? `${base} approx.` : base;
}

function firstCollection(record: SanityArtworkRecord) {
  return record.collections?.[0];
}

function imageWidth(record: SanityArtworkRecord) {
  return Math.round(
    record.primaryImage?.asset?.metadata?.dimensions?.width || record.dimensions?.width || 1200,
  );
}

function imageHeight(record: SanityArtworkRecord) {
  return Math.round(
    record.primaryImage?.asset?.metadata?.dimensions?.height || record.dimensions?.height || 1200,
  );
}

export function mapSanityArtwork(record: SanityArtworkRecord): Painting | null {
  if (!record.title || !record.slug || !record.primaryImage) return null;
  const collection = firstCollection(record);
  const collectionSlug = collection?.slug || "other-work";
  const status = record.status || "available";
  const publicStatus = status === "archived" ? "archived" : status;
  const primaryWidth = imageWidth(record);
  const primaryHeight = imageHeight(record);
  const primaryImage = optimizedSanityImageUrl(record.primaryImage, {
    width: Math.min(primaryWidth, 1800),
    fit: "max",
  });
  const hoverImage = record.hoverImage
    ? optimizedSanityImageUrl(record.hoverImage, {
        width: Math.min(primaryWidth, 1800),
        fit: "max",
      })
    : primaryImage;

  return {
    id: record._id,
    slug: record.slug,
    title: record.title,
    imageFilename: "",
    imageWidth: primaryWidth,
    imageHeight: primaryHeight,
    secondaryImageFilename: "",
    year: record.year ?? "TBD",
    medium: record.medium || "Oil painting",
    size: formatDimensions(record.dimensions),
    price:
      status === "available"
        ? formatPrice(record.price, record.currency)
        : record.soldNote || statusLabelByStatus[publicStatus],
    status: publicStatus,
    statusLabel: record.soldNote || statusLabelByStatus[publicStatus],
    collection: collectionBySlug[collectionSlug] || "other-work",
    category: categoryByCollectionSlug[collectionSlug] || "Other Work",
    image: primaryImage,
    secondaryImage: hoverImage,
    description: safePlainText(record.description),
    note: safePlainText(record.description),
    featured: record.featured ?? false,
    altText: record.primaryImage.alt || "",
    hoverAltText: record.hoverImage?.alt || record.primaryImage.alt || "",
    seoTitle: record.seoTitle || "",
    seoDescription: record.seoDescription || "",
    socialImage: record.socialImage
      ? optimizedSanityImageUrl(record.socialImage, { width: 1200, height: 630, fit: "crop" })
      : "",
  };
}

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.warn("Sanity fetch failed; using local fallback content.", error);
    return null;
  }
}

function mappedOrFallback(records: SanityArtworkRecord[] | null, fallback: Painting[]) {
  const mapped =
    records?.map(mapSanityArtwork).filter((item): item is Painting => Boolean(item)) || [];
  return mapped.length > 0 ? mapped : fallback;
}

export async function getAllArtworks() {
  const records = await fetchSanity<SanityArtworkRecord[]>(allArtworksQuery);
  return mappedOrFallback(records, fallbackPaintings);
}

export async function getAvailableArtworks() {
  const records = await fetchSanity<SanityArtworkRecord[]>(availableArtworksQuery);
  return mappedOrFallback(
    records,
    fallbackPaintings.filter((painting) => painting.status === "available"),
  );
}

export async function getFeaturedArtworks() {
  const records = await fetchSanity<SanityArtworkRecord[]>(featuredArtworksQuery);
  return mappedOrFallback(
    records,
    fallbackPaintings.filter((painting) => painting.featured),
  );
}

export async function getArtworkBySlug(slug: string) {
  const record = await fetchSanity<SanityArtworkRecord | null>(artworkBySlugQuery, { slug });
  return record ? mapSanityArtwork(record) : getFallbackPainting(slug);
}

export async function getCollections() {
  const records = await fetchSanity<SanityCollectionRecord[]>(collectionsQuery);
  if (!records?.length) return fallbackCollections;
  return records.map((record) => ({
    id: collectionBySlug[record.slug || ""] || (record.slug as CollectionId) || "other-work",
    title: record.title || "Untitled Collection",
    description: record.shortDescription || "",
  }));
}

export async function getCollectionBySlug(slug: string) {
  const record = await fetchSanity<SanityCollectionRecord | null>(collectionBySlugQuery, { slug });
  if (record) {
    return {
      id: collectionBySlug[record.slug || ""] || (record.slug as CollectionId) || "other-work",
      title: record.title || "Untitled Collection",
      description: record.shortDescription || "",
    };
  }
  return getFallbackCollection(slug);
}

export async function getSiteSettings() {
  return fetchSanity<SiteSettings>(siteSettingsQuery);
}
