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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
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

/** Dark tone from the top edge of the home cover photo. */
const HOME_EDGE_COLOR = "#22251f";

function RootShell({ children }: { children: ReactNode }) {
  // iPhone Safari fills the strip behind the clock/battery with the page's background
  // colour. On the home page, match it to the cover photo so the photo reads edge to edge.
  const isHome = useDisplayedPathname() === "/";
  const edgeStyle = isHome ? { backgroundColor: HOME_EDGE_COLOR } : undefined;
  return (
    <html lang="en" style={edgeStyle}>
      <head>
        <HeadContent />
      </head>
      <body style={edgeStyle}>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkBase = "text-[0.78rem] uppercase tracking-[0.22em] transition-colors hover:opacity-100";
  const mobileActive = {
    className: `${linkBase} border-b pb-1 opacity-100`,
    style: { color: "var(--brand-forest-green)", borderColor: "var(--brand-forest-green)" },
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!mobileMenuRef.current?.contains(target) && !mobileNavRef.current?.contains(target)) {
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

  const navLinks = [
    { to: "/gallery", label: "Gallery" },
    { to: "/shop", label: "Available Work" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;
  const headerLinkBase =
    "text-[0.74rem] uppercase tracking-[0.22em] transition-opacity hover:opacity-100";
  const headerActive = { className: `${headerLinkBase} border-b border-current pb-1 opacity-100` };
  const renderHeaderLink = (link: (typeof navLinks)[number]) => (
    <Link
      key={link.to}
      to={link.to}
      className={`${headerLinkBase} opacity-85`}
      activeProps={headerActive}
    >
      {link.label}
    </Link>
  );

  return (
    <>
      {/*
        The header floats over the page as you scroll, with no bar behind it.
        "difference" blending flips the white text so it stays readable:
        light over dark paintings and green, dark over cream pages.
      */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 md:px-10 md:py-6">
          <nav
            aria-label="Main navigation"
            className="pointer-events-auto hidden items-center gap-x-10 md:flex"
          >
            {navLinks.slice(0, 2).map(renderHeaderLink)}
          </nav>
          <div className="md:hidden" />
          <Link
            to="/"
            className="pointer-events-auto block text-center"
            aria-label="Mylie Jane Design, home"
          >
            <span className="font-snell block whitespace-nowrap text-[1.45rem] leading-none sm:text-[1.75rem] md:text-[2.2rem]">
              Mylie Jane Design
            </span>
          </Link>
          <nav
            aria-label="More navigation"
            className="pointer-events-auto hidden items-center justify-end gap-x-10 md:flex"
          >
            {navLinks.slice(2).map(renderHeaderLink)}
          </nav>
          <div
            ref={mobileMenuRef}
            className="pointer-events-auto flex justify-end md:hidden"
            onMouseEnter={keepMenuOpen}
            onMouseLeave={closeMenuSoon}
          >
            <button
              type="button"
              aria-label="Navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              onFocus={keepMenuOpen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-current"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      <nav
        id="mobile-navigation"
        ref={mobileNavRef}
        aria-label="Mobile navigation"
        onMouseEnter={keepMenuOpen}
        onMouseLeave={closeMenuSoon}
        className={`fixed right-6 top-[4.5rem] z-50 flex min-w-48 flex-col gap-4 bg-[color:var(--brand-cream)] p-5 shadow-[0_18px_50px_-30px_rgba(26,26,26,0.7)] transition-opacity duration-200 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${linkBase} opacity-80`}
            style={{ color: "var(--brand-forest-green)" }}
            activeProps={mobileActive}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
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
  // While idle the veil is removed from the page entirely (display: none). iPhone Safari
  // paints its top and bottom bars with the colour of any full-screen fixed element,
  // even an invisible one, which framed the home cover photo in green.
  const [idle, setIdle] = useState(true);
  const [showMonogram, setShowMonogram] = useState(false);

  useEffect(() => {
    // Remember which page the visitor landed on, so the first click also gets the veil.
    setShownPathname(router.state.resolvedLocation?.pathname ?? window.location.pathname);
    return onVeilChange((next) => {
      if (!next) {
        setVisible(false);
        return;
      }
      // Put the veil back on the page first, then fade it in on the next frame.
      setIdle(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    });
  }, [router]);

  // After fading out, take the veil off the page again.
  useEffect(() => {
    if (visible || idle) return;
    const timer = window.setTimeout(() => setIdle(true), VEIL_FADE_OUT_MS + 50);
    return () => window.clearTimeout(timer);
  }, [visible, idle]);

  // Once the new page is on screen (and its visible paintings have loaded), lift the veil.
  useEffect(
    () =>
      router.subscribe("onResolved", async ({ toLocation }) => {
        setShownPathname(toLocation.pathname);
        if (!isPageCovered()) return;
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await waitForVisibleImages();
        uncoverPage();
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
      className={`fixed inset-0 z-[100] items-center justify-center transition-opacity ${
        idle ? "hidden" : "flex"
      } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
      <div className={`flex min-h-screen flex-col bg-background text-foreground ${pageThemeClass}`}>
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
