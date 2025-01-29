import Hero from "./components/Hero";
import BachaKhanQuotes from "./components/website_sections/BachaKhanQuotes";
import LeadershipCarousel from "./components/LeadershipCarousel";
import Downloads from "./components/Downloads";
import { Metadata } from "next";
import { generateMetadata } from "./MetaData";
import NewsWidget from "./components/NewsWidget";

export const metadata: Metadata = generateMetadata("/");

export default function Home() {
  return (
    <>
      <Hero />
      <BachaKhanQuotes />
      <LeadershipCarousel />
      <div className="flex flex-col gap-4 lg:flex-row w-full justify-between">
        <Downloads />
        <NewsWidget />
      </div>
    </>
  );
}
