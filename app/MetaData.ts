import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Awami National Party",
    description: "Awami National Party",
    keywords: ["Awami National Party", "ANP", "Pakistan", "Politics", "Leadership"],
    authors: [{ name: "Awami National Party" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "Awami National Party",
        images: [
            {
                url: "/anp-logo.png",
                width: 1200,
                height: 630,
                alt: "Awami National Party",
            },
        ],
    }
};