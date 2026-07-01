import { createFileRoute, Link } from "@tanstack/react-router";
import { paintings } from "@/lib/paintings";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Mylie Jane Design" },
      {
        name: "description",
        content:
          "Available original oil paintings by Mylie Jane Derrick. Inquiry-only sales for one-of-a-kind work.",
      },
      { property: "og:title", content: "Shop — Mylie Jane Design" },
      {
        property: "og:description",
        content: "Inquiry-only original paintings by Mylie Jane Derrick.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="max-w-3xl">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-4 font-serif text-4xl italic leading-tight text-foreground md:text-6xl">
          Original paintings, purchased by inquiry.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Each painting is one of a kind. Available works can be requested through the contact form,
          and sold or not-for-sale works are marked clearly.
        </p>
      </header>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {paintings.map((painting) => {
          const available = painting.status === "Available";
          return (
            <article key={painting.slug} className="group">
              <Link to="/paintings/$slug" params={{ slug: painting.slug }} className="block">
                <div className="overflow-hidden" style={{ backgroundColor: "var(--brand-olive)" }}>
                  <img
                    src={painting.image}
                    alt={painting.title}
                    loading="lazy"
                    width={1000}
                    height={1200}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl italic text-foreground">{painting.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{painting.category}</p>
                  </div>
                  <p
                    className="shrink-0 text-xs uppercase tracking-[0.2em]"
                    style={{ color: available ? "var(--brand-moss)" : "var(--brand-wine)" }}
                  >
                    {painting.status}
                  </p>
                </div>

                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Medium</dt>
                    <dd className="text-right text-foreground">{painting.medium}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Size</dt>
                    <dd className="text-right text-foreground">{painting.size}</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Price</dt>
                    <dd className="text-right text-foreground">{painting.price}</dd>
                  </div>
                </dl>

                {available ? (
                  <Link
                    to="/contact"
                    search={{ painting: painting.title }}
                    className="mt-6 inline-flex w-full items-center justify-center bg-primary px-6 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-[color:var(--brand-olive)]"
                  >
                    Inquire to Purchase
                  </Link>
                ) : (
                  <p className="mt-6 border border-border px-5 py-3 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {painting.status}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
