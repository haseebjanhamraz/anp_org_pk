import type { MetadataRoute } from 'next'


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://anp.org.pk',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://anp.org.pk/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://anp.org.pk/party',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: "https://anp.org.pk/contact",
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6
        }
    ]
}