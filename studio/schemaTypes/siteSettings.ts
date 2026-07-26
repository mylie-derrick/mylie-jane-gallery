import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortSiteDescription",
      title: "Short site description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "email" }),
    defineField({ name: "studioLocation", title: "Studio location", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text" }),
    defineField({
      name: "defaultSocialImage",
      title: "Default social image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "announcementText", title: "Announcement text", type: "string" }),
    defineField({
      name: "announcementEnabled",
      title: "Announcement enabled",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
