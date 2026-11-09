import { createFileRoute, Link } from "@tanstack/react-router";
import { personSchema, seo } from "@/lib/seo";

const aboutCopy = [
  "I’m an oil painter and designer based in Utah. I grew up surrounded by art, watching my mom, Courtney Derrick, work as a professional oil painter. Her influence sparked my own love for painting, which I began pursuing seriously in high school.",
  "My background is in representational oil painting, and I’ve continued developing my skills through independent study and workshops with artists and ateliers, including Grand Central Atelier in New York. My work has been exhibited at the Springville Museum of Art and the Bountiful Davis Art Center, including the BDAC Emerging Artists Exhibition. I also participated in the UCAIR x BDAC art auction, which brought artists together to raise awareness for clean air in Utah.",
  "Much of my work is inspired by the places I’ve traveled, time spent outdoors, and the beauty found in everyday life. Whether I’m painting a landscape or a still life, I’m drawn to subjects that feel familiar, meaningful, and worth remembering.",
  "My hope is to create paintings that bring beauty and warmth into people’s homes and remind them of places they’ve loved or memories they want to hold onto.",
  "Thank you for being here and taking an interest in my work!",
];

export const Route = createFileRoute("/about")({
  head: () => {
    const head = seo({
      title: "About Mylie Jane Derrick | Utah Oil Painter",
      description:
        "Meet Mylie Jane Derrick, the Utah oil painter behind Mylie Jane Design, creating original still life and landscape paintings.",
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
            Hi, I’m Mylie.
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
