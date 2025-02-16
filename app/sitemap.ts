import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://anp.org.pk"; // Use absolute URL
  const lastModified = new Date().toISOString(); // Use ISO 8601 format

  const pages = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "yearly", priority: 0.8 },
    { path: "/party", changeFrequency: "yearly", priority: 0.5 },
    { path: "/party/leadership", changeFrequency: "weekly", priority: 0.7 },
    { path: "/documents", changeFrequency: "weekly", priority: 0.6 },
    { path: "/history", changeFrequency: "yearly", priority: 0.5 },
    { path: "/leadership-database", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified,
    changefreq: page.changeFrequency,
    priority: page.priority,
  }));
}
