import { Metadata } from "next";

export const generateMetadata = (path: string): Metadata => {
    const baseUrl = "https://anp.org.pk";
    const siteName = "Awami National Party | ANP";


    // Define page-specific metadata
    const pageMetadata: { [key: string]: Metadata } = {
        "/": {
            title: "Awami National Party - Peace | Democracy | Development",
            description: "Discover Awami National Party vision for peace, democracy, and development in Pakistan. Learn about our history, leadership, and political initiatives.",
            keywords: [
                // Primary Keywords
                "Awami National Party",
                "ANP Pakistan",
                "Pashtun nationalist party",
                "Secular political party Pakistan",
                "Leftist parties in Pakistan",
                "Bacha Khan's ideology",
                "Abdul Wali Khan",
                "Aimal Wali Khan",
                "Khyber Pakhtunkhwa politics",
                "ANP Website",
                "ANP Markaz",
                "ANP Pakistan",
                "ANP official website",
                "ANP manifesto",
                "ANP constitution",
                "Awami National Party constitution",
                "ANP documents",
                "ANP leadership",
                "ANP history",
                "ANP ideology",
                "ANP policies",
                "ANP vision",
                "ANP achievements",
                "ANP contributions",
                "ANP peace",
                "ANP democracy",
                "ANP development",
                "ANP Pashtun",
                "ANP secularism",
                "ANP non-violence",
                "Bacha Khan",
                "Bacha Khan philosophy",
                "Bacha Khan ideology",
                "Bacha Khan quotes",
                "Bacha Khan movement",
                "Bacha Khan legacy",
                "Bacha Khan peace",
                // Secondary Keywords
                "Political parties in Pakistan",
                "Pashtun politics",
                "Provincial autonomy Pakistan",
                "Non-violence in politics",
                "Anti-Taliban party Pakistan",
                "Secularism in Pakistan",
                "Social justice in Pakistan",
                "ANP election campaigns",
                "History of ANP",
                "ANP manifesto",
                // Long-Tail Keywords
                "Awami National Party official website",
                "ANP's stance on provincial autonomy",
                "Contributions of Bacha Khan to Pashtun nationalism",
                "ANP's role in Khyber Pakhtunkhwa governance",
                "Secular political movements in Pakistan",
                "ANP's position on social justice issues",
                "History and achievements of Awami National Party",
                "ANP's efforts for peace and development in Pakistan",
                "Leadership of Aimal Wali Khan in ANP",
                "ANP's policies on non-violence and democracy"
            ],

        },
        "/about": {
            title: "About Awami National Party - History & Ideology",
            description: "Learn about the Awami National Party's rich history, core ideologies, and commitment to secular democracy, nonviolence, and social justice in Pakistan.",
            keywords: ["ANP History", "Pashtun Nationalism", "Bacha Khan Philosophy", "Pakistani Political Parties", "Secular Democracy"],
        },
        "/party": {
            title: "ANP Party Structure & Leadership | Awami National Party",
            description: "Explore ANP's party structure, current leadership, and organizational framework. Meet the dedicated leaders working towards peace and progress in Pakistan.",
            keywords: ["ANP Leadership", "Pakistani Political Leadership", "Aimal Wali Khan", "ANP Party Structure", "Awami National Party", "Aimal Wali Khan", "ANP President"],
            viewport: "width=device-width, initial-scale=1",
        },
        "/history": {
            title: "ANP History - From Khudai Khidmatgar to Present | Awami National Party",
            description: "Discover the rich history of the Awami National Party, from its roots in the Khudai Khidmatgar movement to its present role in Pakistani politics.",
            keywords: ["ANP History", "Khudai Khidmatgar", "Bacha Khan Movement", "Pakistani Political History"],
        },
        "/leadership-database": {
            title: "ANP Leadership Database | Awami National Party",
            description: "Explore the Awami National Party's leadership database. Discover the dedicated leaders working towards peace, democracy, and development in Pakistan.",
            keywords: ["ANP Leadership Database", "ANP Leaders", "ANP Cabinet Members", "ANP Provincial Leaders"],
        },
        "/contact": {
            title: "Contact ANP | Awami National Party",
            description: "Get in touch with the Awami National Party. Find our contact information, office locations, and ways to connect with ANP leadership.",
            keywords: ["Contact ANP", "ANP Office", "Party Communications", "ANP Headquarters"],
        },
        "/party/leadership/": {
            title: "ANP Leader Profile | Awami National Party",
            description: "Learn about the Awami National Party's leadership and their contributions to peace, democracy, and development in Pakistan.",
            keywords: ["ANP Leadership", "ANP Cabinet Members", "ANP Provincial Leaders", "ANP President", "ANP Vice President"],
        },
        "/documents" : {
            title:"ANP Official Documents | Awami National Party",
            description:"Here you can view detailed official documents for Awami National Party",
            keywords:[]
        },
        "/not-found": {
            title: "404 | Page not found",
            description: "We're sorry this page is not found. But here are links from our website you may want to explore",
            keywords: ["404 Not Found", "404", "Not found"]
        }
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
                    url: "./anp-cover.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Awami National Party Cover",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metadata.title ?? '',
            description: metadata.description ?? '',
            images: ["./anp-cover.jpg"],
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
            google: "google-site-verification=snn4TkTKvTDGXvvXbgKZpKziiCpLlpBx97pRr1cuOS4",
        },
        authors: [{ name: "Awami National Party" }],
        publisher: "Awami National Party",
        icons: {
            icon: './favicon.ico',
            apple: './icon.ico',
        },
        manifest: './site.webmanifest',
    };
};