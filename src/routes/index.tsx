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
      <div className="grid gap-12 border-y border-[color:var(--brand-mauve)]/60 bg-[color:var(--brand-cream)] px-6 py-12 md:grid-cols-12 md:items-center md:px-10 md:py-16">
        <div className="md:col-span-6">
          <p className="eyebrow">Commissions · Preview 1</p>
          <h2
            className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl"
            style={{ color: "var(--brand-ink)" }}
          >
            A painting made for a place, memory, or season you want to keep.
          </h2>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "#5A4E44" }}
          >
            I take on a limited number of custom oil paintings inspired by meaningful landscapes,
            florals, homes, still lifes, and memories. If you have an idea that feels connected to
            my work, I’d love to hear about it.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-[color:var(--brand-header-green)]"
          >
            Start an Inquiry
          </Link>
        </div>
        <div className="grid gap-4 md:col-span-6 md:grid-cols-5 md:items-end">
          <img
            src="/images/commissions-process.jpeg"
            alt="Paint and palette in Mylie Jane Derrick's studio."
            width={724}
            height={1086}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-[center_84%] md:col-span-3"
          />
          <div className="space-y-4 md:col-span-2">
            <img
              src="/images/optimized/peonies-768.jpg"
              alt="Peonies oil painting detail."
              width={768}
              height={960}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
            <p
              className="border-l border-[color:var(--brand-mauve)] pl-4 text-sm leading-relaxed"
              style={{ color: "#5A4E44" }}
            >
              A quieter homepage section: warm, editorial, and less like a big sales banner.
            </p>
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
      <div className="grid gap-0 overflow-hidden border border-[color:var(--brand-mauve)]/70 bg-[color:var(--brand-cream)] md:grid-cols-12">
        <div className="bg-[color:var(--brand-deep-moss)] p-4 md:col-span-5 md:p-6">
          <img
            src="/images/hero-painting-process.jpg"
            alt="Mylie Jane Derrick painting in the studio."
            width={721}
            height={1092}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="p-8 md:col-span-7 md:p-14 lg:p-16">
          <p className="eyebrow">Commissions · Preview 2</p>
          <h2
            className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl"
            style={{ color: "var(--brand-ink)" }}
          >
            For meaningful places, gifts, and memories.
          </h2>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "#5A4E44" }}
          >
            Custom paintings begin with a photo, a place, a flower, a home, or a feeling you want
            translated into paint. From there, we’ll talk through size, timeline, and whether the
            subject feels like the right fit.
          </p>
          <div
            className="mt-8 grid gap-3 text-sm md:grid-cols-3"
            style={{ color: "var(--brand-ink)" }}
          >
            <p className="border-t border-[color:var(--brand-mauve)] pt-3">Places you love</p>
            <p className="border-t border-[color:var(--brand-mauve)] pt-3">
              Florals and still lifes
            </p>
            <p className="border-t border-[color:var(--brand-mauve)] pt-3">
              Limited seasonal pieces
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-9 inline-flex items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-[color:var(--brand-header-green)]"
          >
            Ask About a Commission
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArtworkLedCommissionSection() {
  return (
    <section
      id="commission-preview"
      className="mt-24 scroll-mt-32 bg-[color:var(--brand-forest-green)] px-6 py-16 md:mt-32 md:px-10 md:py-20"
      aria-label="Commissions preview option 3"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-center">
        <div className="grid grid-cols-2 gap-4 md:col-span-6">
          <img
            src="/images/optimized/lake-louise-iced-over-768.jpg"
            alt="Lake Louise Iced Over oil painting."
            width={768}
            height={960}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="space-y-4 pt-10">
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
        <div className="border border-[rgba(247,243,236,0.22)] p-8 md:col-span-6 md:p-12">
          <p className="eyebrow" style={{ color: "var(--brand-cream)" }}>
            Commissions · Preview 3
          </p>
          <h2
            className="mt-4 font-serif text-3xl italic leading-tight md:text-5xl"
            style={{ color: "var(--brand-cream)" }}
          >
            A piece that starts with somewhere real.
          </h2>
          <p
            className="mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(247, 243, 236, 0.82)" }}
          >
            Some paintings begin with a place you keep returning to — a lake, a trail, a family
            table, a bouquet, a view from a trip, or a small scene that feels like home.
          </p>
          <p
            className="mt-8 border-t border-[rgba(247,243,236,0.2)] pt-7 font-serif text-2xl italic leading-relaxed"
            style={{ color: "var(--brand-cream)" }}
          >
            If the subject feels connected to my work, I’d love to help turn it into an original oil
            painting.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center border border-[color:var(--brand-cream)] bg-[color:var(--brand-cream)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-transparent hover:text-[color:var(--brand-cream)]"
          >
            Start an Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
