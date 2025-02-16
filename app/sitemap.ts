import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  
  const pages = [
    { url: "anp.org.pk", changeFrequency: "weekly" as const, priority: 1 },
    { url: "anp.org.pk/about", changeFrequency: "yearly" as const, priority: 0.8 },
    { url: "anp.org.pk/party", changeFrequency: "yearly" as const, priority: 0.5 },
    { url: "anp.org.pk/party/leadership", changeFrequency: "weekly" as const, priority: 0.5 },
    { url: "anp.org.pk/documents", changeFrequency: "weekly" as const, priority: 0.5 },
    { url: "anp.org.pk/history", changeFrequency: "yearly" as const, priority: 0.5 },
    { url: "anp.org.pk/leadership-database", changeFrequency: "weekly" as const, priority: 0.5 },
    { url: "anp.org.pk/contact", changeFrequency: "yearly" as const, priority: 0.6 },
  ];

  return pages.map((page) => ({
    ...page,
    lastModified,
  }));
}
