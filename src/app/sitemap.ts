import type { MetadataRoute } from "next";

const fallbackSiteUrl = "https://sleep-app.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl;
  const lastModified = new Date();

  return [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/privacy", baseUrl).toString(),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: new URL("/terms", baseUrl).toString(),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
