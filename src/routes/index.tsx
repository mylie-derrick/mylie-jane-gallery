import { createFileRoute, Link } from "@tanstack/react-router";
import { paintings } from "@/lib/paintings";
import { artworkAlt, defaultSeoImage, seo, websiteSchema } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const head = seo({
      title: "Mylie Jane Design | Original Oil Paintings by Mylie Jane Derrick",
      description:
        "Explore original oil paintings, still lifes, landscapes, and commission inquiries by Utah artist Mylie Jane Derrick of Mylie Jane Design.",
      path: "/",
      image: defaultSeoImage,
    });

    return {
      ...head,
      meta: [...head.meta, { "script:ld+json": websiteSchema }],
    };
  },
  component: Index,
});

function Index() {
  const featured = paintings.filter((p) => p.featured);

  return (
    <>
      <section
        className="relative flex min-h-screen w-full items-center overflow-hidden"
        style={{ backgroundColor: "var(--brand-header-green)" }}
      >
          <img
            src="/images/hero-painting-process.jpg"
            alt="Mylie Jane Derrick painting oranges and blooms in the studio."
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0) 30%, rgba(26,26,26,0) 55%, rgba(26,26,26,0.7) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pb-32 md:pt-36">
          <h1
            className="max-w-3xl italic leading-[1.04] text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: "var(--brand-cream)",
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            Art that elevates the everyday.
          </h1>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-[color:var(--brand-header-green)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-footer-moss)]"
            >
              View Gallery
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-cream)] hover:text-[color:var(--background)]"
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
            style={{ color: "var(--brand-forest-green)" }}
          >
            See all →
          </Link>
        </div>
        <div className="mt-12 columns-1 gap-12 md:columns-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/paintings/$slug"
              params={{ slug: p.slug }}
              className="group mb-12 block break-inside-avoid"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={artworkAlt(p)}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <p className="font-serif text-xl italic" style={{ color: "var(--brand-ink)" }}>
                  {p.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.category} · {p.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="mt-24 px-6 py-20 text-center md:mt-32 md:px-10 md:py-24"
        style={{ backgroundColor: "rgba(148, 168, 124, 0.28)" }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Commissions</p>
          <h2
            className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl"
            style={{ color: "var(--brand-ink)" }}
          >
            Have something in mind?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Commission a custom piece for your home, a meaningful gift, or a place you want to
            remember. Share what you're imagining and I'll help shape it into an original painting.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center bg-[color:var(--brand-header-green)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-footer-moss)]"
          >
            Start an Inquiry
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow">A Note</p>
        <p
          className="mt-6 font-serif text-2xl italic leading-relaxed md:text-3xl"
          style={{ color: "var(--brand-ink)" }}
        >
          Thank you for being here. It means a great deal to me that these paintings find homes of
          their own. My hope is that they bring beauty, warmth, and joy to the spaces they're part
          of.
        </p>
      </section>
    </>
  );
}
