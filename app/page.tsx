import Hero from "./components/Hero";
import BachaKhanQuotes from "./components/website_sections/BachaKhanQuotes";
import LeadershipCarousel from "./components/LeadershipCarousel";
import Downloads from "./components/Downloads";


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
