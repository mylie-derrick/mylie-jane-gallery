import { useEffect } from "react";

/**
 * Gentle scroll-linked movement, in the spirit of objectandarchive.com:
 * - [data-drift]: content rises into place (starts lower and lifts by DRIFT px) as it
 *   travels from the bottom of the screen towards the top.
 * - [data-parallax]: a photo inside an overflow-hidden frame moves slower than the page.
 * Movement is smoothed so it trails the scroll slightly. Off for reduced-motion users.
 */
const DRIFT = 90; // px — O&A uses 120; a little softer here.
const PARALLAX = 0.1; // share of the frame height the photo travels.
const SMOOTHING = 0.12; // 0–1, lower trails more.

export function useScrollDrift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const drift = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const current = new Map<HTMLElement, number>();
    let frame = 0;

    const tick = () => {
      const vh = window.innerHeight;
      let moving = false;

      const ease = (el: HTMLElement, target: number) => {
        const prev = current.get(el) ?? target;
        const next = prev + (target - prev) * SMOOTHING;
        const settled = Math.abs(target - next) < 0.1;
        const value = settled ? target : next;
        if (!settled) moving = true;
        current.set(el, value);
        el.style.transform = `translate3d(0, ${value.toFixed(2)}px, 0)`;
      };

      for (const el of drift) {
        // Measure without our own offset so the movement doesn't feed back into itself.
        const top = el.getBoundingClientRect().top - (current.get(el) ?? 0);
        // 0 when the top is at 95% of the screen, 1 when it reaches 10%.
        const p = Math.min(1, Math.max(0, (vh * 0.95 - top) / (vh * 0.85)));
        const eased = 1 - (1 - p) * (1 - p);
        ease(el, DRIFT * (1 - eased));
      }

      for (const el of parallax) {
        const frameEl = el.parentElement ?? el;
        const r = frameEl.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        // -1 entering from below, +1 leaving at the top.
        const p = ((vh - r.top) / (vh + r.height)) * 2 - 1;
        ease(el, p * r.height * PARALLAX);
      }

      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      for (const el of [...drift, ...parallax]) el.style.transform = "";
    };
  }, []);
}
