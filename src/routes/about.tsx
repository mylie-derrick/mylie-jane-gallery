import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/artist-portrait.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mylie Jane Derrick" },
      {
        name: "description",
        content:
          "About Mylie Jane Derrick — oil painter working from a studio in Utah on still lifes, landscapes, and portraits.",
      },
      { property: "og:title", content: "About — Mylie Jane Derrick" },
      {
        property: "og:description",
        content: "About oil painter Mylie Jane Derrick.",
      },
      { property: "og:image", content: portrait.url },
      { name: "twitter:image", content: portrait.url },
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
            src={portrait.url}
            alt="Mylie Jane Derrick in her studio, standing next to an easel."
            loading="lazy"
            className="w-full object-cover"
            style={{ boxShadow: "0 30px 80px -40px rgba(44, 51, 32, 0.45)" }}
          />
          <p className="mt-4 text-sm" style={{ color: "#5A4E44" }}>
            In the studio.
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow">About Me</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl" style={{ color: "var(--brand-ink)" }}>
            Hi, I'm Mylie.
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed" style={{ color: "var(--brand-ink)" }}>
            <p>
              I'm an oil painter working from a small studio in Utah. Most days you'll
              find me in a paint-covered smock in front of an easel, chasing the light
              on a piece of fruit or the shape of a cloud I saw driving home.
            </p>
            <p>
              I paint mostly from life — still lifes at the studio table, and
              landscapes from time spent outside in the American West. Now and then a
              portrait pulls me in and I have to follow it.
            </p>
            <p>
              The Impressionists and the quiet still life painters taught me almost
              everything I know about looking. I'm not trying to make a photograph.
              I'm trying to honor what it actually felt like to stand in front of the
              thing — the temperature of the light, the color you only notice after a
              few minutes.
            </p>
            <p>
              Every painting on this site is one of a kind. I sell directly to the
              people who want to live with them, and I take that personally.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <Link
              to="/gallery"
              className="pb-1 text-sm uppercase tracking-[0.22em]"
              style={{ color: "var(--brand-wine)", borderBottom: "1px solid var(--brand-wine)" }}
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
