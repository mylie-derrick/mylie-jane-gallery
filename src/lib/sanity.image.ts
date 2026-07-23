import imageUrlBuilder from "@sanity/image-url";

import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function optimizedSanityImageUrl(
  source: SanityImageSource | undefined,
  options: {
    width?: number;
    height?: number;
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  } = {},
) {
  if (!source) return "";
  let image = urlFor(source).auto("format");
  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.fit) image = image.fit(options.fit);
  return image.url();
}
