import { Metadata } from "next";

const BASE_URL = "https://anp.org.pk";
const SITE_NAME = "Awami National Party | ANP";
const DEFAULT_IMAGE = "./anp-cover.jpg";
const FALLBACK_IMAGE =
  "https://opengraph.b-cdn.net/production/images/ff8fb7d4-cec7-4ca7-b576-6da8251ff9f9.jpg?token=PTTCojAu2Ywv21ETIUeIK2Lr8b7BgZ8n20lwTjUGOe8&height=630&width=1200&expires=33272771511";

const pageMetadata: Record<string, Metadata> = {
  "/": {
    title: "Awami National Party - Peace | Democracy | Development",
    description:
      "Discover Awami National Party vision for peace, democracy, and development in Pakistan. Learn about our history, leadership, and political initiatives.",
    keywords: [
      "Awami National Party",
      "ANP Pakistan",
      "Pashtun nationalist party",
      "Secular political party Pakistan",
      "Bacha Khan's ideology",
      // Additional keywords
    ],
  },
  "/about": {
    title: "About Awami National Party - History & Ideology",
    description:
      "Learn about the Awami National Party's rich history, core ideologies, and commitment to secular democracy, nonviolence, and social justice in Pakistan.",
    keywords: [
      "ANP History",
      "Pashtun Nationalism",
      "Bacha Khan Philosophy",
      "Pakistani Political Parties",
      "Secular Democracy",
    ],
  },
  "/party": {
    title: "ANP Party Structure & Leadership | Awami National Party",
    description:
      "Explore ANP's party structure, current leadership, and organizational framework. Meet the dedicated leaders working towards peace and progress in Pakistan.",
    keywords: [
      "ANP Leadership",
      "Pakistani Political Leadership",
      "Aimal Wali Khan",
      "ANP Party Structure",
    ],
  },
  "/history": {
    title:
      "ANP History - From Khudai Khidmatgar to Present | Awami National Party",
    description:
      "Discover the rich history of the Awami National Party, from its roots in the Khudai Khidmatgar movement to its present role in Pakistani politics.",
    keywords: ["ANP History", "Khudai Khidmatgar", "Bacha Khan Movement"],
  },
  "/leadership-database": {
    title: "ANP Leadership Database | Awami National Party",
    description:
      "Explore the Awami National Party's leadership database. Discover the dedicated leaders working towards peace, democracy, and development in Pakistan.",
    keywords: ["ANP Leadership Database", "ANP Leaders", "ANP Cabinet Members"],
  },
  "/contact": {
    title: "Contact ANP | Awami National Party",
    description:
      "Get in touch with the Awami National Party. Find our contact information, office locations, and ways to connect with ANP leadership.",
    keywords: ["Contact ANP", "ANP Office", "Party Communications"],
  },
  "/party/leadership/": {
    title: "ANP Leader Profile | Awami National Party",
    description:
      "Learn about the Awami National Party's leadership and their contributions to peace, democracy, and development in Pakistan.",
    keywords: [
      "ANP Leadership",
      "ANP Cabinet Members",
      "ANP Provincial Leaders",
    ],
  },
  "/news": {
    title: "ANP Official Digital Newsletter | Awami National Party",
    description:
      "Official news about Awami National Party activities. The leadership political activities and press releases are issued here from ANP headquarters",
    keywords: [
      "ANP News",
      "ANP Newsletter",
      "Awami National Party News",
      "Awami National Party Latest News",
      "Aimal Wali Khan Latest News",
      "Asfandyar Wali Khan News",
    ],
  },
  "/documents": {
    title: "ANP Official Documents | Awami National Party",
    description:
      "Here you can view detailed official documents for Awami National Party.",
    keywords: [
      "ANP Documents",
      "ANP Official Documents",
      "Party Documents",
      "ANP Constitution",
      "ANP Manifesto",
      "ANP Policy Papers"
    ],
  },
  "/not-found": {
    title: "404 | Page not found",
    description:
      "We're sorry this page is not found. But here are links from our website you may want to explore.",
    keywords: ["404 Not Found", "404", "Not found"],
  },
  "/login": {
    title: "Login | Awami National Party",
    description:
      "Awami National Party has dashboard access for all members who are registered with Awami Natinal Party Official website",
      keywords:[
      "ANP Login",
      "Member Login",
      "ANP Dashboard",
      "ANP Member Portal",
      "ANP Account Access",
      "Party Member Login"
      ]
  },
  "/signup": {
    title: "SignUp | Awami National Party",
    description:
      "Awami National Party has dashboard access for all members who are registered with Awami Natinal Party Official website",
      keywords:[
      "ANP SignUp",
      "Create ANP Account", 
      "Join ANP Online",
      "ANP Membership",
      "Register with ANP",
      "New Member Registration"
      ]
  },
  "/copyright-policy": {
    title: "Copyright Policy © | Awami National Party",
    description:
      "Awami National Party copyright policies are visible and understandable for every user of this website. This website is copyright registered with Baacha Khan Trust",
      keywords:[
      "ANP Copyright Policy",
      "Copyright Notice",
      "Intellectual Property Rights",
      "Content Usage Rights",
      "ANP Website Copyright",
      "Bacha Khan Trust Copyright"
      ]
  },
  "/privacy-policy": {
    title: "Privacy Policy | Awami National Party",
    description:
      "Awami National Party always make sure to take care of user privacy and does not share any data with third party applications or websites",
      keywords:[
      "ANP Privacy Policy",
      "Data Protection Policy",
      "User Privacy Rights",
      "Information Security",
      "Personal Data Protection",
      "Privacy Guidelines ANP",
      "Data Collection Policy"
      ]
  },
  "/terms-of-use": {
    title: "Terms Of Use | Awami National Party",
    description:
      "By accessing and using the Awami National Party (ANP) website, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using our website.",
      keywords:[
      "ANP Terms of Use",
      "Website Usage Terms",
      "User Agreement ANP",
      "Legal Terms ANP",
      "Website Rules",
      "Usage Guidelines",
      "Terms and Conditions"
      ]
  },
};

export const generateMetadata = (path: string): Metadata => {
  const metadata = pageMetadata[path] || pageMetadata["/"];

  return {
    ...metadata,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: BASE_URL + path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: BASE_URL + path,
      siteName: SITE_NAME,
      title: metadata.title ?? "",
      description: metadata.description ?? "",
      images: [
        {
          url: DEFAULT_IMAGE || FALLBACK_IMAGE,
          width: 1200,
          height: 630,
          alt: "Awami National Party Cover",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.title ?? "",
      description: metadata.description ?? "",
      images: [DEFAULT_IMAGE, FALLBACK_IMAGE],
      creator: "@ANPMarkaz",
      site: "@ANPMarkaz",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google:
        "google-site-verification=snn4TkTKvTDGXvvXbgKZpKziiCpLlpBx97pRr1cuOS4",
    },
    authors: [{ name: "Awami National Party" }],
    publisher: "Awami National Party",
    icons: {
      icon: "./favicon.ico",
      apple: "./icon.ico",
    },
    manifest: "./site.webmanifest",
  };
};
