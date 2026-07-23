import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";
import { singletonDocumentActions, structure } from "./structure";

export default defineConfig({
  name: "mylie-jane-design",
  title: "Mylie Jane Design",
  projectId: "upolphdd",
  dataset: "production",
  basePath: "/",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: singletonDocumentActions,
  },
});
