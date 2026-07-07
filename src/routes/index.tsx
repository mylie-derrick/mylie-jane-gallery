import { createFileRoute, Link } from "@tanstack/react-router";
import { paintings } from "@/lib/paintings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mylie Jane Design — Oil Paintings by Mylie Jane Derrick" },
      {
        name: "description",
        content:
          "Original oil paintings by Mylie Jane Derrick — still lifes and landscapes from the American West.",
      },
      { property: "og:title", content: "Mylie Jane Design — Oil Paintings" },
      {
        property: "og:description",
        content: "Original oil paintings — still lifes and landscapes from the American West.",
      },
      { property: "og:image", content: "/images/oranges-and-blooms.jpg" },
      { name: "twitter:image", content: "/images/oranges-and-blooms.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = paintings.filter((p) =>
    ["oranges-and-blooms", "freshly-cut", "wahweap"].includes(p.slug),
  );

  return (
    <>
      <section
        className="relative flex min-h-[82vh] w-full items-end overflow-hidden"
        style={{ backgroundColor: "var(--brand-olive)" }}
      >
        <img
          src="/images/oranges-and-blooms.jpg"
          alt="Oranges and Blooms oil painting by Mylie Jane Derrick."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0) 30%, rgba(26,26,26,0) 55%, rgba(26,26,26,0.7) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-28 md:px-10 md:pb-24">
          <p
            className="text-xs uppercase md:text-sm"
            style={{
              color: "var(--brand-cream)",
              letterSpacing: "0.32em",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            Representational oil paintings
          </p>
          <h1
            className="mt-5 max-w-4xl italic leading-[1.02] text-5xl md:text-7xl lg:text-8xl"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: "var(--brand-cream)",
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            Original oil paintings inspired by light, place, and quiet everyday beauty.
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{
              color: "var(--brand-cream)",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            Still lifes, landscapes, and studies by Mylie Jane Derrick, a Utah-based painter drawn
            to color, memory, and the feeling of being somewhere beautiful.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-[color:var(--brand-wine)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-olive)]"
            >
              View Gallery
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-cream)] hover:text-[color:var(--brand-wine)]"
            >
              Inquire About a Painting
            </Link>
          </div>
        </div>
        <a
          href="#recent-work"
          aria-label="Scroll to recent work"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          style={{ color: "var(--brand-cream)" }}
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
            className="animate-bounce opacity-90"
          >
            <path d="M12 5v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
        </a>
      </section>

      <section
        id="recent-work"
        className="mx-auto mt-24 max-w-7xl px-6 pt-8 md:mt-32 md:px-10 scroll-mt-16"
      >
        <div
          className="flex items-end justify-between gap-6 pb-6"
          style={{ borderBottom: "1px solid var(--brand-mauve)" }}
        >
          <div>
            <p className="eyebrow">Recent Work</p>
            <h2
              className="mt-3 font-serif text-3xl md:text-4xl"
              style={{ color: "var(--brand-ink)" }}
            >
              Still lifes, landscapes, and studies
            </h2>
          </div>
          <Link
            to="/gallery"
            className="hidden text-sm uppercase tracking-[0.22em] md:inline"
            style={{ color: "var(--brand-wine)" }}
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
              <div className="overflow-hidden" style={{ backgroundColor: "var(--brand-olive)" }}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <p className="font-serif text-xl italic" style={{ color: "var(--brand-ink)" }}>
                  {p.title}
                </p>
                <p className="mt-1 text-sm" style={{ color: "#5A4E44" }}>
                  {p.category} · {p.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow">A Note</p>
        <p
          className="mt-6 font-serif text-2xl italic leading-relaxed md:text-3xl"
          style={{ color: "var(--brand-ink)" }}
        >
          "I paint the things that stop me — a bowl of oranges in warm light, a Western sky just
          before it turns."
        </p>
        <p
          className="mt-6 text-sm uppercase tracking-[0.22em]"
          style={{ color: "var(--brand-wine)" }}
        >
          — Mylie Jane
        </p>
      </section>
    </>
  );
}
