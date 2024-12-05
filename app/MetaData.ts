import { Metadata } from "next";

export const generateMetadata = (path: string): Metadata => {
    const baseUrl = "https://anp.org.pk";
    const siteName = "Awami National Party";

    // Define page-specific metadata
    const pageMetadata: { [key: string]: Metadata } = {
        "/": {
            title: "Awami National Party - Peace | Democracy | Development",
            description: "Official website of the Awami National Party (ANP). Discover our vision for peace, democracy, and development in Pakistan. Learn about our history, leadership, and political initiatives.",
            keywords: ["Awami National Party", "ANP Pakistan", "Pashtun Politics", "Pakistani Politics", "Bacha Khan", "Peace Democracy Development"],
        },
        "/about": {
            title: "About Awami National Party - History & Ideology",
            description: "Learn about the Awami National Party's rich history, core ideologies, and commitment to secular democracy, nonviolence, and social justice in Pakistan.",
            keywords: ["ANP History", "Pashtun Nationalism", "Bacha Khan Philosophy", "Pakistani Political Parties", "Secular Democracy"],
        },
        "/party": {
            title: "ANP Party Structure & Leadership | Awami National Party",
            description: "Explore ANP's party structure, current leadership, and organizational framework. Meet the dedicated leaders working towards peace and progress in Pakistan.",
            keywords: ["ANP Leadership", "Pakistani Political Leadership", "Aimal Wali Khan", "ANP Party Structure"],
        },
        "/history": {
            title: "ANP History - From Khudai Khidmatgar to Present | Awami National Party",
            description: "Discover the rich history of the Awami National Party, from its roots in the Khudai Khidmatgar movement to its present role in Pakistani politics.",
            keywords: ["ANP History", "Khudai Khidmatgar", "Bacha Khan Movement", "Pakistani Political History"],
        },
        "/contact": {
            title: "Contact ANP | Awami National Party",
            description: "Get in touch with the Awami National Party. Find our contact information, office locations, and ways to connect with ANP leadership.",
            keywords: ["Contact ANP", "ANP Office", "Party Communications", "ANP Headquarters"],
        },
    };

    // Get metadata for current path or use default
    const metadata = pageMetadata[path] || pageMetadata["/"];

    return {
        ...metadata,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: baseUrl + path,
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: baseUrl + path,
            siteName: siteName,
            title: metadata.title ?? '',
            description: metadata.description ?? '',
            images: [
                {
                    url: "/anp-cover.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Awami National Party",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metadata.title ?? '',
            description: metadata.description ?? '',
            images: ["/anp-cover.jpg"],
            creator: "@ANPMarkaz",
            site: "@ANPMarkaz",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: "your-google-verification-code",
        },
        authors: [{ name: "Awami National Party" }],
        publisher: "Awami National Party",
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-icon.png',
        },
        manifest: '/site.webmanifest',
    };
};