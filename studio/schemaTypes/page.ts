import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
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
    defineField({ name: "introductoryText", title: "Introductory text", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
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
});
