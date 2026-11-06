import { createFileRoute, Link } from "@tanstack/react-router";
import { getFeaturedArtworks } from "@/lib/sanity.artworks";
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
  loader: () => getFeaturedArtworks(),
  component: Index,
});

function Index() {
  const featured = Route.useLoaderData();

  return (
    <>
      <section
        className="hero-full sticky top-0 z-0 flex w-full items-center overflow-hidden"
        style={
          {
            // No background colour here on purpose: iPhone Safari paints its top and bottom
            // bars with the colour of a pinned (sticky) section, which framed the photo in
            // green. Without one, the photo runs underneath the bars.
            // Fill the whole phone screen. On phones the photo also runs on underneath
            // Safari's floating bottom toolbar (see .hero-full in styles.css).
          }
        }
      >
        <img
          src="/images/hero-painting-process.jpg"
          alt="Mylie Jane Derrick painting oranges and blooms in the studio."
          width={721}
          height={1092}
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
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-28 pt-32 text-center md:px-10 md:pb-32 md:pt-36">
          <h1
            className="font-display text-[1.75rem] uppercase leading-[1.2] tracking-[0.06em] sm:text-4xl md:text-5xl lg:text-[3.6rem]"
            style={{
              color: "var(--brand-cream)",
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            Oil paintings
            <br />
            by Mylie Jane Derrick
          </h1>
        </div>
        <a
          href="#recent-work"
          aria-label="Scroll to recent work"
          className="absolute left-1/2 z-10 -translate-x-1/2"
          style={{
            color: "var(--brand-cream)",
            // Just above the bottom of the visible screen (above Safari's toolbar on phones).
            top: "calc(100svh - 4.75rem)",
          }}
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

      {/* Each section below slides up over the one before it as you scroll. */}
      <div
        className="relative z-10 bg-background"
        style={{ boxShadow: "0 -24px 60px -30px rgba(0,0,0,0.45)" }}
      >
        <section
          id="recent-work"
          className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32 scroll-mt-16"
        >
          <div className="flex items-end justify-between gap-6 pb-6">
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
              style={{ color: "var(--brand-cream)" }}
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
                    srcSet={p.imageSrcSet}
                    sizes={p.imageSizes}
                    alt={artworkAlt(p)}
                    width={p.imageWidth}
                    height={p.imageHeight}
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

        <section className="sticky top-0 z-0 flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10 md:py-28">
          <img
            src="/images/commissions-process.jpeg"
            alt="Mylie Jane Derrick mixing paint in the studio."
            width={724}
            height={1086}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_84%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(46,59,36,0.34) 0%, rgba(46,59,36,0.5) 46%, rgba(46,59,36,0.68) 100%), linear-gradient(rgba(46,59,36,0.46), rgba(46,59,36,0.46))",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-4xl">
            <p className="eyebrow">Commissions</p>
            <h2
              className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl"
              style={{ color: "var(--brand-cream)" }}
            >
              Have something in mind?
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(247, 243, 236, 0.86)" }}
            >
              Commission a custom oil painting of a meaningful place, still life, floral
              arrangement, or memory you want to hold onto. Share what you're imagining and I'll
              help shape it into an original piece.
            </p>
            <Link to="/contact" className="btn-frame mt-8 text-[color:var(--brand-cream)]">
              Start an Inquiry
            </Link>
          </div>
        </section>

        <section
          className="relative z-10 bg-background px-6 py-32 text-center md:px-10"
          style={{ boxShadow: "0 -24px 60px -30px rgba(0,0,0,0.45)" }}
        >
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">A Note</p>
            <p
              className="mt-6 font-serif text-2xl italic leading-relaxed md:text-3xl"
              style={{ color: "var(--brand-ink)" }}
            >
              Thank you for being here. It means a great deal to me that these paintings find homes
              of their own. My hope is that they bring beauty, warmth, and joy to the spaces they're
              part of.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
