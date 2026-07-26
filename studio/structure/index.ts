import type { StructureResolver } from "sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Mylie Jane Design")
    .items([
      S.listItem()
        .title("Artworks")
        .child(
          S.list()
            .title("Artworks")
            .items([
              S.documentTypeListItem("artwork").title("All Works"),
              S.divider(),
              ...[
                ["Available", "available"],
                ["Sold", "sold"],
                ["Private Collection", "privateCollection"],
                ["Not for Sale", "notForSale"],
                ["Archived", "archived"],
              ].map(([title, status]) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .filter('_type == "artwork" && status == $status')
                      .params({ status }),
                  ),
              ),
              S.listItem()
                .title("Featured")
                .child(
                  S.documentList()
                    .title("Featured")
                    .filter('_type == "artwork" && featured == true'),
                ),
            ]),
        ),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").views([S.view.form()]),
        ),
    ]);

export const singletonDocumentActions = (
  prev: Array<{ action?: string }>,
  context: { schemaType: string },
) =>
  context.schemaType === "siteSettings"
    ? prev.filter((action) => action.action && singletonActions.has(action.action))
    : prev;
