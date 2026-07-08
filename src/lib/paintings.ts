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

export const collections: { id: CollectionId; title: string; description: string }[] =
  [
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
    description: "Pink roses in a white vase against a dark background. Strong still life candidate.",
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
    description:
      "Citrus and pink flowers on a wood surface against a dark ground. Strong candidate for homepage or featured still life.",
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
    description:
      "Bread, lemons, lavender in a glass jar, and dark bottle. Use in gallery, not as purchasable.",
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
    description: "Floral still life photographed in studio context.",
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
    description: "Perfume bottles, glass vase, and flowers. Elegant, personal, refined still life.",
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
    description: "Small yellow flowers in a glass jar. Use in gallery, not as purchasable.",
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
    description: "Lake Powell/desert red rock landscape. Important to Mylie's Utah and outdoor story.",
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
    description: "Landscape with wide sky, fields, trees, and small white building.",
    status: "available",
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "lake-louise-iced-over",
    title: "Lake Louise Iced Over",
    imageFilename: "lake-louise-iced-over.jpg",
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2026,
    description:
      "Winter landscape, blue palette, snowy trees, mountains, stream, small warm cabin light. Not yet professionally photographed.",
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
    description: "Small winter/ski landscape. Not yet professionally photographed.",
    status: "available",
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
    description: "Portrait profile study connected to Grand Central Atelier training. Use in gallery only.",
    status: "sold",
    medium: "Oil",
    size: "TBD",
    price: "TBD",
  },
  {
    slug: "last-of-spring",
    title: "Last of Spring",
    imageFilename: "last-of-spring.jpg",
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
