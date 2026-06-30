import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, paintings } from "@/lib/paintings";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Mylie Jane Design" },
      {
        name: "description",
        content:
          "Paintings grouped by series — landscapes of Utah, intimate still lifes, and plein air work made outdoors.",
      },
      { property: "og:title", content: "Collections — Mylie Jane Design" },
      {
        property: "og:description",
        content: "Landscapes, still lifes, and plein air work by Mylie Jane Derrick.",
      },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow">Collections</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
          Grouped by series
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          The work tends to fall into three quiet families. Each one is ongoing —
          new pieces are added as they're finished.
        </p>
      </header>

      <div className="mt-20 space-y-28">
        {collections.map((c) => {
          const items = paintings.filter((p) => p.collection === c.id);
          return (
            <div key={c.id} className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4 md:sticky md:top-12 md:self-start">
                <p className="eyebrow">Series</p>
                <h2 className="mt-3 font-serif text-3xl italic text-foreground md:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              <div className="md:col-span-8">
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      to="/paintings/$slug"
                      params={{ slug: p.slug }}
                      className="group block"
                    >
                      <div className="overflow-hidden bg-muted">
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          width={1024}
                          height={1024}
                          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="mt-3 font-serif italic text-foreground">{p.title}</p>
                      <p className="text-sm text-muted-foreground">{p.size}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
