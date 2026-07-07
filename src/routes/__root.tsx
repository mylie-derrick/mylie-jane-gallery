import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mylie Jane Design — Oil Paintings by Mylie Jane Derrick" },
      {
        name: "description",
        content:
          "Original oil paintings by Mylie Jane Derrick. Representational landscapes and still lifes inspired by the mountains and red rock of Utah.",
      },
      { name: "author", content: "Mylie Jane Derrick" },
      { property: "og:title", content: "Mylie Jane Design" },
      {
        property: "og:description",
        content:
          "Original oil paintings by Mylie Jane Derrick — landscapes and still lifes from Utah.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap",
      },
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
      </body>
    </html>
  );
}

function SiteHeader() {
  const linkBase =
    "text-[0.78rem] uppercase tracking-[0.22em] text-[color:var(--brand-cream)]/75 transition-colors hover:text-[color:var(--brand-cream)]";
  const active = {
    className: `${linkBase} text-[color:var(--brand-cream)] border-b border-[color:var(--brand-mauve)] pb-1`,
  };

  return (
    <header style={{ backgroundColor: "var(--brand-dusty-blue)" }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex items-center justify-between gap-5">
          <Link to="/" className="block">
            <p
              className="font-serif text-2xl leading-none tracking-tight"
              style={{ color: "var(--brand-cream)" }}
            >
              Mylie Jane Derrick
            </p>
            <p
              className="mt-2 text-[0.68rem] uppercase tracking-[0.28em]"
              style={{ color: "rgba(247, 243, 236, 0.82)" }}
            >
              Mylie Jane Design · Oil Paintings
            </p>
          </Link>
          <details className="relative md:hidden">
            <summary
              aria-label="Navigation menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-[color:var(--brand-cream)]/35 text-[color:var(--brand-cream)] [&::-webkit-details-marker]:hidden"
            >
              <Menu size={18} />
            </summary>
            <nav className="absolute right-0 top-12 z-20 flex min-w-48 flex-col gap-4 bg-[color:var(--brand-dusty-blue)] p-5 shadow-[0_18px_50px_-30px_rgba(26,26,26,0.7)]">
              <Link to="/gallery" className={linkBase} activeProps={active}>
                Gallery
              </Link>
              <Link to="/shop" className={linkBase} activeProps={active}>
                Shop
              </Link>
              <Link to="/about" className={linkBase} activeProps={active}>
                About
              </Link>
              <Link to="/contact" className={linkBase} activeProps={active}>
                Contact
              </Link>
            </nav>
          </details>
        </div>
        <nav className="hidden flex-col gap-4 pt-3 md:flex md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3 md:pt-0">
          <Link to="/gallery" className={linkBase} activeProps={active}>
            Gallery
          </Link>
          <Link to="/shop" className={linkBase} activeProps={active}>
            Shop
          </Link>
          <Link to="/about" className={linkBase} activeProps={active}>
            About
          </Link>
          <Link to="/contact" className={linkBase} activeProps={active}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  const linkCls =
    "text-sm text-[color:var(--brand-deep-moss)]/80 transition-colors hover:text-[color:var(--brand-deep-moss)]";
  return (
    <footer
      className="mt-32"
      style={{ backgroundColor: "var(--brand-footer-moss)", color: "var(--brand-deep-moss)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="font-serif text-lg" style={{ color: "var(--brand-deep-moss)" }}>
            Mylie Jane Design
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--brand-deep-moss)" }}>
            Studio in Salt Lake City, Utah.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/gallery" className={linkCls}>
            Gallery
          </Link>
          <Link to="/shop" className={linkCls}>
            Shop
          </Link>
          <Link to="/about" className={linkCls}>
            About
          </Link>
          <Link to="/contact" className={linkCls}>
            Contact
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--brand-deep-moss)" }}>
          © {new Date().getFullYear()} Mylie Jane Derrick. All works original.
        </p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
