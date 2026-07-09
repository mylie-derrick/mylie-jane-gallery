import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, getPainting, paintings } from "@/lib/paintings";
import { artworkAlt, artworkSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/paintings/$slug")({
  loader: ({ params }) => {
    const painting = getPainting(params.slug);
    if (!painting) throw notFound();
    return { painting };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.painting;
    if (!p) return {};
    const description = `${p.description} View ${p.title}, an original ${p.category.toLowerCase()} oil painting by Utah artist Mylie Jane Derrick.`;
    const head = seo({
      title: `${p.title} | Original ${p.category} Oil Painting`,
      description,
      path: `/paintings/${p.slug}`,
      image: p.image,
      type: "article",
    });

    return {
      ...head,
      meta: [...head.meta, { "script:ld+json": artworkSchema(p) }],
    };
  },
  component: PaintingPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-4 font-serif text-3xl">That painting isn't here</h1>
      <Link
        to="/gallery"
        className="mt-8 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-[0.22em]"
      >
        Back to gallery
      </Link>
    </div>
  ),
});

function PaintingPage() {
  const { painting } = Route.useLoaderData();
  const collection = getCollection(painting.collection);
  const others = paintings.filter((p) => p.slug !== painting.slug).slice(0, 3);
  const available = painting.status === "available";

  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <Link
        to="/gallery"
        className="text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
      >
        ← Gallery
      </Link>

      <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-8">
          <img
            src={painting.image}
            alt={artworkAlt(painting)}
            width={1024}
            height={1024}
            decoding="async"
            className="w-full object-contain shadow-[0_30px_80px_-40px_rgba(60,40,20,0.35)]"
          />
        </figure>

        <aside className="md:col-span-4 md:pt-4">
          {collection && <p className="eyebrow">{collection.title}</p>}
          <h1 className="mt-3 font-serif text-3xl italic text-foreground md:text-4xl">
            {painting.title}
          </h1>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Year</dt>
              <dd className="text-foreground">{painting.year}</dd>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Medium</dt>
              <dd className="text-foreground">{painting.medium}</dd>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Size</dt>
              <dd className="text-foreground">{painting.size}</dd>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Price</dt>
              <dd className="text-foreground">{painting.price}</dd>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="text-foreground">{painting.statusLabel}</dd>
            </div>
          </dl>

          <p className="mt-8 text-base leading-relaxed text-foreground/85">
            {painting.description}
          </p>

          {available ? (
            <>
              <Link
                to="/contact"
                search={{ painting: painting.title }}
                className="mt-10 inline-flex items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-[color:var(--brand-header-green)]"
              >
                Inquire to Purchase
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">
                Originals are sold directly. I'll reply personally with availability, pricing, and
                shipping.
              </p>
            </>
          ) : (
            <p className="mt-10 border border-border px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {painting.statusLabel}
            </p>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-32">
          <p className="eyebrow">More work</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/paintings/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={artworkAlt(p)}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    decoding="async"
                    className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-3 font-serif italic text-foreground">{p.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
