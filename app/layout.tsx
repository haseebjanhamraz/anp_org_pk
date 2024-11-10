import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Awami National Party",
  description: "Awami National Party",
  keywords: ["Awami National Party", "ANP", "Pakistan", "Politics", "Leadership"],
  authors: [{ name: "Awami National Party" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: `Awami National Party `,
    url: "https://anp.org.pk",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
