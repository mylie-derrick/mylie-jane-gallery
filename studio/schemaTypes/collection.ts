import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
    defineField({
      name: "fullDescription",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "displayOrder", title: "Display order", type: "number" }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (Rule) => Rule.max(70).warning("Aim for about 50–60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      validation: (Rule) => Rule.max(170).warning("Aim for about 150–160 characters."),
    }),
  ],
  preview: { select: { title: "title", subtitle: "shortDescription", media: "coverImage" } },
});
