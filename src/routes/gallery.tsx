import { createFileRoute, Link } from "@tanstack/react-router";
import { paintings } from "@/lib/paintings";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mylie Jane Design" },
      {
        name: "description",
        content:
          "Browse original oil paintings by Mylie Jane Derrick — landscapes, still lifes, and plein air work.",
      },
      { property: "og:title", content: "Gallery — Mylie Jane Design" },
      {
        property: "og:description",
        content: "Original oil paintings — landscapes, still lifes, and plein air work.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-2xl">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
          Available & recent paintings
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Every painting here is an original. To ask after a piece, follow the link
          and send a note — I answer each one personally.
        </p>
      </header>

      <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {paintings.map((p) => (
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
            <div className="mt-4">
              <p className="font-serif text-lg italic text-foreground">{p.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.medium} · {p.size}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
