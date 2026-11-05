import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Cross-fade the whole page (header, background, content) between routes.
    defaultViewTransition: true,
    // Start loading a page's data when a visitor hovers or touches its link.
    defaultPreload: "intent",
    // Reuse loaded artwork for a few minutes instead of refetching on every click.
    defaultStaleTime: 5 * 60 * 1000,
    defaultPreloadStaleTime: 5 * 60 * 1000,
  });

  return router;
};
