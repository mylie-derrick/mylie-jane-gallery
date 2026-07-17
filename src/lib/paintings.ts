export type CollectionId = "still-lifes" | "landscapes" | "other-work";
export type PaintingCategory = "Still Life" | "Landscape" | "Other Work";
export type PaintingStatus = "available" | "sold";

export interface PaintingEntry {
  slug: string;
  title: string;
  imageFilename: string;
  secondaryImageFilename: string;
  category: PaintingCategory;
  year: number | "TBD";
  description: string;
  status: PaintingStatus;
  featured?: boolean;
  medium: string;
  size: string;
  price: string;
}

export interface Painting {
  id: string;
  slug: string;
  title: string;
  imageFilename: string;
  secondaryImageFilename: string;
  year: number | "TBD";
  medium: string;
  size: string;
  price: string;
  status: PaintingStatus;
  statusLabel: "Available" | "Sold";
  collection: CollectionId;
  category: PaintingCategory;
  image: string;
  secondaryImage: string;
  description: string;
  note: string;
  featured: boolean;
}

export const collections: { id: CollectionId; title: string; description: string }[] = [
  {
    id: "still-lifes",
    title: "Still Lifes",
    description:
      "Paintings meant to capture light, color, and quiet moments. Fruit on a table, flowers in a jar, everyday things worth looking at twice.",
  },
  {
    id: "landscapes",
    title: "Landscapes",
    description:
      "Paintings inspired by the places I've traveled and keep returning to. Mountains, open skies, and scenes that hold a little bit of light.",
  },
  {
    id: "other-work",
    title: "Other Work",
    description: "Portraits, studies, and other work.",
  },
];

const collectionByCategory: Record<PaintingCategory, CollectionId> = {
  "Still Life": "still-lifes",
  Landscape: "landscapes",
  "Other Work": "other-work",
};

const statusLabelByStatus: Record<PaintingStatus, Painting["statusLabel"]> = {
  available: "Available",
  sold: "Sold",
};

const paintingEntries: PaintingEntry[] = [
  {
    slug: "freshly-cut",
    title: "Freshly Cut",
    imageFilename: "freshly-cut.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2024,
    description: "Freshly gathered peonies arranged in a glass jar, set in a dark floater frame that gives the soft blooms a quiet, elevated presence.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "oranges-and-blooms",
    title: "Oranges and Blooms",
    imageFilename: "oranges-and-blooms.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2025,
    description: "Citrus and pink flowers on a wood surface against a dark ground.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "lavender-and-lemons",
    title: "Lavender and Lemons",
    imageFilename: "lavender-and-lemons.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2022,
    description: "Bread, lemons, lavender in a glass jar, and dark bottle.",
    status: "sold",
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "peonies",
    title: "Peonies",
    imageFilename: "peonies.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2025,
    description: "Floral still life.",
    status: "available",
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "grandma",
    title: "Grandma",
    imageFilename: "grandma.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2022,
    description: "Perfume bottles, glass vase, and flowers.",
    status: "available",
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "happy-flowers",
    title: "Happy Flowers",
    imageFilename: "happy-flowers.jpg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2023,
    description: "Small yellow flowers in a glass jar.",
    status: "sold",
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "wahweap",
    title: "Wahweap",
    imageFilename: "wahweap.jpg",
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2023,
    description: "Lake Powell/desert red rock landscape.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "sunset-on-the-tetons",
    title: "Sunset on the Tetons",
    imageFilename: "sunset-on-the-tetons.jpg",
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2025,
    description: "Landscape of a farm and sky with the tetons in the background. ",
    status: "available",
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "lake-louise-iced-over",
    title: "Lake Louise Iced Over",
    imageFilename: "lake-louise-iced-over.jpeg",
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2026,
    description: "Painting of Lake Louise in Canada iced over in January. ",
    status: "available",
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "livin",
    title: "Livin",
    imageFilename: "livin.jpg",
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2026,
    description: "Small winter/ski landscape in the backcountry of Sunshine Canada",
    status: "sold",
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "untitled-portrait-study",
    title: "Untitled Portrait Study",
    imageFilename: "untitled-portrait-study.jpg",
    secondaryImageFilename: "",
    category: "Other Work",
    year: "TBD",
    description: "Portrait profile study created during Mylie's time at the Grand Central Atelier",
    status: "sold",
    medium: "Oil",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "last-of-spring",
    title: "Last of Spring",
    imageFilename: "Last-of-Spring.jpeg",
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2026,
    description: "The last daffodils of spring, cut and gathered in a glass jar.",
    status: "sold",
    featured: false,
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
  },
];

export const paintings: Painting[] = paintingEntries.map((entry) => ({
  ...entry,
  id: entry.slug,
  image: `/images/${entry.imageFilename}`,
  secondaryImage: entry.secondaryImageFilename ? `/images/${entry.secondaryImageFilename}` : "",
  collection: collectionByCategory[entry.category],
  note: entry.description,
  statusLabel: statusLabelByStatus[entry.status],
  featured: entry.featured ?? false,
}));

export function getPainting(slug: string) {
  return paintings.find((p) => p.slug === slug);
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}
