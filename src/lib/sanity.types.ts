import type { PortableTextBlock } from "@portabletext/react";

export type SanityArtworkStatus =
  "available" | "sold" | "privateCollection" | "notForSale" | "archived";
export type SanitySaleMethod = "inquiry" | "shopify" | "none";
export type SanityOrientation = "portrait" | "landscape" | "square" | "panoramic";
export type SanityDimensionUnit = "inches" | "centimeters";

export interface SanityImageValue {
  _type?: "image";
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number; aspectRatio?: number } };
  };
  alt?: string;
  caption?: string;
  crop?: unknown;
  hotspot?: unknown;
}

export interface SanityDimensions {
  width?: number;
  height?: number;
  depth?: number;
  unit?: SanityDimensionUnit;
  estimated?: boolean;
}

export interface SanityCollectionRecord {
  _id: string;
  title?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: PortableTextBlock[];
  coverImage?: SanityImageValue;
  featured?: boolean;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityArtworkRecord {
  _id: string;
  title?: string;
  slug?: string;
  inventoryNumber?: string;
  year?: number;
  primaryImage?: SanityImageValue;
  hoverImage?: SanityImageValue;
  galleryImages?: SanityImageValue[];
  description?: PortableTextBlock[];
  medium?: string;
  dimensions?: SanityDimensions;
  orientation?: SanityOrientation;
  isFramed?: boolean;
  frameDescription?: string;
  readyToHang?: boolean;
  framedDimensions?: SanityDimensions;
  status?: SanityArtworkStatus;
  price?: number;
  currency?: string;
  saleMethod?: SanitySaleMethod;
  shopifyProductHandle?: string;
  soldNote?: string;
  collections?: SanityCollectionRecord[];
  featured?: boolean;
  displayOrder?: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: SanityImageValue;
}

export interface SiteSettings {
  siteTitle?: string;
  shortSiteDescription?: string;
  contactEmail?: string;
  studioLocation?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultSocialImage?: SanityImageValue;
  announcementText?: string;
  announcementEnabled?: boolean;
}
