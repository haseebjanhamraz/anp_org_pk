import Hero from "./components/Hero";
import BachaKhanQuotes from "./components/website_sections/BachaKhanQuotes";
import LeadershipCarousel from "./components/LeadershipCarousel";
import Downloads from "./components/Downloads";
import { Metadata } from "next";
import { generateMetadata } from "./MetaData";



export const metadata: Metadata = generateMetadata("/");


export default function Home() {
  return (
    <div>
      <Hero />
      <BachaKhanQuotes />
      <LeadershipCarousel />
      <Downloads />
    </div>
  );
}
