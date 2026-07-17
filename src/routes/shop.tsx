import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { paintings, type CollectionId } from "@/lib/paintings";
import { artworkAlt, seo } from "@/lib/seo";

type ShopFilterId = "all" | CollectionId | "lake-powell";

const shopFilters: { id: ShopFilterId; label: string; helper?: string }[] = [
  { id: "all", label: "All" },
  { id: "still-lifes", label: "Still Lifes" },
  { id: "landscapes", label: "Landscapes" },
  { id: "other-work", label: "Other Work" },
  { id: "lake-powell", label: "Lake Powell", helper: "Collection preview" },
];

const lakePowellSlugs = new Set(["wahweap"]);

export const Route = createFileRoute("/shop")({
  head: () =>
    seo({
      title: "Available Original Oil Paintings | Mylie Jane Design",
      description:
        "View available original oil paintings by Utah artist Mylie Jane Derrick. Inquire about still life and landscape paintings from Mylie Jane Design.",
      path: "/shop",
      image: "/images/oranges-and-blooms.jpg",
    }),
  component: Shop,
});

function Shop() {
  const [activeFilter, setActiveFilter] = useState<ShopFilterId>("all");
  const availablePaintings = paintings.filter((painting) => painting.status === "available");
  const soldPaintings = paintings.filter((painting) => painting.status === "sold");
  const allShopPaintings = [...availablePaintings, ...soldPaintings];
  const shopPaintings = allShopPaintings.filter((painting) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "lake-powell") return lakePowellSlugs.has(painting.slug);
    return painting.collection === activeFilter;
  });
  const getColumns = (columnCount: number) =>
    shopPaintings.reduce<Array<typeof shopPaintings>>(
      (columns, painting, index) => {
        columns[index % columnCount].push(painting);
        return columns;
      },
      Array.from({ length: columnCount }, () => []),
    );

  const twoColumnPaintings = getColumns(2);
  const threeColumnPaintings = getColumns(3);

  const renderPainting = (painting: (typeof paintings)[number]) => {
    const available = painting.status === "available";

    return (
      <article key={painting.slug} className="group">
        <Link to="/paintings/$slug" params={{ slug: painting.slug }} className="block">
          <div className="overflow-hidden">
            <img
              src={painting.image}
              alt={artworkAlt(painting)}
              loading="lazy"
              decoding="async"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        <div className="mt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl italic text-foreground">{painting.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{painting.category}</p>
            </div>
            <p
              className="shrink-0 text-xs uppercase tracking-[0.2em]"
              style={{
                color: available ? "var(--brand-deep-moss)" : "var(--brand-forest-green)",
              }}
            >
              {painting.statusLabel}
            </p>
          </div>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
              <dt className="text-muted-foreground">Medium</dt>
              <dd className="text-right text-foreground">{painting.medium}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
              <dt className="text-muted-foreground">Size</dt>
              <dd className="text-right text-foreground">{painting.size}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
              <dt className="text-muted-foreground">Price</dt>
              <dd className="text-right text-foreground">{painting.price}</dd>
            </div>
          </dl>

          {available ? (
            <Link
              to="/contact"
              search={{ painting: painting.title }}
              className="mt-6 inline-flex w-full items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-[color:var(--brand-header-green)]"
            >
              Inquire to Purchase
            </Link>
          ) : (
            <p className="mt-6 border border-border px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {painting.statusLabel}
            </p>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Available Work</p>
        <h1 className="mt-4 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
          Available original paintings.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Each painting is one of a kind. Available works may be purchased by inquiry. Sold and
          not-for-sale works are clearly marked.
        </p>
      </header>

      <div className="mt-10 border-y border-border/60 py-6">
        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Browse by category or collection
        </p>
        <div className="flex flex-wrap gap-3">
          {shopFilters.map((filter) => {
            const active = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className="border px-4 py-2 text-left text-xs uppercase tracking-[0.22em] transition-colors"
                style={{
                  borderColor: active ? "var(--brand-header-green)" : "var(--brand-deep-moss)",
                  backgroundColor: active ? "var(--brand-header-green)" : "transparent",
                  color: active ? "var(--brand-cream)" : "var(--brand-ink)",
                }}
              >
                <span>{filter.label}</span>
                {filter.helper && (
                  <span className="mt-1 block text-[0.6rem] tracking-[0.16em] opacity-75">
                    {filter.helper}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-16 space-y-16 md:hidden">{shopPaintings.map(renderPainting)}</div>
      <div className="mt-16 hidden gap-10 md:grid md:grid-cols-2 xl:hidden">
        {twoColumnPaintings.map((column, index) => (
          <div key={index} className="space-y-16">
            {column.map(renderPainting)}
          </div>
        ))}
      </div>
      <div className="mt-16 hidden gap-10 xl:grid xl:grid-cols-3">
        {threeColumnPaintings.map((column, index) => (
          <div key={index} className="space-y-16">
            {column.map(renderPainting)}
          </div>
        ))}
      </div>
    </section>
  );
}
