import { useEffect, useState } from "react";

/**
 * Opening curtain, shown once per visit when someone first lands on the home page:
 * a solid forest-green page with the large "Mylie Jane Design" wordmark at the bottom,
 * which then slides up to reveal the site.
 *
 * A tiny script in the page head (INTRO_SEEN_SCRIPT) hides it before the first paint
 * if it has already played in this browser session, so repeat visits never flash it.
 */
export const INTRO_SEEN_KEY = "mjd-intro-seen";
export const INTRO_SEEN_SCRIPT = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}"))document.documentElement.classList.add("intro-seen")}catch(e){}`;

const HOLD_MS = 1000; // wordmark on the green before the page lifts
const LIFT_MS = 1100; // how long the green takes to slide away
const FADE_MS = 700; // wordmark fades after the green has passed it

type Phase = "hold" | "lift" | "done";

// Only play when the visitor's first page is the home page (not when they click
// back to Home later), and only once per page load.
const landedOnHome = typeof window === "undefined" || window.location.pathname === "/";
let alreadyMounted = false;

export function IntroCurtain() {
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window !== "undefined" && (alreadyMounted || !landedOnHome) ? "done" : "hold",
  );

  useEffect(() => {
    const root = document.documentElement;
    const skip = alreadyMounted || !landedOnHome;
    alreadyMounted = true;
    if (skip || root.classList.contains("intro-seen")) {
      setPhase("done");
      return;
    }
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // private browsing: the intro may simply play again next time
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const lift = window.setTimeout(() => setPhase("lift"), reduced ? 600 : HOLD_MS);
    const done = window.setTimeout(
      () => {
        setPhase("done");
        root.style.overflow = previousOverflow;
      },
      reduced ? 1200 : HOLD_MS + LIFT_MS + FADE_MS,
    );
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(done);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`site-intro ${phase === "lift" ? "is-lifting" : ""}`} aria-hidden="true">
      <div className="site-intro__panel" />
      <p className="site-intro__logo font-snell">Mylie Jane Design</p>
    </div>
  );
}
