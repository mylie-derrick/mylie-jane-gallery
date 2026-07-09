import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/collections")({
  loader: () => {
    throw redirect({ to: "/gallery", replace: true });
  },
});
