import { createFileRoute, Link } from "@tanstack/react-router";
import portrait from "@/assets/painting-cottonwood-creek.jpg";

export const Route = createFileRoute("/statement")({
  head: () => ({
    meta: [
      { title: "Artist Statement — Mylie Jane Derrick" },
      {
        name: "description",
        content:
          "An artist statement by oil painter Mylie Jane Derrick on landscape, still life, and the influence of Utah's mountains and the Impressionists.",
      },
      { property: "og:title", content: "Artist Statement — Mylie Jane Derrick" },
      {
        property: "og:description",
        content: "On landscape, still life, and the influence of Utah's outdoor places.",
      },
    ],
  }),
  component: Statement,
});

function Statement() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={portrait}
            alt="A plein air painting of a Utah creek through cottonwoods."
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full object-cover shadow-[0_30px_80px_-40px_rgba(60,40,20,0.35)]"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="italic">Cottonwood Creek</span> · Plein air study
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow">Artist Statement</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            On painting the places I love.
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85">
            <p>
              I grew up in Utah, and most of what I paint is here. The Wasatch in the
              early morning. Red rock canyons in southern Utah at dusk. The long, still
              shoreline of Lake Powell. I've spent more time outside in those places
              than anywhere else, and the paintings are my way of staying with them.
            </p>
            <p>
              I work mostly in oils, sometimes finishing pieces in the studio from
              plein air studies, sometimes painting the whole thing outside in one
              sitting. Still lifes happen at the kitchen table — peonies from the
              garden, lemons in a brass bowl, whatever's around when the afternoon
              light comes through the window.
            </p>
            <p>
              The Impressionists taught me almost everything I know about looking.
              I'm not trying to make a photograph; I'm trying to honor what a place
              actually felt like to stand inside of — the temperature of the light,
              the quiet, the color you only notice after a few minutes.
            </p>
            <p>
              Every painting on this site is one of a kind. I sell directly to the
              people who want to live with them, and I take that personally.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <Link
              to="/gallery"
              className="border-b border-foreground pb-1 text-sm uppercase tracking-[0.22em] text-foreground hover:text-primary hover:border-primary"
            >
              See the paintings
            </Link>
            <Link
              to="/contact"
              className="border-b border-transparent pb-1 text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground hover:border-foreground"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
