import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/painting-wasatch-morning.jpg";
import { paintings } from "@/lib/paintings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mylie Jane Design — Oil Paintings from Utah" },
      {
        name: "description",
        content:
          "Original oil paintings by Mylie Jane Derrick. Representational landscapes and still lifes from Utah's mountains, red rock, and gardens.",
      },
      { property: "og:title", content: "Mylie Jane Design — Oil Paintings from Utah" },
      {
        property: "og:description",
        content:
          "Original oil paintings by Mylie Jane Derrick — landscapes and still lifes from Utah.",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = paintings.slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-12 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5 md:pt-12">
            <p className="eyebrow">Oil Paintings · Est. Utah</p>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
              Quiet paintings of the West, made one canvas at a time.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              I'm Mylie Jane Derrick — a representational oil painter working from Utah's
              mountains, deserts, and the still corners of my studio. Each piece is an
              original, painted slowly and sold directly.
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              <Link
                to="/gallery"
                className="border-b border-foreground pb-1 text-sm uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary hover:border-primary"
              >
                View the gallery
              </Link>
              <Link
                to="/statement"
                className="border-b border-transparent pb-1 text-sm uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
              >
                Artist statement
              </Link>
            </div>
          </div>
          <div className="md:col-span-7">
            <figure>
              <img
                src={heroImage}
                alt="Wasatch, Morning Fog — an oil painting of the Wasatch range under low morning fog."
                width={1024}
                height={1024}
                className="w-full object-cover shadow-[0_30px_80px_-40px_rgba(60,40,20,0.35)]"
              />
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="italic">Wasatch, Morning Fog</span> · Oil on linen · 30 × 40 in
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-border/60 pb-6">
          <div>
            <p className="eyebrow">Recent Work</p>
            <h2 className="mt-3 font-serif text-3xl text-foreground md:text-4xl">
              A few pieces from the studio
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground md:inline"
          >
            See all →
          </Link>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {featured.map((p) => (
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

      <section className="mx-auto mt-32 max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow">A Note</p>
        <p className="mt-6 font-serif text-2xl italic leading-relaxed text-foreground md:text-3xl">
          "I paint the places that have made me — high country aspens, red rock at dusk,
          flowers cut from the garden in the morning."
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.22em] text-muted-foreground">
          — Mylie Jane
        </p>
      </section>
    </>
  );
}
