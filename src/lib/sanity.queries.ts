const imageFields = `
  _type,
  crop,
  hotspot,
  alt,
  caption,
  asset->{
    _id,
    url,
    metadata{dimensions{width,height,aspectRatio}}
  }
`;

const collectionFields = `
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  coverImage{${imageFields}},
  featured,
  displayOrder,
  seoTitle,
  seoDescription
`;

export const artworkFields = `
  _id,
  title,
  "slug": slug.current,
  inventoryNumber,
  year,
  primaryImage{${imageFields}},
  hoverImage{${imageFields}},
  galleryImages[]{${imageFields}},
  description,
  medium,
  dimensions,
  orientation,
  isFramed,
  frameDescription,
  readyToHang,
  framedDimensions,
  status,
  price,
  currency,
  saleMethod,
  shopifyProductHandle,
  soldNote,
  collections[]->{${collectionFields}},
  featured,
  displayOrder,
  tags,
  seoTitle,
  seoDescription,
  socialImage{${imageFields}}
`;

export const allArtworksQuery = `*[_type == "artwork" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(displayOrder, 9999) asc, year desc, title asc) {${artworkFields}}`;
export const availableArtworksQuery = `*[_type == "artwork" && status == "available" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(displayOrder, 9999) asc, year desc, title asc) {${artworkFields}}`;
export const featuredArtworksQuery = `*[_type == "artwork" && featured == true && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(displayOrder, 9999) asc, year desc, title asc) {${artworkFields}}`;
export const artworkBySlugQuery = `*[_type == "artwork" && slug.current == $slug && !(_id in path("drafts.**"))][0] {${artworkFields}}`;
export const collectionsQuery = `*[_type == "collection" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(displayOrder, 9999) asc, title asc) {${collectionFields}}`;
export const collectionBySlugQuery = `*[_type == "collection" && slug.current == $slug && !(_id in path("drafts.**"))][0] {${collectionFields}}`;
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings" && !(_id in path("drafts.**"))][0]`;
