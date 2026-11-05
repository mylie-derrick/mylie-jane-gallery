/**
 * Page veil: a soft forest-green screen between pages.
 *
 * 1. A link is clicked -> the veil fades in over the current page.
 * 2. The router waits (root beforeLoad) until the veil is fully opaque, so the
 *    page swap and scroll-to-top always happen out of sight.
 * 3. Once the new page is on screen and its visible images have loaded,
 *    the veil fades away.
 */

export const VEIL_FADE_IN_MS = 450;
export const VEIL_FADE_OUT_MS = 750;
/** If the green is up longer than this, the MJD monogram fades in. */
export const VEIL_MONOGRAM_DELAY_MS = 900;

type Listener = (visible: boolean) => void;

let listener: Listener | null = null;
let coveredPromise: Promise<void> | null = null;
let shownPathname: string | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function onVeilChange(next: Listener) {
  listener = next;
  return () => {
    if (listener === next) listener = null;
  };
}

/** Fade the veil in; resolves once it fully covers the page. */
export function coverPage(): Promise<void> {
  if (typeof window === "undefined" || !listener || prefersReducedMotion()) {
    return Promise.resolve();
  }
  if (!coveredPromise) {
    listener(true);
    coveredPromise = new Promise((resolve) => window.setTimeout(resolve, VEIL_FADE_IN_MS));
  }
  return coveredPromise;
}

export function uncoverPage() {
  coveredPromise = null;
  listener?.(false);
}

export function isPageCovered() {
  return coveredPromise !== null;
}

/** Called from the root route's beforeLoad on every navigation. */
export async function coverBeforeNavigating(pathname: string, preload: boolean) {
  if (preload || typeof window === "undefined") return;
  // Before the site has finished starting up there is nothing to transition from.
  if (shownPathname === null) return;
  // Same page with different filters (e.g. Gallery categories): no veil.
  if (pathname === shownPathname) return;
  await coverPage();
}

export function setShownPathname(pathname: string) {
  shownPathname = pathname;
}

/** Wait (up to a limit) for images currently in view to finish loading. */
export function waitForVisibleImages(timeoutMs = 1500): Promise<void> {
  const pending = Array.from(document.images).filter((img) => {
    if (img.complete) return false;
    const rect = img.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
  });
  if (pending.length === 0) return Promise.resolve();

  const loaded = Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  ).then(() => undefined);
  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs));
  return Promise.race([loaded, timeout]);
}
