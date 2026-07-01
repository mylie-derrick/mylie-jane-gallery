import freshlyCut from "@/assets/freshly-cut.jpg.asset.json";
import orangesAndRoses from "@/assets/oranges-and-roses.jpg.asset.json";
import lavenderAndLemons from "@/assets/lavender-and-lemons.jpg.asset.json";
import carnations from "@/assets/carnations.jpg.asset.json";
import daffodils from "@/assets/daffodils.jpg.asset.json";
import eveningSky from "@/assets/evening-sky.jpg.asset.json";
import skiers from "@/assets/skiers.jpg.asset.json";
import portraitProfile from "@/assets/portrait-profile.jpg.asset.json";

export type CollectionId = "still-lifes" | "landscapes" | "other-work";

export interface Painting {
  slug: string;
  title: string;
  year: number;
  medium: string;
  size: string;
  collection: CollectionId;
  image: string;
  note: string;
}

export const collections: { id: CollectionId; title: string; description: string }[] = [
  {
    id: "still-lifes",
    title: "Still Lifes",
    description:
      "Slow, close paintings made at the studio table — flowers, fruit, and everyday objects in quiet light.",
  },
  {
    id: "landscapes",
    title: "Landscapes",
    description:
      "The places I keep returning to — big Western skies, open fields, and quiet moments in the mountains.",
  },
  {
    id: "other-work",
    title: "Other Work",
    description:
      "Portraits, studies, and pieces that don't quite fit the other rooms.",
  },
];

export const paintings: Painting[] = [
  {
    slug: "freshly-cut",
    title: "Freshly Cut",
    year: 2024,
    medium: "Oil on panel",
    size: "12 × 12 in",
    collection: "still-lifes",
    image: freshlyCut.url,
    note: "Roses from the garden in a small white vase, painted in one long sitting against a dark ground.",
  },
  {
    slug: "oranges-and-roses",
    title: "Oranges and Roses",
    year: 2024,
    medium: "Oil on panel",
    size: "12 × 16 in",
    collection: "still-lifes",
    image: orangesAndRoses.url,
    note: "A study in warm color — cut oranges, a whole navel, and two pink peony buds on a scarred wooden board.",
  },
  {
    slug: "lavender-and-lemons",
    title: "Lavender and Lemons",
    year: 2024,
    medium: "Oil on panel",
    size: "10 × 16 in",
    collection: "still-lifes",
    image: lavenderAndLemons.url,
    note: "Bread, oil, lemon, and a bud vase of lavender — a small tabletop arrangement built around cool violet and pale yellow.",
  },
  {
    slug: "carnations",
    title: "Carnations in a Bud Vase",
    year: 2023,
    medium: "Oil on canvas",
    size: "9 × 12 in",
    collection: "still-lifes",
    image: carnations.url,
    note: "Coral carnations against a deep navy ground. I wanted the glass to feel almost weightless.",
  },
  {
    slug: "daffodils",
    title: "Daffodils",
    year: 2023,
    medium: "Oil on panel",
    size: "10 × 12 in",
    collection: "still-lifes",
    image: daffodils.url,
    note: "Two daffodils in a slim glass vase, catching afternoon light against a soft gray wall.",
  },
  {
    slug: "evening-sky",
    title: "Evening Sky Over the Fields",
    year: 2024,
    medium: "Oil on panel",
    size: "11 × 14 in",
    collection: "landscapes",
    image: eveningSky.url,
    note: "Painted on a drive home — the last of the sun catching the underside of long pink clouds over a small farmhouse.",
  },
  {
    slug: "backcountry",
    title: "Backcountry",
    year: 2024,
    medium: "Oil on panel",
    size: "8 × 10 in",
    collection: "landscapes",
    image: skiers.url,
    note: "A small tonal study of four skiers moving through overcast light in the high country.",
  },
  {
    slug: "profile-study",
    title: "Portrait Study",
    year: 2023,
    medium: "Oil on canvas",
    size: "11 × 14 in",
    collection: "other-work",
    image: portraitProfile.url,
    note: "A profile study done from life in the studio. The dark ground and hoop earring were the anchors I kept coming back to.",
  },
];

export function getPainting(slug: string) {
  return paintings.find((p) => p.slug === slug);
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}
