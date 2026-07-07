import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { collections, paintings, type CollectionId } from "@/lib/paintings";

const searchSchema = z.object({
  category: z.enum(["all", "still-lifes", "landscapes", "other-work"]).optional(),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Gallery — Mylie Jane Design" },
      {
        name: "description",
        content:
          "Browse original oil paintings by Mylie Jane Derrick — still lifes, landscapes, portraits, and studies.",
      },
      { property: "og:title", content: "Gallery — Mylie Jane Design" },
      {
        property: "og:description",
        content: "Original oil paintings by Mylie Jane Derrick.",
      },
    ],
  }),
  component: Gallery,
});

type FilterId = "all" | CollectionId;

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "still-lifes", label: "Still Lifes" },
  { id: "landscapes", label: "Landscapes" },
  { id: "other-work", label: "Other Work" },
];

function Gallery() {
  const { category } = Route.useSearch();
  const filter = category ?? "all";
  const selectedCollection = collections.find((collection) => collection.id === filter);
  const visiblePaintings =
    filter === "all" ? paintings : paintings.filter((painting) => painting.collection === filter);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="max-w-2xl md:col-span-7">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-4 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
            Original paintings, gathered by series.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Browse still lifes, landscapes, portraits, and studies. Sold paintings remain here as
            part of the archive.
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="flex flex-wrap gap-3">
            {filters.map((item) => {
              const active = item.id === filter;
              return (
                <Link
                  key={item.id}
                  to="/gallery"
                  search={item.id === "all" ? {} : { category: item.id }}
                  className="border px-4 py-2 text-xs uppercase tracking-[0.22em] transition-colors"
                  style={{
                    borderColor: active ? "var(--brand-wine)" : "var(--brand-mauve)",
                    backgroundColor: active ? "var(--brand-wine)" : "transparent",
                    color: active ? "var(--brand-cream)" : "var(--brand-ink)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          {selectedCollection && (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {selectedCollection.description}
            </p>
          )}
        </div>
      </header>

      <div className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-3">
        {visiblePaintings.map((painting) => (
          <Link
            key={painting.slug}
            to="/paintings/$slug"
            params={{ slug: painting.slug }}
            className="group mb-16 block break-inside-avoid"
          >
            <div className="overflow-hidden">
              <img
                src={painting.image}
                alt={painting.title}
                loading="lazy"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl italic text-foreground">{painting.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {painting.category} · {painting.year}
                </p>
              </div>
              <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {painting.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
