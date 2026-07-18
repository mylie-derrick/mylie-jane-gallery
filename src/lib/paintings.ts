export type CollectionId = "still-lifes" | "landscapes" | "other-work";
export type PaintingCategory = "Still Life" | "Landscape" | "Other Work";
export type PaintingStatus = "available" | "sold";

export interface PaintingEntry {
  slug: string;
  title: string;
  imageFilename: string;
  imageWidth: number;
  imageHeight: number;
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
  imageWidth: number;
  imageHeight: number;
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
    imageWidth: 2413,
    imageHeight: 2414,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2024,
    description: "Freshly gathered peonies arranged in a glass jar, set in a dark floater frame that gives the soft blooms a quiet, elevated presence.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "16 x 16",
    price: "$1000.00",
  },
  {
    slug: "oranges-and-blooms",
    title: "Oranges and Blooms",
    imageFilename: "oranges-and-blooms.jpg",
    imageWidth: 3608,
    imageHeight: 2600,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2025,
    description: "I arranged this composition around color first. The warm oranges, muted greens, and soft pink flowers each play a distinct role, creating a balance between boldness and delicacy that drew me to paint the scene.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "14.5 x 19.75",
    price: "$1,200.00",
  },
  {
    slug: "lavender-and-lemons",
    title: "Lavender and Lemons",
    imageFilename: "lavender-and-lemons.jpg",
    imageWidth: 1763,
    imageHeight: 1092,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2022,
    description: "Inspired by the simple beauty of everyday life, this still life reflects the warmth of home and the joy found in gathering around the table. The familiar objects and soft light are a reminder that some of life’s most meaningful moments are often the simplest.",
    status: "sold",
    medium: "Oil on Board",
    size: "12 x 24",
    price: "TBD",
  },
  {
    slug: "peonies",
    title: "Peonies",
    imageFilename: "peonies.jpg",
    imageWidth: 1869,
    imageHeight: 2631,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2025,
    description: "Floral still life.",
    status: "available",
    medium: "Oil on Canvas",
    size: "9 x 12",
    price: "$450.00",
  },
  {
    slug: "grandma",
    title: "Grandma",
    imageFilename: "grandma.jpg",
    imageWidth: 2044,
    imageHeight: 1169,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2022,
    description: "Inspired by my grandmother’s perfume collection, this painting is a portrait told through a still life. The objects, colors, and timeless style are all reminders of her and the quiet elegance she carried. Professionally framed and ready to hang.",
    status: "available",
    medium: "Oil on Board",
    size: "24 x 48",
    price: "$1,900.00",
  },
  {
    slug: "happy-flowers",
    title: "Happy Flowers",
    imageFilename: "happy-flowers.jpg",
    imageWidth: 883,
    imageHeight: 890,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2023,
    description: "Small yellow flowers in a glass jar.",
    status: "sold",
    medium: "Oil on Canvas",
    size: "5 x 5",
    price: "TBD",
  },
  {
    slug: "wahweap",
    title: "Wahweap",
    imageFilename: "wahweap.jpg",
    imageWidth: 2102,
    imageHeight: 1185,
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2023,
    description: "Inspired by the remarkable scenery of Lake Powell, this painting reflects both the beauty of the landscape and the feeling of nostalgia that places like this can hold.",
    status: "available",
    featured: true,
    medium: "Oil on Board",
    size: "12 x 24",
    price: "$850.00",
  },
  {
    slug: "sunset-on-the-tetons",
    title: "Sunset on the Tetons",
    imageFilename: "sunset-on-the-tetons.jpg",
    imageWidth: 788,
    imageHeight: 996,
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2025,
    description: "Inspired by a landscape in Jackson Hole, this painting reflects one of those moments when the sky seemed to transform the entire scene. My hope is that it evokes a favorite place or memory for whoever spends time with it.",
    status: "available",
    medium: "Oil on Board",
    size: "24 x 30",
    price: "$1100.00",
  },
  {
    slug: "lake-louise-iced-over",
    title: "Lake Louise Iced Over",
    imageFilename: "lake-louise-iced-over.jpeg",
    imageWidth: 2718,
    imageHeight: 3686,
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2026,
    description: "Painting of Lake Louise in Canada iced over in January. ",
    status: "available",
    medium: "Oil on Canvas",
    size: "10 x 12",
    price: "$400.00",
  },
  {
    slug: "livin",
    title: "Livin",
    imageFilename: "livin.jpg",
    imageWidth: 1664,
    imageHeight: 2241,
    secondaryImageFilename: "",
    category: "Landscape",
    year: 2026,
    description: "Small winter/ski landscape in the backcountry of Sunshine Canada",
    status: "sold",
    medium: "Oil on Canvas",
    size: "10 x 12",
    price: "TBD",
  },
  {
    slug: "untitled-portrait-study",
    title: "Untitled Portrait Study",
    imageFilename: "untitled-portrait-study.jpg",
    imageWidth: 2682,
    imageHeight: 3452,
    secondaryImageFilename: "",
    category: "Other Work",
    year: "2025",
    description: "Portrait profile study created during Mylie's time at the Grand Central Atelier",
    status: "sold",
    medium: "Oil",
    size: "11 x 14",
    price: "TBD",
  },
  {
    slug: "last-of-spring",
    title: "Last of Spring",
    imageFilename: "Last-of-Spring.jpeg",
    imageWidth: 2580,
    imageHeight: 3162,
    secondaryImageFilename: "",
    category: "Still Life",
    year: 2026,
    description: "The last daffodils of spring, cut and gathered in a glass jar.",
    status: "sold",
    featured: false,
    medium: "Oil on Canvas",
    size: "10 x 12",
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
