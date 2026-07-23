# Sanity setup for Mylie Jane Design

This branch adds Sanity as the content-management backend for the existing Mylie Jane Design website. The public site remains the existing React + TypeScript + TanStack Start app. The Sanity Studio is separate and lives in `studio/`.

## Existing Sanity project

- Project name: Mylie Jane Design
- Project ID: `upolphdd`
- Dataset: `production`
- Studio host target: `mylie-jane-design.sanity.studio`

Do not create another Sanity project or another production dataset for this site.

## What Sanity controls

Sanity is prepared to manage:

- Artworks
- Collections
- Basic future pages
- Site settings

The frontend currently keeps a safe fallback to the existing hard-coded artwork records in `src/lib/paintings.ts`. This prevents the public site from becoming empty if Sanity has no published artwork records yet or if Sanity temporarily fails.

## Where the Studio code lives

The Studio is in:

`studio/`

Important files:

- `studio/sanity.config.ts`
- `studio/sanity.cli.ts`
- `studio/schemaTypes/artwork.ts`
- `studio/schemaTypes/collection.ts`
- `studio/schemaTypes/page.ts`
- `studio/schemaTypes/siteSettings.ts`
- `studio/structure/index.ts`

## Run the Studio locally

From the repo root:

```bash
cd studio
npm install
npm run dev
```

If Sanity asks you to log in, approve access in the browser using the Sanity account that owns the `upolphdd` project.

## Build the Studio

```bash
cd studio
npm run build
```

## Deploy Studio schema and hosted Studio

Only do this after local Studio build succeeds and you are signed into the correct Sanity account.

```bash
cd studio
npm run schema:deploy
npm run deploy
```

Use the configured hostname:

`mylie-jane-design.sanity.studio`

If Sanity says that hostname is unavailable, choose the closest professional equivalent and record it here before deploying.

## Run the website locally

From the repo root:

```bash
npm install
npm run dev
```

Build the public frontend:

```bash
npm run build
```

## Required frontend environment variables

These are public read-only config values. Do not add write tokens to the frontend.

```bash
VITE_SANITY_PROJECT_ID=upolphdd
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-07-20
```

Optional existing site URL variable:

```bash
VITE_SITE_URL=https://myliejanedesign.com
```

Never commit `SANITY_AUTH_TOKEN` or any private write token.

## Import existing artworks

A safe, repeatable import script was added:

`scripts/sanity-import-existing-artworks.mjs`

Dry run:

```bash
node scripts/sanity-import-existing-artworks.mjs --dry-run
```

Actual import, only after approval:

```bash
SANITY_AUTH_TOKEN=your_write_token_here node scripts/sanity-import-existing-artworks.mjs
```

The script uses stable document IDs based on existing slugs, such as:

- `artwork-freshly-cut`
- `collection-still-lifes`

Because it uses `createOrReplace`, rerunning the script updates the same documents instead of creating duplicate artwork records.

The script does not delete existing Sanity documents and does not delete the hard-coded fallback data.

## Add a new artwork

In Studio:

1. Go to `Artworks`.
2. Click create new artwork.
3. Add title and generate slug.
4. Upload a primary image and write meaningful alt text.
5. Add year, medium, dimensions, availability status, and collection.
6. If the work should appear on the homepage, enable `Featured`.
7. Publish.

## Add a hover image

In an artwork document, upload an image in `Hover/lifestyle image`. The frontend uses it for future hover/lifestyle image support and falls back to the primary image when no hover image exists.

## Mark a painting sold

In an artwork document:

1. Change `Availability status` to `Sold`.
2. Add a `Sold/private note` if desired, such as `Private Collection` or `Commissioned`.
3. Publish.

The public frontend should not show an active public price for sold, private collection, not-for-sale, or archived works.

## Indicate estimated dimensions

In `Artwork dimensions`, turn on `Estimated dimensions` when a size is approximate or not fully confirmed.

## Future Shopify integration

Keep Sanity `artwork` records as the source of truth for artwork identity, imagery, artist notes, dimensions, status, and SEO.

Future Shopify integration should attach commerce behavior through:

- `saleMethod: shopify`
- `shopifyProductHandle`

Do not replace artwork records with Shopify products. Shopify should be a sales channel, not the artwork archive.

## CORS origins to configure in Sanity

Recommended Sanity CORS origins:

- `http://localhost:5173` for local Vite frontend development
- `http://127.0.0.1:5173` for local Vite frontend development
- `https://myliejanedesign.com` for production
- `https://www.myliejanedesign.com` if the www domain is used or redirected through Sanity requests
- Vercel preview origin pattern for this project, preferably the specific preview domains you use rather than a broad wildcard
- `https://mylie-jane-design.sanity.studio` for hosted Studio if Sanity requires it

Only enable credentials for Studio/admin origins that genuinely require authenticated access. Public frontend read requests should not require credentials.

## Security notes

- Do not expose write tokens in source code, browser bundles, `.env.example`, screenshots, or logs.
- The frontend uses public project ID/dataset/API-version values only.
- The Sanity client is configured for published content and does not expose unpublished drafts.
