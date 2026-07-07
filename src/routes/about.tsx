import { createFileRoute, Link } from "@tanstack/react-router";

const aboutCopy =
  "Hi, I'm Mylie. I'm an oil painter, marketing student, and creative person from Utah. I've always been drawn to beautiful things, especially the kind you notice outside: light on the mountains, color in the sky, wildflowers, ski days, lake trips, and quiet moments that make you want to pay attention. I started oil painting in high school, partly because my mom is a professional oil painter and partly because I loved the way painting taught me to really see. Right now, I paint mostly landscapes and still lifes in a representational style I'm still growing into. My work is inspired by the outdoors, travel, home, faith, family, and places that feel meaningful to me. I love painting fruit on a table, mountains I've spent time in, and scenes that hold a little bit of light. I'm not trying to make things look perfect. I'm trying to capture what it felt like to be there: the color, the warmth, the movement, and the feeling of the moment. I'm also studying marketing at BYU, so I think a lot about how art, storytelling, branding, and business can work together. My hope is to build an art and design brand that feels warm, original, thoughtful, and lasting. Every painting on this site is one of a kind. I hope the right pieces find their way to people who will love living with them.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mylie Jane Derrick" },
      {
        name: "description",
        content:
          "About Mylie Jane Derrick — Utah oil painter making still lifes, landscapes, and studies.",
      },
      { property: "og:title", content: "About — Mylie Jane Derrick" },
      {
        property: "og:description",
        content: "About Utah oil painter Mylie Jane Derrick.",
      },
      { property: "og:image", content: "/images/mylie-studio-portrait.jpg" },
      { name: "twitter:image", content: "/images/mylie-studio-portrait.jpg" },
    ],
  }),
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
            loading="lazy"
            className="aspect-[4/5] w-full object-contain"
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

          <p className="mt-10 text-base leading-8 md:text-lg" style={{ color: "var(--brand-ink)" }}>
            {aboutCopy}
          </p>

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
