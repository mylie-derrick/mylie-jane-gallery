import { createClient } from "@sanity/client";
import { sanityConfig } from "./sanity.config";

export const sanityClient = createClient(sanityConfig);
