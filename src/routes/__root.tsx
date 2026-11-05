import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Instagram, Menu } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  VEIL_FADE_IN_MS,
  VEIL_FADE_OUT_MS,
  VEIL_MONOGRAM_DELAY_MS,
  coverBeforeNavigating,
  isPageCovered,
  onVeilChange,
  setShownPathname,
  uncoverPage,
  waitForVisibleImages,
} from "@/lib/page-veil";
import { Analytics } from "@vercel/analytics/react";
import type { BeforeSendEvent } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  artistName,
  defaultSeoImage,
  organizationSchema,
  personSchema,
  siteName,
  websiteSchema,
  absoluteUrl,
} from "../lib/seo";

const ANALYTICS_OPT_OUT_KEY = "myliejanedesign:analytics-opt-out";
const ANALYTICS_OPT_OUT_PATH = "/analytics-opt-out";

function filterMylieAnalytics(event: BeforeSendEvent) {
  if (event.url.includes(ANALYTICS_OPT_OUT_PATH)) {
    return null;
  }

  if (typeof window !== "undefined") {
    try {
      if (window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "true") {
        return null;
      }
    } catch {
      return event;
    }
  }

  return event;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-3xl text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has moved or no longer exists.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border-b border-foreground pb-1 text-sm tracking-wide text-foreground transition-colors hover:text-primary hover:border-primary"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl text-foreground">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Please try again, or head back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border-b border-foreground pb-1 text-sm tracking-wide text-foreground transition-colors hover:text-primary hover:border-primary"
          >
            Try again
          </button>
          <a
            href="/"
            className="border-b border-transparent pb-1 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground hover:border-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Fade the green veil over the page before switching to a new one.
  beforeLoad: async ({ location, preload }) => {
    await coverBeforeNavigating(location.pathname, preload);
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteName} — Oil Paintings by ${artistName}` },
      {
        name: "description",
        content:
          "Original oil paintings, still lifes, and landscapes by Utah artist Mylie Jane Derrick.",
      },
      { name: "author", content: artistName },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: siteName },
      {
        property: "og:description",
        content:
          "Original oil paintings by Mylie Jane Derrick — landscapes and still lifes from Utah.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteName },
      { property: "og:image", content: absoluteUrl(defaultSeoImage) },
      { name: "twitter:card", content: "summary_large_image" },
      { "script:ld+json": personSchema },
      { "script:ld+json": organizationSchema },
      { "script:ld+json": websiteSchema },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap",
      },
      { rel: "sitemap", type: "application/xml", href: absoluteUrl("/sitemap.xml") },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics beforeSend={filterMylieAnalytics} />
        <SpeedInsights />
      </body>
    </html>
  );
}

/**
 * The page currently on screen. While the next page is still loading we keep the
 * old page's colours, so nothing flips to the next page's theme mid-transition.
 */
function useDisplayedPathname() {
  return useRouterState({
    select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname,
  });
}

function SiteHeader() {
  const pathname = useDisplayedPathname();
  const isHome = pathname === "/";
  const isDarkPage = isHome || pathname === "/gallery" || pathname === "/contact";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navTextColor = scrolled
    ? "var(--brand-cream)"
    : isDarkPage
      ? "var(--brand-cream)"
      : "var(--brand-forest-green)";
  const navTextMuted = scrolled
    ? "rgba(247, 243, 236, 0.78)"
    : isDarkPage
      ? "rgba(247, 243, 236, 0.78)"
      : "rgba(46, 59, 36, 0.78)";
  const linkBase = "text-[0.78rem] uppercase tracking-[0.22em] transition-colors hover:opacity-100";
  const desktopActive = {
    className: `${linkBase} border-b pb-1 opacity-100`,
    style: { color: navTextColor, borderColor: navTextColor },
  };
  const mobileActive = {
    className: `${linkBase} border-b pb-1 opacity-100`,
    style: { color: "var(--brand-forest-green)", borderColor: "var(--brand-forest-green)" },
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 2);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (closeMenuTimerRef.current) {
        clearTimeout(closeMenuTimerRef.current);
      }
    };
  }, []);

  const keepMenuOpen = () => {
    if (closeMenuTimerRef.current) {
      clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  };

  const closeMenuSoon = () => {
    keepMenuOpen();
    closeMenuTimerRef.current = setTimeout(() => setMenuOpen(false), 350);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out"
      style={{
        backgroundColor: scrolled ? "var(--brand-header-green)" : "transparent",
        borderColor: scrolled ? "rgba(247, 243, 236, 0.22)" : "transparent",
        boxShadow: scrolled ? "0 12px 30px -28px rgba(26, 26, 26, 0.45)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex items-center justify-between gap-5">
          <Link to="/" className="block">
            <p
              className="font-serif text-2xl leading-none tracking-tight transition-colors duration-300"
              style={{ color: navTextColor }}
            >
              Mylie Jane Derrick
            </p>
            <p
              className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] transition-colors duration-300"
              style={{ color: navTextMuted }}
            >
              Mylie Jane Design · Oil Paintings
            </p>
          </Link>
          <div
            ref={mobileMenuRef}
            className="relative md:hidden"
            onMouseEnter={keepMenuOpen}
            onMouseLeave={closeMenuSoon}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                closeMenuSoon();
              }
            }}
          >
            <button
              type="button"
              aria-label="Navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              onFocus={keepMenuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border transition-colors duration-300"
              style={{ borderColor: navTextMuted, color: navTextColor }}
            >
              <Menu size={18} />
            </button>
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className={`absolute right-0 top-12 z-20 flex min-w-48 flex-col gap-4 bg-[color:var(--brand-cream)] p-5 shadow-[0_18px_50px_-30px_rgba(26,26,26,0.7)] transition-opacity duration-200 ${
                menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Link
                to="/gallery"
                className={`${linkBase} opacity-80`}
                style={{ color: "var(--brand-forest-green)" }}
                activeProps={mobileActive}
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/shop"
                className={`${linkBase} opacity-80`}
                style={{ color: "var(--brand-forest-green)" }}
                activeProps={mobileActive}
                onClick={() => setMenuOpen(false)}
              >
                Available Work
              </Link>
              <Link
                to="/about"
                className={`${linkBase} opacity-80`}
                style={{ color: "var(--brand-forest-green)" }}
                activeProps={mobileActive}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${linkBase} opacity-80`}
                style={{ color: "var(--brand-forest-green)" }}
                activeProps={mobileActive}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <nav
          aria-label="Main navigation"
          className="hidden flex-col gap-4 pt-3 md:flex md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3 md:pt-0"
        >
          <Link
            to="/gallery"
            className={`${linkBase} opacity-80`}
            style={{ color: navTextColor }}
            activeProps={desktopActive}
          >
            Gallery
          </Link>
          <Link
            to="/shop"
            className={`${linkBase} opacity-80`}
            style={{ color: navTextColor }}
            activeProps={desktopActive}
          >
            Available Work
          </Link>
          <Link
            to="/about"
            className={`${linkBase} opacity-80`}
            style={{ color: navTextColor }}
            activeProps={desktopActive}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${linkBase} opacity-80`}
            style={{ color: navTextColor }}
            activeProps={desktopActive}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const pathname = useDisplayedPathname();
  const isDarkPage = pathname === "/" || pathname === "/gallery" || pathname === "/contact";
  const footerBackground = isDarkPage ? "var(--brand-deep-moss)" : "var(--brand-footer-moss)";
  const footerColor = isDarkPage ? "var(--brand-cream)" : "var(--brand-deep-moss)";
  const mutedFooterColor = isDarkPage ? "rgba(247, 243, 236, 0.78)" : "var(--brand-deep-moss)";
  const linkCls = isDarkPage
    ? "text-sm text-[color:var(--brand-cream)]/80 transition-colors hover:text-[color:var(--brand-cream)]"
    : "text-sm text-[color:var(--brand-deep-moss)]/80 transition-colors hover:text-[color:var(--brand-deep-moss)]";
  return (
    <footer className="mt-32" style={{ backgroundColor: footerBackground, color: footerColor }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="font-serif text-lg" style={{ color: footerColor }}>
            Mylie Jane Design
          </p>
          <p className="mt-1 text-sm" style={{ color: mutedFooterColor }}>
            Studio in Salt Lake City, Utah.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/gallery" className={linkCls}>
            Gallery
          </Link>
          <Link to="/shop" className={linkCls}>
            Available Work
          </Link>
          <Link to="/about" className={linkCls}>
            About
          </Link>
          <Link to="/contact" className={linkCls}>
            Contact
          </Link>
          <a
            href="https://www.instagram.com/myliejanedesign/"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 ${linkCls}`}
            aria-label="Mylie Jane Design on Instagram"
          >
            <Instagram size={16} aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </div>
        <p className="text-xs" style={{ color: mutedFooterColor }}>
          © {new Date().getFullYear()} Mylie Jane Derrick. All works original.
        </p>
      </div>
    </footer>
  );
}

/**
 * Soft green veil between pages (see src/lib/page-veil.ts). The new page is swapped
 * in only while the veil fully covers the screen, so nothing is seen jumping into place.
 */
function PageVeil() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showMonogram, setShowMonogram] = useState(false);

  useEffect(() => {
    // Remember which page the visitor landed on, so the first click also gets the veil.
    setShownPathname(router.state.resolvedLocation?.pathname ?? window.location.pathname);
    return onVeilChange(setVisible);
  }, [router]);

  // Once the new page is on screen (and its visible paintings have loaded), lift the veil.
  useEffect(
    () =>
      router.subscribe("onResolved", async ({ toLocation }) => {
        setShownPathname(toLocation.pathname);
        if (!isPageCovered()) return;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await waitForVisibleImages();
        window.setTimeout(uncoverPage, 120);
      }),
    [router],
  );

  // Safety net: never leave the veil up if a page fails to load.
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(uncoverPage, 10000);
    return () => window.clearTimeout(timer);
  }, [visible]);

  // On slow loads, the MJD monogram fades in on the green.
  useEffect(() => {
    if (!visible) {
      setShowMonogram(false);
      return;
    }
    const timer = window.setTimeout(() => setShowMonogram(true), VEIL_MONOGRAM_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      role={visible ? "status" : undefined}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{
        backgroundColor: "var(--brand-forest-green)",
        transitionDuration: `${visible ? VEIL_FADE_IN_MS : VEIL_FADE_OUT_MS}ms`,
        transitionTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
      }}
    >
      <p
        className={`font-serif text-5xl leading-none tracking-[0.18em] transition-opacity duration-700 ease-in-out md:text-6xl ${
          showMonogram ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: "var(--brand-cream)" }}
      >
        MJD
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useDisplayedPathname();
  const isHome = pathname === "/";
  const isDarkPage = isHome || pathname === "/gallery" || pathname === "/contact";
  const pageThemeClass = isDarkPage ? "theme-dark" : "theme-light";

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`flex min-h-screen flex-col bg-background text-foreground ${pageThemeClass}`}
      >
        <PageVeil />
        <SiteHeader />
        <main className={`flex-1 ${isHome ? "" : "pt-28 md:pt-32"}`}>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
