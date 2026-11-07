import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllArtworks } from "@/lib/sanity.artworks";
import { artworkAlt, seo } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  loader: () => getAllArtworks(),
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
  const paintings = Route.useLoaderData();
  const availablePaintings = paintings.filter((painting) => painting.status === "available");
  const soldPaintings = paintings.filter((painting) =>
    ["sold", "privateCollection", "notForSale"].includes(painting.status),
  );
  const shopPaintings = [...availablePaintings, ...soldPaintings];
  const total = shopPaintings.length;

  // Each painting gets the whole screen; scrolling settles gently on one at a time.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-paintings");
    return () => root.classList.remove("snap-paintings");
  }, []);

  return (
    <>
      <header className="shop-slide mx-auto flex max-w-7xl flex-col justify-center px-6 md:px-10">
        <p className="eyebrow">Available Work</p>
        <h1 className="mt-4 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
          Available original paintings.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Each painting is one of a kind. Available works may be purchased by inquiry. Sold and
          not-for-sale works are clearly marked.
        </p>
        <p className="mt-14 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Scroll to view {total} paintings ↓
        </p>
      </header>

      {shopPaintings.map((painting, index) => {
        const available = painting.status === "available";
        return (
          <article
            key={painting.slug}
            className="shop-slide mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)] md:gap-16 md:px-10"
          >
            <Link
              to="/paintings/$slug"
              params={{ slug: painting.slug }}
              className="group flex h-full min-h-0 items-center justify-center"
            >
              <img
                src={painting.image}
                srcSet={painting.imageSrcSet}
                sizes="(min-width: 768px) 70vw, 100vw"
                alt={artworkAlt(painting)}
                width={painting.imageWidth}
                height={painting.imageHeight}
                loading={index < 1 ? "eager" : "lazy"}
                decoding="async"
                className="shop-slide-img w-auto max-w-full object-contain"
              />
            </Link>

            <div className="md:self-center">
              <p className="text-xs tracking-[0.22em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <h2 className="mt-4 font-serif text-3xl italic leading-tight text-foreground md:text-4xl">
                {painting.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {painting.category}
                {painting.year !== "TBD" ? ` · ${painting.year}` : ""}
              </p>

              <dl className="mt-8 space-y-2 text-sm">
                <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Medium</dt>
                  <dd className="text-right text-foreground">{painting.medium}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Size</dt>
                  <dd className="text-right text-foreground">{painting.size}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">{available ? "Price" : "Status"}</dt>
                  <dd
                    className="text-right"
                    style={{
                      color: available ? "var(--foreground)" : "var(--brand-forest-green)",
                    }}
                  >
                    {available ? painting.price : painting.statusLabel}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3">
                {available ? (
                  <Link
                    to="/contact"
                    search={{ painting: painting.title }}
                    className="btn-frame w-full text-[color:var(--brand-forest-green)]"
                  >
                    Inquire to Purchase
                  </Link>
                ) : null}
                <Link
                  to="/paintings/$slug"
                  params={{ slug: painting.slug }}
                  className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
                >
                  View details →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
