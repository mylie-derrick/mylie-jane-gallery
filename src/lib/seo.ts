import type { Painting } from "@/lib/paintings";

export const siteUrl =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://myliejanedesign.vercel.app";

export const siteName = "Mylie Jane Design";
export const artistName = "Mylie Jane Derrick";
export const defaultSeoImage = "/images/hero-painting-process.jpg";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function artworkAlt(painting: Painting) {
  return `${painting.title}, an original ${painting.category.toLowerCase()} oil painting by ${artistName}.`;
}

export function seo({
  title,
  description,
  path,
  image = defaultSeoImage,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "profile" | "article";
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: `${siteName} by ${artistName}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": ["Person", "VisualArtist"],
  "@id": absoluteUrl("/#mylie-jane-derrick"),
  name: artistName,
  alternateName: "Mylie Jane Design",
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/mylie-studio-portrait.jpg"),
  jobTitle: "Oil painter",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salt Lake City",
    addressRegion: "UT",
    addressCountry: "US",
  },
  sameAs: ["https://www.instagram.com/myliejanedesign/"],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#mylie-jane-design"),
  name: siteName,
  url: absoluteUrl("/"),
  logo: absoluteUrl(defaultSeoImage),
  founder: { "@id": absoluteUrl("/#mylie-jane-derrick") },
  sameAs: ["https://www.instagram.com/myliejanedesign/"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: siteName,
  url: absoluteUrl("/"),
  description:
    "Original oil paintings, still lifes, and landscapes by Utah artist Mylie Jane Derrick.",
  publisher: { "@id": absoluteUrl("/#mylie-jane-design") },
};

export function artworkSchema(painting: Painting) {
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": absoluteUrl(`/paintings/${painting.slug}#artwork`),
    name: painting.title,
    url: absoluteUrl(`/paintings/${painting.slug}`),
    image: absoluteUrl(painting.image),
    description: painting.description,
    artform: "Oil painting",
    artMedium: painting.medium,
    dateCreated: String(painting.year),
    creator: { "@id": absoluteUrl("/#mylie-jane-derrick") },
    artist: { "@id": absoluteUrl("/#mylie-jane-derrick") },
    offers:
      painting.status === "available"
        ? {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            price: painting.price === "TBD" ? undefined : painting.price,
            url: absoluteUrl(`/contact?painting=${encodeURIComponent(painting.title)}`),
          }
        : {
            "@type": "Offer",
            availability: "https://schema.org/SoldOut",
            url: absoluteUrl(`/paintings/${painting.slug}`),
          },
  };
}
