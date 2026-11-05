import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/** Position of each page in the menu, used to decide which way the page sweeps. */
const PAGE_ORDER = ["/", "/gallery", "/paintings", "/collections", "/shop", "/about", "/contact"];

function pageOrder(pathname = "/") {
  if (pathname === "/") return 0;
  const index = PAGE_ORDER.findIndex((path) => path !== "/" && pathname.startsWith(path));
  return index === -1 ? PAGE_ORDER.length : index;
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Editorial "walk" between pages: the old page eases aside while the new one is
    // uncovered by a soft sweep. Direction follows the menu order (see styles.css).
    defaultViewTransition: {
      types: ({ fromLocation, toLocation, pathChanged }) => {
        if (!pathChanged) return false;
        const from = pageOrder(fromLocation?.pathname);
        const to = pageOrder(toLocation.pathname);
        return ["page-walk", to >= from ? "forward" : "back"];
      },
    },
    // Start loading a page's data when a visitor hovers or touches its link.
    defaultPreload: "intent",
    // Reuse loaded artwork for a few minutes instead of refetching on every click.
    defaultStaleTime: 5 * 60 * 1000,
    defaultPreloadStaleTime: 5 * 60 * 1000,
  });

  return router;
};
