import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://anp.org.pk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/auth/",
        "/api/",
        "/_next/",
        "/fonts/",
        "/images/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
