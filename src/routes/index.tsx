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
      <section className="relative -mt-px h-screen w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Wasatch, Morning Fog — an oil painting of the Wasatch range under low morning fog."
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* subtle dark gradient at bottom for legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0) 55%, rgba(26,26,26,0.55) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1
            className="font-serif italic text-[var(--brand-cream)] text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
          >
            Mylie Jane Design
          </h1>
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[var(--brand-cream)]/90 md:text-sm">
            Original oil paintings · American West
          </p>
        </div>
        <a
          href="#recent-work"
          aria-label="Scroll to recent work"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--brand-cream)]/80 transition-colors hover:text-[var(--brand-cream)]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </a>
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
