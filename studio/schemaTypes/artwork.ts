import { defineField, defineType } from "sanity";

const currentYear = new Date().getFullYear();

const imageWithAlt = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    validation: required ? (Rule) => Rule.required() : undefined,
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "A plain-language description for accessibility and search engines.",
        validation: required
          ? (Rule) => Rule.required().min(8)
          : (Rule) => Rule.min(8).warning("Helpful alt text is recommended."),
      }),
      defineField({
        name: "caption",
        title: "Short caption",
        type: "string",
      }),
    ],
  });

const dimensionFields = [
  defineField({
    name: "width",
    title: "Width",
    type: "number",
    validation: (Rule) => Rule.required().positive(),
  }),
  defineField({
    name: "height",
    title: "Height",
    type: "number",
    validation: (Rule) => Rule.required().positive(),
  }),
  defineField({
    name: "depth",
    title: "Depth",
    type: "number",
    validation: (Rule) => Rule.positive(),
  }),
  defineField({
    name: "unit",
    title: "Unit",
    type: "string",
    initialValue: "inches",
    options: {
      list: [
        { title: "Inches", value: "inches" },
        { title: "Centimeters", value: "centimeters" },
      ],
      layout: "radio",
    },
    validation: (Rule) => Rule.required(),
  }),
];

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "images", title: "Images" },
    { name: "details", title: "Details" },
    { name: "availability", title: "Availability" },
    { name: "organization", title: "Organization" },
    { name: "history", title: "History" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "identity",
      description: "Used in the public URL. Keep existing slugs when migrating old artwork pages.",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inventoryNumber",
      title: "Inventory number",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "identity",
      validation: (Rule) =>
        Rule.integer()
          .min(1900)
          .max(currentYear + 1)
          .warning("Use a realistic year."),
    }),
    imageWithAlt("primaryImage", "Primary image", true),
    defineField({ ...imageWithAlt("hoverImage", "Hover/lifestyle image"), group: "images" }),
    defineField({
      name: "galleryImages",
      title: "Additional gallery images",
      type: "array",
      group: "images",
      of: [imageWithAlt("image", "Image")],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "details",
      of: [{ type: "block" }],
      description: "A short artist note or description for the public artwork page.",
    }),
    defineField({ name: "medium", title: "Medium", type: "string", group: "details" }),
    defineField({
      name: "dimensions",
      title: "Artwork dimensions",
      type: "object",
      group: "details",
      fields: [
        ...dimensionFields,
        defineField({
          name: "estimated",
          title: "Estimated dimensions",
          type: "boolean",
          initialValue: false,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      group: "details",
      options: { list: ["portrait", "landscape", "square", "panoramic"], layout: "radio" },
      description: "Usually derived from dimensions during import; adjust manually when needed.",
    }),
    defineField({
      name: "isFramed",
      title: "Framed",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "frameDescription",
      title: "Frame description",
      type: "text",
      group: "details",
      hidden: ({ document }) => !document?.isFramed,
    }),
    defineField({
      name: "readyToHang",
      title: "Ready to hang",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "framedDimensions",
      title: "Framed dimensions",
      type: "object",
      group: "details",
      fields: dimensionFields,
    }),
    defineField({
      name: "status",
      title: "Availability status",
      type: "string",
      group: "availability",
      initialValue: "available",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
          { title: "Private Collection", value: "privateCollection" },
          { title: "Not for Sale", value: "notForSale" },
          { title: "Archived", value: "archived" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "availability",
      hidden: ({ document }) => document?.status !== "available",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "USD",
      group: "availability",
    }),
    defineField({
      name: "saleMethod",
      title: "Sale method",
      type: "string",
      group: "availability",
      initialValue: "inquiry",
      options: { list: ["inquiry", "shopify", "none"], layout: "radio" },
    }),
    defineField({
      name: "shopifyProductHandle",
      title: "Shopify product handle",
      type: "string",
      group: "availability",
      hidden: ({ document }) => document?.saleMethod !== "shopify",
    }),
    defineField({
      name: "soldNote",
      title: "Sold/private note",
      type: "string",
      group: "availability",
      hidden: ({ document }) => !["sold", "privateCollection"].includes(String(document?.status)),
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      group: "organization",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "organization",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "organization",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "organization",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "exhibitions",
      title: "Exhibitions",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Exhibition name", type: "string" }),
            defineField({ name: "venue", title: "Venue", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "year", title: "Year", type: "number" }),
          ],
        },
      ],
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "award", title: "Award", type: "string" }),
            defineField({ name: "organization", title: "Organization", type: "string" }),
            defineField({ name: "year", title: "Year", type: "number" }),
          ],
        },
      ],
    }),
    defineField({
      name: "publicationNotes",
      title: "Publication notes",
      type: "text",
      group: "history",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70).warning("Aim for about 50–60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      group: "seo",
      validation: (Rule) => Rule.max(170).warning("Aim for about 150–160 characters."),
    }),
    defineField({ ...imageWithAlt("socialImage", "Social sharing image"), group: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      width: "dimensions.width",
      height: "dimensions.height",
      unit: "dimensions.unit",
      status: "status",
      media: "primaryImage",
    },
    prepare({ title, year, width, height, unit, status, media }) {
      const dims =
        width && height
          ? `${width} × ${height} ${unit === "centimeters" ? "cm" : "in"}`
          : "No dimensions";
      return { title, subtitle: [year, dims, status].filter(Boolean).join(" · "), media };
    },
  },
});
