import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ToastProvider } from "./components/ui/toast";
import React from "react";
import { createTheme } from "@mui/material";

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
const nastaleeq = localFont({
  src: "./fonts/JameelNooriNastaleeq.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Custom theme
const theme = createTheme({
  palette: {
    text: {
      primary: "#1a1a1a", // Replace with your desired primary text color
      secondary: "#757575", // Replace with your desired secondary text color
    },
  },
  typography: {
    fontSize: 14, // Base font size
    body1: {
      fontSize: "1rem", // Default body text size
      color: "#1a1a1a", // Primary text color
    },
    body2: {
      fontSize: "0.875rem", // Secondary body text size
      color: "#757575", // Secondary text color
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="./site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="./icon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nastaleeq.variable} min-h-screen antialiased`}
      >
        <ToastProvider>
          <ClientLayout>{children}</ClientLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
