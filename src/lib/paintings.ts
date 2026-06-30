import aspenLight from "@/assets/painting-aspen-light.jpg";
import powellReflection from "@/assets/painting-powell-reflection.jpg";
import peonies from "@/assets/painting-peonies.jpg";
import wasatchMorning from "@/assets/painting-wasatch-morning.jpg";
import lemonsBrass from "@/assets/painting-lemons-brass.jpg";
import cottonwoodCreek from "@/assets/painting-cottonwood-creek.jpg";
import canyonDusk from "@/assets/painting-canyon-dusk.jpg";
import gardenRoses from "@/assets/painting-garden-roses.jpg";

export type CollectionId = "landscapes" | "still-lifes" | "plein-air";

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
    id: "landscapes",
    title: "Landscapes",
    description:
      "Studio paintings of the places I keep returning to — the Wasatch, the red rock country, the long quiet of Lake Powell.",
  },
  {
    id: "still-lifes",
    title: "Still Lifes",
    description:
      "Small, slow paintings made at the kitchen table. Flowers from the garden, fruit, the things on hand in afternoon light.",
  },
  {
    id: "plein-air",
    title: "Plein Air",
    description:
      "Paintings finished outside in one sitting, in whatever weather the day offers. The closest thing I have to a journal.",
  },
];

export const paintings: Painting[] = [
  {
    slug: "aspen-light",
    title: "Aspen Light",
    year: 2025,
    medium: "Oil on linen",
    size: '24 × 30 in',
    collection: "landscapes",
    image: aspenLight,
    note: "Painted from a late September hike above Alta. I wanted the aspens to feel lit from within — the way they actually look when the sun drops behind the ridge.",
  },
  {
    slug: "powell-reflection",
    title: "Powell, Late Morning",
    year: 2024,
    medium: "Oil on panel",
    size: '20 × 20 in',
    collection: "landscapes",
    image: powellReflection,
    note: "A quiet inlet on the south end of the lake. The water was so still I almost didn't trust it.",
  },
  {
    slug: "wasatch-morning",
    title: "Wasatch, Morning Fog",
    year: 2025,
    medium: "Oil on linen",
    size: '30 × 40 in',
    collection: "landscapes",
    image: wasatchMorning,
    note: "Studio piece from a stack of plein air studies done last October. I kept losing and finding the mountain in the fog — I wanted that in the painting.",
  },
  {
    slug: "canyon-dusk",
    title: "Canyon, Dusk",
    year: 2024,
    medium: "Oil on panel",
    size: '18 × 24 in',
    collection: "landscapes",
    image: canyonDusk,
    note: "Southern Utah, just after the sun left the canyon walls. The shadows turn violet for about ten minutes and then it's over.",
  },
  {
    slug: "white-peonies",
    title: "White Peonies",
    year: 2025,
    medium: "Oil on linen",
    size: '14 × 14 in',
    collection: "still-lifes",
    image: peonies,
    note: "From the garden, set on the kitchen counter in north light. Peonies only last a few days — most of this was painted in one long sitting.",
  },
  {
    slug: "lemons-and-brass",
    title: "Lemons and Brass",
    year: 2024,
    medium: "Oil on panel",
    size: '12 × 16 in',
    collection: "still-lifes",
    image: lemonsBrass,
    note: "A small study about warm light on warm color. The brass bowl belonged to my grandmother.",
  },
  {
    slug: "garden-roses",
    title: "Garden Roses, Afternoon",
    year: 2025,
    medium: "Oil on linen",
    size: '16 × 20 in',
    collection: "still-lifes",
    image: gardenRoses,
    note: "Cut from the back fence in early June. I left the fallen petals where they landed.",
  },
  {
    slug: "cottonwood-creek",
    title: "Cottonwood Creek",
    year: 2024,
    medium: "Oil on panel",
    size: '11 × 14 in',
    collection: "plein-air",
    image: cottonwoodCreek,
    note: "Finished on site in about two hours. The light moves quickly through cottonwoods — you have to commit early and keep going.",
  },
];

export function getPainting(slug: string) {
  return paintings.find((p) => p.slug === slug);
}

export function getCollection(id: string) {
  return collections.find((c) => c.id === id);
}
