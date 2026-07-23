export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || "upolphdd";
export const sanityDataset = import.meta.env.VITE_SANITY_DATASET || "production";
export const sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2026-07-20";

export const sanityConfig = {
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published" as const,
};
