import { createFileRoute, Link } from "@tanstack/react-router";
import type { MouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { collections, paintings, type CollectionId } from "@/lib/paintings";
import { artworkAlt, seo } from "@/lib/seo";

const searchSchema = z.object({
  category: z.enum(["all", "still-lifes", "landscapes", "other-work"]).optional(),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () =>
    seo({
      title: "Original Oil Painting Gallery | Mylie Jane Design",
      description:
        "Browse Mylie Jane Derrick's original oil painting gallery, including still life paintings, Utah-inspired landscapes, portraits, and studies.",
      path: "/gallery",
      image: "/images/freshly-cut.jpg",
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
  const [activePainting, setActivePainting] = useState<string | null>(null);
  const activePaintingRef = useRef<string | null>(null);
  const suppressClickForSlug = useRef<string | null>(null);
  const filter = category ?? "all";
  const selectedCollection = collections.find((collection) => collection.id === filter);
  const visiblePaintings =
    filter === "all" ? paintings : paintings.filter((painting) => painting.collection === filter);

  useEffect(() => {
    const dismissOverlay = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest("[data-gallery-artwork]")) {
        activePaintingRef.current = null;
        setActivePainting(null);
        suppressClickForSlug.current = null;
      }
    };

    document.addEventListener("pointerdown", dismissOverlay);
    return () => document.removeEventListener("pointerdown", dismissOverlay);
  }, []);

  const handleArtworkPointerDown = (slug: string, event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") {
      if (activePaintingRef.current !== slug) {
        event.preventDefault();
        activePaintingRef.current = slug;
        setActivePainting(slug);
        suppressClickForSlug.current = slug;
      } else {
        suppressClickForSlug.current = null;
      }
    }
  };

  const handleArtworkClick = (slug: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (suppressClickForSlug.current === slug) {
      event.preventDefault();
      suppressClickForSlug.current = null;
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="max-w-2xl md:col-span-7">
          <p className="eyebrow">Gallery</p>
          <h1 className="mt-4 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
            Original paintings, gathered by series.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Browse still lifes, landscapes, portraits, and studies.
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
                    borderColor: active ? "var(--brand-header-green)" : "var(--brand-deep-moss)",
                    backgroundColor: active ? "var(--brand-header-green)" : "transparent",
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
            data-gallery-artwork
            onPointerDown={(event) => handleArtworkPointerDown(painting.slug, event)}
            onClick={(event) => handleArtworkClick(painting.slug, event)}
            className="group mb-16 block break-inside-avoid"
            aria-label={`${painting.title}, ${painting.statusLabel}`}
          >
            <div className="relative overflow-hidden">
              <img
                src={painting.image}
                alt={artworkAlt(painting)}
                loading="lazy"
                decoding="async"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className={`absolute inset-0 flex items-center justify-center bg-[rgba(74,93,58,0.62)] px-6 text-center text-white opacity-0 transition duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  activePainting === painting.slug ? "opacity-100" : ""
                }`}
              >
                <div
                  className={`translate-y-2 transition duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 ${
                    activePainting === painting.slug ? "translate-y-0" : ""
                  }`}
                >
                  <p className="font-serif text-3xl italic leading-tight md:text-4xl">
                    {painting.title}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] md:text-sm">
                    {painting.statusLabel}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
