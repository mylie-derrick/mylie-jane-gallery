import { createFileRoute, Link } from "@tanstack/react-router";
import { personSchema, seo } from "@/lib/seo";

const aboutCopy = [
  "Hi, I'm Mylie.",
  "I'm a 22-year-old Utah oil painter, designer, and marketing student at BYU.",
  "I started oil painting in high school after growing up around my mom's work as a professional oil painter. Last summer I studied at Grand Central Atelier in New York, where I continued developing my representational painting skills. Since then, I've continued painting while balancing school and work.",
  "Creating art is one of my greatest passions. I love spending time outdoors in Utah and the Mountain West, and many of my paintings are inspired by landscapes, places I've been, and experiences I want to remember. Whether it's a landscape or a still life, I'm drawn to subjects that feel familiar and meaningful.",
  "I hope my original oil paintings bring a little more beauty into people's homes and remind them of places they've loved or memories they want to hold onto. Thank you for being here. I'm excited to share my work with you.",
];

export const Route = createFileRoute("/about")({
  head: () => {
    const head = seo({
      title: "Mylie Jane Derrick | Utah Oil Painter & Landscape Artist",
      description:
        "Meet Mylie Jane Derrick, a Utah oil painter creating original still life and landscape paintings inspired by nature, memory, and home.",
      path: "/about",
      image: "/images/mylie-studio-portrait.jpg",
      type: "profile",
    });

    return {
      ...head,
      meta: [...head.meta, { "script:ld+json": personSchema }],
    };
  },
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src="/images/mylie-studio-portrait.jpg"
            alt="Mylie Jane Derrick in her studio with an oil painting."
            width={724}
            height={1086}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-center"
            style={{ boxShadow: "0 30px 80px -40px rgba(44, 51, 32, 0.45)" }}
          />
          <p className="mt-4 text-sm" style={{ color: "#5A4E44" }}>
            Mylie in the studio.
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow">About</p>
          <h1
            className="mt-4 font-serif text-4xl italic leading-tight md:text-5xl"
            style={{ color: "var(--brand-ink)" }}
          >
            Hi, I'm Mylie.
          </h1>

          <div className="mt-10 space-y-5 text-base leading-8 md:text-lg">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph} style={{ color: "var(--brand-ink)" }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <Link
              to="/gallery"
              className="pb-1 text-sm uppercase tracking-[0.22em]"
              style={{
                color: "var(--brand-forest-green)",
                borderBottom: "1px solid var(--brand-forest-green)",
              }}
            >
              See the paintings
            </Link>
            <Link
              to="/contact"
              className="pb-1 text-sm uppercase tracking-[0.22em]"
              style={{ color: "var(--brand-ink)", borderBottom: "1px solid var(--brand-mauve)" }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
