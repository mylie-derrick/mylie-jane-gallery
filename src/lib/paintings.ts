export type CollectionId = "still-lifes" | "landscapes" | "other-work";
export type PaintingStatus = "Available" | "Sold" | "Not for Sale";

export interface Painting {
  id: string;
  slug: string;
  title: string;
  year: number | "TBD";
  medium: string;
  size: string;
  price: string;
  status: PaintingStatus;
  collection: CollectionId;
  category: "Still Lifes" | "Landscapes" | "Other Work";
  image: string;
  note: string;
}

export const collections: { id: CollectionId; title: Painting["category"]; description: string }[] =
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

export const paintings: Painting[] = [
  {
    id: "freshly-cut",
    slug: "freshly-cut",
    title: "Freshly Cut",
    year: 2024,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/freshly-cut.jpg",
    note: "Pink roses in a white vase against a dark background. Strong still life candidate.",
  },
  {
    id: "oranges-and-blooms",
    slug: "oranges-and-blooms",
    title: "Oranges and Blooms",
    year: 2025,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/oranges-and-blooms.jpg",
    note: "Citrus and pink flowers on a wood surface against a dark ground. Strong candidate for homepage or featured still life.",
  },
  {
    id: "lavender-and-lemons",
    slug: "lavender-and-lemons",
    title: "Lavender and Lemons",
    year: 2022,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Sold",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/lavender-and-lemons.jpg",
    note: "Bread, lemons, lavender in a glass jar, and dark bottle. Use in gallery, not as purchasable.",
  },
  {
    id: "peonies",
    slug: "peonies",
    title: "Peonies",
    year: 2025,
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/peonies.jpg",
    note: "Floral still life photographed in studio context.",
  },
  {
    id: "grandma",
    slug: "grandma",
    title: "Grandma",
    year: 2022,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/grandma.jpg",
    note: "Perfume bottles, glass vase, and flowers. Elegant, personal, refined still life.",
  },
  {
    id: "happy-flowers",
    slug: "happy-flowers",
    title: "Happy Flowers",
    year: 2023,
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
    status: "Sold",
    collection: "still-lifes",
    category: "Still Lifes",
    image: "/images/happy-flowers.jpg",
    note: "Small yellow flowers in a glass jar. Use in gallery, not as purchasable.",
  },
  {
    id: "wahweap",
    slug: "wahweap",
    title: "Wahweap",
    year: 2023,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "landscapes",
    category: "Landscapes",
    image: "/images/wahweap.jpg",
    note: "Lake Powell/desert red rock landscape. Important to Mylie's Utah and outdoor story.",
  },
  {
    id: "sunset-on-the-tetons",
    slug: "sunset-on-the-tetons",
    title: "Sunset on the Tetons",
    year: 2025,
    medium: "Oil on Board",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "landscapes",
    category: "Landscapes",
    image: "/images/sunset-on-the-tetons.jpg",
    note: "Landscape with wide sky, fields, trees, and small white building.",
  },
  {
    id: "lake-louise-iced-over",
    slug: "lake-louise-iced-over",
    title: "Lake Louise Iced Over",
    year: 2026,
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "landscapes",
    category: "Landscapes",
    image: "/images/lake-louise-iced-over.jpg",
    note: "Winter landscape, blue palette, snowy trees, mountains, stream, small warm cabin light. Not yet professionally photographed.",
  },
  {
    id: "livin",
    slug: "livin",
    title: "Livin",
    year: 2026,
    medium: "Oil on Canvas",
    size: "TBD",
    price: "TBD",
    status: "Available",
    collection: "landscapes",
    category: "Landscapes",
    image: "/images/livin.jpg",
    note: "Small winter/ski landscape. Not yet professionally photographed.",
  },
  {
    id: "untitled-portrait-study",
    slug: "untitled-portrait-study",
    title: "Untitled Portrait Study",
    year: "TBD",
    medium: "Oil",
    size: "TBD",
    price: "TBD",
    status: "Not for Sale",
    collection: "other-work",
    category: "Other Work",
    image: "/images/untitled-portrait-study.jpg",
    note: "Portrait profile study connected to Grand Central Atelier training. Use in gallery only.",
  },
];

export function getPainting(slug: string) {
  return paintings.find((p) => p.slug === slug);
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}
