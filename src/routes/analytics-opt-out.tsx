import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { seo } from "@/lib/seo";

const ANALYTICS_OPT_OUT_KEY = "myliejanedesign:analytics-opt-out";

export const Route = createFileRoute("/analytics-opt-out")({
  head: () => {
    const head = seo({
      title: "Analytics Opt Out | Mylie Jane Design",
      description: "Disable Vercel Analytics tracking for this browser on Mylie Jane Design.",
      path: "/analytics-opt-out",
    });

    return {
      ...head,
      meta: [...head.meta, { name: "robots", content: "noindex, nofollow" }],
    };
  },
  component: AnalyticsOptOut,
});

function AnalyticsOptOut() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "true");
    setSaved(true);
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center md:px-10 md:py-32">
      <p className="eyebrow">Analytics</p>
      <h1 className="mt-4 font-serif text-4xl italic text-foreground md:text-5xl">
        {saved ? "Analytics opt-out is on." : "Turning analytics opt-out on…"}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
        This browser will no longer send Vercel Analytics pageviews for Mylie Jane Design. Repeat
        this once on each phone, tablet, computer, or browser you use to visit the site.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center border border-[color:var(--brand-forest-green)] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-forest-green)] transition-colors hover:bg-[color:var(--brand-forest-green)] hover:text-[color:var(--brand-cream)]"
      >
        Back to site
      </Link>
    </section>
  );
}
