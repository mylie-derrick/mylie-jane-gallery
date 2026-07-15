import { mkdir, readFile, writeFile } from "node:fs/promises";

const siteUrl = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://myliejanedesign.com"
).replace(/\/$/, "");
const publicDir = new URL("../public/", import.meta.url);
const paintingsFile = new URL("../src/lib/paintings.ts", import.meta.url);

const source = await readFile(paintingsFile, "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/gallery", priority: "0.9", changefreq: "monthly" },
  { path: "/shop", priority: "0.8", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
  ...slugs.map((slug) => ({
    path: `/paintings/${slug}`,
    priority: "0.7",
    changefreq: "monthly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await mkdir(publicDir, { recursive: true });
await writeFile(new URL("sitemap.xml", publicDir), sitemap);
await writeFile(new URL("robots.txt", publicDir), robots);
