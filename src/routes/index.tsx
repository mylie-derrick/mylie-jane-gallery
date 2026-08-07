import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PolishedImage } from "@/components/PolishedImage";
import { getFeaturedArtworks } from "@/lib/sanity.artworks";
import { artworkAlt, defaultSeoImage, seo, websiteSchema } from "@/lib/seo";

const searchSchema = z.object({
  commissionPreview: z.enum(["soft-editorial", "collector-card", "artwork-led"]).optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => {
    const head = seo({
      title: "Utah Oil Painter | Original Paintings by Mylie Jane Derrick",
      description:
        "Original still life and landscape oil paintings by Utah artist Mylie Jane Derrick, created for nature lovers, collectors, and art-filled homes.",
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
  const { commissionPreview } = Route.useSearch();

  return (
    <>
      <section
        className="relative flex min-h-screen w-full items-center overflow-hidden"
        style={{ backgroundColor: "var(--brand-forest-green)" }}
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
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pb-32 md:pt-36">
          <h1
            className="max-w-3xl italic leading-[1.04] text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: "var(--brand-cream)",
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            Original oil paintings inspired by Utah, nature, and home.
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{
              color: "rgba(247, 243, 236, 0.88)",
              textShadow: "0 2px 20px rgba(0,0,0,0.28)",
            }}
          >
            I'm Mylie Jane Derrick, a Utah oil painter creating still life and landscape paintings
            for collectors, nature lovers, and thoughtfully designed homes.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              preload="intent"
              preloadDelay={80}
              to="/gallery"
              className="inline-flex items-center justify-center border border-[color:var(--brand-cream)]/30 bg-[color:var(--brand-header-green)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-deep-moss)]"
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
          style={{ borderBottom: "1px solid var(--brand-deep-moss)" }}
        >
          <div>
            <p className="eyebrow">Recent Work</p>
            <h2
              className="mt-3 font-serif text-3xl md:text-4xl"
              style={{ color: "var(--brand-ink)" }}
            >
              Original still lifes, landscapes, and studies
            </h2>
          </div>
          <Link
            preload="intent"
            preloadDelay={80}
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
              preload="intent"
              preloadDelay={80}
              to="/paintings/$slug"
              params={{ slug: p.slug }}
              className="group mb-12 block break-inside-avoid"
            >
              <div className="overflow-hidden">
                <PolishedImage
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

      <CommissionsSection preview={commissionPreview} />

      <section className="mx-auto mt-32 max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow">A Note</p>
        <p
          className="mt-6 font-serif text-2xl italic leading-relaxed md:text-3xl"
          style={{ color: "var(--brand-ink)" }}
        >
          Thank you for being here. It means a great deal to me that these paintings find homes of
          their own. My hope is that they bring beauty, warmth, nature, and joy to the spaces
          they're part of.
        </p>
      </section>
    </>
  );
}

type CommissionPreview = "soft-editorial" | "collector-card" | "artwork-led" | undefined;

function CommissionsSection({ preview }: { preview: CommissionPreview }) {
  if (preview === "soft-editorial") {
    return <SoftEditorialCommissionSection />;
  }

  if (preview === "collector-card") {
    return <CollectorCardCommissionSection />;
  }

  if (preview === "artwork-led") {
    return <ArtworkLedCommissionSection />;
  }

  return <CurrentCommissionSection />;
}

function CurrentCommissionSection() {
  return (
    <section
      id="commission-preview"
      className="relative mt-24 overflow-hidden border-y border-[rgba(247,243,236,0.18)] px-6 py-24 text-center md:mt-32 md:px-10 md:py-28"
    >
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
      <div className="relative z-10 mx-auto max-w-4xl">
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
          Commission a custom oil painting of a meaningful Utah landscape, still life, floral
          arrangement, or memory you want to hold onto. Share what you're imagining and I'll help
          shape it into an original piece.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center justify-center border border-[color:var(--brand-cream)] bg-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-transparent hover:text-[color:var(--brand-cream)]"
        >
          Start an Inquiry
        </Link>
      </div>
    </section>
  );
}

function SoftEditorialCommissionSection() {
  return (
    <section
      id="commission-preview"
      className="mx-auto mt-24 max-w-7xl scroll-mt-32 px-6 md:mt-32 md:px-10"
      aria-label="Commissions preview option 1"
    >
      <div className="border-y border-[color:var(--brand-mauve)]/55 py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">Commissions</p>
            <h2 className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl">
              A custom painting, made with the same care as the collection.
            </h2>
          </div>
          <div className="space-y-6 md:col-span-4">
            <p
              className="text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(247,243,236,0.82)" }}
            >
              If a place, flower, home, or memory feels connected to my work, I take on a small
              number of commissioned oil paintings each season. This is for pieces that feel
              personal, beautiful, and aligned with the subjects I already love to paint.
            </p>
            <div
              className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.18em]"
              style={{ color: "rgba(247,243,236,0.8)" }}
            >
              <p className="border-t border-[rgba(247,243,236,0.24)] pt-3">Landscapes</p>
              <p className="border-t border-[rgba(247,243,236,0.24)] pt-3">Still lifes</p>
              <p className="border-t border-[rgba(247,243,236,0.24)] pt-3">Florals</p>
              <p className="border-t border-[rgba(247,243,236,0.24)] pt-3">Homes & gifts</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[color:var(--brand-cream)] bg-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-transparent hover:text-[color:var(--brand-cream)]"
            >
              Start an Inquiry
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 md:col-span-4">
            <img
              src="/images/optimized/wahweap-768.jpg"
              alt="Wahweap landscape oil painting."
              width={768}
              height={960}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src="/images/optimized/oranges-and-blooms-768.jpg"
              alt="Oranges and Blooms still life oil painting."
              width={768}
              height={960}
              loading="lazy"
              decoding="async"
              className="mt-8 aspect-[3/4] w-full object-cover"
            />
            <img
              src="/images/optimized/peonies-768.jpg"
              alt="Peonies oil painting."
              width={768}
              height={960}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CollectorCardCommissionSection() {
  return (
    <section
      id="commission-preview"
      className="mx-auto mt-24 max-w-7xl scroll-mt-32 px-6 md:mt-32 md:px-10"
      aria-label="Commissions preview option 2"
    >
      <div className="grid gap-10 border-y border-[color:var(--brand-mauve)]/55 py-14 md:grid-cols-12 md:py-18">
        <div className="md:col-span-5">
          <p className="eyebrow">Commissions</p>
          <h2 className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl">
            Have a subject you keep coming back to?
          </h2>
          <p
            className="mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(247,243,236,0.82)" }}
          >
            Commission requests work best when you already connect with my paintings and have a
            subject that belongs in that world — a meaningful place, a flower arrangement, a home,
            or a memory you want to hold onto.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center border border-[color:var(--brand-cream)] bg-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-transparent hover:text-[color:var(--brand-cream)]"
          >
            Ask About a Commission
          </Link>
        </div>
        <div className="md:col-span-7">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-[rgba(247,243,236,0.22)] p-5">
              <p className="font-serif text-2xl italic" style={{ color: "var(--brand-cream)" }}>
                1.
              </p>
              <h3
                className="mt-4 font-sans text-xs uppercase tracking-[0.24em]"
                style={{ color: "var(--brand-cream)" }}
              >
                Send the idea
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "rgba(247,243,236,0.76)" }}
              >
                Share the subject, size hopes, reference photos, and any timing or gift details.
              </p>
            </div>
            <div className="border border-[rgba(247,243,236,0.22)] p-5">
              <p className="font-serif text-2xl italic" style={{ color: "var(--brand-cream)" }}>
                2.
              </p>
              <h3
                className="mt-4 font-sans text-xs uppercase tracking-[0.24em]"
                style={{ color: "var(--brand-cream)" }}
              >
                Review the fit
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "rgba(247,243,236,0.76)" }}
              >
                I’ll look at the subject, timeline, and whether it feels aligned with my work.
              </p>
            </div>
            <div className="border border-[rgba(247,243,236,0.22)] p-5">
              <p className="font-serif text-2xl italic" style={{ color: "var(--brand-cream)" }}>
                3.
              </p>
              <h3
                className="mt-4 font-sans text-xs uppercase tracking-[0.24em]"
                style={{ color: "var(--brand-cream)" }}
              >
                Begin the painting
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "rgba(247,243,236,0.76)" }}
              >
                If it’s a good fit, we’ll confirm size, timeline, payment, and studio calendar.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-5 bg-[color:var(--brand-cream)] p-6 md:grid-cols-[0.75fr_1fr] md:p-7">
            <img
              src="/images/commissions-process.jpeg"
              alt="Paint and palette in Mylie Jane Derrick's studio."
              width={724}
              height={1086}
              loading="lazy"
              decoding="async"
              className="aspect-[5/4] w-full object-cover object-[center_84%]"
            />
            <div>
              <p
                className="text-xs uppercase tracking-[0.24em]"
                style={{ color: "var(--brand-forest-green)" }}
              >
                Helpful to include
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                <li>• Desired size or wall location</li>
                <li>• Reference photos or favorite paintings of mine</li>
                <li>• Timeline, occasion, or gift date if there is one</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtworkLedCommissionSection() {
  return (
    <section
      id="commission-preview"
      className="mx-auto mt-24 max-w-7xl scroll-mt-32 px-6 md:mt-32 md:px-10"
      aria-label="Commissions preview option 3"
    >
      <div className="border-y border-[color:var(--brand-mauve)]/55 py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/optimized/lake-louise-iced-over-768.jpg"
                alt="Lake Louise Iced Over oil painting."
                width={768}
                height={960}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="space-y-4 pt-8">
                <img
                  src="/images/optimized/freshly-cut-768.jpg"
                  alt="Freshly Cut oil painting."
                  width={768}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <img
                  src="/images/optimized/sunset-on-the-tetons-768.jpg"
                  alt="Sunset on the Tetons oil painting."
                  width={768}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow">Commissions</p>
            <h2 className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl">
              For the places and small scenes that feel like home.
            </h2>
            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "rgba(247,243,236,0.82)" }}
            >
              This option keeps commissions tied directly to the artwork: landscapes, florals, and
              still lifes as the visual proof, with the invitation tucked beside them rather than
              treated like a separate marketing block.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <p
                className="border-l border-[rgba(247,243,236,0.24)] pl-5 text-sm leading-relaxed"
                style={{ color: "rgba(247,243,236,0.76)" }}
              >
                Good commission subjects include favorite views, family places, flowers, homes,
                meaningful gifts, and memories with strong visual references.
              </p>
              <p
                className="border-l border-[rgba(247,243,236,0.24)] pl-5 text-sm leading-relaxed"
                style={{ color: "rgba(247,243,236,0.76)" }}
              >
                I take a limited number so each piece has enough time, attention, and space in the
                studio calendar.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center border border-[color:var(--brand-cream)] bg-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-transparent hover:text-[color:var(--brand-cream)]"
            >
              Start an Inquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
